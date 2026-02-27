import React, { useState } from 'react';
import { ChevronLeft, ChevronRight, MapPin, ArrowLeft, Search } from 'lucide-react';
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
      {/* Header */}
      <header className="bg-white shadow-sm py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <div className="flex items-center justify-between relative">
            {/* Mobile: Globo left | Desktop: Back + Logo */}
            <div className="flex items-center space-x-3">
              {/* Globo icon - mobile only */}
              <img 
                src="https://customer-assets.emergentagent.com/job_8d70a88e-5643-4035-93e8-fcb605f0dda7/artifacts/aclmur09_globinho-branco.png" 
                alt="Globo" 
                className="w-8 h-8 md:hidden invert"
              />
              {/* Back + Logo - desktop only */}
              <button 
                onClick={() => navigate('/')}
                className="hidden md:block text-gray-600 hover:text-gray-800 transition-colors"
              >
                <ArrowLeft className="w-6 h-6" />
              </button>
              <img 
                src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/54mac6cp_logo-horizontal%20%281%29.png" 
                alt="ParaQuemDoar" 
                className="hidden md:block h-16"
              />
            </div>

            {/* Center: ParaQuemDoar - mobile only */}
            <div className="md:hidden absolute left-1/2 transform -translate-x-1/2">
              <img 
                src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/54mac6cp_logo-horizontal%20%281%29.png" 
                alt="ParaQuemDoar" 
                className="h-6"
              />
            </div>

            {/* Desktop: Search bar */}
            <div className="hidden md:flex flex-1 max-w-xl mx-8">
              <div className="relative w-full">
                <input
                  type="text"
                  placeholder="Busca..."
                  className="w-full px-4 py-3 rounded-full border-2 border-blue-300 focus:border-purple-400 focus:outline-none transition-colors"
                />
              </div>
            </div>

            {/* Right: Search on mobile | Globo on desktop */}
            <div className="flex items-center">
              {/* Search icon - mobile */}
              <button className="text-blue-500 p-1 md:hidden">
                <Search className="w-5 h-5" />
              </button>
              {/* Globo - desktop */}
              <div className="hidden md:flex items-center space-x-3">
                <span className="text-sm md:text-base text-gray-700">Iniciativa:</span>
                <img 
                  src="https://customer-assets.emergentagent.com/job_doar-brasil-1/artifacts/xr4t0foz_globo-roxo.png" 
                  alt="Globo" 
                  className="h-10"
                />
              </div>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-12">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 md:gap-12">
          {/* Left Column - Image Carousel */}
          <div className="relative">
            <div className="relative aspect-[4/3] rounded-3xl overflow-hidden shadow-xl">
              <img 
                src={images[currentImageIndex]} 
                alt="HUMUS em acao"
                className="w-full h-full object-cover"
              />
              
              {/* Navigation Arrows */}
              <button
                onClick={prevImage}
                className="absolute left-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-300 shadow-lg"
              >
                <ChevronLeft className="w-5 h-5 md:w-6 md:h-6" />
              </button>
              <button
                onClick={nextImage}
                className="absolute right-4 top-1/2 transform -translate-y-1/2 w-10 h-10 md:w-12 md:h-12 bg-white/80 backdrop-blur-sm rounded-full flex items-center justify-center text-gray-800 hover:bg-white transition-all duration-300 shadow-lg"
              >
                <ChevronRight className="w-5 h-5 md:w-6 md:h-6" />
              </button>

              {/* Dots Indicator */}
              <div className="absolute bottom-4 md:bottom-6 left-1/2 transform -translate-x-1/2 flex space-x-2">
                {images.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentImageIndex(index)}
                    className={`h-2.5 md:h-3 rounded-full transition-all duration-300 ${
                      currentImageIndex === index 
                        ? 'bg-white w-6 md:w-8' 
                        : 'bg-white/50 hover:bg-white/70 w-2.5 md:w-3'
                    }`}
                  />
                ))}
              </div>
            </div>
          </div>

          {/* Right Column - Initiative Info */}
          <div className="space-y-4 max-w-xl">
            {/* Tag */}
            <div className="flex items-center space-x-2 text-gray-600">
              <MapPin className="w-5 h-5" />
              <span className="text-base">Emergências</span>
            </div>

            {/* Title */}
            <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-pink-500 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              HUMUS
            </h1>

            {/* Description */}
            <p className="text-base md:text-lg text-gray-700 leading-relaxed max-w-lg" style={{ fontFamily: "'Nunito', sans-serif" }}>
              A HUMUS atua na prevenção em comunidades em áreas de risco e, durante desastres, oferece resposta emergencial. Estamos atuando em Juiz de Fora, MG, para apoiar quem precisa.
            </p>

            {/* Donation Button */}
            <div className="py-4">
              <Button 
                className="w-full bg-transparent text-pink-500 border-2 border-pink-500 hover:bg-pink-50 rounded-full px-12 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105"
                onClick={() => navigate('/doacao/valor')}
              >
                Fazer doação
              </Button>
            </div>

            {/* Info Text */}
            <p className="text-sm text-pink-500 leading-relaxed max-w-lg" style={{ fontFamily: "'Nunito', sans-serif" }}>
              * Sua doação será realizada por meio da plataforma parceira ParaQuemDoar. A Globo não retém nenhum valor nem dados pessoais; todo o recurso arrecadado será destinado à assistência à população atingida pela tragédia em Juiz de Fora, MG.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DonationPage;
