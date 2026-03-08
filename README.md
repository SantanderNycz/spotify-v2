# 🎵 Spotify Clone — React + Vite + Tailwind CSS

Um clone fiel da interface do Spotify, construído do zero com React 18, Vite e Tailwind CSS.

## ✨ Funcionalidades

- **Layout idêntico ao Spotify** — sidebar, conteúdo principal e player fixo no rodapé
- **Player completo** — play/pause, próxima/anterior, shuffle, repeat (off/all/one), barra de progresso interativa, controle de volume, mudo
- **Home View** — saudação dinâmica (bom dia/tarde/noite), músicas recentes, Feitos para você, Populares agora, Artistas
- **Search View** — busca em tempo real com debounce (300ms), grid de categorias coloridas, estado de resultado vazio
- **Skeleton loading** — shimmer nos cards enquanto carrega
- **Hover effects** — botão Play verde surge no hover de cada card
- **Biblioteca** — lista de playlists na sidebar com filtros (Playlists, Podcasts, Álbuns, Artistas)
- **Gradiente dinâmico** no fundo do conteúdo
- **Equalizer animado** na sidebar para faixa em reprodução
- **Scrollbar customizada** no estilo Spotify
- **Totalmente responsivo**

## 🚀 Como rodar

```bash
# 1. Instalar dependências
npm install

# 2. Iniciar servidor de desenvolvimento
npm run dev

# 3. Abrir no navegador
http://localhost:5173
```

## 📦 Build para produção

```bash
npm run build
npm run preview
```

## 🛠️ Stack

- **React 18** — UI components
- **Vite 5** — bundler ultrarrápido
- **Tailwind CSS 3** — estilização utility-first
- **Lucide React** — ícones SVG

## 📁 Estrutura

```
src/
├── components/
│   ├── Sidebar.jsx       — Sidebar com logo, nav e biblioteca
│   ├── TopBar.jsx        — Barra de topo com navegação e auth
│   ├── HomeView.jsx      — View principal com seções de playlists
│   ├── SearchView.jsx    — Busca com debounce e categorias
│   ├── PlaylistCard.jsx  — Card reutilizável + skeleton + recent card
│   └── Player.jsx        — Player completo no rodapé
├── context/
│   └── PlayerContext.jsx — Estado global do player (React Context)
├── data/
│   └── mockData.js       — Dados mockados de playlists, artistas etc.
├── App.jsx
├── main.jsx
└── index.css
```

## 🔜 Próximos passos

1. **Spotify Web API** — integrar OAuth 2.0 PKCE para busca real
2. **Reprodução de áudio** — Web Audio API ou integrar com Howler.js
3. **Páginas de playlist** — view com tracklist
4. **Página de artista** — bio, top tracks, álbuns
5. **Backend** — Node.js + Express + JSON Server para API própria

---

Feito com ❤️ — baseado na Imersão Spotify Alura
