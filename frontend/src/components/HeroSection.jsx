import React from 'react';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <div className="relative h-screen max-h-[900px] overflow-hidden">
      {/* Background Image */}
      <div className="absolute inset-0">
        <img 
          src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/mu01vg4k_Frame-31-%281%29%5B1%5D%5B1%5D%5B1%5D.png" 
          alt="Background"
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="relative h-full container mx-auto px-4 md:px-6">
        <div className="flex flex-col md:flex-row items-center justify-between h-full py-24 md:py-16">
          {/* Left Image - Smaller Circular */}
          <div className="w-full md:w-4/12 flex justify-center items-center order-2 md:order-1 mb-8 md:mb-0">
            <div className="relative w-full max-w-[280px] md:max-w-[380px]">
              {/* Circular container - smaller */}
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
          <div className="w-full md:w-7/12 text-white order-1 md:order-2 text-center md:text-left">
            {/* Título - mais curto */}
            <h1 className="text-5xl md:text-6xl lg:text-7xl font-semibold leading-tight mb-5 md:mb-6" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 600 }}>
              Emergência climática
            </h1>
            
            {/* Descrição - linhas mais largas que o título */}
            <p className="text-lg md:text-xl font-light leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}>
              Conheça e doe para organizações que<br />
              apoiam as vítimas da tragédia em MG
            </p>
            
            <Button 
              className="mt-6 md:mt-8 bg-white text-pink-600 hover:bg-pink-50 rounded-full px-10 md:px-12 py-5 md:py-6 text-base font-light border-2 border-white shadow-lg transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300 }}
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