export function buildDisplayUrl(roomCode: string, origin?: string): string {
  const base = (origin || (typeof window !== 'undefined' ? window.location.origin : '')).replace(/\/$/, '');
  return `${base}/?display=${encodeURIComponent(roomCode.toUpperCase())}`;
}

export function buildJoinUrl(roomCode: string, origin?: string): string {
  const base = (origin || (typeof window !== 'undefined' ? window.location.origin : '')).replace(/\/$/, '');
  return `${base}/?join=${encodeURIComponent(roomCode.toUpperCase())}`;
}

export function openCastWindow(roomCode: string): Window | null {
  return window.open(buildDisplayUrl(roomCode), 'afterdark_tv', 'noopener,noreferrer');
}
