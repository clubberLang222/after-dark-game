@echo off
title After Dark - Core Installer
color 0D
cd /d "%~dp0.."

echo.
echo  AFTER DARK - Core Installer
echo.

where node >nul 2>&1
if errorlevel 1 (
  echo  Install Node.js LTS: https://nodejs.org
  start https://nodejs.org
  pause
  exit /b 1
)

node -v

if exist game\package.json (
  cd game
) else if exist package.json (
  rem already in game root
) else (
  echo  package.json not found
  pause
  exit /b 1
)

if not exist node_modules\ (
  call npm install --no-audit --no-fund
)

call npm run build
if errorlevel 1 (
  call npm run dev
  pause
  exit /b 0
)

echo  Open http://127.0.0.1:5173/
call npm start
pause
