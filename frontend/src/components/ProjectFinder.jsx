import React, { useState } from 'react';
import { Button } from './ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from './ui/select';
import { themes, regions } from '../mockData';
import { ArrowRight } from 'lucide-react';

const ProjectFinder = () => {
  const [selectedTheme, setSelectedTheme] = useState('');
  const [selectedRegion, setSelectedRegion] = useState('');
  const [showResults, setShowResults] = useState(false);

  const handleSearch = () => {
    if (selectedTheme && selectedRegion) {
      setShowResults(true);
      // Scroll to initiatives section
      setTimeout(() => {
        document.getElementById('initiatives')?.scrollIntoView({ behavior: 'smooth' });
      }, 300);
    }
  };

  return (
    <section className="relative py-20 bg-gradient-to-br from-gray-50 to-white overflow-hidden">
      {/* Decorative elements */}
      <div className="absolute top-10 right-10 w-64 h-64 rounded-full bg-gradient-to-br from-blue-400 to-purple-500 opacity-20 blur-3xl"></div>
      <div className="absolute bottom-20 left-20 w-80 h-80 rounded-full bg-gradient-to-br from-pink-400 to-orange-400 opacity-15 blur-3xl"></div>
      <div className="absolute top-1/3 right-1/4 w-48 h-64 rounded-full bg-gradient-to-br from-yellow-300 to-green-400 opacity-25"></div>
      <div className="absolute bottom-1/4 right-10 w-72 h-96 rounded-full bg-gradient-to-br from-red-400 to-pink-500 opacity-20"></div>
      
      <div className="container mx-auto px-6 relative z-10">
        <div className="max-w-3xl">
          <h2 className="text-5xl font-bold mb-4">
            <span className="text-pink-500">Quer encontrar projetos</span>
            <br />
            <span className="text-pink-500">com a sua cara?</span>
          </h2>
          <p className="text-gray-600 text-lg mb-12">
            Descubra em 2 perguntas quais iniciativas combinam mais com você:
          </p>

          <div className="space-y-8">
            {/* Question 1 */}
            <div className="space-y-3">
              <label className="text-lg font-semibold text-gray-700">
                1. Quais temas mexem com você?
              </label>
              <Select onValueChange={setSelectedTheme} value={selectedTheme}>
                <SelectTrigger className="w-full h-14 text-base border-2 border-gray-300 hover:border-pink-400 transition-colors">
                  <SelectValue placeholder="Selecione um tema" />
                </SelectTrigger>
                <SelectContent>
                  {themes.map((theme) => (
                    <SelectItem key={theme} value={theme} className="text-base">
                      {theme}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Question 2 */}
            <div className="space-y-3">
              <label className="text-lg font-semibold text-gray-700">
                2. Gostaria de apoiar iniciativas de qual região?
              </label>
              <Select onValueChange={setSelectedRegion} value={selectedRegion}>
                <SelectTrigger className="w-full h-14 text-base border-2 border-gray-300 hover:border-pink-400 transition-colors">
                  <SelectValue placeholder="Selecione uma região" />
                </SelectTrigger>
                <SelectContent>
                  {regions.map((region) => (
                    <SelectItem key={region} value={region} className="text-base">
                      {region}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>

            {/* Search Button */}
            <Button
              onClick={handleSearch}
              disabled={!selectedTheme || !selectedRegion}
              className="bg-white text-pink-500 border-2 border-pink-500 hover:bg-pink-50 rounded-full px-8 py-6 text-base font-semibold transition-all duration-300 hover:scale-105 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center space-x-2"
            >
              <ArrowRight className="w-5 h-5" />
              <span>Encontre sua iniciativa</span>
            </Button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ProjectFinder;