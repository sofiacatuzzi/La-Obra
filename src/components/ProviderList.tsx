"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import { fetchProvidersByCategory, type ProviderProfile } from "@/lib/supabase/scheduleApi";
import { ShieldIcon } from "@/components/Icons";

function initialsOf(name: string) {
  return name
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");
}

export default function ProviderList({ categorySlug, categoryName }: { categorySlug: string; categoryName: string }) {
  const [providers, setProviders] = useState<ProviderProfile[]>([]);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    fetchProvidersByCategory(categorySlug).then((data) => {
      setProviders(data);
      setReady(true);
    });
  }, [categorySlug]);

  if (!ready) {
    return (
      <div className="space-y-3">
        <div className="h-24 animate-pulse rounded-2xl border border-ink-100 bg-ink-50" />
        <div className="h-24 animate-pulse rounded-2xl border border-ink-100 bg-ink-50" />
      </div>
    );
  }

  if (providers.length === 0) {
    return (
      <p className="rounded-xl border border-dashed border-ink-200 p-6 text-sm text-ink-500">
        Todavía no hay {categoryName.toLowerCase()}s registrados en tu zona. ¡Publicá tu pedido igual y te avisamos
        apenas se sume un profesional!
      </p>
    );
  }

  return (
    <div className="space-y-4">
      {providers.map((p) => (
        <div key={p.id} className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
          <div className="flex items-center gap-4">
            <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-white">
              {initialsOf(p.fullName) || "?"}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <p className="font-semibold text-ink-900">{p.fullName}</p>
                {p.verified && (
                  <span className="flex items-center gap-1 text-xs font-medium text-brand-600">
                    <ShieldIcon className="h-3.5 w-3.5" /> Verificado
                  </span>
                )}
              </div>
              <p className="text-xs text-ink-500">{p.city}</p>
              <p className="mt-1 text-sm text-ink-600">{p.bio}</p>
            </div>
          </div>
          <div className="flex w-full flex-col gap-2 sm:w-auto sm:flex-row">
            <Link href={`/profesional/${p.id}`} className="btn-primary w-full sm:w-auto">
              Ver agenda y reservar
            </Link>
          </div>
        </div>
      ))}
    </div>
  );
}
