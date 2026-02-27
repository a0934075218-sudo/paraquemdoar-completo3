import React, { useState } from 'react';
import { Search, Menu } from 'lucide-react';
import { Input } from './ui/input';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500 to-orange-400 md:bg-white shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-3 md:py-4">
        <div className="flex items-center justify-between">
          {/* Mobile Logo - Globo Circle */}
          <div className="md:hidden flex items-center">
            <div className="w-12 h-12 rounded-full bg-white flex items-center justify-center">
              <div className="w-8 h-8 rounded-full bg-pink-500"></div>
            </div>
          </div>

          {/* Desktop Logo */}
          <div className="hidden md:flex items-center space-x-3">
            <svg width="50" height="50" viewBox="0 0 50 50" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="15" cy="15" r="10" stroke="#E91E63" strokeWidth="2.5" fill="none"/>
              <path d="M30 12c4.5 0 8 3.5 8 8 0 6-5 10-11 15-6-5-11-9-11-15 0-4.5 3.5-8 8-8 1.7 0 3.3.5 4.6 1.4.4.3.7.6 1 1 .3-.4.6-.7 1-1C26.7 12.5 28.3 12 30 12z" fill="#E91E63"/>
            </svg>
            <div>
              <div className="text-2xl font-light tracking-tight">
                <span className="text-pink-500">Para</span>
                <span className="text-purple-500">Quem</span>
                <span className="text-pink-500">Doar</span>
              </div>
            </div>
          </div>

          {/* Mobile Title */}
          <div className="md:hidden flex-1 text-center">
            <h1 className="text-white text-xl font-light tracking-wide">ParaQuemDoar</h1>
          </div>

          {/* Search Bar - Desktop */}
          <div className="hidden md:flex flex-1 max-w-md mx-8">
            <div className="relative w-full">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Busca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-orange-300 focus:border-pink-400 transition-colors"
              />
            </div>
          </div>

          {/* Search Icon - Mobile */}
          <div className="md:hidden">
            <button className="text-white p-2">
              <Search className="w-6 h-6" />
            </button>
          </div>

          {/* Globo Logo - Desktop */}
          <div className="hidden md:flex items-center space-x-3">
            <span className="text-sm text-gray-600">Iniciativa:</span>
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 rounded-full bg-gray-800 flex items-center justify-center">
                <div className="w-5 h-5 rounded-full bg-white"></div>
              </div>
              <span className="text-xl font-bold text-gray-800">globo</span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;