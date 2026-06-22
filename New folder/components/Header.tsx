
import React from 'react';
import { XIcon, LinkedInIcon, DiscordIcon } from './icons';

const Header: React.FC = () => {
  return (
    <header className="flex items-center justify-between py-5">
      <div className="text-2xl font-bold text-white">
        bolt
      </div>
      <nav className="flex items-center space-x-6">
        <div className="hidden sm:flex items-center space-x-6">
            <a href="#" aria-label="X" className="text-gray-400 hover:text-white transition-colors">
                <XIcon className="w-5 h-5" />
            </a>
            <a href="#" aria-label="LinkedIn" className="text-gray-400 hover:text-white transition-colors">
                <LinkedInIcon className="w-5 h-5" />
            </a>
            <a href="#" aria-label="Discord" className="text-gray-400 hover:text-white transition-colors">
                <DiscordIcon className="w-5 h-5" />
            </a>
        </div>
        <div className="hidden sm:block h-6 w-px bg-gray-700"></div>
        <div className="flex items-center space-x-4">
            <a href="#" className="text-gray-300 hover:text-white transition-colors text-sm font-medium">
                Sign In
            </a>
            <a href="#" className="bg-[#3b82f6] text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-blue-500 transition-colors">
                Get Started
            </a>
        </div>
      </nav>
    </header>
  );
};

export default Header;
