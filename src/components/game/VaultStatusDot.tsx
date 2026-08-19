/**
 * Discrete vault indicator — no label for the table.
 * Red = vault on, green = vault off (Admin setting).
 */
import { useEffect, useState } from 'react';
import { getVaultMeta } from '../../utils/mediaVault';

export function VaultStatusDot() {
  const [on, setOn] = useState(() => getVaultMeta().enabled);

  useEffect(() => {
    const tick = () => setOn(getVaultMeta().enabled);
    const id = window.setInterval(tick, 2000);
    const onStorage = (e: StorageEvent) => {
      if (e.key?.includes('vault')) tick();
    };
    window.addEventListener('storage', onStorage);
    return () => {
      clearInterval(id);
      window.removeEventListener('storage', onStorage);
    };
  }, []);

  return (
    <span
      className={`vault-status-dot ${on ? 'vault-on' : 'vault-off'}`}
      title=""
      aria-hidden
    />
  );
}
