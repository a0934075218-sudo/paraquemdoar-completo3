import React, { useState, useEffect } from 'react';
import { Button } from './ui/button';
import { useNavigate, useLocation } from 'react-router-dom';
import { Copy, Check } from 'lucide-react';
import { QRCodeSVG } from 'qrcode.react';
import axios from 'axios';

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
const API = `${BACKEND_URL}/api`;

const PixPaymentPage = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const donationValue = location.state?.value || 50;

  const [timer, setTimer] = useState(300);
  const [copied, setCopied] = useState(false);
  const [donationId, setDonationId] = useState(null);
  const [pixCode, setPixCode] = useState('');
  const [loadingPix, setLoadingPix] = useState(true);
  const [pixError, setPixError] = useState('');

  // Buscar codigo PIX do backend
  useEffect(() => {
    const fetchPixCode = async () => {
      try {
        const response = await axios.get(`${API}/admin/pix/generate`, {
          params: { value: donationValue }
        });
        const code = response.data.pix_code;
        setPixCode(code);
        setLoadingPix(false);

        // Registrar doacao
        try {
          const donRes = await axios.post(`${API}/admin/donations`, {
            value: donationValue,
            pix_code: code
          });
          setDonationId(donRes.data.donation_id);
        } catch (err) {
          console.error('Erro ao registrar doacao:', err);
        }
      } catch (error) {
        console.error('Erro ao gerar PIX:', error);
        setPixError('Chave PIX não configurada. Contate o administrador.');
        setLoadingPix(false);
      }
    };

    fetchPixCode();
  }, [donationValue]);

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

    if (donationId) {
      try {
        await axios.patch(`${API}/admin/donations/${donationId}`, { copied: true });
      } catch (error) {
        console.error('Erro ao atualizar status:', error);
      }
    }
  };

  const handleSendEmail = () => {
    alert('QR Code sera enviado para seu e-mail');
  };

  if (pixError) {
    return (
      <div className="min-h-screen bg-gray-50 py-12" data-testid="pix-error-page">
        <div className="container mx-auto px-4 md:px-6">
          <div className="max-w-lg mx-auto text-center">
            <div className="bg-red-50 border-2 border-red-300 rounded-2xl p-8">
              <p className="text-red-600 text-lg font-semibold mb-4" data-testid="pix-error-message">{pixError}</p>
              <Button
                onClick={() => navigate(-1)}
                className="bg-pink-500 text-white hover:bg-pink-600 rounded-full px-8 py-3"
                data-testid="pix-error-back-button"
              >
                Voltar
              </Button>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-12" data-testid="pix-payment-page">
      <div className="container mx-auto px-4 md:px-6">
        <div className="max-w-6xl mx-auto">
          {/* Header */}
          <div className="mb-8">
            <h1 className="text-3xl md:text-4xl font-bold text-gray-800 mb-4" style={{ fontFamily: "'Nunito', sans-serif" }}>
              Falta pouco! Sua colaboracao sera confirmada apos a transferencia PIX
            </h1>
            <div className="h-1 w-20 bg-pink-500 mb-6"></div>
            <p className="text-lg text-gray-700 mb-2">
              Escolha uma das opcoes para concluir seu pagamento de <span className="font-bold">R$ {donationValue.toFixed(2).replace('.', ',')}</span>
            </p>
            <div className="mt-4">
              <p className="text-base text-gray-600 font-semibold">Aguardando pagamento</p>
              <p className="text-4xl font-bold text-gray-800 mt-2" data-testid="pix-timer">{formatTime(timer)}</p>
            </div>
          </div>

          {/* Two Columns Layout */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {/* Left Column - QR Code */}
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
                  <span>Escaneie o QR Code abaixo e confirme o pagamento.</span>
                </li>
              </ol>

              {/* QR Code Real */}
              <div className="bg-white p-8 rounded-xl flex justify-center mb-4" data-testid="qr-code-container">
                {loadingPix ? (
                  <div className="w-64 h-64 flex items-center justify-center">
                    <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-pink-500"></div>
                  </div>
                ) : (
                  <QRCodeSVG
                    value={pixCode}
                    size={256}
                    level="M"
                    includeMargin={true}
                    data-testid="qr-code-svg"
                  />
                )}
              </div>

              <p className="text-sm text-gray-600 text-center">Codigo valido por 24hrs</p>
            </div>

            {/* Right Column - PIX Copia e Cola */}
            <div className="bg-gray-100 rounded-2xl p-8">
              <h2 className="text-2xl font-bold text-gray-800 mb-6">PIX copia e cola</h2>

              <div className="mb-6">
                <p className="flex mb-4">
                  <span className="text-pink-500 font-bold mr-2">1.</span>
                  <span className="text-gray-700">Copie o codigo abaixo</span>
                </p>

                <p className="text-sm text-gray-600 mb-2">CODIGO:</p>
                <div className="bg-white rounded-xl p-4 flex items-center justify-between mb-4" data-testid="pix-code-container">
                  {loadingPix ? (
                    <div className="flex-1 flex items-center justify-center py-4">
                      <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-pink-500"></div>
                    </div>
                  ) : (
                    <>
                      <p className="text-sm text-gray-600 break-all flex-1 mr-3" data-testid="pix-code-text">
                        {pixCode}
                      </p>
                      <button
                        onClick={handleCopyCode}
                        className="flex-shrink-0 w-12 h-12 bg-pink-500 hover:bg-pink-600 rounded-full flex items-center justify-center text-white transition-all duration-300"
                        data-testid="copy-pix-code-button"
                      >
                        {copied ? <Check className="w-6 h-6" /> : <Copy className="w-6 h-6" />}
                      </button>
                    </>
                  )}
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
                  <span>Cole o codigo e confirme o pagamento.</span>
                </li>
              </ol>

              <p className="text-sm text-gray-600 mb-6">Codigo valido por 24hrs</p>

              {/* QR Code mobile (aparece apenas no mobile) */}
              <div className="md:hidden bg-white p-6 rounded-xl flex justify-center mb-6" data-testid="qr-code-mobile">
                {!loadingPix && (
                  <QRCodeSVG
                    value={pixCode}
                    size={200}
                    level="M"
                    includeMargin={true}
                  />
                )}
              </div>

              <Button
                onClick={() => navigate('/doacao/valor')}
                className="w-full bg-transparent text-pink-500 border-2 border-pink-500 hover:bg-pink-50 rounded-full py-4 font-semibold transition-all duration-300"
                data-testid="donate-again-button"
              >
                DOAR NOVAMENTE
              </Button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PixPaymentPage;
