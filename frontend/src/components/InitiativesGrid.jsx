import React, { useState } from 'react';
import { initiatives } from '../mockData';
import { Button } from './ui/button';
import { ExternalLink } from 'lucide-react';

const InitiativeCard = ({ initiative }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-3xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      <div className="relative h-48 md:h-56 overflow-hidden">
        <img 
          src={initiative.image} 
          alt={initiative.name}
          className={`w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
        <div className="absolute bottom-4 left-4">
          <span className="text-white text-xs md:text-sm font-medium bg-white/25 backdrop-blur-sm px-3 py-1.5 rounded-full">
            {initiative.region}
          </span>
        </div>
      </div>
      <div className="p-5 md:p-6">
        <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-3">
          {initiative.name}
        </h3>
        <p className="text-gray-600 text-sm md:text-base leading-relaxed mb-4 line-clamp-3">
          {initiative.description}
        </p>
        <Button 
          className="w-full bg-gradient-to-r from-pink-500 to-purple-600 text-white hover:from-pink-600 hover:to-purple-700 rounded-full py-4 md:py-5 font-semibold transition-all duration-300 flex items-center justify-center space-x-2 text-sm md:text-base"
          onClick={() => alert('Redirecionando para a página da iniciativa...')}
        >
          <span>Conheça a iniciativa</span>
          <ExternalLink className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};

const InitiativesGrid = () => {
  const [showAll, setShowAll] = useState(false);
  const displayedInitiatives = showAll ? initiatives : initiatives.slice(0, 8);

  return (
    <section id="initiatives" className="py-16 md:py-24 bg-white">
      <div className="container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-start md:items-center justify-between mb-10 md:mb-12 space-y-4 md:space-y-0">
          <h2 className="text-3xl md:text-4xl font-bold text-gray-800">Destaques</h2>
          <Button
            onClick={() => setShowAll(!showAll)}
            className="bg-pink-500 text-white hover:bg-pink-600 rounded-full px-6 py-3 font-semibold transition-all duration-300 text-sm md:text-base"
          >
            {showAll ? 'Ver menos' : 'Veja todas as iniciativas'}
          </Button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 md:gap-8">
          {displayedInitiatives.map((initiative) => (
            <InitiativeCard key={initiative.id} initiative={initiative} />
          ))}
        </div>

        {!showAll && (
          <div className="text-center mt-10 md:mt-12">
            <Button
              onClick={() => setShowAll(true)}
              className="bg-gradient-to-r from-blue-500 to-purple-500 text-white hover:from-blue-600 hover:to-purple-600 rounded-full px-8 md:px-10 py-5 md:py-6 text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105"
            >
              Ver mais iniciativas
            </Button>
          </div>
        )}
      </div>
    </section>
  );
};

export default InitiativesGrid;