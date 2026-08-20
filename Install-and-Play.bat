@echo off
setlocal EnableExtensions
title After Dark — One-Click Install & Play
color 0D
cd /d "%~dp0"

echo.
echo  ========================================
echo   AFTER DARK  v1.1 — Temple Build
echo   One-Click Install and Play
echo  ========================================
echo.

set "NODE_CMD=node"
set "NPM_CMD=npm"
if exist "%~dp0runtime\node-win\node.exe" (
  set "NODE_CMD=%~dp0runtime\node-win\node.exe"
  set "NPM_CMD=%~dp0runtime\node-win\npm.cmd"
)

where node >nul 2>&1
if errorlevel 1 (
  if not exist "%~dp0runtime\node-win\node.exe" (
    echo  [!] Node.js LTS is required.
    echo      Download: https://nodejs.org
    start https://nodejs.org
    echo.
    pause
    exit /b 1
  )
)

cd /d "%~dp0"
if not exist "package.json" (
  echo  [!] Missing package.json
  pause
  exit /b 1
)

if not exist "node_modules\react\package.json" (
  echo  [1/3] Installing dependencies (first run)...
  call %NPM_CMD% install --no-audit --no-fund
  if errorlevel 1 (
    echo  [!] npm install failed.
    pause
    exit /b 1
  )
) else (
  echo  [1/3] Dependencies ready (node_modules present).
)

if not exist "dist\index.html" (
  echo  [2/3] Building production bundle...
  call %NPM_CMD% run build
  if errorlevel 1 (
    echo  [!] Build failed.
    pause
    exit /b 1
  )
) else (
  echo  [2/3] Production build ready.
)

echo  [3/3] Starting After Dark...
echo.
echo  --------------------------------------
echo   Open:  http://127.0.0.1:5173/
echo   Admin password: afterdark
echo  --------------------------------------
echo.
echo  Press Ctrl+C in this window to stop.
echo.

start "" cmd /c "timeout /t 2 /nobreak >nul & start http://127.0.0.1:5173/"

call %NPM_CMD% start
if errorlevel 1 (
  echo  [!] Server exited with an error.
  pause
  exit /b 1
)
pause
endlocal
