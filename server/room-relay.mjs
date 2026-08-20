/**
 * After Dark — simple room relay for internet multiplayer.
 * Host and controllers connect with the same room code.
 *
 *   npm run relay
 *   Default: ws://localhost:8787
 */

import { WebSocketServer } from 'ws';
import { createServer } from 'http';

const PORT = Number(process.env.PORT || 8787);

const server = createServer((_req, res) => {
  res.writeHead(200, { 'Content-Type': 'text/plain' });
  res.end('After Dark room relay OK\n');
});

const wss = new WebSocketServer({ server });

/** @type {Map<string, Set<import('ws').WebSocket>>} */
const rooms = new Map();

function roomSet(code) {
  const key = String(code || '').toUpperCase();
  if (!rooms.has(key)) rooms.set(key, new Set());
  return rooms.get(key);
}

wss.on('connection', (ws) => {
  /** @type {string | null} */
  let room = null;

  ws.on('message', (raw) => {
    let data;
    try {
      data = JSON.parse(String(raw));
    } catch {
      return;
    }

    if (data.type === 'join' && data.room) {
      if (room) roomSet(room).delete(ws);
      room = String(data.room).toUpperCase();
      roomSet(room).add(ws);
      ws.send(
        JSON.stringify({
          type: 'system',
          message: `joined ${room}`,
          peers: roomSet(room).size,
        })
      );
      return;
    }

    if (data.type === 'relay' && data.room && data.msg) {
      const key = String(data.room).toUpperCase();
      const peers = roomSet(key);
      const payload = JSON.stringify({ type: 'relay', msg: data.msg });
      for (const peer of peers) {
        if (peer !== ws && peer.readyState === 1) {
          peer.send(payload);
        }
      }
    }
  });

  ws.on('close', () => {
    if (room) {
      const set = roomSet(room);
      set.delete(ws);
      if (set.size === 0) rooms.delete(room);
    }
  });
});

server.listen(PORT, () => {
  console.log(`After Dark room relay listening on ws://localhost:${PORT}`);
});
