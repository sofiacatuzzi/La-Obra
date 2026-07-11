"use client";

import { useCallback, useEffect, useState } from "react";
import { providers } from "@/lib/providers";

export type DemoRole = "cliente" | "profesional";

export type DemoSession = {
  role: DemoRole;
  providerId: string;
  clientName: string;
  clientEmail: string;
};

const STORAGE_KEY = "la-obra:demo-session";
const SYNC_EVENT = "la-obra:sync:demo-session";

const defaultSession: DemoSession = {
  role: "cliente",
  providerId: providers[0].id,
  clientName: "Vos",
  clientEmail: "vos@ejemplo.com",
};

function readSession(): DemoSession {
  const raw = window.localStorage.getItem(STORAGE_KEY);
  if (!raw) return defaultSession;
  try {
    return { ...defaultSession, ...(JSON.parse(raw) as Partial<DemoSession>) };
  } catch {
    return defaultSession;
  }
}

export function useDemoSession() {
  const [session, setSession] = useState<DemoSession>(defaultSession);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    setSession(readSession());
    setReady(true);
  }, []);

  useEffect(() => {
    function resync() {
      setSession(readSession());
    }
    function onStorage(e: StorageEvent) {
      if (e.key === STORAGE_KEY) resync();
    }
    window.addEventListener("storage", onStorage);
    window.addEventListener(SYNC_EVENT, resync);
    return () => {
      window.removeEventListener("storage", onStorage);
      window.removeEventListener(SYNC_EVENT, resync);
    };
  }, []);

  const persist = useCallback((patch: Partial<DemoSession>) => {
    const next = { ...readSession(), ...patch };
    setSession(next);
    window.localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
    window.dispatchEvent(new Event(SYNC_EVENT));
  }, []);

  const setRole = useCallback((role: DemoRole) => persist({ role }), [persist]);
  const setProviderId = useCallback((providerId: string) => persist({ providerId }), [persist]);
  const setClientInfo = useCallback(
    (clientName: string, clientEmail: string) => persist({ clientName, clientEmail }),
    [persist]
  );

  return { session, ready, setRole, setProviderId, setClientInfo };
}
