import React, { useState } from 'react';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { ArrowLeft, User, FileText, Phone, Mail } from 'lucide-react';

const DonorDataPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const donationValue = location.state?.value || 50;

  const [formData, setFormData] = useState({
    name: '',
    document: '',
    phone: '',
    email: ''
  });

  const handleChange = (field, value) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  const formatDocument = (value) => {
    const numbers = value.replace(/\D/g, '');
    if (numbers.length <= 11) {
      return numbers.replace(/(\d{3})(\d{3})(\d{3})(\d{0,2})/, (_, a, b, c, d) => 
        d ? `${a}.${b}.${c}-${d}` : c ? `${a}.${b}.${c}` : b ? `${a}.${b}` : a
      );
    }
    return numbers.slice(0, 14).replace(/(\d{2})(\d{3})(\d{3})(\d{4})(\d{0,2})/, (_, a, b, c, d, e) =>
      e ? `${a}.${b}.${c}/${d}-${e}` : d ? `${a}.${b}.${c}/${d}` : c ? `${a}.${b}.${c}` : b ? `${a}.${b}` : a
    );
  };

  const formatPhone = (value) => {
    const numbers = value.replace(/\D/g, '').slice(0, 11);
    if (numbers.length <= 10) {
      return numbers.replace(/(\d{2})(\d{4})(\d{0,4})/, (_, a, b, c) =>
        c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : a ? `(${a}` : ''
      );
    }
    return numbers.replace(/(\d{2})(\d{5})(\d{0,4})/, (_, a, b, c) =>
      c ? `(${a}) ${b}-${c}` : b ? `(${a}) ${b}` : a ? `(${a}` : ''
    );
  };

  const isFormValid = formData.name.trim().length >= 3 &&
    formData.document.replace(/\D/g, '').length >= 11 &&
    formData.phone.replace(/\D/g, '').length >= 10 &&
    formData.email.includes('@');

  const handleContinue = () => {
    if (!isFormValid) return;
    navigate('/doacao/pix', { 
      state: { 
        value: donationValue, 
        donor: formData 
      } 
    });
  };

  const handleAnonymous = () => {
    navigate('/doacao/pix', { 
      state: { 
        value: donationValue, 
        donor: null 
      } 
    });
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header */}
      <header className="bg-white shadow-sm py-4 md:py-6">
        <div className="container mx-auto px-4 md:px-6">
          <button 
            onClick={() => navigate('/doacao/valor')}
            className="text-gray-600 hover:text-gray-800 transition-colors flex items-center space-x-2"
            data-testid="back-button"
          >
            <ArrowLeft className="w-5 h-5" />
            <span>Voltar</span>
          </button>
        </div>
      </header>

      {/* Main Content */}
      <div className="container mx-auto px-4 md:px-6 py-8 md:py-16">
        <div className="max-w-2xl mx-auto">
          {/* Title */}
          <h1 className="text-2xl md:text-3xl font-bold text-gray-800 text-center mb-2" style={{ fontFamily: "'Nunito', sans-serif" }}>
            Seus dados
          </h1>
          <p className="text-gray-500 text-center mb-8">
            Valor da doação: <span className="font-bold text-pink-500">R$ {donationValue.toFixed(2).replace('.', ',')}</span>
          </p>

          {/* Form */}
          <div className="space-y-5 mb-8">
            {/* Nome */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Nome completo ou Razão Social
              </label>
              <div className="relative">
                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  data-testid="donor-name-input"
                  type="text"
                  value={formData.name}
                  onChange={(e) => handleChange('name', e.target.value)}
                  placeholder="Digite seu nome completo"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-colors text-base"
                />
              </div>
            </div>

            {/* CPF/CNPJ */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                CPF ou CNPJ
              </label>
              <div className="relative">
                <FileText className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  data-testid="donor-document-input"
                  type="text"
                  value={formData.document}
                  onChange={(e) => handleChange('document', formatDocument(e.target.value))}
                  placeholder="000.000.000-00"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-colors text-base"
                />
              </div>
            </div>

            {/* Telefone */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                Número de telefone
              </label>
              <div className="relative">
                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  data-testid="donor-phone-input"
                  type="text"
                  value={formData.phone}
                  onChange={(e) => handleChange('phone', formatPhone(e.target.value))}
                  placeholder="(00) 00000-0000"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-colors text-base"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 mb-2">
                E-mail
              </label>
              <div className="relative">
                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-gray-400 w-5 h-5" />
                <input
                  data-testid="donor-email-input"
                  type="email"
                  value={formData.email}
                  onChange={(e) => handleChange('email', e.target.value)}
                  placeholder="seu@email.com"
                  className="w-full pl-12 pr-4 py-4 rounded-xl border-2 border-gray-300 focus:border-pink-500 focus:outline-none transition-colors text-base"
                />
              </div>
            </div>
          </div>

          {/* Continue Button */}
          <Button
            data-testid="donor-continue-button"
            onClick={handleContinue}
            disabled={!isFormValid}
            className={`w-full rounded-full py-6 text-xl font-bold transition-all duration-300 shadow-lg ${
              isFormValid
                ? 'bg-gradient-to-r from-pink-500 to-red-500 text-white hover:from-pink-600 hover:to-red-600 hover:scale-105'
                : 'bg-gray-300 text-gray-500 cursor-not-allowed'
            }`}
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            CONTINUAR
          </Button>

          {/* Divider */}
          <div className="flex items-center my-6">
            <div className="flex-1 h-px bg-gray-300"></div>
            <span className="px-4 text-sm text-gray-500">ou</span>
            <div className="flex-1 h-px bg-gray-300"></div>
          </div>

          {/* Anonymous Button */}
          <Button
            data-testid="donor-anonymous-button"
            onClick={handleAnonymous}
            className="w-full bg-transparent text-pink-500 border-2 border-pink-500 hover:bg-pink-50 rounded-full py-5 text-lg font-semibold transition-all duration-300"
            style={{ fontFamily: "'Nunito', sans-serif" }}
          >
            Doar anonimamente
          </Button>
        </div>
      </div>
    </div>
  );
};

export default DonorDataPage;
