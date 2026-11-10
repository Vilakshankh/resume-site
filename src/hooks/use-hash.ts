import { useEffect, useState } from 'react';

export function parseHash(hash: string): { section: string; item?: string } {
  const trimmed = hash.startsWith('#') ? hash.slice(1) : hash;
  if (!trimmed) return { section: 'mission' };

  const slash = trimmed.indexOf('/');
  if (slash === -1) return { section: trimmed };

  const item = decodeURIComponent(trimmed.slice(slash + 1));
  return {
    section: trimmed.slice(0, slash),
    item: item || undefined,
  };
}

export function useHash() {
  const [hash, setHash] = useState(() => window.location.hash);

  useEffect(() => {
    const onChange = () => setHash(window.location.hash);
    window.addEventListener('hashchange', onChange);
    return () => window.removeEventListener('hashchange', onChange);
  }, []);

  return hash;
}
