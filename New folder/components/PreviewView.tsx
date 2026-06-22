import React, { useState, useEffect, useRef } from 'react';
import { BoltBIcon } from './icons';
import { FileData } from './Editor';

interface PreviewViewProps {
    files: FileData[];
}

// Injected script to capture logs and errors from the iframe
const iframeDebugScript = `
const sendToParent = (level, data) => {
  window.parent.postMessage({ type: 'iframe-log', level, data }, '*');
};

// Capture console logs
['log', 'warn', 'error', 'info', 'debug'].forEach(level => {
  const original = console[level];
  console[level] = (...args) => {
    sendToParent(level, args);
    original.apply(console, args);
  };
});

// Capture uncaught exceptions
window.onerror = (message, source, lineno, colno, error) => {
  sendToParent('error', [{ 
    message: \`Uncaught: \${message}\`, 
    source: \`\${source?.split('/').pop()}:\${lineno}:\${colno}\`,
    stack: error?.stack 
  }]);
  return true;
};

// Capture unhandled promise rejections
window.addEventListener('unhandledrejection', event => {
  sendToParent('error', [{ 
    message: 'Unhandled Promise Rejection', 
    reason: event.reason?.stack || event.reason 
  }]);
});
`;

/**
 * Resolves relative import paths to absolute paths based on the file's location.
 * @param content The source code.
 * @param currentFilePath The absolute path of the file containing the code.
 * @returns The source code with resolved absolute import paths.
 */
