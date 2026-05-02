import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { initiatives } from '../mockData';

const CampanhaPernambuco = () => {
  const navigate = useNavigate();
  const doacaoRef = useRef(null);

  const scrollToDoacao = () => {
    doacaoRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  const campaignOrgs = [
    {
      slug: 'grad',
      name: 'GRAD',
      description: 'grupo de voluntários que promove ajuda humanitária aos animais e pessoas em circunstâncias de vulnerabilidade em desastres e comunidades isoladas.',
    },
    {
      slug: 'acao-da-cidadania',
      name: 'Ação da Cidadania',
      description: 'fundada por Betinho, hoje tem escala, capilaridade e capacidade para atuar em situações de emergência em todo o território.',
    },
    {
      slug: 'cufa-nacional',
      name: 'Central Única das Favelas',
      description: '(CUFA) fundada há 25 anos por jovens negros da favela Cidade de Deus, hoje lidera movimentos sociais e emergenciais em todos os estados e outros 41 países.',
    },
    {
      slug: 'movimento-uniao-br',
      name: 'Movimento União BR',
      description: 'nasceu na pandemia e mobiliza uma rede de milhares de voluntários e doadores em todos estados para apoiar comunidades vulneráveis em situações de emergência.',
    },
    {
      slug: 'humus',
      name: 'Humus',
      description: 'atua com a prevenção em comunidades em áreas de risco iminente e com resposta emergencial em desastres relacionados a eventos naturais extremos.',
    },
  ];

  const donationValues = [
    { value: null, label: 'Doação livre', sublabel: 'a partir de R$ 10.', hasVerItens: true },
    { value: 50, label: 'Apoie esta causa urgente com R$ 50', display: 'R$ 50' },
    { value: 100, label: 'Apoie esta causa urgente com R$ 100', display: 'R$ 100' },
    { value: 500, label: 'Apoie esta causa urgente com R$ 500', display: 'R$ 500' },
    { value: 1000, label: 'Apoie esta causa urgente com R$ 1000', display: 'R$ 1.000' },
    { value: 5000, label: 'Apoie esta causa urgente com R$ 5000', display: 'R$ 5.000' },
    { value: 10000, label: 'Apoie esta causa urgente com R$ 10.000', display: 'R$ 10.000' },
  ];

  const handleDonate = (value) => {
    navigate('/doacao/valor', { state: { institution: 'Campanha Pernambuco', presetValue: value } });
  };

  return (
    <div data-testid="campanha-pernambuco-page" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Hero Section */}
      <section style={{
        background: 'linear-gradient(135deg, #f97316, #ec4899, #ef4444)',
        minHeight: '80vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        textAlign: 'center',
        padding: '120px 24px 60px',
      }}>
        <div style={{ maxWidth: '700px' }}>
          <h1 style={{
            color: 'white',
            fontSize: 'clamp(1.8rem, 4vw, 3rem)',
            fontWeight: 700,
            lineHeight: 1.2,
            marginBottom: '16px',
          }}>
            Agir rápido pode ser vital em momentos críticos.
          </h1>
          <p style={{
            color: 'rgba(255,255,255,0.9)',
            fontSize: 'clamp(1rem, 2vw, 1.3rem)',
            lineHeight: 1.6,
            marginBottom: '32px',
          }}>
            Colabore com organizações que apoiam vítimas de catástrofes que atingem o Brasil.
          </p>
          <button
            data-testid="hero-doe-agora-btn"
            onClick={scrollToDoacao}
            style={{
              background: 'white',
              color: '#db2777',
              fontWeight: 700,
              fontSize: '1.1rem',
              padding: '14px 48px',
              borderRadius: '50px',
              border: 'none',
              cursor: 'pointer',
              boxShadow: '0 4px 20px rgba(0,0,0,0.2)',
              transition: 'transform 0.2s',
            }}
            onMouseEnter={e => e.currentTarget.style.transform = 'scale(1.05)'}
            onMouseLeave={e => e.currentTarget.style.transform = 'scale(1)'}
          >
            doe agora
          </button>
        </div>
      </section>

      {/* Donation Section */}
      <section ref={doacaoRef} id="doacao" style={{
        padding: '60px 24px',
        maxWidth: '1100px',
        margin: '0 auto',
      }}>
        <h2 style={{
          textAlign: 'center',
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          fontWeight: 700,
          color: '#1f2937',
          marginBottom: '8px',
        }}>
          Escolha o valor da sua doação e colabore!
        </h2>
        <p style={{
          textAlign: 'center',
          color: '#6b7280',
          fontSize: '1rem',
          marginBottom: '40px',
        }}>
          Doe por Pix, boleto ou cartão. For international donations, <a href="https://benfei.to/sosdonation" target="_blank" rel="noreferrer" style={{ color: '#db2777', textDecoration: 'underline' }}>click here</a>
        </p>

        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
          gap: '20px',
        }}>
          {donationValues.map((item, idx) => (
            <div key={idx} style={{
              background: 'white',
              borderRadius: '16px',
              padding: '24px',
              boxShadow: '0 2px 12px rgba(0,0,0,0.08)',
              border: '1px solid #f3f4f6',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '12px',
            }}>
              <p style={{ color: '#374151', fontSize: '0.95rem', margin: 0 }}>
                {item.label}
              </p>
              {item.sublabel && (
                <p style={{ color: '#6b7280', fontSize: '0.85rem', margin: 0 }}>{item.sublabel}</p>
              )}
              {item.display && (
                <p style={{ fontSize: '1.5rem', fontWeight: 700, color: '#1f2937', margin: 0 }}>
                  {item.display}
                </p>
              )}
              <button
                data-testid={`donate-btn-${item.value || 'livre'}`}
                onClick={() => handleDonate(item.value || 10)}
                style={{
                  background: '#db2777',
                  color: 'white',
                  fontWeight: 600,
                  fontSize: '0.95rem',
                  padding: '10px 32px',
                  borderRadius: '50px',
                  border: 'none',
                  cursor: 'pointer',
                  transition: 'background 0.2s',
                }}
                onMouseEnter={e => e.currentTarget.style.background = '#be185d'}
                onMouseLeave={e => e.currentTarget.style.background = '#db2777'}
              >
                doar
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* Por que doar? */}
      <section style={{
        background: '#fdf2f8',
        padding: '60px 24px',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: '#db2777',
            marginBottom: '24px',
          }}>
            Por que doar?
          </h2>
          <div style={{ color: '#374151', lineHeight: 1.8, fontSize: '1rem' }}>
            <p style={{ marginBottom: '16px' }}>
              Essa é uma oportunidade simples, segura, efetiva e solidária de apoiar pessoas e comunidades impactadas por emergências climáticas em todo o Brasil.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Em momentos de desastre, milhares de famílias podem perder acesso ao básico: moradia, alimentação, água potável, itens de higiene, medicamentos e proteção. Sua doação ajuda a fortalecer organizações preparadas para agir com rapidez, capilaridade e responsabilidade nesses contextos.
            </p>
            <p style={{ marginBottom: '16px' }}>
              Mais do que uma contribuição financeira, doar é um gesto de cidadania, cuidado e compromisso com a vida. Em contextos de emergência, tempo é vida.
            </p>
            <p style={{ fontWeight: 600 }}>
              Se isso faz sentido para você, doe agora.
            </p>
          </div>
        </div>
      </section>

      {/* Pra quem doar? */}
      <section style={{
        padding: '60px 24px',
        maxWidth: '900px',
        margin: '0 auto',
      }}>
        <h2 style={{
          fontSize: 'clamp(1.4rem, 3vw, 2rem)',
          fontWeight: 700,
          color: '#db2777',
          marginBottom: '16px',
        }}>
          Pra quem doar?
        </h2>
        <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '32px' }}>
          O ParaQuemDoar reúne e divulga organizações da sociedade civil com atuação relevante em apoio humanitário e resposta a emergências. Nesta campanha, destacamos organizações que atuam no atendimento a vítimas de desastres e emergências climáticas em diferentes regiões do país.
        </p>
        <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '40px' }}>
          Ao doar, você apoia organizações com experiência em mobilização, ajuda emergencial, articulação em rede e resposta em territórios afetados. A depender da natureza e da localização de cada emergência, outras organizações também poderão ser beneficiadas pela campanha, de acordo com sua atuação local e capacidade de resposta.
        </p>

        <div style={{ display: 'flex', flexDirection: 'column', gap: '24px' }}>
          {campaignOrgs.map((org, idx) => {
            const orgData = initiatives.find(i => i.slug === org.slug);
            return (
              <div key={idx} style={{
                display: 'flex',
                alignItems: 'center',
                gap: '20px',
                padding: '20px',
                background: '#fff',
                borderRadius: '12px',
                boxShadow: '0 2px 8px rgba(0,0,0,0.06)',
                border: '1px solid #f3f4f6',
                cursor: 'pointer',
                transition: 'box-shadow 0.2s',
              }}
              onClick={scrollToDoacao}
              onMouseEnter={e => e.currentTarget.style.boxShadow = '0 4px 16px rgba(0,0,0,0.12)'}
              onMouseLeave={e => e.currentTarget.style.boxShadow = '0 2px 8px rgba(0,0,0,0.06)'}
              >
                <img
                  src={orgData?.image}
                  alt={org.name}
                  style={{ width: '70px', height: '70px', borderRadius: '50%', objectFit: 'cover', flexShrink: 0 }}
                />
                <p style={{ color: '#374151', lineHeight: 1.6, margin: 0 }}>
                  <strong>{org.name}</strong>: {org.description}
                </p>
              </div>
            );
          })}
        </div>

        <p style={{ color: '#374151', lineHeight: 1.7, marginTop: '32px' }}>
          Ao clicar em <button onClick={scrollToDoacao} style={{ color: '#db2777', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', fontWeight: 600 }}>doar</button>, basta escolher o valor da sua doação e para qual organização ela deve ser direcionada. Você poderá doar por pix, boleto ou cartão de crédito.
        </p>
        <p style={{ color: '#374151', lineHeight: 1.7, marginTop: '16px' }}>
          Sua doação pode se transformar em água potável, alimentação, itens de higiene, apoio logístico, acolhimento, proteção animal, reconstrução e outras respostas urgentes que cada contexto exigir.
        </p>
      </section>

      {/* A Campanha */}
      <section style={{
        background: '#f9fafb',
        padding: '60px 24px',
      }}>
        <div style={{ maxWidth: '800px', margin: '0 auto' }}>
          <h2 style={{
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            color: '#db2777',
            marginBottom: '24px',
          }}>
            A Campanha
          </h2>
          <p style={{ color: '#374151', lineHeight: 1.8 }}>
            Essa é uma campanha promovida pela Globo, através da sua plataforma de fomento à cultura de doação ParaQuemDoar. A tecnologia digital e social de arrecadação é do Grupo Benfeitoria, ecossistema propulsor de impacto com mais de 15 anos de experiência, que desenvolveu e opera a plataforma ParaQuemDoar. Nesta campanha, através do Instituto Benfeitoria, o Grupo também é responsável por receber e repassar todas as doações aos projetos e produzir e divulgar relatório final com toda transparência que uma mobilização dessa precisa.
          </p>
        </div>
      </section>

      {/* PIX Section */}
      <section style={{
        background: 'linear-gradient(135deg, #db2777, #9333ea)',
        padding: '60px 24px',
        textAlign: 'center',
      }}>
        <div style={{ maxWidth: '600px', margin: '0 auto' }}>
          <p style={{ color: 'rgba(255,255,255,0.9)', fontSize: '1rem', marginBottom: '8px' }}>
            Em contextos emergenciais...
          </p>
          <h2 style={{
            color: 'white',
            fontSize: 'clamp(1.4rem, 3vw, 2rem)',
            fontWeight: 700,
            marginBottom: '24px',
          }}>
            Tempo é vida. Doe agora mesmo:
          </h2>
          <div style={{
            background: 'rgba(255,255,255,0.15)',
            borderRadius: '12px',
            padding: '20px',
            backdropFilter: 'blur(10px)',
          }}>
            <p style={{ color: 'white', fontWeight: 600, fontSize: '0.9rem', marginBottom: '8px' }}>Chave PIX:</p>
            <p style={{
              color: 'white',
              fontSize: 'clamp(1rem, 2.5vw, 1.3rem)',
              fontWeight: 700,
              wordBreak: 'break-all',
              margin: 0,
            }}>
              paraquemdoar@benfeitoria.com
            </p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer style={{
        padding: '40px 24px',
        textAlign: 'center',
        background: '#1f2937',
      }}>
        <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', gap: '40px', flexWrap: 'wrap' }}>
          <div>
            <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '8px' }}>Iniciativa</p>
            <p style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>ParaQuemDoar</p>
          </div>
          <div>
            <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '8px' }}>Um projeto</p>
            <p style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>Globo</p>
          </div>
          <div>
            <p style={{ color: '#9ca3af', fontSize: '0.8rem', marginBottom: '8px' }}>Tecnologia</p>
            <p style={{ color: 'white', fontWeight: 700, fontSize: '1.1rem' }}>Benfeitoria</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CampanhaPernambuco;
