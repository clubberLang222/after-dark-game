# After Dark

Premium **swingers-party** board game — React + Vite + TypeScript + Three.js.

**Repository:** https://github.com/clubberLang222/after-dark-game

## Download

| Package | Link |
|--------|------|
| **Source ZIP (latest main)** | https://github.com/clubberLang222/after-dark-game/archive/refs/heads/main.zip |
| **Browse code** | https://github.com/clubberLang222/after-dark-game |
| **Clone** | `git clone https://github.com/clubberLang222/after-dark-game.git` |

## Latest engine/UI upgrade — 2026-08-25

- Cinematic 3D challenge focus with the active pawn highlighted on card landing.
- Challenge card displayed in a compact right-side window instead of covering the board.
- Host QR/Game Info reserved in a dedicated right rail so it does not overlap the game board.
- Full-board presentation retained during normal play.
- Adaptive React Three Fiber performance monitoring.
- ACES Filmic tone mapping and sRGB output for improved 3D lighting.
- Higher-quality directional shadows and atmospheric temple effects.
- Difficulty-based challenge timers: Level 1 = 60s, Level 2 = 120s, Level 3 = 180s, Level 4 = 300s maximum.
- Final audit: 8/8 regression suites pass; 0 missing relative imports; 0 delimiter defects; JS/MJS/CJS syntax scan passes.
- See `UPGRADE-AUDIT-2026-08-25-FINAL.md` for the release audit and verification limitations.

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
