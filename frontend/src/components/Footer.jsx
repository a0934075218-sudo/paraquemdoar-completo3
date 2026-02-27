import React from 'react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-orange-500 via-red-500 to-red-600 text-white overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-48 h-64 md:w-64 md:h-80 rounded-full bg-white opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-64 h-80 md:w-80 md:h-96 rounded-full bg-yellow-300 opacity-15 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-32 h-48 md:w-48 md:h-64 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-20"></div>
      <div className="absolute bottom-20 right-1/3 w-40 h-56 md:w-56 md:h-72 rounded-full bg-gradient-to-br from-green-300 to-teal-400 opacity-15"></div>
      
      <div className="container mx-auto px-4 md:px-6 py-12 md:py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12 mb-8 md:mb-12">
          {/* Column 1 - Globo */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4">Um projeto</h3>
            <div className="flex items-center space-x-2">
              <div className="w-10 h-10 md:w-12 md:h-12 rounded-full bg-white flex items-center justify-center">
                <div className="w-6 h-6 md:w-8 md:h-8 rounded-full bg-orange-500"></div>
              </div>
              <span className="text-xl md:text-2xl font-bold">globo</span>
            </div>
          </div>

          {/* Column 2 - Benfeitoria */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4">Realização</h3>
            <div className="text-xl md:text-2xl font-bold tracking-wide">benfeitoria</div>
          </div>

          {/* Column 3 - Links */}
          <div>
            <h3 className="text-base md:text-lg font-semibold mb-4">Início</h3>
            <ul className="space-y-2 text-sm md:text-base">
              <li>
                <a href="#" className="hover:underline transition-all duration-300">Sobre</a>
              </li>
              <li>
                <a href="#" className="hover:underline transition-all duration-300">Parcerias</a>
              </li>
              <li>
                <a href="#" className="hover:underline transition-all duration-300">Encontre uma iniciativa</a>
              </li>
              <li>
                <a href="#" className="hover:underline transition-all duration-300">Blog</a>
              </li>
              <li>
                <a href="#" className="hover:underline transition-all duration-300">FAQ</a>
              </li>
              <li>
                <a href="#" className="hover:underline transition-all duration-300">Termos de uso</a>
              </li>
            </ul>
          </div>
        </div>

        {/* CTA Button */}
        <div className="flex justify-center md:justify-end mb-8 md:mb-0">
          <Button
            className="bg-white text-orange-500 hover:bg-orange-50 rounded-full px-6 md:px-8 py-5 md:py-6 text-base md:text-lg font-semibold transition-all duration-300 hover:scale-105 border-2 border-white shadow-lg"
            onClick={() => alert('Indicar uma iniciativa')}
          >
            Indicar uma iniciativa
          </Button>
        </div>

        {/* Copyright */}
        <div className="mt-8 md:mt-12 pt-6 md:pt-8 border-t border-white/20 text-center text-xs md:text-sm opacity-80">
          <p>© {new Date().getFullYear()} Para Quem Doar. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;