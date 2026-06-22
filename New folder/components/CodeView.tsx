import React from 'react';
import { FileData } from './Editor';

interface CodeViewProps {
    file: FileData | null;
}

const CodeView: React.FC<CodeViewProps> = ({ file }) => {
    if (!file) {
        return (
            <div className="flex-1 bg-[#202124] flex items-center justify-center text-gray-500 text-sm">
                Select a file to view its code.
            </div>
        );
    }

    const lines = file.content.split('\n');

    return (
        <div className="flex-1 flex flex-col bg-[#202124] overflow-hidden">
            <div className="flex-shrink-0 h-10 px-4 bg-[#1c1c1f] text-gray-400 text-sm flex items-center border-b border-l border-gray-700">
                {file.path}
            </div>
            <div className="flex-1 flex overflow-auto border-l border-gray-700">
                <div className="w-12 text-right pr-4 text-gray-500 bg-[#202124] sticky top-0 pt-3 select-none">
                    {lines.map((_, i) => (
                        <div key={i}>{i + 1}</div>
                    ))}
                </div>
                <pre className="flex-1 p-3 text-gray-300 font-mono text-sm whitespace-pre-wrap break-words">
                    <code>
                        {file.content}
                    </code>
                </pre>
            </div>
        </div>
    );
};

export default CodeView;