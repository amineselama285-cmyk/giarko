
import React from 'react';
import { LockIcon, IntegrationsIcon, DeployIcon, ChevronDownIcon } from './icons';

const EditorHeader: React.FC = () => {
  return (
    <header className="flex items-center justify-between h-14 px-6 border-b border-gray-800 shrink-0 bg-[#1c1c1f] z-20">
      <div className="flex-1"></div>
      
      <div className="flex-1 flex justify-center">
        <button className="p-2 text-gray-500 hover:text-white transition-colors" aria-label="Project settings">
          <LockIcon className="w-4 h-4" />
        </button>
      </div>

      <div className="flex-1 flex items-center justify-end space-x-4">
        <button className="flex items-center space-x-2 text-sm text-gray-300 px-3 py-1.5 border border-gray-700 bg-[#252528] rounded-md hover:bg-gray-700/50 transition-colors">
          <IntegrationsIcon className="w-4 h-4" />
          <span>Integrations</span>
          <ChevronDownIcon className="w-4 h-4 text-gray-400" />
        </button>
        <button className="flex items-center space-x-2 text-sm bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-500 font-semibold transition-colors">
          <DeployIcon className="w-4 h-4" />
          <span>Deploy</span>
        </button>
      </div>
    </header>
  );
};

export default EditorHeader;
