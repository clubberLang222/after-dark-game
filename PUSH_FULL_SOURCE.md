# Push full local tree to main

GitHub API pushes are limited; for the complete game (Board, GameEngine, App.css, cards, Admin):

```bash
cd AfterDark-App/game   # or AfterDark-Finished
git init
git remote add origin https://github.com/clubberLang222/after-dark-game.git
git add .
git commit -m "Full After Dark source"
git branch -M main
git push -u origin main --force
```

Latest features: frisky levels, media vault, vault status dot, board particles, richer pawns/boards.
