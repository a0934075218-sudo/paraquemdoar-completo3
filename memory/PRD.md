# PRD - Plataforma de Doação (Clone paraquemdoar.com.br)

## Problema Original
Clone do site https://www.paraquemdoar.com.br/ com painel administrativo, integração Telegram, rastreamento de acessos e doações com dedução fiscal.

## Arquitetura
- **Frontend**: React + Tailwind CSS + Shadcn UI
- **Backend**: FastAPI + Motor (MongoDB async)
- **Database**: MongoDB
- **Integrações**: Telegram Bot API, ip-api.com

## Funcionalidades Implementadas

### Frontend
- Hero carousel com slides dinâmicos
- **Seção "Instituições que apoiamos"** - Grid estático 3 colunas com 24 instituições e logos reais - Implementado 15/03/2026
- **Páginas individuais de instituições** - Cada instituição tem sua própria rota `/instituicao/:slug` com carrossel de fotos, descrição detalhada e botão "Fazer doação" - Implementado 15/03/2026
- Seção Blog
- Fluxo completo de doação (valor, dados do doador, pagamento PIX)
- QR Code PIX dinâmico
- Doação com dedução fiscal (mínimo R$250)
- Validação de CPF/CNPJ
- Timer PIX resiliente (visibilitychange)
- Layout responsivo mobile/desktop

### Painel Administrativo (/donaspainel)
- Login: `donas` / `Seinao10@@`
- Dashboard com cards de resumo (Total Arrecadado, Códigos Copiados, Acessos)
- Modais com detalhes de cada métrica
- Filtro por site de origem (multi-domínio)
- CRUD de doações com exclusão
- Exportação de dados (.txt)
- Visualização/limpeza de logs de acesso
- Configurações: chave PIX e Telegram

### Backend
- Criação automática de admin na inicialização
- URLs relativas no frontend (sem CORS issues)
- Geolocalização via ip-api.com no servidor
- Rastreamento de visitas com origem do domínio
- Notificações Telegram em tempo real

## Credenciais
- **Admin**: login `donas`, senha `Seinao10@@`

## Schema MongoDB
- `donations`: `{donor_name, donor_email, amount, tax_deduction: bool, origin: str, location: str, ...}`
- `visits`: `{device: str, ip_address: str, location: str, timestamp: datetime, origin: str}`
- `users`: `{username: str, hashed_password: str}`

## Decisões Arquiteturais Importantes
- Frontend usa URLs relativos (`/api/...`) - NÃO usar REACT_APP_BACKEND_URL
- Backend cria user admin automaticamente se não existir
- Multi-deploy: mesmo banco compartilhado entre domínios

## Backlog
- Nenhuma tarefa pendente
