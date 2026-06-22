
import React from 'react';
import { LinkIcon, WandIcon, LocationLightbulbIcon, GoogleIcon, FigmaIcon, SendIcon } from './icons';

interface SuggestionPillProps {
  children: React.ReactNode;
  icon?: React.ReactNode;
  isSpecial?: boolean;
}

const SuggestionPill: React.FC<SuggestionPillProps> = ({ children, icon, isSpecial = false }) => {
  const baseClasses = "flex items-center space-x-2 text-sm text-gray-300 bg-[#27272a]/80 backdrop-blur-sm border border-gray-700/60 rounded-full px-4 py-2 hover:bg-gray-700/70 hover:border-gray-600 transition-all duration-200 cursor-pointer";

  if (isSpecial) {
    return (
      <div className="p-[1px] rounded-full bg-gradient-to-r from-purple-500 via-pink-500 to-orange-400">
        <div className={baseClasses + " border-none"}>
          {icon && <span>{icon}</span>}
          <span>{children}</span>
        </div>
      </div>
    );
  }

  return (
    <button className={baseClasses}>
      {icon && <span>{icon}</span>}
      <span>{children}</span>
    </button>
  );
};

interface PromptContainerProps {
  onStart: () => void;
}

const PromptContainer: React.FC<PromptContainerProps> = ({ onStart }) => {
    return (
        <div className="w-full max-w-3xl flex flex-col items-center">
            <h1 className="text-5xl md:text-6xl font-bold text-white tracking-tight leading-tight">
                What do you want to build?
            </h1>
            <p className="mt-4 text-lg md:text-xl text-gray-400 max-w-2xl">
                Prompt, run, edit, and deploy full-stack <span className="text-white">web</span> and <span className="text-white">mobile</span> apps.
            </p>

            <div className="relative mt-8 w-full h-40 bg-[#1a1a1c] border border-gray-700/50 rounded-2xl p-4 flex flex-col justify-between shadow-lg shadow-black/20">
                <textarea
                    placeholder="How can Bolt help you today?"
                    className="w-full h-full bg-transparent text-gray-200 placeholder-gray-500 resize-none focus:outline-none text-base"
                     onKeyDown={(e) => {
                        if (e.key === 'Enter' && !e.shiftKey) {
                            e.preventDefault();
                            onStart();
                        }
                    }}
                />
                <div className="flex items-center justify-between">
                    <div className="flex items-center space-x-3">
                        <button className="text-gray-500 hover:text-white transition-colors" aria-label="Attach link"><LinkIcon className="w-5 h-5" /></button>
                        <button className="text-gray-500 hover:text-white transition-colors" aria-label="Use template"><WandIcon className="w-5 h-5" /></button>
                    </div>
                     <button 
                        onClick={onStart} 
                        className="bg-[#3b82f6] text-white p-2 rounded-lg hover:bg-blue-500 transition-colors" 
                        aria-label="Start building">
                        <SendIcon className="w-5 h-5" />
                    </button>
                </div>
                <div className="absolute top-4 right-4 flex items-center space-x-2">
                    <button className="w-8 h-8 flex items-center justify-center bg-gray-700/50 rounded-full hover:bg-gray-600/70 transition-colors" aria-label="Toggle suggestions">
                        <LocationLightbulbIcon className="w-5 h-5 text-gray-300"/>
                    </button>
                     <button className="w-8 h-8 flex items-center justify-center bg-gray-700/50 rounded-full hover:bg-gray-600/70 transition-colors" aria-label="Use Google Search">
                        <GoogleIcon className="w-4 h-4 text-gray-300"/>
                    </button>
                </div>
            </div>

            <div className="mt-6 flex flex-wrap justify-center gap-3">
                <SuggestionPill icon={<FigmaIcon className="w-4 h-4" />} isSpecial>
                  Import from Figma
                </SuggestionPill>
                <SuggestionPill>Build a mobile app with Expo</SuggestionPill>
                <SuggestionPill>Start a blog with Astro</SuggestionPill>
                <SuggestionPill>Create a docs site with Vitepress</SuggestionPill>
                <SuggestionPill>Scaffold UI with shadcn</SuggestionPill>
                <SuggestionPill>Draft a presentation with Slidev</SuggestionPill>
            </div>
        </div>
    );
}

export default PromptContainer;
