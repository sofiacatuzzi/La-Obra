"use client";

import Link from "next/link";
import { useDemoSession } from "@/lib/useDemoSession";
import { providers } from "@/lib/providers";

export default function RoleSwitcher() {
  const { session, ready, setRole, setProviderId } = useDemoSession();

  if (!ready) return <div className="h-9 bg-ink-900" />;

  return (
    <div className="bg-ink-900 text-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-2 py-1.5 text-xs">
        <span className="text-ink-400">
          Demo interactiva — estás navegando como <strong className="text-white">{session.role}</strong>
        </span>
        <div className="flex flex-wrap items-center gap-2">
          <div className="flex overflow-hidden rounded-full border border-ink-700">
            <button
              type="button"
              onClick={() => setRole("cliente")}
              className={`px-3 py-1 font-semibold transition-colors ${
                session.role === "cliente" ? "bg-brand-600 text-white" : "text-ink-300 hover:text-white"
              }`}
            >
              Soy cliente
            </button>
            <button
              type="button"
              onClick={() => setRole("profesional")}
              className={`px-3 py-1 font-semibold transition-colors ${
                session.role === "profesional" ? "bg-brand-600 text-white" : "text-ink-300 hover:text-white"
              }`}
            >
              Soy profesional
            </button>
          </div>

          {session.role === "profesional" && (
            <select
              value={session.providerId}
              onChange={(e) => setProviderId(e.target.value)}
              className="rounded-full border border-ink-700 bg-ink-900 px-2 py-1 text-xs text-white"
            >
              {providers.map((p) => (
                <option key={p.id} value={p.id}>
                  {p.name}
                </option>
              ))}
            </select>
          )}

          {session.role === "profesional" ? (
            <Link href="/panel-profesional" className="rounded-full bg-white px-3 py-1 font-semibold text-ink-900 hover:bg-ink-100">
              Mi panel
            </Link>
          ) : (
            <Link href="/mis-reservas" className="rounded-full bg-white px-3 py-1 font-semibold text-ink-900 hover:bg-ink-100">
              Mis reservas
            </Link>
          )}
        </div>
      </div>
    </div>
  );
}
