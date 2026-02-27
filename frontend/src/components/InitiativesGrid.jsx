import React, { useState } from 'react';
import { initiatives } from '../mockData';
import { Button } from './ui/button';
import { ChevronLeft, ChevronRight, MapPin } from 'lucide-react';

const InitiativeCard = ({ initiative }) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="bg-white rounded-2xl overflow-hidden shadow-md hover:shadow-xl transition-all duration-300 cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
    >
      {/* Image - Square aspect ratio */}
      <div className="relative w-full" style={{ paddingBottom: '100%' }}>
        <img 
          src={initiative.image} 
          alt={initiative.name}
          className={`absolute inset-0 w-full h-full object-cover transition-transform duration-500 ${
            isHovered ? 'scale-110' : 'scale-100'
          }`}
        />
      </div>

      <div className="p-6">
        {/* Location */}
        <div className="flex items-center text-gray-600 text-sm mb-3">
          <MapPin className="w-4 h-4 mr-1" />
          <span>{initiative.region}</span>
        </div>

        {/* Title */}
        <h3 className="text-xl font-bold text-pink-500 mb-3">
          {initiative.name}
        </h3>

        {/* Description */}
        <p className="text-gray-700 leading-relaxed mb-4 line-clamp-3 text-sm">
          {initiative.description}
        </p>

        {/* Button */}
        <Button 
          className="w-full bg-transparent text-pink-500 border-2 border-pink-500 hover:bg-pink-50 rounded-full py-4 font-semibold transition-all duration-300"
          onClick={() => alert('Redirecionando para a página da iniciativa...')}
        >
          Conheça a iniciativa
        </Button>
      </div>
    </div>
  );
};

const InitiativesGrid = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 4;

  const nextSlide = () => {
    if (currentIndex + itemsPerView < initiatives.length) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const prevSlide = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const visibleInitiatives = initiatives.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section id="initiatives" className="py-16 md:py-20 bg-gray-50">
      <div className="container mx-auto px-4 md:px-6">
        {/* Header */}
        <div className="flex items-end justify-between mb-10">
          <div>
            <h2 className="text-5xl md:text-6xl font-bold text-pink-500 mb-2">Destaques</h2>
            <p className="text-gray-600 text-lg">Veja todas as iniciativas</p>
          </div>

          {/* Navigation Arrows */}
          <div className="flex space-x-3">
            <button
              onClick={prevSlide}
              disabled={currentIndex === 0}
              className="w-12 h-12 rounded-full border-2 border-pink-500 text-pink-500 flex items-center justify-center hover:bg-pink-50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronLeft className="w-6 h-6" />
            </button>
            <button
              onClick={nextSlide}
              disabled={currentIndex + itemsPerView >= initiatives.length}
              className="w-12 h-12 rounded-full border-2 border-pink-500 text-pink-500 flex items-center justify-center hover:bg-pink-50 transition-all duration-300 disabled:opacity-30 disabled:cursor-not-allowed"
            >
              <ChevronRight className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {visibleInitiatives.map((initiative) => (
            <InitiativeCard key={initiative.id} initiative={initiative} />
          ))}
        </div>
      </div>
    </section>
  );
};

export default InitiativesGrid;