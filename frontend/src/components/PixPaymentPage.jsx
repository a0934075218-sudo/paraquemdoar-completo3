import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PixPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const donationValue = location.state?.value || 50;
  
  const [timer, setTimer] = useState(300); // 5 minutos = 300 segundos
  const [copied, setCopied] = useState(false);
  const [donationId, setDonationId] = useState(null);
  
  // Código PIX mockado (em produção, viria do backend)
  const pixCode = "00020101021226820014br.gov.bcb.pix256252benfeitoria@mirabolante.com520400005303986540" + donationValue.toFixed(2) + "5802BR5925Benfeitoria Mirabolante6014BELO HORIZONTE62070503***6304A1B2";

  // Registrar doação ao carregar a página
  useEffect(() => {
    const registerDonation = async () => {
      try {
        const response = await axios.post(`${API}/admin/donations`, {
          value: donationValue,
          pix_code: pixCode
        });
        setDonationId(response.data._id);
      } catch (error) {
        console.error('Erro ao registrar doação:', error);
      }
    };
    
    registerDonation();
  }, [donationValue, pixCode]);

  // Timer countdown
  useEffect(() => {
    const interval = setInterval(() => {
      setTimer((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(interval);
  }, []);

  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  const handleCopyCode = async () => {
    navigator.clipboard.writeText(pixCode);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
    
    // Marcar como copiado no backend
    if (donationId) {
      try {
        const token = localStorage.getItem('admin_token');
        await axios.patch(
          `${API}/admin/donations/${donationId}`,
          { copied: true },
          { headers: token ? { Authorization: `Bearer ${token}` } : {} }
        );
      } catch (error) {
        console.error('Erro ao atualizar status:', error);
      }
    }
  };

  const handleSendEmail = () => {
    alert('QR Code será enviado para seu e-mail');
  };

  return (
    <div className="min-h-screen bg-gray-50 py-12">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Falta pouco! Sua colaboração será confirmada após a transferência PIX
            </h1>
            <div className="h-1 w-20 bg-pink-500 mb-6"></div>
            <p className="text-lg text-gray-700 mb-2">
              Escolha uma das opções para concluir seu pagamento de <span className="font-bold">R$ {donationValue.toFixed(2).replace('.', ',')}</span>
            </p>
            <div className="mt-4">
              <p className="text-base text-gray-600 font-semibold">Aguardando pagamento</p>
              <p className="text-4xl font-bold text-gray-800 mt-2">{formatTime(timer)}</p>
            </div>
          </div>

          {/* Two Columns Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - QR Code (Hidden on mobile) */}
            <div className="hidden md:block bg-gray-100 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">QR Code</h2>
              
              <ol className="space-y-3 mb-6 text-gray-700">
                <li className="flex">
                  <span className="text-pink-500 font-bold mr-2">1.</span>
                  <span>Abra o aplicativo ou site do seu banco usando o seu celular</span>
                </li>
                <li className="flex">
                  <span className="text-pink-500 font-bold mr-2">2.</span>
                  <span>Entre no sistema PIX e selecione para <span className="font-bold">pagar com QR Code</span></span>
                </li>
                <li className="flex">
                  <span className="text-pink-500 font-bold mr-2">3.</span>
                  <span>Escaneie o QR Code abaixo e confirme o pagamento. O nome que vai aparecer é Benfeitoria mirabolante.</span>
                </li>
              </ol>

              {/* QR Code Placeholder */}
              <div className="bg-white p-8 rounded-xl flex justify-center mb-4">
                <div className="w-64 h-64 bg-gray-200 flex items-center justify-center">
                  <svg viewBox="0 0 100 100" className="w-full h-full">
                    <rect width="100" height="100" fill="white"/>
                    {/* Simple QR code pattern */}
                    <rect x="10" y="10" width="30" height="30" fill="black"/>
                    <rect x="60" y="10" width="30" height="30" fill="black"/>
                    <rect x="10" y="60" width="30" height="30" fill="black"/>
                    <rect x="20" y="20" width="10" height="10" fill="white"/>
                    <rect x="70" y="20" width="10" height="10" fill="white"/>
                    <rect x="20" y="70" width="10" height="10" fill="white"/>
                    {/* Pattern dots */}
                    {[...Array(20)].map((_, i) => (
                      <circle key={i} cx={Math.random() * 80 + 10} cy={Math.random() * 80 + 10} r="2" fill="black"/>
                    ))}
                  </svg>
                </div>
              </div>

              <p className="text-sm text-gray-600 text-center">Código válido por 24hrs</p>
            </div>

            {/* Right Column - PIX Copia e Cola (Always visible) */}
            <div className="bg-gray-100 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">PIX copia e cola</h2>
              
              <div className="mb-6">
                <p className="flex mb-4">
                  <span className="text-pink-500 font-bold mr-2">1.</span>
                  <span className="text-gray-700">Copie o código abaixo</span>
                </p>
                
                <p className="text-sm text-gray-600 mb-2">CÓDIGO:</p>
                <div className="bg-white rounded-xl p-4 flex items-center justify-between mb-4">
                  <p className="text-sm text-gray-600 break-all flex-1 mr-3">
                    {pixCode}
                  </p>
                  <button
                    onClick={handleCopyCode}
                    className="flex-shrink-0 w-12 h-12 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center text-white transition-all duration-300"
                  >
                    {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                  </button>
                </div>
              </div>

              <ol className="space-y-3 mb-6 text-gray-700">
                <li className="flex">
                  <span className="text-pink-500 font-bold mr-2">2.</span>
                  <span>Abra o aplicativo ou site do seu banco</span>
                </li>
                <li className="flex">
                  <span className="text-pink-500 font-bold mr-2">3.</span>
                  <span>Entre no sistema PIX e selecione <span className="font-bold">PIX copia e cola</span></span>
                </li>
                <li className="flex">
                  <span className="text-pink-500 font-bold mr-2">4.</span>
                  <span>Cole o código e confirme o pagamento. O nome que vai aparecer é Benfeitoria Mirabolante.</span>
                </li>
              </ol>

              <p className="text-sm text-gray-600 mb-6">Código válido por 24hrs</p>

              <Button
                onClick={handleSendEmail}
                className="w-full bg-transparent text-pink-500 border-2 border-pink-500 hover:bg-pink-50 rounded-full py-4 font-semibold transition-all duration-300"
              >
                ME ENVIE O QR CODE POR E-MAIL
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixPaymentPage;
