import React from 'react';
import { Button } from './ui/button';

const HeroSection = () => {
  return (
    <div className="relative h-[80vh] max-h-[800px] overflow-hidden">
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
        <div className="flex flex-col md:flex-row items-center justify-center gap-12 h-full py-20 md:py-12">
          {/* Left Image - Larger, no border, closer to text */}
          <div className="hidden md:block order-2 md:order-1">
            <div className="relative w-full max-w-[520px]">
              {/* Circular container - no border */}
              <div className="relative w-full" style={{ paddingBottom: '100%' }}>
                <div className="absolute inset-0 rounded-full overflow-hidden shadow-2xl">
                  <img 
                    src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/2ltjm6aw_Base-para-bolinha-PQD-%2846%29.png" 
                    alt="Emergência climática em MG"
                    className="w-full h-full object-cover"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Right Content - Closer to image */}
          <div className="w-full md:w-auto text-white order-1 md:order-2 text-center md:text-left max-w-2xl">
            {/* Título */}
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '42px' }}>
              Emergência climática
            </h1>
            
            {/* Descrição */}
            <p className="text-2xl md:text-3xl font-light leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, fontSize: '36px', lineHeight: '1.4' }}>
              Conheça e doe para organizações que<br />
              apoiam as vítimas da tragédia em MG
            </p>
            
            <Button 
              className="mt-8 bg-white text-pink-600 hover:bg-pink-50 rounded-full px-12 py-6 text-lg border-2 border-white shadow-lg transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}
              onClick={() => alert('Redirecionando para doação...')}
            >
              Quero Doar
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroSection;