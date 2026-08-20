# After Dark

Premium **swingers-party** board game — React + Vite + TypeScript + Three.js.

**Repository:** https://github.com/clubberLang222/after-dark-game

## Download

| Package | Link |
|--------|------|
| **Source ZIP (latest main)** | https://github.com/clubberLang222/after-dark-game/archive/refs/heads/main.zip |
| **Browse code** | https://github.com/clubberLang222/after-dark-game |
| **Clone** | `git clone https://github.com/clubberLang222/after-dark-game.git` |

After unzipping the Source ZIP you get a folder like `after-dark-game-main/`.

## One-click / quick start

```bash
git clone https://github.com/clubberLang222/after-dark-game.git
cd after-dark-game
npm install
npm run build
npm start
```

Open **http://127.0.0.1:5173/**  
Admin password: **`afterdark`**

Windows: use `Install-and-Play.bat` or `Start After Dark.vbs` if present.  
Mac/Linux: `chmod +x Install-and-Play.sh && ./Install-and-Play.sh`

## What’s new (v1.1 — Temple)

- **3D temple boards** with dynamic column lighting  
- **Compact gameplay UI**  
- **Named challenge participants** on every card  
- **Private-room camera / video challenges**  
- **Swingers-party Master Spec** (`MASTER_SPEC.md`)  
- **3D dice** that roll across the board  
- Multiplayer: host + phone controllers + TV display  

## Scripts

| Script | Description |
|--------|-------------|
| `npm run dev` | Vite dev server (HMR) |
| `npm run build` | Production build → `dist/` |
| `npm start` | Serve production `dist/` on port 5173 |
| `npm run play` | build + start |
| `npm run relay` | WebSocket room relay |

## Stack

- Single authoritative `GameEngine`
- Multiplayer (BroadcastChannel + optional WS)
- Admin CMS · media hooks · PWA-friendly meta

## License

Private / project use — After Dark.
