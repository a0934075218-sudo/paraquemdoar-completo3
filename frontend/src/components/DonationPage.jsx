import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ArrowLeft } from 'lucide-react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';

const DonationPage = () => {
  const navigate = useNavigate();
  const [currentImageIndex, setCurrentImageIndex] = useState(0);
  
  const images = [
    'https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/hp1bs1oi_desastre-em-juiz-de-fora.jpg.webp',
    'https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/50dt1aei_3.jpg',
    'https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/64kfg5us_2.jpg',
    'https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/1wf5mua3_image.png',
    'https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/h1tzga7g_57945240-125e-11f1-9120-a910fc22c6ac.jpg.webp'
  ];

  const nextImage = () => {
    setCurrentImageIndex((prev) => (prev + 1) % images.length);
  };

  const prevImage = () => {
    setCurrentImageIndex((prev) => (prev - 1 + images.length) % images.length);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Branco */}
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between">
            {/* Back Button + Logo Colorida */}
            <div className="flex items-center space-x-4">
              <button 
                onClick={() => navigate('/')}
                className="text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <img 
                src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/54mac6cp_logo-horizontal%20%281%29.png" 
                alt="ParaQuemDoar" 
                className="h-12 md:h-16"
              />
            </div>

            {/* Search Bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Busca..."
                  className="w-full px-4 py-3 rounded-full border-2 border-blue-300 focus:border-purple-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Logo Globo Roxa */}
            <div className="flex items-center space-x-2 md:space-x-3">
              <span className="hidden md:block text-sm md:text-base text-gray-700">Iniciativa:</span>
              <img 
                src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/xr4t0foz_globo-roxo.png" 
                alt="Globo" 
                className="h-8 md:h-10"
              />
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
          {/* Left Column - Image Carousel */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <img 
                src={images[currentImageIndex]} 
                alt="HUMUS em ação"
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-300 shadow-lg"
              >
                <ChevronLeft className="w-6 h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-300 shadow-lg"
              >
                <ChevronRight className="w-6 h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-3 rounded-full transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'bg-white w-8' 
                        : 'bg-white/50 hover:bg-white/70 w-3'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Initiative Info */}
          <div className="space-y-6">
            {/* Tag Emergências */}
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span className="text-base">Emergências</span>
            </div>

            {/* Title */}
            <h1 className="text-6xl md:text-7xl font-bold text-pink-500" style={{ fontFamily: "'Nunito', sans-serif" }}>
              HUMUS
            </h1>

            {/* Description */}
            <p className="text-lg text-gray-700 leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
              A HUMUS atua na prevenção em comunidades situadas em áreas de risco iminente e, em situações de desastre, realiza resposta emergencial diante de eventos naturais extremos. Atualmente, acompanhamos com urgência a situação em Juiz de Fora, MG.
            </p>

            {/* Donation Button */}
            <Button 
              className="w-full md:w-auto bg-transparent text-pink-500 border-2 border-pink-500 hover:bg-pink-50 rounded-full px-12 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
              onClick={() => window.open('https://benfeitoria.com', '_blank')}
            >
              Fazer doação
            </Button>

            {/* Info Text - Simplified */}
            <div className="mt-6">
              <p className="text-sm text-pink-500 leading-relaxed">
                * Sua doação será realizada por meio da plataforma parceira ParaQuemDoar. A Globo não retém nenhum valor nem dados pessoais; todo o recurso arrecadado será destinado à assistência à população atingida pela tragédia em Juiz de Fora, MG.
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;