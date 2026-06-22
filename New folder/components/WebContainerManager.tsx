import React, { useEffect, useRef, useState } from 'react';
import { WebContainer } from '@stackblitz/webcontainer-core';
import { Terminal } from 'xterm';
import 'xterm/css/xterm.css';

interface WebContainerManagerProps {
  files: Record<string, { file: { contents: string } }>;
  onServerReady?: (url: string) => void;
  onLog?: (msg: string) => void;
}

const WebContainerManager: React.FC<WebContainerManagerProps> = ({ files, onServerReady, onLog }) => {
  const terminalRef = useRef<HTMLDivElement>(null);
  const [status, setStatus] = useState<'init' | 'installing' | 'starting' | 'ready' | 'error'>('init');
  const [error, setError] = useState<string | null>(null);
  const term = useRef<Terminal | null>(null);
  const webcontainer = useRef<WebContainer | null>(null);

  useEffect(() => {
    term.current = new Terminal({
      fontSize: 14,
      theme: { background: '#18181b', foreground: '#fafafa' },
      rows: 20,
    });
    if (terminalRef.current) {
      term.current.open(terminalRef.current);
    }
    return () => {
      term.current?.dispose();
    };
  }, []);

  useEffect(() => {
    const run = async () => {
      setStatus('init');
      setError(null);
      try {
        webcontainer.current = await WebContainer.boot();
        term.current?.writeln('WebContainer booted!');
        await webcontainer.current.mount(files);
        term.current?.writeln('Files mounted. Installing dependencies...');
        setStatus('installing');
        const install = await webcontainer.current.spawn('npm', ['install']);
        install.output.pipeTo(new WritableStream({
          write(data) {
            term.current?.write(data);
            onLog?.(data);
          }
        }));
        const code = await install.exit;
        if (code !== 0) throw new Error('npm install failed');
        term.current?.writeln('\r\nDependencies installed. Starting dev server...');
        setStatus('starting');
        const server = await webcontainer.current.spawn('npm', ['run', 'dev']);
        server.output.pipeTo(new WritableStream({
          write(data) {
            term.current?.write(data);
            onLog?.(data);
          }
        }));
        // Listen for server ready
        webcontainer.current.on('server-ready', (port: number, url: string) => {
          term.current?.writeln(`\r\nServer ready at ${url}`);
          setStatus('ready');
          onServerReady?.(url);
        });
      } catch (e: any) {
        setStatus('error');
        setError(e.message || 'Unknown error');
        term.current?.writeln(`\r\n[ERROR] ${e.message}`);
      }
    };
    run();
    // eslint-disable-next-line
  }, [JSON.stringify(files)]);

  return (
    <div style={{ background: '#18181b', color: '#fafafa', borderRadius: 8, padding: 8 }}>
      <div ref={terminalRef} style={{ height: 320, width: '100%' }} />
      <div style={{ marginTop: 8 }}>
        <b>Status:</b> {status}
        {error && <div style={{ color: 'red' }}>Error: {error}</div>}
      </div>
    </div>
  );
};

export default WebContainerManager; 