import http from 'http';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';
const __dirname = path.dirname(fileURLToPath(import.meta.url));
const root = path.join(__dirname, '..', 'dist');
const port = Number(process.argv[2] || process.env.PORT || 5173);
const host = process.env.HOST || '0.0.0.0';
const MIME = { '.html': 'text/html; charset=utf-8', '.js': 'text/javascript; charset=utf-8', '.css': 'text/css; charset=utf-8', '.json': 'application/json', '.svg': 'image/svg+xml', '.png': 'image/png', '.webmanifest': 'application/manifest+json' };
if (!fs.existsSync(root)) { console.error('[After Dark] dist/ missing. Run: npm run build'); process.exit(1); }
http.createServer((req, res) => {
  let urlPath = decodeURIComponent((req.url || '/').split('?')[0]);
  if (urlPath === '/') urlPath = '/index.html';
  let filePath = path.normalize(path.join(root, urlPath));
  if (!filePath.startsWith(root)) { res.writeHead(403); res.end('Forbidden'); return; }
  if (!fs.existsSync(filePath) || fs.statSync(filePath).isDirectory()) filePath = path.join(root, 'index.html');
  const ext = path.extname(filePath).toLowerCase();
  res.writeHead(200, { 'Content-Type': MIME[ext] || 'application/octet-stream', 'Cache-Control': ext === '.html' ? 'no-cache' : 'public, max-age=31536000, immutable' });
  res.end(fs.readFileSync(filePath));
}).listen(port, host, () => {
  console.log('After Dark (production)');
  console.log('  → http://127.0.0.1:' + port + '/');
  console.log('  → http://<lan-ip>:' + port + '/');
});
