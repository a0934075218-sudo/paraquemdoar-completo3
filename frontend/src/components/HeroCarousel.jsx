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
    <div style={{ position: 'relative', minHeight: '100vh', overflow: 'hidden' }}>
      {/* Background */}
      {slide.backgroundImage ? (
        <div style={{ position: 'absolute', inset: 0 }}>
          <img src={slide.backgroundImage} alt="Background" style={{ width: '100%', height: '100%', objectFit: 'cover' }} />
        </div>
      ) : (
        <div className={`absolute inset-0 bg-gradient-to-r ${slide.gradient} transition-all duration-1000`}>
          <div className="absolute -top-32 -left-40 w-[600px] h-[600px] rounded-full bg-red-500 opacity-60"></div>
          <div className="absolute top-1/4 -right-40 w-[500px] h-[500px] rounded-full bg-purple-600 opacity-50"></div>
          <div className="absolute -bottom-48 -left-48 w-[700px] h-[700px] rounded-full bg-orange-500 opacity-70"></div>
          <div className="absolute bottom-32 right-32 w-[400px] h-[400px] rounded-full bg-pink-600 opacity-45"></div>
          <div className="absolute top-1/2 right-1/4 w-[350px] h-[350px] rounded-full bg-purple-700 opacity-40"></div>
          <div className="absolute top-1/3 right-1/3 w-32 h-40 rounded-full bg-gradient-to-br from-cyan-400 to-blue-500 opacity-70"></div>
          <div className="absolute bottom-1/3 left-1/4 w-24 h-32 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 opacity-75"></div>
          <div className="absolute top-2/3 right-10 w-28 h-36 rounded-full bg-gradient-to-br from-green-300 to-teal-400 opacity-65"></div>
        </div>
      )}

      {/* Content */}
      <div className="relative container mx-auto px-4 md:px-6" style={{ minHeight: '100vh', zIndex: 2 }}>
        <div className="flex flex-col md:flex-row items-center justify-between" style={{ minHeight: '100vh', paddingTop: '128px', paddingBottom: '128px' }}>
          {/* Oval Image */}
          <div className="w-full md:w-6/12 flex justify-center items-center order-2 md:order-1 mb-8 md:mb-0">
            <div className="relative w-full max-w-[400px] md:max-w-[550px]">
              <div className="relative w-full" style={{ paddingBottom: '145%' }}>
                <div className="absolute inset-0 rounded-[50%] overflow-hidden shadow-2xl border-4 md:border-8 border-white/40">
                  <img src={slide.image} alt={slide.title} className="w-full h-full object-cover" />
                </div>
              </div>
            </div>
          </div>

          {/* Text */}
          <div className="w-full md:w-5/12 text-white space-y-4 md:space-y-6 order-1 md:order-2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-light leading-tight tracking-wide">{slide.title}</h1>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light">{slide.description}</p>
            <Button
              className="mt-6 md:mt-8 bg-white text-pink-600 hover:bg-pink-50 rounded-full px-10 md:px-12 py-5 md:py-6 text-base md:text-lg font-normal border-2 border-white shadow-lg transition-all duration-300 hover:scale-105"
              onClick={() => slide.buttonLink.startsWith('/') ? navigate(slide.buttonLink) : window.open(slide.buttonLink, '_blank')}
            >
              {slide.buttonText}
            </Button>
          </div>
        </div>
      </div>

      {/* Left Arrow */}
      <button
        data-testid="hero-prev-btn"
        onClick={prevSlide}
        style={{ position: 'absolute', left: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 50 }}
        className="w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-pink-500 shadow-xl transition-all"
      >
        <ChevronLeft className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      {/* Right Arrow */}
      <button
        data-testid="hero-next-btn"
        onClick={nextSlide}
        style={{ position: 'absolute', right: '24px', top: '50%', transform: 'translateY(-50%)', zIndex: 50 }}
        className="w-12 h-12 md:w-14 md:h-14 bg-white/90 hover:bg-white rounded-full flex items-center justify-center text-pink-500 shadow-xl transition-all"
      >
        <ChevronRight className="w-6 h-6 md:w-7 md:h-7" />
      </button>

      {/* Dots */}
      <div style={{ position: 'absolute', bottom: '32px', left: '50%', transform: 'translateX(-50%)', zIndex: 50 }} className="flex space-x-3">
        {heroSlides.map((_, index) => (
          <button
            key={index}
            data-testid={`hero-dot-${index}`}
            onClick={() => setCurrentSlide(index)}
            style={{ width: currentSlide === index ? '48px' : '16px', height: '16px' }}
            className={`rounded-full transition-all duration-300 shadow-lg ${
              currentSlide === index ? 'bg-white' : 'bg-white/60 hover:bg-white/80'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroCarousel;
