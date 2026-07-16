'use client';

// 🐷 BASH BUCKS — shared piggy bank that works on every page!
// Every page uses this hook so bucks earned in Math Zone show up in the Playroom too.

import { useState, useEffect, useCallback } from 'react';

const KEY = 'bashBucks';
const EVENT = 'bashbucks-change';

function readBucks(): number {
  if (typeof window === 'undefined') return 0;
  const raw = localStorage.getItem(KEY);
  const n = raw ? parseInt(raw) : 0;
  return isNaN(n) ? 0 : n;
}

export function useBashBucks() {
  const [bashBucks, setBashBucksState] = useState(0);

  useEffect(() => {
    const sync = () => setBashBucksState(readBucks());
    sync();
    window.addEventListener(EVENT, sync);
    window.addEventListener('storage', sync);
    return () => {
      window.removeEventListener(EVENT, sync);
      window.removeEventListener('storage', sync);
    };
  }, []);

  // Add (or subtract with a negative number) Bash Bucks. Never goes below 0.
  const addBucks = useCallback((amount: number) => {
    const next = Math.max(0, readBucks() + amount);
    localStorage.setItem(KEY, next.toString());
    window.dispatchEvent(new Event(EVENT));
  }, []);

  // Set the balance to an exact number (used by the Parent Admin panel).
  const setBucks = useCallback((amount: number) => {
    const next = Math.max(0, amount);
    localStorage.setItem(KEY, next.toString());
    window.dispatchEvent(new Event(EVENT));
  }, []);

  return { bashBucks, addBucks, setBucks };
}
