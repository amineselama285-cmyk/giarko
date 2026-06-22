import React, { useState, useMemo, useEffect } from 'react';
import { FileCodeIcon, PlusIcon, TerminalIcon, ChevronUpIcon } from './icons';
import FileExplorer from './FileExplorer';
import CodeView from './CodeView';
import PreviewView from './PreviewView';
import { FileData, GenerationStatus } from './Editor';
import WebContainerManager from './WebContainerManager';

interface MainContentProps {
    files: FileData[];
    status: GenerationStatus;
    goal?: string | null;
    plan?: string[];
    suggestions?: string[];
}

const MainContent: React.FC<MainContentProps> = ({ files, status, goal, plan, suggestions }) => {
    const [activeView, setActiveView] = useState<'code' | 'preview' | 'terminal'>('preview');
    const [activeFilePath, setActiveFilePath] = useState<string | null>(null);
    const [serverUrl, setServerUrl] = useState<string | null>(null);
    const [logs, setLogs] = useState<string[]>([]);

    // توليد ملفات ديناميكية بناءً على الخطة والاقتراحات
    const deps = ["react", "react-dom"];
    if (suggestions?.includes('استخدام Tailwind CSS')) deps.push('tailwindcss');
    if (suggestions?.includes('إضافة مصادقة (Authentication)')) deps.push('firebase');
    if (suggestions?.includes('دعم PWA')) deps.push('vite-plugin-pwa');
    // يمكنك إضافة المزيد حسب الاقتراحات

    const dynamicFiles = {
      'package.json': { file: { contents: JSON.stringify({
        name: 'dynamic-demo',
        version: '1.0.0',
        scripts: { dev: 'vite' },
        dependencies: Object.fromEntries(deps.map(d => [d, 'latest']))
      }, null, 2) } },
      'index.html': { file: { contents: '<!DOCTYPE html><html><head><title>' + (goal || 'Demo') + '</title></head><body><div id="root"></div><script type="module" src="/src/index.tsx"></script></body></html>' } },
      'src/index.tsx': { file: { contents: 'import React from "react"; import { createRoot } from "react-dom/client"; import App from "./App.tsx"; const root = createRoot(document.getElementById("root")); root.render(<App />);' } },
      'src/App.tsx': { file: { contents: `import React from "react";\nexport default function App() {\n  return (<div>\n    <h1>${goal || 'Hello WebContainers!'}</h1>\n    <ul>\n      ${(plan || []).map(s => `<li>${s}</li>`).join('')}\n    </ul>\n    ${(suggestions || []).length > 0 ? `<h3>اقتراحات مفعلة:</h3><ul>${suggestions?.map(s => `<li>${s}</li>`).join('')}</ul>` : ''}\n  </div>);\n}` } },
    };

    // Effect to switch to code view and select the first file when generation is done
    useEffect(() => {
        if (status === 'done' && files.length > 0) {
            setActiveView('code');
            const entrypoint = files.find(f => f.path.includes('App.tsx')) || files.find(f => f.path.includes('.js')) || files[0];
            setActiveFilePath(entrypoint.path);
        } else if (status === 'idle' || status === 'error') {
            setActiveView('preview');
        }
    }, [status, files]);

    const activeFile = useMemo(() => {
        if (!activeFilePath) return null;
        return files.find(f => f.path === activeFilePath) || null;
    }, [activeFilePath, files]);

    const handleFileSelect = (path: string) => {
        setActiveFilePath(path);
        setActiveView('code'); // Ensure code view is active when a file is selected
    };

    const isCodeViewActive = activeView === 'code';
    const isPreviewViewActive = activeView === 'preview';

    return (
        <main className="flex-1 flex flex-col bg-[#111113] overflow-hidden">
            <div className="flex-shrink-0 border-b border-gray-800 flex justify-end items-center h-12 px-4">
                <div className="flex items-center bg-[#1c1c1f] p-1 rounded-lg border border-gray-700">
                    <button
                        onClick={() => setActiveView('code')}
                        className={`flex items-center space-x-2 px-3 py-1 text-sm rounded-md transition-colors ${activeView === 'code' ? 'text-white bg-[#2e2e33]' : 'text-gray-400 hover:text-white'}`}
                        aria-current={activeView === 'code'}
                    >
                        <span>Code</span>
                    </button>
                    <button
                        onClick={() => setActiveView('preview')}
                        className={`px-4 py-1 text-sm rounded-md transition-colors ${activeView === 'preview' ? 'text-white bg-[#2e2e33]' : 'text-gray-400 hover:text-white'}`}
                        aria-current={activeView === 'preview'}
                    >
                        <span>Preview</span>
                    </button>
                    <button
                        onClick={() => setActiveView('terminal')}
                        className={`px-4 py-1 text-sm rounded-md transition-colors ${activeView === 'terminal' ? 'text-white bg-[#2e2e33]' : 'text-gray-400 hover:text-white'}`}
                        aria-current={activeView === 'terminal'}
                    >
                        <span>Terminal</span>
                    </button>
                </div>
            </div>
            <div className="flex-1 flex overflow-hidden">
                {activeView === 'code' && (
                    <>
                        <FileExplorer 
                            files={files} 
                            status={status} 
                            onFileSelect={setActiveFilePath} 
                            activeFilePath={activeFilePath} 
                        />
                        <CodeView file={files.find(f => f.path === activeFilePath) || null} />
                    </>
                )}
                {activeView === 'preview' && serverUrl && (
                    <iframe src={serverUrl} title="Preview" className="w-full h-full border-none" />
                )}
                {activeView === 'terminal' && (
                    <div className="w-full h-full bg-black">
                        <WebContainerManager files={dynamicFiles} onServerReady={setServerUrl} onLog={msg => setLogs(l => [...l, msg])} />
                    </div>
                )}
            </div>

            <div className="flex-shrink-0 h-10 border-t border-gray-700 bg-[#1c1c1f] flex items-center justify-between px-4 text-sm">
                 <div className="flex items-center space-x-4">
                    <button className="flex items-center space-x-2 text-gray-300">
                        <BoltIcon className="w-4 h-4 text-yellow-400" />
                        <span>Bolt</span>
                    </button>
                     <button className="flex items-center space-x-2 text-gray-400 hover:text-white">
                        <TerminalIcon className="w-5 h-5" />
                        <span>Terminal</span>
                    </button>
                     <button className="text-gray-400 hover:text-white">
                        <PlusIcon className="w-4 h-4" />
                     </button>
                </div>
                <button className="text-gray-400 hover:text-white">
                   <ChevronUpIcon className="w-5 h-5" />
                </button>
            </div>
        </main>
    );
};

// Placeholder BoltIcon since it's used here, but defined in icons.tsx
const BoltIcon: React.FC<{className?: string}> = ({ className }) => (
  <svg fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24" className={className}>
    <path strokeLinecap="round" strokeLinejoin="round" d="M3.995 12.995l8-10-1.01 6.01h5.015l-8 10 1.01-6.01H3.995z" />
  </svg>
);


export default MainContent;