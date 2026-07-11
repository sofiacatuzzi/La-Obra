"use client";

import { useEffect, useState } from "react";
import {
  createAvailabilityBlock,
  deleteAvailabilityBlock,
  fetchAvailabilityBlocks,
  updateAvailabilityBlock,
} from "@/lib/supabase/scheduleApi";
import { dayLabels, type AvailabilityBlock, type DayOfWeek } from "@/lib/schedule-types";
import { CheckCircleIcon, XIcon } from "@/components/Icons";

const dayOptions: DayOfWeek[] = [1, 2, 3, 4, 5, 6, 0];

export default function AvailabilityEditor({ providerId }: { providerId: string }) {
  const [blocks, setBlocks] = useState<AvailabilityBlock[]>([]);
  const [ready, setReady] = useState(false);
  const [showForm, setShowForm] = useState(false);
  const [draft, setDraft] = useState({
    dayOfWeek: 1 as DayOfWeek,
    startTime: "09:00",
    endTime: "13:00",
    label: "Visita de chequeo",
    slotMinutes: 60,
  });

  async function reload() {
    const data = await fetchAvailabilityBlocks(providerId);
    setBlocks(data);
    setReady(true);
  }

  useEffect(() => {
    reload();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [providerId]);

  const providerBlocks = [...blocks].sort(
    (a, b) => a.dayOfWeek - b.dayOfWeek || a.startTime.localeCompare(b.startTime)
  );

  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    await createAvailabilityBlock({
      providerId,
      dayOfWeek: draft.dayOfWeek,
      startTime: draft.startTime,
      endTime: draft.endTime,
      label: draft.label || "Disponibilidad",
      slotMinutes: draft.slotMinutes,
      visible: true,
    });
    setShowForm(false);
    setDraft({ dayOfWeek: 1, startTime: "09:00", endTime: "13:00", label: "Visita de chequeo", slotMinutes: 60 });
    await reload();
  }

  async function handleToggleVisible(block: AvailabilityBlock) {
    await updateAvailabilityBlock(block.id, { visible: !block.visible });
    await reload();
  }

  async function handleDelete(id: string) {
    await deleteAvailabilityBlock(id);
    await reload();
  }

  if (!ready) return <div className="h-40 animate-pulse rounded-2xl border border-ink-100 bg-ink-50" />;

  return (
    <div>
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-base font-semibold text-ink-900">Tus bloques de disponibilidad</h3>
          <p className="mt-1 text-sm text-ink-500">
            Definí tus días y horarios. Marcalos como públicos para que los clientes puedan reservarlos, o privados
            para bloquear tiempo sin mostrarlo (por ejemplo, para vos o para otros compromisos).
          </p>
        </div>
        <button type="button" onClick={() => setShowForm((v) => !v)} className="btn-primary shrink-0">
          {showForm ? "Cerrar" : "Agregar bloque"}
        </button>
      </div>

      {showForm && (
        <form onSubmit={handleAdd} className="mt-4 grid gap-3 rounded-2xl border border-ink-100 bg-ink-50/60 p-4 sm:grid-cols-5">
          <select
            value={draft.dayOfWeek}
            onChange={(e) => setDraft((d) => ({ ...d, dayOfWeek: Number(e.target.value) as DayOfWeek }))}
            className="rounded-lg border border-ink-200 px-3 py-2 text-sm"
          >
            {dayOptions.map((d) => (
              <option key={d} value={d}>{dayLabels[d]}</option>
            ))}
          </select>
          <input
            type="time"
            value={draft.startTime}
            onChange={(e) => setDraft((d) => ({ ...d, startTime: e.target.value }))}
            className="rounded-lg border border-ink-200 px-3 py-2 text-sm"
          />
          <input
            type="time"
            value={draft.endTime}
            onChange={(e) => setDraft((d) => ({ ...d, endTime: e.target.value }))}
            className="rounded-lg border border-ink-200 px-3 py-2 text-sm"
          />
          <input
            value={draft.label}
            onChange={(e) => setDraft((d) => ({ ...d, label: e.target.value }))}
            placeholder="Ej: Arreglo grande"
            className="rounded-lg border border-ink-200 px-3 py-2 text-sm sm:col-span-2"
          />
          <select
            value={draft.slotMinutes}
            onChange={(e) => setDraft((d) => ({ ...d, slotMinutes: Number(e.target.value) }))}
            className="rounded-lg border border-ink-200 px-3 py-2 text-sm"
          >
            {[30, 45, 60, 90, 120, 180].map((m) => (
              <option key={m} value={m}>Turnos de {m} min</option>
            ))}
          </select>
          <button type="submit" className="btn-secondary sm:col-span-4">Guardar bloque</button>
        </form>
      )}

      <div className="mt-5 space-y-2">
        {providerBlocks.length === 0 && (
          <p className="rounded-xl border border-dashed border-ink-200 p-6 text-sm text-ink-500">
            Todavía no cargaste horarios. Agregá un bloque para que la gente pueda reservarte.
          </p>
        )}
        {providerBlocks.map((b) => (
          <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-100 bg-white px-4 py-3">
            <div>
              <p className="text-sm font-semibold text-ink-900">
                {dayLabels[b.dayOfWeek]} · {b.startTime} - {b.endTime}
              </p>
              <p className="text-xs text-ink-500">{b.label} · turnos de {b.slotMinutes} min</p>
            </div>
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => handleToggleVisible(b)}
                className={`flex items-center gap-1.5 rounded-full px-3 py-1.5 text-xs font-semibold ${
                  b.visible ? "bg-brand-50 text-brand-700" : "bg-ink-100 text-ink-500"
                }`}
              >
                <CheckCircleIcon className="h-3.5 w-3.5" /> {b.visible ? "Público" : "Privado"}
              </button>
              <button
                type="button"
                onClick={() => handleDelete(b.id)}
                aria-label="Eliminar bloque"
                className="flex h-7 w-7 items-center justify-center rounded-full text-ink-400 hover:bg-ink-100 hover:text-ink-700"
              >
                <XIcon className="h-4 w-4" />
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
