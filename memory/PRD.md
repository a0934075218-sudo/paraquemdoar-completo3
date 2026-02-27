# PRD - ParaQuemDoar Clone

## Problema Original
Clone pixel-perfect do site https://www.paraquemdoar.com.br/ com painel administrativo para monitoramento de doações PIX.

## Arquitetura
- **Frontend**: React + Tailwind CSS + React Router + qrcode.react
- **Backend**: FastAPI + Motor (MongoDB async) + PyJWT
- **Database**: MongoDB

## Funcionalidades Implementadas

### Site Público (Clone)
- [x] Página Inicial (`/`) com Header, Hero, Iniciativas, Blog, Footer
- [x] Página de Doação (`/doacao`)
- [x] Seleção de Valor (`/doacao/valor`)
- [x] Pagamento PIX (`/doacao/pix`) com QR Code real gerado dinamicamente

### Painel Administrativo (`/donaspainel`)
- [x] Login com credenciais fixas (donas / Seinao10@@)
- [x] Dashboard com estatísticas (Total Arrecadado, Total Doações, Códigos Copiados)
- [x] Tabela de doações com Data/Hora, Valor, Status, Código PIX
- [x] Configuração da chave PIX de recebimento
- [x] Atualização automática a cada 10 segundos
- [x] Geração de código PIX válido (EMV BR Code com CRC16) usando chave configurada

### APIs Backend
- `POST /api/admin/login` - Autenticação admin
- `GET /api/admin/donations` - Lista doações (protegido)
- `POST /api/admin/donations` - Registra doação (público)
- `PATCH /api/admin/donations/{id}` - Marca como copiada (público)
- `GET /api/admin/stats` - Estatísticas (protegido)
- `GET /api/admin/config` - Chave PIX (protegido)
- `PUT /api/admin/config/pix-key` - Atualiza chave PIX (protegido)
- `GET /api/admin/pix/generate?value=X` - Gera código PIX válido (público)
- `GET /api/admin/pix/status` - Status da configuração PIX (público)

## Testes
- Iteração 1: 100% backend (20/20), 100% frontend - PASSED

## Backlog
- P2: Refinamentos visuais conforme feedback do usuário
