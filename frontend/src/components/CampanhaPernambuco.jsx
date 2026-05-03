import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const CampanhaPernambuco = () => {
  const navigate = useNavigate();

  useEffect(() => {
    const handleMessage = (event) => {
      if (event.data && event.data.type === 'DONATE') {
        const value = event.data.value || 50;
        navigate('/doacao/dados', { state: { value: value, institution: 'Campanha Pernambuco', fromCampanha: true } });
      }
    };
    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [navigate]);

  return (
    <div data-testid="campanha-pernambuco-page" style={{ width: '100%', height: '100vh', margin: 0, padding: 0 }}>
      <iframe
        src="/campanha-pernambuco.html"
        title="Campanha Pernambuco"
        style={{ width: '100%', height: '100%', border: 'none' }}
      />
    </div>
  );
};

export default CampanhaPernambuco;
