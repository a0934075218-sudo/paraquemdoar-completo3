import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { heroSlides } from '../mockData';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);

  useEffect(() => {
    const timer = setInterval(() => {
      nextSlide();
    }, 6000);
    return () => clearInterval(timer);
  }, [currentSlide]);

  const nextSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev + 1) % heroSlides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const prevSlide = () => {
    if (!isAnimating) {
      setIsAnimating(true);
      setCurrentSlide((prev) => (prev - 1 + heroSlides.length) % heroSlides.length);
      setTimeout(() => setIsAnimating(false), 500);
    }
  };

  const slide = heroSlides[currentSlide];

  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-br ${slide.gradient} transition-all duration-1000`}>
        {/* Large Decorative Circles - More prominent */}
        <div className="absolute -top-20 -left-20 w-96 h-96 rounded-full bg-pink-600 opacity-50"></div>
        <div className="absolute top-1/4 -right-32 w-[500px] h-[500px] rounded-full bg-purple-600 opacity-40"></div>
        <div className="absolute -bottom-40 -left-32 w-[600px] h-[600px] rounded-full bg-orange-500 opacity-45"></div>
        <div className="absolute bottom-20 right-20 w-80 h-80 rounded-full bg-blue-400 opacity-35"></div>
        
        {/* Small decorative circles */}
        <div className="absolute top-1/3 left-1/4 w-32 h-40 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-70"></div>
        <div className="absolute bottom-1/3 right-1/3 w-24 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 opacity-75"></div>
        <div className="absolute top-2/3 left-10 w-28 h-36 rounded-full bg-gradient-to-br from-green-300 to-teal-400 opacity-65"></div>
        <div className="absolute top-1/4 right-1/4 w-20 h-24 rounded-full bg-white opacity-80"></div>
        <div className="absolute bottom-1/4 left-1/2 w-16 h-20 rounded-full bg-purple-400 opacity-70"></div>
        <div className="absolute top-1/2 right-10 w-36 h-44 rounded-full bg-gradient-to-br from-pink-400 to-red-500 opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative min-h-screen container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen py-24 md:py-0">
          {/* Left Content - Mobile top, Desktop left */}
          <div className="w-full md:w-5/12 text-white space-y-4 md:space-y-6 mb-8 md:mb-0 text-center md:text-left animate-fade-in">
            <h1 className="text-4xl md:text-6xl font-bold leading-tight">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl leading-relaxed opacity-95">
              {slide.description}
            </p>
            {slide.subtitle && (
              <div className="mt-4 md:mt-6">
                <h3 className="text-xl md:text-2xl font-semibold mb-2">{slide.subtitle}</h3>
                <p className="text-base md:text-lg opacity-90">{slide.subtitleDesc}</p>
              </div>
            )}
            <Button 
              className="mt-6 md:mt-8 bg-white text-pink-600 hover:bg-pink-50 rounded-full px-8 md:px-10 py-5 md:py-6 text-base md:text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105 border-2 border-white"
              onClick={() => window.open(slide.buttonLink, '_blank')}
            >
              {slide.buttonText}
            </Button>
          </div>

          {/* Right Image - Larger oval shape */}
          <div className="w-full md:w-6/12 flex justify-center items-center">
            <div className="relative w-full max-w-[500px] md:max-w-[650px]">
              {/* Oval container with proper aspect ratio */}
              <div className="relative w-full" style={{ paddingBottom: '140%' }}>
                <div className="absolute inset-0 rounded-[50%] overflow-hidden shadow-2xl border-4 md:border-8 border-white/30 backdrop-blur-sm">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
              
              {/* Decorative circles around image - matching original */}
              <div className="absolute -bottom-8 -left-8 md:-bottom-12 md:-left-12 w-20 h-20 md:w-32 md:h-32 rounded-full bg-pink-500 opacity-80"></div>
              <div className="absolute -top-4 -right-4 md:-top-6 md:-right-6 w-16 h-16 md:w-24 md:h-24 rounded-full bg-blue-400 opacity-70"></div>
              <div className="absolute top-1/4 -right-6 md:-right-10 w-14 h-14 md:w-20 md:h-20 rounded-full bg-gradient-to-br from-teal-300 to-cyan-400 opacity-75"></div>
              <div className="absolute bottom-1/3 -left-6 md:-left-10 w-12 h-12 md:w-16 md:h-16 rounded-full bg-purple-500 opacity-70"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300 z-10"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300 z-10"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70 w-3'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;