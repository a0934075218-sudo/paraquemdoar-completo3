import React from 'react';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <div className="relative min-h-screen overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/mu01vg4k_Frame-31-%281%29%5B1%5D%5B1%5D%5B1%5D.png" 
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative min-h-screen container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between min-h-screen py-32 md:py-0">
          {/* Left Image - Circular */}
          <div className="w-full md:w-5/12 flex justify-center items-center order-2 md:order-1 mb-8 md:mb-0">
            <div className="relative w-full max-w-[350px] md:max-w-[500px]">
              {/* Circular container */}
              <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl border-4 md:border-6 border-white/30">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/30bb6cu7_imagem-%284%29.png" 
                    alt="Emergência climática em MG"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content */}
          <div className="w-full md:w-6/12 text-white space-y-4 md:space-y-6 order-1 md:order-2 text-center md:text-left">
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-extralight leading-tight tracking-wide" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 200 }}>
              Emergência climática
            </h1>
            <p className="text-lg md:text-xl lg:text-2xl leading-relaxed font-light" style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 300 }}>
              Conheça e doe para organizações que apoiam as vítimas da tragédia em MG
            </p>
            <Button 
              className="mt-6 md:mt-8 bg-white text-pink-600 hover:bg-pink-50 rounded-full px-10 md:px-12 py-5 md:py-6 text-base md:text-lg font-light border-2 border-white shadow-lg transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "'Barlow Condensed', sans-serif", fontWeight: 300 }}
              onClick={() => alert('Redirecionando para doação...')}
            >
              quero doar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;