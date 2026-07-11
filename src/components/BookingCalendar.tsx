"use client";

import { useMemo, useState } from "react";
import Link from "next/link";
import { useLocalStorageList } from "@/lib/useLocalStorageList";
import { useDemoSession } from "@/lib/useDemoSession";
import { seedAvailabilityBlocks } from "@/lib/schedule-seed";
import { SCHEDULE_STORAGE_KEYS, type AvailabilityBlock, type Booking, type ChatMessage, type DateOverride } from "@/lib/schedule-types";
import { formatDateEs, generateUpcomingSlots } from "@/lib/schedule-utils";
import { CheckCircleIcon, ShieldIcon } from "@/components/Icons";

type Props = {
  providerId: string;
  providerName: string;
  categorySlug: string;
};

type SelectedSlot = { date: string; blockId: string; label: string; startTime: string; endTime: string };

export default function BookingCalendar({ providerId, providerName, categorySlug }: Props) {
  const { items: blocks, ready: blocksReady } = useLocalStorageList<AvailabilityBlock>(
    SCHEDULE_STORAGE_KEYS.availability,
    seedAvailabilityBlocks
  );
  const { items: overrides } = useLocalStorageList<DateOverride>(SCHEDULE_STORAGE_KEYS.overrides, () => []);
  const { items: bookings, add: addBooking } = useLocalStorageList<Booking>(SCHEDULE_STORAGE_KEYS.bookings, () => []);
  const { add: addMessage } = useLocalStorageList<ChatMessage>(SCHEDULE_STORAGE_KEYS.messages, () => []);
  const { session, setClientInfo } = useDemoSession();

  const [selected, setSelected] = useState<SelectedSlot | null>(null);
  const [form, setForm] = useState({ nombre: session.clientName, email: session.clientEmail, descripcion: "" });
  const [confirmedBookingId, setConfirmedBookingId] = useState<string | null>(null);

  const days = useMemo(
    () => generateUpcomingSlots(providerId, blocks, overrides, bookings, 21).slice(0, 8),
    [providerId, blocks, overrides, bookings]
  );

  function handleBook(e: React.FormEvent) {
    e.preventDefault();
    if (!selected) return;

    const id = `bk-${Date.now()}`;
    const booking: Booking = {
      id,
      providerId,
      providerName,
      categorySlug,
      blockLabel: selected.label,
      date: selected.date,
      startTime: selected.startTime,
      endTime: selected.endTime,
      clientName: form.nombre,
      clientEmail: form.email,
      jobDescription: form.descripcion,
      status: "pendiente",
      createdAt: new Date().toISOString(),
    };
    addBooking(booking);
    setClientInfo(form.nombre, form.email);
    addMessage({
      id: `msg-${Date.now()}`,
      bookingId: id,
      sender: "cliente",
      kind: "texto",
      text: form.descripcion,
      createdAt: new Date().toISOString(),
    });
    setConfirmedBookingId(id);
    setSelected(null);
  }

  if (confirmedBookingId) {
    return (
      <div className="rounded-2xl2 border border-ink-100 bg-white p-8 shadow-card">
        <CheckCircleIcon className="h-10 w-10 text-brand-600" />
        <h3 className="mt-4 text-xl font-bold text-ink-900">Solicitud enviada</h3>
        <p className="mt-2 text-sm text-ink-600">
          Le avisamos a {providerName}. Podés seguir la conversación y ver si confirma o te propone otro precio desde
          tu chat de la reserva.
        </p>
        <Link href={`/mis-reservas?highlight=${confirmedBookingId}`} className="btn-primary mt-5">
          Ir a mi chat con {providerName.split(" ")[0]}
        </Link>
      </div>
    );
  }

  if (!blocksReady) {
    return <div className="h-40 animate-pulse rounded-2xl2 border border-ink-100 bg-ink-50" />;
  }

  return (
    <div className="rounded-2xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
      <h3 className="text-lg font-bold text-ink-900">Disponibilidad de {providerName}</h3>
      <p className="mt-1 text-sm text-ink-500">
        Elegí un horario para pedir el turno. {providerName.split(" ")[0]} confirma y te dice el precio por chat.
      </p>

      {days.length === 0 && (
        <p className="mt-6 rounded-xl border border-dashed border-ink-200 p-6 text-sm text-ink-500">
          No hay horarios públicos cargados por el momento.
        </p>
      )}

      <div className="mt-6 space-y-5">
        {days.map((day) => (
          <div key={day.date}>
            <p className="text-sm font-semibold text-ink-900">{formatDateEs(day.date)}</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {day.slots.map((slot) => (
                <button
                  key={`${day.date}-${slot.startTime}`}
                  type="button"
                  disabled={!slot.available}
                  onClick={() =>
                    setSelected({ date: day.date, blockId: slot.blockId, label: slot.label, startTime: slot.startTime, endTime: slot.endTime })
                  }
                  className={`rounded-xl border px-3 py-2 text-left text-xs transition-colors ${
                    slot.available
                      ? "border-ink-200 bg-white hover:border-brand-400 hover:bg-brand-50"
                      : "cursor-not-allowed border-ink-100 bg-ink-50 text-ink-300 line-through"
                  }`}
                >
                  <span className="block font-semibold text-ink-900">
                    {slot.startTime} - {slot.endTime}
                  </span>
                  <span className="text-ink-500">{slot.label}</span>
                </button>
              ))}
            </div>
          </div>
        ))}
      </div>

      {selected && (
        <form onSubmit={handleBook} className="mt-8 space-y-4 rounded-2xl border border-brand-200 bg-brand-50 p-5">
          <p className="text-sm font-semibold text-ink-900">
            Reservar {selected.label.toLowerCase()} — {formatDateEs(selected.date)} de {selected.startTime} a {selected.endTime}
          </p>
          <div className="grid gap-3 sm:grid-cols-2">
            <input
              required
              value={form.nombre}
              onChange={(e) => setForm((f) => ({ ...f, nombre: e.target.value }))}
              placeholder="Tu nombre"
              className="rounded-xl border border-ink-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <input
              required
              type="email"
              value={form.email}
              onChange={(e) => setForm((f) => ({ ...f, email: e.target.value }))}
              placeholder="Tu email"
              className="rounded-xl border border-ink-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>
          <textarea
            required
            rows={3}
            value={form.descripcion}
            onChange={(e) => setForm((f) => ({ ...f, descripcion: e.target.value }))}
            placeholder="Contale a este profesional qué necesitás"
            className="w-full rounded-xl border border-ink-200 px-3 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          <div className="flex flex-col gap-2 sm:flex-row sm:items-center sm:justify-between">
            <p className="flex items-center gap-1.5 text-xs text-ink-600">
              <ShieldIcon className="h-4 w-4 text-brand-600" /> Es una solicitud, no se cobra nada todavía.
            </p>
            <div className="flex gap-2">
              <button type="button" onClick={() => setSelected(null)} className="btn-outline">
                Cancelar
              </button>
              <button type="submit" className="btn-primary">
                Enviar solicitud
              </button>
            </div>
          </div>
        </form>
      )}
    </div>
  );
}
