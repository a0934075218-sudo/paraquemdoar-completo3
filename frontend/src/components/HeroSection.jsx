import React from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
  const navigate = useNavigate();
  
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
        <div className="flex flex-col md:flex-row items-center justify-center gap-8 md:gap-12 h-full py-20 md:py-16">
          {/* Left Image - visible on all screens */}
          <div className="flex-shrink-0">
            <div className="w-[280px] h-[280px] md:w-[520px] md:h-[520px] rounded-full overflow-hidden shadow-2xl">
              <img 
                src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/2ltjm6aw_Base-para-bolinha-PQD-%2846%29.png" 
                alt="Emergencia climatica em MG"
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Right Content */}
          <div className="text-white text-center md:text-left max-w-2xl">
            <h1 className="text-3xl md:text-4xl font-bold leading-tight mb-4" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700, fontSize: '42px' }}>
              Emergência climática
            </h1>
            
            <p className="text-2xl md:text-3xl font-light leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 300, fontSize: '36px', lineHeight: '1.4' }}>
              Conheça e doe para organizações que<br />
              apoiam as vítimas da tragédia em MG
            </p>
            
            <Button 
              className="mt-8 bg-white text-pink-600 hover:bg-pink-50 rounded-full px-12 py-6 text-lg border-2 border-white shadow-lg transition-all duration-300 hover:scale-105"
              style={{ fontFamily: "'Nunito', sans-serif", fontWeight: 700 }}
              onClick={() => navigate('/doacao')}
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