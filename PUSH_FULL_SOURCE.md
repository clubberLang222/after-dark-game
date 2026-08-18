# Push full After Dark source to GitHub

Repo: https://github.com/clubberLang222/after-dark-game

## Option A — from full-source zip

```bash
unzip after-dark-game-full-source.zip -d after-dark-game
cd after-dark-game
git init
git remote add origin https://github.com/clubberLang222/after-dark-game.git
git add .
git commit -m "Full After Dark source"
git branch -M main
git push -u origin main --force
```

## Option B — merge without force

```bash
git clone https://github.com/clubberLang222/after-dark-game.git
cd after-dark-game
unzip -o ../after-dark-game-full-source.zip
git add .
git commit -m "Complete game source tree"
git push
```

## Production

```bash
npm install
npm run build    # vite build --mode production → dist/
npm start        # static-server on 0.0.0.0:5173
```

Or: `npm run play`
