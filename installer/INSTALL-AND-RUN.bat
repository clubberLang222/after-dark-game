@echo off
title After Dark - Android Host
color 0D
cd /d "%~dp0"

where node >nul 2>&1
if errorlevel 1 (
  echo Install Node.js from https://nodejs.org
  start https://nodejs.org
  pause
  exit /b 1
)

if not exist host-for-android.mjs (
  echo host-for-android.mjs missing
  pause
  exit /b 1
)

if exist package.json if not exist node_modules\ call npm install --no-audit --no-fund

echo Starting Android host - keep this window open
node host-for-android.mjs
pause
