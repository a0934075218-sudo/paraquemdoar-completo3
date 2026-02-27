import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-pink-500 via-orange-400 to-orange-500 shadow-md">
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Logo ParaQuemDoar - Left */}
          <div className="flex items-center">
            <img 
              src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/zxsfbrbt_logo-horizontal.png" 
              alt="ParaQuemDoar" 
              className="h-12 md:h-16 brightness-0 invert"
            />
          </div>

          {/* Search Bar - Center */}
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Busca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full rounded-full border-2 border-white bg-white/90 backdrop-blur-sm text-gray-700 placeholder:text-orange-400 focus:border-white focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Search Icon - Mobile */}
          <div className="md:hidden">
            <button className="text-white p-2">
              <Search className="w-6 h-6" />
            </button>
          </div>

          {/* Globo Logo - Right */}
          <div className="flex items-center space-x-2 md:space-x-3">
            <span className="hidden md:block text-sm md:text-base text-white font-light">Iniciativa:</span>
            <img 
              src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/y6iwz76t_globo.png" 
              alt="Globo" 
              className="h-8 md:h-10 brightness-0 invert"
            />
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;