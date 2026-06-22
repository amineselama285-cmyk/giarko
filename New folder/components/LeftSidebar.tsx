import React, { useState } from 'react';
import { BoltIcon, MoreHorizontalIcon, SendIcon, LinkIcon, FilePlusIcon, EditIcon } from './icons';
import { GenerationStatus } from './Editor';

interface LeftSidebarProps {
  status: GenerationStatus;
  error: string | null;
  onSendPrompt: (prompt: string) => void;
  thought: string | null;
  generationTime: number | null;
}

const ThoughtDisplay: React.FC<{ thought: string; time: number | null }> = ({ thought, time }) => {
    const formattedThought = thought.split('\n').map((line, index) => {
        const trimmedLine = line.trim();

        // Handle bold text like **Title**
        if (trimmedLine.startsWith('**') && trimmedLine.endsWith('**')) {
            return <p key={index} className="font-bold text-white mt-3 mb-1">{trimmedLine.substring(2, trimmedLine.length - 2)}</p>;
        }

        // Handle list items
        if (trimmedLine.startsWith('* ') || trimmedLine.startsWith('- ')) {
            return (
                <div key={index} className="flex items-start">
                    <span className="mr-2 mt-1.5 flex-shrink-0 text-gray-400"> • </span>
                    <span className="text-gray-400">{trimmedLine.substring(2)}</span>
                </div>
            );
        }

        // Handle empty lines as spacers
        if (trimmedLine.length === 0) {
            return <div key={index} className="h-2"></div>;
        }

        // Handle regular text
        return <p key={index} className="text-gray-400">{line}</p>;
    });

    return (
        <div className="text-sm space-y-2">
            {time && (
                <p className="text-gray-500 pb-1">Thought for {time.toFixed(1)}s &gt;</p>
            )}
            <div className="space-y-1">{formattedThought}</div>
        </div>
    );
};


const LeftSidebar: React.FC<LeftSidebarProps> = ({ status, error, onSendPrompt, thought, generationTime }) => {
    const [prompt, setPrompt] = useState('');

    const handleSend = () => {
        if (prompt.trim() && (status === 'idle' || status === 'done' || status === 'error')) {
            onSendPrompt(prompt.trim());
            setPrompt('');
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLTextAreaElement>) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const isGenerating = status === 'planning' || status === 'building';

    return (
        <aside className="w-80 bg-[#1c1c1f] flex flex-col border-r border-gray-800 shrink-0">
            <div className="h-14 flex items-center p-4 border-b border-gray-800">
                <BoltIcon className="w-7 h-7 text-white" />
            </div>

            <div className="flex-grow p-4 space-y-4 overflow-y-auto">
                <div className="flex justify-between items-center">
                    <h2 className="font-semibold text-white">Bolt</h2>
                    <button className="text-gray-400 hover:text-white" aria-label="More options">
                        <MoreHorizontalIcon className="w-5 h-5" />
                    </button>
                </div>
                
                {isGenerating && !thought && (
                    <div className="flex items-center space-x-2 mt-2" aria-label="Thinking...">
                        <span className="text-sm text-gray-400">Gemini is thinking...</span>
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse"></span>
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '200ms' }}></span>
                        <span className="w-1.5 h-1.5 bg-gray-500 rounded-full animate-pulse" style={{ animationDelay: '400ms' }}></span>
                    </div>
                )}

                {thought && (
                    <ThoughtDisplay thought={thought} time={status === 'done' ? generationTime : null} />
                )}

                {status === 'error' && error && (
                    <div className="mt-2 p-3 bg-red-900/20 border border-red-800/50 rounded-md">
                        <p className="text-sm font-semibold text-red-400">Error</p>
                        <p className="text-xs text-red-400 mt-1">{error}</p>
                    </div>
                 )}
            </div>

            <div className="p-3 border-t border-gray-800">
                <div className="bg-[#252528] border border-gray-700 rounded-lg p-2">
                    <div className="relative">
                        <textarea
                            placeholder="How can Bolt help you today? (or /command)"
                            className="w-full bg-transparent pr-10 resize-none focus:outline-none text-sm placeholder-gray-500 text-gray-200 disabled:opacity-50"
                            rows={3}
                            value={prompt}
                            onChange={(e) => setPrompt(e.target.value)}
                            onKeyDown={handleKeyDown}
                            disabled={isGenerating}
                        ></textarea>
                        <button
                            onClick={handleSend}
                            className="absolute top-2 right-1 bg-blue-600 text-white w-7 h-7 rounded-lg flex items-center justify-center hover:bg-blue-500 transition-colors disabled:bg-gray-500 disabled:cursor-not-allowed"
                            aria-label="Send message"
                            disabled={isGenerating || !prompt.trim()}
                        >
                            <SendIcon className="w-4 h-4" />
                        </button>
                    </div>
                    <div className="flex items-center mt-2 space-x-2">
                        <button className="w-6 h-6 rounded-full bg-indigo-500 flex items-center justify-center text-sm font-bold text-white" aria-label="User account">M</button>
                        <button className="text-gray-500 hover:text-white transition-colors" aria-label="Attach file"><LinkIcon className="w-5 h-5" /></button>
                        <button className="text-gray-500 hover:text-white transition-colors" aria-label="Add file"><FilePlusIcon className="w-5 h-5" /></button>
                        <button className="text-gray-500 hover:text-white transition-colors" aria-label="Edit command"><EditIcon className="w-5 h-5" /></button>
                    </div>
                </div>
            </div>
        </aside>
    );
};

export default LeftSidebar;