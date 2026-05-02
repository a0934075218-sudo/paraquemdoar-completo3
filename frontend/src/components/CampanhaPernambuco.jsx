import React, { useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { initiatives } from '../mockData';

const CampanhaPernambuco = () => {
  const navigate = useNavigate();
  const doacaoRef = useRef(null);
  const cardsRef = useRef(null);

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
    { value: null, label: 'Doação livre a\npartir de R$ 10.', hasInput: true },
    { value: 50, label: 'Apoie esta causa\nurgente com R$ 50', display: 'R$ 50' },
    { value: 100, label: 'Apoie esta causa\nurgente com R$ 100', display: 'R$ 100' },
    { value: 500, label: 'Apoie esta causa\nurgente com R$ 500', display: 'R$ 500' },
    { value: 1000, label: 'Apoie esta causa\nurgente com R$ 1000', display: 'R$ 1.000' },
    { value: 5000, label: 'Apoie esta causa\nurgente com R$ 5000', display: 'R$ 5.000' },
    { value: 10000, label: 'Apoie esta causa\nurgente com R$ 10.000', display: 'R$ 10.000' },
  ];

  const handleDonate = (value) => {
    navigate('/doacao/valor', { state: { institution: 'Campanha Pernambuco', presetValue: value } });
  };

  const HeartIcon = () => (
    <svg width="60" height="60" viewBox="0 0 64 64" fill="none">
      <path d="M32 56s-2-1.5-4-3.5C18 43.5 8 34 8 24c0-7 5.5-12 12-12 4.5 0 8.5 2.5 12 7 3.5-4.5 7.5-7 12-7 6.5 0 12 5 12 12 0 10-10 19.5-20 28.5-2 2-4 3.5-4 3.5z" stroke="#7c3aed" strokeWidth="3" fill="none"/>
      <path d="M20 32c-3 0-6 2-6 5s3 5 6 5h24c3 0 6-2 6-5s-3-5-6-5" stroke="#7c3aed" strokeWidth="2.5" fill="none"/>
      <path d="M26 37v8M32 35v10M38 37v8" stroke="#7c3aed" strokeWidth="2.5" strokeLinecap="round"/>
    </svg>
  );

  return (
    <div data-testid="campanha-pernambuco-page" style={{ fontFamily: "'Nunito', sans-serif" }}>
      {/* Hero Section - foto de fundo com overlay roxo */}
      <section style={{
        position: 'relative',
        minHeight: '300px',
        display: 'flex',
        alignItems: 'center',
        padding: '60px 40px',
        overflow: 'hidden',
      }}>
        <div style={{
          position: 'absolute',
          inset: 0,
          backgroundImage: 'url(https://customer-assets.emergentagent.com/job_7aa6a8ac-139b-4931-8720-8c2fd3be9502/artifacts/ri8wtuop_imgi_4_Base-para-bolinha-PQD-%281%29.png)',
          backgroundSize: 'cover',
          backgroundPosition: 'center',
          filter: 'brightness(0.5)',
        }} />
        <div style={{
          position: 'absolute',
          inset: 0,
          background: 'rgba(88, 28, 135, 0.6)',
        }} />
        <div style={{ position: 'relative', zIndex: 2, display: 'flex', alignItems: 'center', gap: '40px', maxWidth: '1200px', margin: '0 auto', width: '100%', flexWrap: 'wrap' }}>
          {/* Logo */}
          <div style={{ textAlign: 'center' }}>
            <div style={{ display: 'flex', gap: '8px', justifyContent: 'center', marginBottom: '8px' }}>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="white">
                <path d="M15 25c0-8 6-14 14-14s14 6 14 14c0 12-14 22-14 22S15 37 15 25z"/>
              </svg>
              <svg width="60" height="60" viewBox="0 0 60 60" fill="white">
                <path d="M15 25c0-8 6-14 14-14s14 6 14 14c0 12-14 22-14 22S15 37 15 25z"/>
              </svg>
            </div>
            <p style={{ color: 'white', fontSize: '1.2rem', fontWeight: 700, margin: 0 }}>ParaQuemDoar</p>
            <p style={{ color: '#f9a8d4', fontSize: '1rem', margin: 0 }}>emergência</p>
          </div>
          {/* Text */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <p style={{ color: 'white', fontSize: 'clamp(1.2rem, 2.5vw, 1.6rem)', lineHeight: 1.5, margin: '0 0 20px' }}>
              Agir rápido pode ser vital em momentos críticos. Colabore com organizações que apoiam vítimas de catástrofes que atingem o Brasil.
            </p>
            <button
              data-testid="hero-doe-agora-btn"
              onClick={scrollToDoacao}
              style={{
                background: 'transparent',
                color: 'white',
                fontWeight: 600,
                fontSize: '1rem',
                padding: '10px 24px',
                borderRadius: '4px',
                border: '2px solid white',
                cursor: 'pointer',
                transition: 'background 0.2s',
              }}
              onMouseEnter={e => { e.currentTarget.style.background = 'rgba(255,255,255,0.2)'; }}
              onMouseLeave={e => { e.currentTarget.style.background = 'transparent'; }}
            >
              doe agora
            </button>
          </div>
        </div>
      </section>

      {/* Donation Section */}
      <section ref={doacaoRef} id="doacao" style={{ padding: '50px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <h2 style={{ fontSize: '1.6rem', fontWeight: 700, color: '#1f2937', marginBottom: '4px' }}>
          Escolha o valor da sua doação e colabore!
        </h2>
        <p style={{ color: '#4b5563', fontSize: '0.95rem', marginBottom: '30px' }}>
          Doe por Pix, boleto ou cartão. For international donations, <a href="https://benfei.to/sosdonation" target="_blank" rel="noreferrer" style={{ color: '#1f2937', textDecoration: 'underline' }}>click here</a>
        </p>

        {/* Horizontal scrolling cards */}
        <div ref={cardsRef} style={{
          display: 'flex',
          gap: '16px',
          overflowX: 'auto',
          paddingBottom: '16px',
          scrollSnapType: 'x mandatory',
        }}>
          {donationValues.map((item, idx) => (
            <div key={idx} style={{
              minWidth: '200px',
              maxWidth: '220px',
              background: 'white',
              borderRadius: '8px',
              padding: '24px 16px',
              border: '1px solid #e5e7eb',
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              textAlign: 'center',
              gap: '10px',
              scrollSnapAlign: 'start',
              flexShrink: 0,
            }}>
              <HeartIcon />
              <p style={{ color: '#374151', fontSize: '0.9rem', margin: 0, whiteSpace: 'pre-line', lineHeight: 1.4 }}>
                {item.label}
              </p>
              {item.hasInput && (
                <div style={{ width: '100%', borderBottom: '1px solid #ccc', padding: '4px', marginTop: '4px' }}>
                  <span style={{ color: '#9ca3af', fontSize: '0.9rem' }}>R$</span>
                </div>
              )}
              {item.display && (
                <p style={{ fontSize: '1.4rem', fontWeight: 700, color: '#7c3aed', margin: 0 }}>
                  {item.display}
                </p>
              )}
              <button
                data-testid={`donate-btn-${item.value || 'livre'}`}
                onClick={() => handleDonate(item.value || 10)}
                style={{
                  width: '100%',
                  background: 'linear-gradient(to right, #84cc16, #eab308)',
                  color: '#1f2937',
                  fontWeight: 700,
                  fontSize: '0.85rem',
                  padding: '10px 20px',
                  borderRadius: '4px',
                  border: 'none',
                  cursor: 'pointer',
                  textTransform: 'uppercase',
                  letterSpacing: '0.5px',
                  marginTop: 'auto',
                }}
              >
                DOAR
              </button>
            </div>
          ))}
        </div>
      </section>

      {/* POR QUE DOAR? */}
      <section style={{ padding: '40px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(to right, #22c55e, #eab308, #f97316)',
          borderRadius: '8px',
          padding: '16px 24px',
          marginBottom: '24px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1.3rem', textTransform: 'uppercase' }}>POR QUE DOAR?</span>
        </div>
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
      </section>

      {/* PRA QUEM DOAR? */}
      <section style={{ padding: '40px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(to right, #22c55e, #eab308, #f97316)',
          borderRadius: '8px',
          padding: '16px 24px',
          marginBottom: '24px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1.3rem', textTransform: 'uppercase' }}>PRA QUEM DOAR?</span>
        </div>

        <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
          O ParaQuemDoar reúne e divulga organizações da sociedade civil com atuação relevante em apoio humanitário e resposta a emergências. Nesta campanha, destacamos organizações que atuam no atendimento a vítimas de desastres e emergências climáticas em diferentes regiões do país.
        </p>
        <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '32px' }}>
          Ao doar, você apoia organizações com experiência em mobilização, ajuda emergencial, articulação em rede e resposta em territórios afetados.
        </p>

        {/* Org grid - 3 columns */}
        <div style={{
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fill, minmax(250px, 1fr))',
          gap: '24px',
          marginBottom: '32px',
        }}>
          {campaignOrgs.map((org, idx) => {
            const orgData = initiatives.find(i => i.slug === org.slug);
            return (
              <div key={idx} onClick={scrollToDoacao} style={{ cursor: 'pointer', textAlign: 'center' }}>
                <div style={{
                  width: '160px',
                  height: '160px',
                  borderRadius: '50%',
                  background: '#f3f4f6',
                  margin: '0 auto 16px',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  overflow: 'hidden',
                }}>
                  <img
                    src={orgData?.image}
                    alt={org.name}
                    style={{ width: '70%', height: '70%', objectFit: 'contain' }}
                  />
                </div>
                <p style={{ color: '#374151', fontSize: '0.9rem', lineHeight: 1.5, textAlign: 'left' }}>
                  <strong>{org.name}</strong> : {org.description}
                </p>
              </div>
            );
          })}
        </div>

        <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
          Ao clicar em <button onClick={scrollToDoacao} style={{ color: '#374151', textDecoration: 'underline', background: 'none', border: 'none', cursor: 'pointer', font: 'inherit', fontWeight: 600 }}>doar</button>, basta escolher o valor da sua doação e para qual organização ela deve ser direcionada. Você poderá doar por pix, boleto ou cartão de crédito.
        </p>
        <p style={{ color: '#374151', lineHeight: 1.7, marginBottom: '16px' }}>
          Sua doação pode se transformar em água potável, alimentação, itens de higiene, apoio logístico, acolhimento, proteção animal, reconstrução e outras respostas urgentes que cada contexto exigir.
        </p>
        <p style={{ color: '#374151', lineHeight: 1.7 }}>
          Outras organizações também poderão ser beneficiadas pela campanha, a depender da atuação local em cada emergência climática.
        </p>
      </section>

      {/* QUEM SOMOS? / A Campanha */}
      <section style={{ padding: '40px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{
          background: 'linear-gradient(to right, #22c55e, #eab308, #f97316)',
          borderRadius: '8px',
          padding: '16px 24px',
          marginBottom: '24px',
          display: 'inline-flex',
          alignItems: 'center',
          gap: '12px',
        }}>
          <svg width="28" height="28" viewBox="0 0 24 24" fill="white">
            <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z"/>
          </svg>
          <span style={{ color: 'white', fontWeight: 700, fontSize: '1.3rem', textTransform: 'uppercase' }}>QUEM SOMOS?</span>
        </div>
        <p style={{ color: '#374151', lineHeight: 1.8 }}>
          Essa é uma campanha promovida pela Globo, através da sua plataforma de fomento à cultura de doação ParaQuemDoar. A tecnologia digital e social de arrecadação é do <a href="https://www.grupobenfeitoria.org/" target="_blank" rel="noreferrer" style={{ color: '#374151', textDecoration: 'underline' }}>Grupo Benfeitoria</a>, ecossistema propulsor de impacto com mais de 15 anos de experiência, que desenvolveu e opera a plataforma ParaQuemDoar. Nesta campanha, através do Instituto Benfeitoria, o Grupo também é responsável por receber e repassar todas as doações aos projetos e produzir e divulgar relatório final com toda transparência que uma mobilização dessa precisa.
        </p>
      </section>

      {/* YouTube + PIX Section */}
      <section style={{ padding: '40px 40px', maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ display: 'flex', gap: '40px', flexWrap: 'wrap', alignItems: 'flex-start' }}>
          {/* YouTube */}
          <div style={{ flex: 1, minWidth: '300px' }}>
            <iframe
              width="100%"
              height="320"
              src="https://www.youtube.com/embed/3jHs_Tg_C-o"
              title="SOS CHUVAS RS"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
              allowFullScreen
              style={{ borderRadius: '8px' }}
            />
          </div>
          {/* PIX Info */}
          <div style={{ flex: 1, minWidth: '280px' }}>
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#1f2937', marginBottom: '12px' }}>
              Em contextos emergenciais...
            </h3>
            <p style={{ color: '#374151', fontSize: '1rem', marginBottom: '16px' }}>
              Tempo é vida. Doe agora mesmo:
            </p>
            <p style={{ color: '#374151', fontSize: '1rem', marginBottom: '16px' }}>
              Chave PIX: <strong>paraquemdoar@benfeitoria.com</strong>
            </p>
          </div>
        </div>
      </section>

      {/* Footer roxo */}
      <footer style={{
        padding: '40px',
        background: '#581c87',
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', maxWidth: '1000px', margin: '0 auto', flexWrap: 'wrap', gap: '24px' }}>
          <div>
            <p style={{ color: '#c4b5fd', fontSize: '0.8rem', marginBottom: '8px' }}>Iniciativa</p>
            <p style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>ParaQuemDoar</p>
          </div>
          <div>
            <p style={{ color: '#c4b5fd', fontSize: '0.8rem', marginBottom: '8px' }}>Um projeto</p>
            <p style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>globo</p>
          </div>
          <div>
            <p style={{ color: '#c4b5fd', fontSize: '0.8rem', marginBottom: '8px' }}>Tecnologia</p>
            <p style={{ color: 'white', fontWeight: 700, fontSize: '1.2rem', margin: 0 }}>benfeitoria</p>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default CampanhaPernambuco;
