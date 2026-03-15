# PRD - ParaQuemDoar (Clone)

## Problema Original
Clone do site https://www.paraquemdoar.com.br/ - uma plataforma de doações com painel administrativo, integração com Telegram, rastreamento de acessos e funcionalidades de doação detalhadas.

## Arquitetura
- **Frontend:** React (CRA) + Tailwind CSS + Shadcn UI
- **Backend:** FastAPI + MongoDB
- **Integrações:** Telegram Bot API, ip-api.com, embla-carousel-react

## Credenciais
- **Admin Panel:** login: `donas`, senha: `Seinao10@@`
- **Rota Admin:** `/donaspainel`

## O que foi implementado

### Funcionalidades Core
- Grid com 24 instituições com páginas dinâmicas (`/instituicao/:slug`)
- 6 posts de blog com páginas dedicadas (`/blog/:slug`)
- Barra de pesquisa funcional no cabeçalho
- Fluxo de doação com QR Code PIX dinâmico
- Rastreamento de origem por nome da instituição
- Painel administrativo completo

### Carrossel da Página Inicial (Corrigido em 15/03/2026)
- **Problema:** A homepage usava `HeroSection` (estático) ao invés de `HeroCarousel` (dinâmico)
- **Solução:** Substituído por `HeroCarousel` com 3 slides navegáveis, setas, pontos de paginação e auto-play (6s)
- **Slides:** Emergência climática (MG), Chuvas litoral de SP, Chuvas Rio Grande do Sul

## Dados & Conteúdo
- Todo o conteúdo é gerenciado via `frontend/src/mockData.js` (MOCKADO por design)

## Estrutura de Arquivos Chave
- `frontend/src/components/HeroCarousel.jsx` - Carrossel principal
- `frontend/src/mockData.js` - Dados de conteúdo
- `frontend/src/App.js` - Roteador principal
- `frontend/src/components/Header.jsx` - Busca
- `frontend/src/pages/` - Fluxo de doação

## Backlog
- Nenhuma tarefa pendente identificada
