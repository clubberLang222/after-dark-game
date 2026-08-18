# After Dark

Premium party board game — **React + Vite + TypeScript**.

**Repository:** https://github.com/clubberLang222/after-dark-game

## Quick start (development)

```bash
git clone https://github.com/clubberLang222/after-dark-game.git
cd after-dark-game
npm install
npm run dev
```

Open the URL Vite prints (usually http://localhost:5173/).

## Production build

```bash
npm install
npm run build          # outputs to dist/
npm start              # serves dist on port 5173 (all interfaces)
```

Or: `npm run play`

Admin password: **afterdark**

## Smart TV casting

1. Host starts the game
2. Local Network mode → room code
3. TV browser: `http://<host-lan-ip>:5173/?display=ROOMCODE`
4. Controllers: `?join=ROOMCODE`

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server |
| `npm run build` | Production → `dist/` |
| `npm start` | Serve production |
| `npm run play` | build + start |
| `npm run relay` | WebSocket relay |
