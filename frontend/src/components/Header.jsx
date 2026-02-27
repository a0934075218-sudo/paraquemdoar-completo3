import React, { useState } from 'react';
import { Search } from 'lucide-react';
import { Input } from './ui/input';

const Header = () => {
  const [searchQuery, setSearchQuery] = useState('');

  return (
    <header className="absolute top-0 left-0 right-0 z-50">
      <div className="container mx-auto px-4 md:px-6 py-4 md:py-6">
        <div className="flex items-center justify-between">
          {/* Mobile: Globo Left | Desktop: Logo Left */}
          <div className="flex items-center">
            {/* Globo icon - mobile only (left) - cropped to show only icon */}
            <div className="md:hidden w-6 h-7 overflow-hidden flex-shrink-0">
              <img 
                src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/y6iwz76t_globo.png" 
                alt="Globo" 
                className="h-7 brightness-0 invert"
              />
            </div>
            {/* ParaQuemDoar logo - desktop only (left) */}
            <img 
              src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/zxsfbrbt_logo-horizontal.png" 
              alt="ParaQuemDoar" 
              className="hidden md:block h-14 brightness-0 invert"
            />
          </div>

          {/* Center: ParaQuemDoar on mobile | Search on desktop */}
          <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
            <img 
              src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/zxsfbrbt_logo-horizontal.png" 
              alt="ParaQuemDoar" 
              className="h-6 brightness-0 invert"
            />
          </div>
          <div className="hidden md:flex flex-1 max-w-xl mx-8">
            <div className="relative w-full">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-orange-400 w-5 h-5" />
              <Input
                type="text"
                placeholder="Busca..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 pr-4 py-3 w-full rounded-full border-2 border-orange-300 bg-white/95 backdrop-blur-sm text-gray-700 placeholder:text-orange-400 focus:border-orange-400 focus:bg-white transition-all"
              />
            </div>
          </div>

          {/* Right: Search on mobile | Globo on desktop */}
          <div className="flex items-center">
            {/* Search icon - mobile */}
            <button className="text-white p-1 md:hidden">
              <Search className="w-5 h-5" />
            </button>
            {/* Globo + label - desktop */}
            <div className="hidden md:flex items-center space-x-3">
              <span className="text-sm md:text-base text-white font-light">Iniciativa:</span>
              <img 
                src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/y6iwz76t_globo.png" 
                alt="Globo" 
                className="h-10 brightness-0 invert"
              />
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;
