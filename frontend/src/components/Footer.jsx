import React from 'react';
import { Button } from './ui/button';

const Footer = () => {
  return (
    <footer className="relative bg-gradient-to-r from-orange-500 via-orange-600 to-red-500 text-white overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-64 h-64 rounded-full bg-white opacity-10 blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-80 h-80 rounded-full bg-yellow-300 opacity-15 blur-3xl"></div>
      <div className="absolute top-1/2 left-1/4 w-48 h-64 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-20"></div>
      <div className="absolute bottom-20 right-1/3 w-56 h-72 rounded-full bg-gradient-to-br from-green-300 to-teal-400 opacity-15"></div>
      
      <div className="container mx-auto px-6 py-16 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-12 mb-12">
          {/* Column 1 - Globo */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Um projeto</h3>
            <svg width="120" height="48" viewBox="0 0 120 48" fill="none" xmlns="http://www.w3.org/2000/svg">
              <circle cx="24" cy="24" r="18" fill="white"/>
              <circle cx="24" cy="24" r="12" fill="#FF6B35"/>
              <text x="52" y="32" fontFamily="Arial, sans-serif" fontSize="24" fontWeight="bold" fill="white">globo</text>
            </svg>
          </div>

          {/* Column 2 - Benfeitoria */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Realização</h3>
            <div className="text-2xl font-bold">benfeitoria</div>
          </div>

          {/* Column 3 - Links */}
          <div>
            <h3 className="text-lg font-semibold mb-4">Início</h3>
            <ul className="space-y-2">
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
        <div className="flex justify-end">
          <Button
            className="bg-white text-orange-500 hover:bg-orange-50 rounded-full px-8 py-6 text-lg font-semibold transition-all duration-300 hover:scale-105 border-2 border-white"
            onClick={() => alert('Indicar uma iniciativa')}
          >
            Indicar uma iniciativa
          </Button>
        </div>

        {/* Copyright */}
        <div className="mt-12 pt-8 border-t border-white/20 text-center text-sm opacity-80">
          <p>© {new Date().getFullYear()} Para Quem Doar. Todos os direitos reservados.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer;