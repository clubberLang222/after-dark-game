import { useMemo, useState } from 'react';
import { buildDisplayUrl, buildJoinUrl, openCastWindow } from '../../utils/cast';

interface Props {
  roomCode: string;
  originOverride?: string;
}

export function CastPanel({ roomCode, originOverride }: Props) {
  const [copied, setCopied] = useState<'tv' | 'join' | null>(null);
  const displayUrl = useMemo(
    () => buildDisplayUrl(roomCode, originOverride),
    [roomCode, originOverride]
  );
  const joinUrl = useMemo(
    () => buildJoinUrl(roomCode, originOverride),
    [roomCode, originOverride]
  );

  const copy = async (kind: 'tv' | 'join', url: string) => {
    try {
      await navigator.clipboard.writeText(url);
      setCopied(kind);
      setTimeout(() => setCopied(null), 2000);
    } catch {
      /* ignore */
    }
  };

  return (
    <div className="cast-panel card">
      <h3>Cast to Smart TV</h3>
      <p className="picker-hint">
        On the TV browser (same Wi-Fi), open the URL below. Display is read-only.
      </p>
      <label className="cast-label">TV display URL</label>
      <code className="join-url cast-url">{displayUrl}</code>
      <div className="cast-actions">
        <button type="button" className="primary" onClick={() => openCastWindow(roomCode)}>
          Open TV window
        </button>
        <button type="button" className="ghost" onClick={() => copy('tv', displayUrl)}>
          {copied === 'tv' ? 'Copied' : 'Copy TV link'}
        </button>
      </div>
      <label className="cast-label">Controller join URL</label>
      <code className="join-url cast-url">{joinUrl}</code>
      <button type="button" className="ghost" onClick={() => copy('join', joinUrl)}>
        {copied === 'join' ? 'Copied' : 'Copy join link'}
      </button>
    </div>
  );
}
