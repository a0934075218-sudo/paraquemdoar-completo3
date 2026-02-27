import React, { useState } from 'react';
import { Button } from './ui/button';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft } from 'lucide-react';

const DonationValuePage = () => {
  const navigate = useNavigate();
  const [selectedValue, setSelectedValue] = useState(50);
  const [customValue, setCustomValue] = useState('');
  const [isCustom, setIsCustom] = useState(false);
  const [error, setError] = useState('');

  const predefinedValues = [10, 30, 50, 100];

  const handlePredefinedClick = (value) => {
    setSelectedValue(value);
    setIsCustom(false);
    setCustomValue('');
    setError('');
  };

  const handleCustomValueChange = (e) => {
    const value = e.target.value;
    setCustomValue(value);
    setIsCustom(true);
    setError('');
    
    const numValue = parseFloat(value);
    if (value && numValue < 10) {
      setError('Valor mínimo é R$ 10,00');
    }
  };

  const handleContinue = () => {
    const finalValue = isCustom ? parseFloat(customValue) : selectedValue;
    
    if (isCustom && (!customValue || finalValue < 10)) {
      setError('Por favor, insira um valor mínimo de R$ 10,00');
      return;
    }
    
    // Aqui você pode redirecionar para a próxima etapa ou processar a doação
    alert(`Valor selecionado: R$ ${finalValue.toFixed(2)}`);
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header Simples */}
      <header className="bg-white shadow-sm py-6">
        <div className="container mx-auto px-4 md:px-6">
          <button 
            onClick={() => navigate('/doacao')}
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-16">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <h1 className="text-3xl md:text-4xl font-bold text-gray-800 text-center mb-12" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Quer contribuir com a HUMUS?
          </h1>

          {/* Value Selection Cards */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-8">
            {predefinedValues.map((value) => (
              <button
                key={value}
                onClick={() => handlePredefinedClick(value)}
                className={`p-6 rounded-2xl border-2 transition-all duration-300 hover:scale-105 ${
                  selectedValue === value && !isCustom
                    ? 'border-pink-500 bg-pink-50 shadow-lg'
                    : 'border-gray-300 bg-white hover:border-pink-300'
                }`}
              >
                <div className="text-3xl font-bold text-gray-800">R$</div>
                <div className="text-4xl font-bold text-pink-500">{value}</div>
              </button>
            ))}
          </div>

          {/* Custom Value Input */}
          <div className="mb-8">
            <label className="block text-lg font-semibold text-gray-700 mb-3">
              Outro valor:
            </label>
            <div className="relative">
              <span className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500 text-xl">
                R$
              </span>
              <input
                type="number"
                min="10"
                step="0.01"
                value={customValue}
                onChange={handleCustomValueChange}
                placeholder="Digite o valor"
                className={`w-full pl-12 pr-4 py-4 text-xl rounded-xl border-2 transition-colors ${
                  error 
                    ? 'border-red-500 focus:border-red-600' 
                    : isCustom 
                    ? 'border-pink-500 focus:border-pink-600' 
                    : 'border-gray-300 focus:border-pink-400'
                } focus:outline-none`}
              />
            </div>
            {error && (
              <p className="text-red-500 text-sm mt-2">{error}</p>
            )}
            <p className="text-gray-500 text-sm mt-2">* Valor mínimo: R$ 10,00</p>
          </div>

          {/* Description Text */}
          <div className="bg-white rounded-2xl p-8 mb-8 shadow-sm">
            <p className="text-gray-700 text-center leading-relaxed" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Apoiando a HUMUS, você colabora com nossa missão de promover prevenção e resposta emergencial em comunidades situadas em áreas de risco, através de tecnologias e iniciativas poderosas como o ParaQuemDoar.
            </p>
          </div>

          {/* Continue Button */}
          <Button
            onClick={handleContinue}
            className="w-full bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 rounded-full py-6 text-xl font-bold transition-all duration-300 hover:scale-105 shadow-lg"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            CONTINUAR
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonationValuePage;
