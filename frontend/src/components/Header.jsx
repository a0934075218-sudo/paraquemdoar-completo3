import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-white shadow-sm">
      <div className="container mx-auto px-6 py-4">
        <div className="flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center space-x-2">
            <svg width="40" height="40" viewBox="0 0 40 40" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="12" cy="12" r="8" stroke="#7B3FF2" strokeWidth="2" fill="none"/>
              <path d="M25 10c3.866 0 7 3.134 7 7 0 5-4 9-9 13-5-4-9-8-9-13 0-3.866 3.134-7 7-7 1.426 0 2.752.426 3.857 1.157.322.213.622.45.9.708.278-.259.578-.495.9-.708C27.248 10.426 28.574 10 30 10z" fill="#E91E63"/>
            </svg>
            <div>
              <div className="text-xl font-bold">
                <span className="text-blue-600">Para</span>
                <span className="text-pink-500">Quem</span>
                <span className="text-red-500">Doar</span>
              </div>
            </div>
          </div>

          {/* Search Bar */}
          <div className="flex-1 max-w-md mx-8">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Busca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10 pr-4 py-2 w-full rounded-full border-2 border-blue-200 focus:border-pink-400 transition-colors"
              />
            </div>
          </div>

          {/* Globo Logo */}
          <div className="flex items-center space-x-3">
            <span className="text-sm text-gray-600">Iniciativa:</span>
            <svg width="80" height="32" viewBox="0 0 80 32" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="16" cy="16" r="12" fill="#1a1a1a"/>
              <circle cx="16" cy="16" r="8" fill="white"/>
              <text x="35" y="22" fontFamily="Arial, sans-serif" fontSize="18" fontWeight="bold" fill="#1a1a1a">globo</text>
            </svg>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;