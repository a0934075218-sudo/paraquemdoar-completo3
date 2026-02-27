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
    <div className="relative h-screen overflow-hidden">
      {/* Gradient Background */}
      <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} transition-all duration-1000`}>
        {/* Decorative Circles */}
        <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-pink-600 opacity-40 blur-3xl animate-pulse"></div>
        <div className="absolute top-32 right-32 w-96 h-96 rounded-full bg-blue-400 opacity-30 blur-3xl animate-pulse" style={{ animationDelay: '1s' }}></div>
        <div className="absolute bottom-20 left-1/4 w-48 h-48 rounded-full bg-purple-500 opacity-35 blur-2xl animate-pulse" style={{ animationDelay: '2s' }}></div>
        <div className="absolute bottom-40 right-20 w-72 h-72 rounded-full bg-red-400 opacity-25 blur-3xl animate-pulse" style={{ animationDelay: '3s' }}></div>
        
        {/* Small decorative circles */}
        <div className="absolute top-1/4 left-1/3 w-24 h-32 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 opacity-60"></div>
        <div className="absolute top-1/2 left-20 w-16 h-24 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 opacity-70"></div>
        <div className="absolute bottom-32 right-1/4 w-20 h-28 rounded-full bg-gradient-to-br from-green-300 to-teal-400 opacity-65"></div>
        <div className="absolute top-40 right-40 w-12 h-16 rounded-full bg-white opacity-80"></div>
        <div className="absolute bottom-1/4 left-1/2 w-14 h-20 rounded-full bg-gradient-to-br from-purple-300 to-pink-400 opacity-60"></div>
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-6">
        <div className="flex items-center justify-between h-full">
          {/* Left Content */}
          <div className="w-1/2 text-white space-y-6 animate-fade-in">
            <h1 className="text-5xl font-bold leading-tight">
              {slide.title}
            </h1>
            <p className="text-xl leading-relaxed opacity-95">
              {slide.description}
            </p>
            {slide.subtitle && (
              <div className="mt-6">
                <h3 className="text-2xl font-semibold mb-2">{slide.subtitle}</h3>
                <p className="text-lg opacity-90">{slide.subtitleDesc}</p>
              </div>
            )}
            <Button 
              className="mt-8 bg-white text-pink-600 hover:bg-pink-50 rounded-full px-8 py-6 text-lg font-semibold shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => window.open(slide.buttonLink, '_blank')}
            >
              {slide.buttonText}
            </Button>
          </div>

          {/* Right Image */}
          <div className="w-1/2 flex justify-end items-center">
            <div className="relative">
              <div className="w-[500px] h-[500px] rounded-full overflow-hidden shadow-2xl border-8 border-white/20 backdrop-blur-sm animate-float">
                <img 
                  src={slide.image} 
                  alt={slide.title}
                  className="w-full h-full object-cover"
                />
              </div>
              {/* Small decorative circles around image */}
              <div className="absolute -bottom-10 -left-10 w-24 h-24 rounded-full bg-pink-500 opacity-80"></div>
              <div className="absolute -top-5 -right-5 w-16 h-16 rounded-full bg-blue-400 opacity-70"></div>
            </div>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300 z-10"
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/30 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-white/50 transition-all duration-300 z-10"
      >
        <ChevronRight className="w-6 h-6" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-3 z-10">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              currentSlide === index 
                ? 'bg-white w-8' 
                : 'bg-white/50 hover:bg-white/70'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;