"use client";

import { useCallback, useEffect, useState } from "react";

function readList<T>(key: string, seed: () => T[]): T[] {
  const raw = window.localStorage.getItem(key);
  if (!raw) {
    const seeded = seed();
    window.localStorage.setItem(key, JSON.stringify(seeded));
    return seeded;
  }
  try {
    return JSON.parse(raw) as T[];
  } catch {
    return seed();
  }
}

function syncEventName(key: string) {
  return `la-obra:sync:${key}`;
}

export function useLocalStorageList<T extends { id: string }>(key: string, seed: () => T[]) {
  const [items, setItems] = useState<T[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setItems(readList(key, seed));
    setReady(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  useEffect(() => {
    function resync() {
      setItems(readList(key, seed));
    }
    function onStorage(e: StorageEvent) {
      if (e.key === key) resync();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener(syncEventName(key), resync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(syncEventName(key), resync);
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [key]);

  const persist = useCallback(
    (updater: T[] | ((current: T[]) => T[])) => {
      const current = readList<T>(key, seed);
      const next = typeof updater === "function" ? (updater as (c: T[]) => T[])(current) : updater;
      setItems(next);
      window.localStorage.setItem(key, JSON.stringify(next));
      window.dispatchEvent(new Event(syncEventName(key)));
    },
    // eslint-disable-next-line react-hooks/exhaustive-deps
    [key]
  );

  const add = useCallback((item: T) => persist((current) => [...current, item]), [persist]);

  const update = useCallback(
    (id: string, patch: Partial<T>) => persist((current) => current.map((i) => (i.id === id ? { ...i, ...patch } : i))),
    [persist]
  );

  const remove = useCallback((id: string) => persist((current) => current.filter((i) => i.id !== id)), [persist]);

  return { items, ready, add, update, remove, setAll: persist };
}
