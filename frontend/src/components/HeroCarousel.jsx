import React, { useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';
import { heroSlides } from '../mockData';
import { useNavigate } from 'react-router-dom';

const HeroCarousel = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isAnimating, setIsAnimating] = useState(false);
  const navigate = useNavigate();

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
      {/* Background - use custom background image if available, otherwise gradient */}
      {slide.backgroundImage ? (
        <div className="absolute inset-0 transition-all duration-1000">
          <img 
            src={slide.backgroundImage} 
            alt="Background"
            className="w-full h-full object-cover"
          />
        </div>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} transition-all duration-1000`}>
          {/* Large Decorative Circles - matching reference positions */}
          <div className="absolute -top-32 -left-40 w-[600px] h-[600px] rounded-full bg-red-500 opacity-60"></div>
          <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-purple-600 opacity-50"></div>
          <div className="absolute -bottom-48 -left-48 w-[700px] h-[700px] rounded-full bg-orange-500 opacity-70"></div>
          <div className="absolute bottom-32 right-32 w-[400px] h-[400px] rounded-full bg-pink-600 opacity-45"></div>
          <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-700 opacity-40"></div>
          
          {/* Small decorative circles */}
          <div className="absolute top-1/3 right-1/3 w-32 h-40 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-70"></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 opacity-75"></div>
          <div className="absolute top-2/3 right-10 w-28 h-36 rounded-full bg-gradient-to-br from-green-300 to-teal-400 opacity-65"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative min-h-screen container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen py-32 md:py-0">
          {/* Left Image - Larger oval */}
          <div className="w-full md:w-6/12 flex justify-center items-center order-2 md:order-1 mb-8 md:mb-0">
            <div className="relative w-full max-w-[400px] md:max-w-[550px]">
              {/* Oval container */}
              <div className="relative w-full" style={{ paddingBottom: '145%' }}>
                <div className="absolute inset-0 rounded-[50%] overflow-hidden shadow-2xl border-4 md:border-8 border-white/40 backdrop-blur-sm">
                  <img 
                    src={slide.image} 
                    alt={slide.title}
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-5/12 text-white space-y-4 md:space-y-6 order-1 md:order-2 text-center md:text-left animate-fade-in">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide">
              {slide.title}
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light">
              {slide.description}
            </p>
            <Button 
              className="mt-6 md:mt-8 bg-white text-pink-600 hover:bg-pink-50 rounded-full px-10 md:px-12 py-5 md:py-6 text-base md:text-lg font-normal border-2 border-white shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => slide.buttonLink.startsWith('/') ? navigate(slide.buttonLink) : window.open(slide.buttonLink, '_blank')}
            >
              {slide.buttonText}
            </Button>
          </div>
        </div>
      </div>

      {/* Navigation Arrows */}
      <button
        onClick={prevSlide}
        className="absolute left-4 md:left-8 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-pink-500 hover:bg-gray-100 transition-all duration-300 z-20 shadow-lg"
      >
        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
      </button>
      <button
        onClick={nextSlide}
        className="absolute right-4 md:right-8 top-1/2 transform -translate-y-1/2 w-12 h-12 md:w-14 md:h-14 bg-white rounded-full flex items-center justify-center text-pink-500 hover:bg-gray-100 transition-all duration-300 z-20 shadow-lg"
      >
        <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      {/* Dots Indicator */}
      <div className="absolute bottom-6 md:bottom-10 left-1/2 transform -translate-x-1/2 flex space-x-3 z-20">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`h-3 md:h-4 rounded-full transition-all duration-300 shadow-md ${
              currentSlide === index 
                ? 'bg-white w-10 md:w-12' 
                : 'bg-white/70 hover:bg-white w-3 md:w-4'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;