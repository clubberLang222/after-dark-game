# Full source on main

Core runtime fixes are on `main`. For the complete tree (engine, board, admin, cards, CSS):

```bash
# From AfterDark-Finished-Game.zip or local AfterDark-App/game:
cd after-dark-game-source
git init
git remote add origin https://github.com/clubberLang222/after-dark-game.git
git add .
git commit -m "Full After Dark source"
git branch -M main
git push -u origin main --force
```

Or clone and copy files over, then `git add -A && git commit && git push`.
