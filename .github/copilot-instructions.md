## Objetivo rápido
Este repositório é um site estático multi-página chamado "Saúde+" (HTML/CSS/JS). As instruções abaixo ajudam um agente de código a ser produtivo aqui — focadas em arquitetura, convenções, pontos de integração e exemplos específicos do código.

## Arquitetura & fluxo principal
- Multi-page static site (HTML em `pages/`, assets estáticos em `assets/`). Não há framework nem bundler.
- Páginas e recursos usam paths relativos (ex.: `pages/index.html` referencia `../assets/...`). Ao servir, o root do servidor deve ser a raiz do projeto.
- Estado e dados de exemplo são majoritariamente client-side: `localStorage` e arquivos JSON opcionais.

## Onde olhar (mapa rápido)
- `pages/` — páginas públicas e área de dashboard (ex.: `pages/index.html`, `pages/dashboard/minha_area.html`).
- `components/` — snippets de layout (ex.: `components/header.html`, `components/footer.html`). Páginas atuais incluem cabeçalho/rodapé manualmente; não há mecanismo de template automático.
- `assets/js/` — lógica cliente (ex.: `login.js`, `admin.js`). Muitos arquivos expõem funções globais esperadas por HTML (IDs/elementos específicos).
- `assets/css/` — estilos por página (nomes correspondentes às páginas, ex.: `header.css`, `index.css`).

## Convenções e padrões específicos do projeto
- Paths: sempre use caminhos relativos conforme os exemplos em `pages/*` (por exemplo `../assets/css/index.css`).
- IDs/seletores esperados: várias funções JS dependem de IDs fixos. Exemplos em `assets/js/admin.js`: `userType`, `searchInput`, `usersTableWrap`, `clinicsTableWrap`, botões com `id` como `addClinicBtn`, `saveClinic`, `downloadCsv`.
- Local storage keys:
  - Clínicas: `clinics_v1` (manipulado em `assets/js/admin.js`).
  - Usuários: `usuarios` (carregado/atualizado por `assets/js/login.js` e opcionalmente por `usuarios.json`).
- Mock / defaults: `assets/js/admin.js` define `MOCK_USERS` e `DEFAULT_CLINICS` — útil como fonte de verdade ao criar testes manuais ou fixtures.
- Autenticação: `assets/js/login.js` usa `crypto.subtle.digest('SHA-256', ...)` para comparar hashes — preserve esse método ao ajustar a lógica de senha.
- Exportação/integração: `assets/js/admin.js` gera CSV com `Blob` e `URL.createObjectURL` para downloads.

## Execução local / Debug
- Não há build: sirva a pasta com um servidor estático para evitar problemas com `fetch` e caminhos relativos.
  - Recomendado (PowerShell):
    - `python -m http.server 8000` (a partir da raiz do projeto)
    - ou `npx http-server . -p 8000`
  - Depois abra: `http://localhost:8000/pages/index.html` ou `http://localhost:8000/pages/login/login.html`.
- Para edição rápida, usar a extensão Live Server do VS Code também funciona (assegure que o root seja a raiz do repositório).
- Debug: use DevTools (Console/Network). Verifique erros de `fetch` relativos a `usuarios.json` se abrir via `file://` — por isso o servidor é necessário.

## Boas práticas ao editar (regras práticas)
- Não renomeie IDs nem altere a estrutura DOM sem atualizar o JS correspondente (muitos handlers usam `getElementById` e `querySelector` com seletores explícitos).
- Ao alterar rotas/paths, verifique todos os `href` em `pages/` (links são hard-coded). Exemplos: cabeçalho em `components/header.html` utiliza links como `busca.html`, `minha_area.html`.
- Ao modificar dados persistentes, respeite as chaves de `localStorage` já em uso (`clinics_v1`, `usuarios`) para compatibilidade com dados existentes.

## Exemplos rápidos (onde e como)
- Atualizar header visual: editar `components/header.html` e `assets/css/header.css` (classes como `.dropdown-container`, `.logout-dropdown-menu`).
- Ajustar fluxo de login: `assets/js/login.js` — atenção ao uso de `crypto.subtle` e à busca opcional `../../usuarios.json`.
- Modificações do painel admin: `assets/js/admin.js` — funções exportadas em `window` (ex.: `removeClinic`, `editClinic`) são invocadas por botões gerados dinamicamente.

## O que não está aqui (limitações detectadas)
- Não existem testes automatizados nem pipeline de CI detectável; mudanças precisam ser validadas manualmente em um servidor local.
- Não há mecanismo de template/server-side: inclusão de `components/` é manual — tenha cuidado para manter consistência entre páginas.

## Feedback e iteração
Se algo aqui estiver incompleto ou você quiser exemplos adicionais (ex.: trechos de código para atualizar o fluxo de login ou um checklist de QA), diga quais áreas quer que eu detalhe e eu atualizo este arquivo.
