#!/usr/bin/env bash
# After Dark — One-Click Install & Play (macOS / Linux)
set -euo pipefail
ROOT="$(cd "$(dirname "$0")" && pwd)"
cd "$ROOT"

echo ""
echo "  ========================================"
echo "   AFTER DARK  v1.1 — Temple Build"
echo "   One-Click Install and Play"
echo "  ========================================"
echo ""

if ! command -v node >/dev/null 2>&1; then
  echo "  [!] Node.js LTS required: https://nodejs.org"
  exit 1
fi
if ! command -v npm >/dev/null 2>&1; then
  echo "  [!] npm not found (install Node.js LTS)"
  exit 1
fi

if [[ ! -f package.json ]]; then
  echo "  [!] Missing package.json"
  exit 1
fi

if [[ ! -f node_modules/react/package.json ]]; then
  echo "  [1/3] Installing dependencies (first run)..."
  npm install --no-audit --no-fund
else
  echo "  [1/3] Dependencies ready."
fi

if [[ ! -f dist/index.html ]]; then
  echo "  [2/3] Building production bundle..."
  npm run build
else
  echo "  [2/3] Production build ready."
fi

echo "  [3/3] Starting After Dark..."
echo ""
echo "  --------------------------------------"
echo "   Open:  http://127.0.0.1:5173/"
echo "   Admin password: afterdark"
echo "  --------------------------------------"
echo ""

(sleep 2 && (xdg-open "http://127.0.0.1:5173/" 2>/dev/null || open "http://127.0.0.1:5173/" 2>/dev/null || true)) &

npm start
