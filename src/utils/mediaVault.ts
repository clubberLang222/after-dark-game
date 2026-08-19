/**
 * Admin-only local media vault (Master).
 * Stores challenge photos/videos on this device (IndexedDB).
 */

const DB_NAME = 'afterdark-media-vault';
const STORE = 'clips';
const META_KEY = 'afterdark:vault:meta:v1';

export interface VaultClip {
  id: string;
  blob: Blob;
  mime: string;
  name: string;
  cardId?: string;
  cardTitle?: string;
  playerName?: string;
  createdAt: number;
}

export interface VaultMeta {
  enabled: boolean;
  consentAcknowledged: boolean;
}

function defaultMeta(): VaultMeta {
  return { enabled: true, consentAcknowledged: false };
}

export function getVaultMeta(): VaultMeta {
  try {
    const raw = localStorage.getItem(META_KEY);
    if (!raw) return defaultMeta();
    return { ...defaultMeta(), ...JSON.parse(raw) };
  } catch {
    return defaultMeta();
  }
}

export function setVaultMeta(patch: Partial<VaultMeta>) {
  const next = { ...getVaultMeta(), ...patch };
  localStorage.setItem(META_KEY, JSON.stringify(next));
  return next;
}

function openDb(): Promise<IDBDatabase> {
  return new Promise((resolve, reject) => {
    const req = indexedDB.open(DB_NAME, 1);
    req.onerror = () => reject(req.error);
    req.onsuccess = () => resolve(req.result);
    req.onupgradeneeded = () => {
      const db = req.result;
      if (!db.objectStoreNames.contains(STORE)) {
        db.createObjectStore(STORE, { keyPath: 'id' });
      }
    };
  });
}

export async function vaultSave(
  file: File | Blob,
  meta: { name?: string; cardId?: string; cardTitle?: string; playerName?: string }
): Promise<string | null> {
  if (!getVaultMeta().enabled) return null;
  try {
    const db = await openDb();
    const id = `clip_${Date.now()}_${Math.random().toString(36).slice(2, 8)}`;
    const mime = file.type || 'application/octet-stream';
    const name = meta.name || (file instanceof File ? file.name : `capture_${id}`);
    const record: VaultClip = {
      id,
      blob: file,
      mime,
      name,
      cardId: meta.cardId,
      cardTitle: meta.cardTitle,
      playerName: meta.playerName,
      createdAt: Date.now(),
    };
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).put(record);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
    return id;
  } catch {
    return null;
  }
}

export async function vaultList(): Promise<Omit<VaultClip, 'blob'>[]> {
  try {
    const db = await openDb();
    const rows = await new Promise<VaultClip[]>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).getAll();
      req.onsuccess = () => resolve(req.result || []);
      req.onerror = () => reject(req.error);
    });
    db.close();
    return rows.map(({ blob: _b, ...rest }) => rest).sort((a, b) => b.createdAt - a.createdAt);
  } catch {
    return [];
  }
}

export async function vaultGet(id: string): Promise<VaultClip | null> {
  try {
    const db = await openDb();
    const row = await new Promise<VaultClip | undefined>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readonly');
      const req = tx.objectStore(STORE).get(id);
      req.onsuccess = () => resolve(req.result);
      req.onerror = () => reject(req.error);
    });
    db.close();
    return row || null;
  } catch {
    return null;
  }
}

export async function vaultDelete(id: string): Promise<boolean> {
  try {
    const db = await openDb();
    await new Promise<void>((resolve, reject) => {
      const tx = db.transaction(STORE, 'readwrite');
      tx.objectStore(STORE).delete(id);
      tx.oncomplete = () => resolve();
      tx.onerror = () => reject(tx.error);
    });
    db.close();
    return true;
  } catch {
    return false;
  }
}

export const CAMERA_CONSENT_TEXT =
  'Accepting use of cameras/cellphones may save media.';