const resolveImportPaths = (content: string, currentFilePath: string): string => {
    const importExportRegex = /(from\s*['"]|import\s*['"]|import\s*\(\s*['"])([^'"]+)(['"]\)?)/g;
    return content.replace(importExportRegex, (match, prefix, rawPath, suffix) => {
        if (!rawPath.startsWith('.')) return match; // Not a relative path
        try {
            const base = new URL(currentFilePath, 'file://localhost').toString();
            const resolvedUrl = new URL(rawPath, base);
            return `${prefix}${resolvedUrl.pathname}${suffix}`;
        } catch (e) {
            return match;
        }
    });
};

const PreviewView: React.FC<PreviewViewProps> = ({ files }) => {
    const iframeRef = useRef<HTMLIFrameElement>(null);
    const [srcDoc, setSrcDoc] = useState<string | undefined>(undefined);
    const [buildError, setBuildError] = useState<string | null>(null);
    const [runtimeLogs, setRuntimeLogs] = useState<{level: string, data: any[]}[]>([]);

    // Listen for logs and errors from the iframe
    useEffect(() => {
        const handleMessage = (event: MessageEvent) => {
            if (event.source !== iframeRef.current?.contentWindow) return;
            if (event.data.type === 'iframe-log') {
                setRuntimeLogs(prev => [...prev, { level: event.data.level, data: event.data.data }]);
            }
        };
        window.addEventListener('message', handleMessage);
        return () => window.removeEventListener('message', handleMessage);
    }, []);

    useEffect(() => {
        setBuildError(null);
        setRuntimeLogs([]);

        if (files.length === 0) {
            setSrcDoc(undefined);
            return;
        }

        const normalizedFiles = files.map(f => ({
            ...f,
            path: f.path.replace(/\\/g, '/').startsWith('/') ? f.path : `/${f.path}`
        }));

        const htmlFile = normalizedFiles.find(f => f.path.toLowerCase() === '/index.html');
        if (!htmlFile) {
            setBuildError("Build Error: No index.html file found.");
            setSrcDoc(undefined);
            return;
        }
        
        try {
            const fileBlobs = new Map<string, string>();
            const isScript = (path: string) => /\.(js|jsx|ts|tsx)$/.test(path);

            normalizedFiles.forEach(file => {
                if (file.path === '/index.html') return;
                const content = isScript(file.path) ? resolveImportPaths(file.content, file.path) : file.content;
                const mimeType = file.path.endsWith('.css') ? 'text/css' : 'application/javascript';
                fileBlobs.set(file.path, URL.createObjectURL(new Blob([content], { type: mimeType })));
            });

            const parser = new DOMParser();
            const doc = parser.parseFromString(htmlFile.content, 'text/html');

            const importMap = { imports: {} as Record<string, string> };
            const existingMapScript = doc.querySelector('script[type="importmap"]');
            if (existingMapScript?.textContent) {
                try {
                    Object.assign(importMap.imports, JSON.parse(existingMapScript.textContent).imports);
                } catch(e) { /* ignore malformed JSON */ }
                existingMapScript.remove();
            }

            fileBlobs.forEach((url, path) => {
                importMap.imports[path] = url;
                // Add mappings for extensionless imports
                if (isScript(path)) {
                    const pathWithoutExt = path.replace(/\.[^/.]+$/, "");
                     if (!importMap.imports[pathWithoutExt]) importMap.imports[pathWithoutExt] = url;
                }
            });
            
            doc.querySelectorAll('script[src], link[href]').forEach(el => {
                const attr = el.hasAttribute('src') ? 'src' : 'href';
                const originalPath = el.getAttribute(attr) || '';
                const absolutePath = originalPath.startsWith('/') ? originalPath : `/${originalPath}`;
                if (fileBlobs.has(absolutePath)) {
                    el.setAttribute(attr, fileBlobs.get(absolutePath)!);
                    if (el.tagName === 'SCRIPT') el.setAttribute('data-local', 'true');
                }
            });

            // Inject the debugger, then babel, then the import map
            const debugScriptEl = doc.createElement('script');
            debugScriptEl.textContent = iframeDebugScript;
            doc.head.prepend(debugScriptEl);
            
            const babelScriptEl = doc.createElement('script');
            babelScriptEl.src = 'https://unpkg.com/@babel/standalone/babel.min.js';
            doc.head.append(babelScriptEl);

            const importMapScriptEl = doc.createElement('script');
            importMapScriptEl.type = 'importmap';
            importMapScriptEl.textContent = JSON.stringify(importMap);
            doc.head.append(importMapScriptEl);

            // معالجة جميع السكريبتات المحلية (src أو inline)
            doc.querySelectorAll('script').forEach(el => {
                // إذا كان السكريبت محلي (src) أو inline
                const isLocal = el.hasAttribute('src') || (!el.hasAttribute('src') && el.textContent);
                if (isLocal) {
                    el.setAttribute('type', 'text/babel');
                    el.setAttribute('data-presets', 'react,typescript');
                    if (el.hasAttribute('type') && el.getAttribute('type') === 'module') {
                        el.removeAttribute('type');
                        el.setAttribute('type', 'text/babel');
                    }
                    // معالجة الكود inline عبر resolveImportPaths
                    if (!el.hasAttribute('src') && el.textContent) {
                        el.textContent = resolveImportPaths(el.textContent, '/index.html');
                    }
                }
            });

            setSrcDoc(`<!DOCTYPE html>${doc.documentElement.outerHTML}`);

            return () => fileBlobs.forEach(url => URL.revokeObjectURL(url));

        } catch (e) {
            setBuildError(e instanceof Error ? `Build Error: ${e.message}` : 'An unknown build error occurred.');
            setSrcDoc(undefined);
        }
    }, [files]);


    const hasError = buildError || runtimeLogs.some(log => log.level === 'error');

    return (
        <div className="flex-1 flex flex-col bg-white">
            <iframe
                ref={iframeRef}
                srcDoc={srcDoc}
                title="Preview"
                sandbox="allow-scripts allow-modals allow-forms allow-popups allow-same-origin"
                className="w-full h-full border-none"
                style={{ display: hasError || !srcDoc ? 'none' : 'block' }}
            />
             {(hasError || !srcDoc) && (
                <div className="flex-1 flex flex-col items-center justify-center text-center bg-[#111113] p-4 overflow-y-auto">
                     {!srcDoc && !hasError && (
                        <>
                            <BoltBIcon className="w-20 h-20 mb-4 text-gray-800" />
                            <p className="text-lg font-medium text-gray-400">Your preview will appear here</p>
                            <p className="text-sm mt-2 text-gray-500">Generate a project to see the preview.</p>
                        </>
                    )}
                    {buildError && (
                        <div className="w-full max-w-2xl text-left">
                            <h3 className="text-lg font-semibold text-red-400">Preview Build Failed</h3>
                            <pre className="mt-2 text-sm text-red-300 bg-red-900/20 p-3 rounded-md whitespace-pre-wrap">{buildError}</pre>
                        </div>
                    )}
                    {runtimeLogs.length > 0 && (
                        <div className="w-full max-w-2xl text-left mt-4">
                            <h3 className="text-lg font-semibold text-yellow-400">Preview Runtime Logs</h3>
                            <div className="font-mono text-xs bg-black/20 p-3 rounded-md h-64 overflow-y-auto">
                                {runtimeLogs.map((log, i) => (
                                    <div key={i} className={`whitespace-pre-wrap ${log.level === 'error' ? 'text-red-400' : 'text-gray-400'}`}>
                                        <span className="select-none mr-2">{'>'}</span>
                                        {log.data.map(d => typeof d === 'object' ? JSON.stringify(d, null, 2) : d).join(' ')}
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}
                </div>
            )}
        </div>
    );
};

export default PreviewView;
