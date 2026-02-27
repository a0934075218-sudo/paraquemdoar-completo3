import React, { useState } from 'react';
import { blogPosts } from '../mockData';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { Button } from './ui/button';

const BlogSection = () => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const itemsPerView = 3;

  const nextSlide = () => {
    setCurrentIndex((prev) => 
      prev + itemsPerView >= blogPosts.length ? 0 : prev + itemsPerView
    );
  };

  const prevSlide = () => {
    setCurrentIndex((prev) => 
      prev - itemsPerView < 0 ? Math.max(0, blogPosts.length - itemsPerView) : prev - itemsPerView
    );
  };

  const visiblePosts = blogPosts.slice(currentIndex, currentIndex + itemsPerView);

  return (
    <section className="py-20 bg-gradient-to-br from-gray-50 to-white relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-48 h-64 rounded-full bg-gradient-to-br from-cyan-300 to-blue-400 opacity-30"></div>
      <div className="absolute bottom-20 right-20 w-64 h-80 rounded-full bg-gradient-to-br from-pink-300 to-purple-400 opacity-25"></div>
      <div className="absolute top-1/2 right-10 w-56 h-72 rounded-full bg-gradient-to-br from-yellow-300 to-orange-400 opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="flex items-center justify-between mb-12">
          <h2 className="text-4xl font-bold text-gray-800">
            Para Quem Doar<span className="text-pink-500">Blog</span>
          </h2>
          <Button
            className="bg-pink-500 text-white hover:bg-pink-600 rounded-full px-6 py-3 font-semibold transition-all duration-300"
            onClick={() => alert('Ver todos os artigos')}
          >
            Ler todos os artigos
          </Button>
        </div>

        <div className="relative">
          {/* Navigation Arrows */}
          <button
            onClick={prevSlide}
            className="absolute -left-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-all duration-300 z-10 shadow-lg"
            disabled={currentIndex === 0}
          >
            <ChevronLeft className="w-6 h-6" />
          </button>
          <button
            onClick={nextSlide}
            className="absolute -right-4 top-1/2 transform -translate-y-1/2 w-12 h-12 bg-pink-500 rounded-full flex items-center justify-center text-white hover:bg-pink-600 transition-all duration-300 z-10 shadow-lg"
            disabled={currentIndex + itemsPerView >= blogPosts.length}
          >
            <ChevronRight className="w-6 h-6" />
          </button>

          {/* Blog Cards */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {visiblePosts.map((post) => (
              <div 
                key={post.id}
                className="bg-white rounded-2xl overflow-hidden shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-2 cursor-pointer group"
              >
                <div className="relative h-56 overflow-hidden">
                  <img 
                    src={post.image} 
                    alt={post.title}
                    className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold text-gray-800 mb-3">
                    {post.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed mb-4 line-clamp-3">
                    {post.description}
                  </p>
                  <button 
                    className="text-pink-500 font-semibold hover:text-pink-600 transition-colors duration-300 flex items-center space-x-2"
                    onClick={() => alert('Abrindo artigo...')}
                  >
                    <span>Saiba mais</span>
                    <span>→</span>
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default BlogSection;