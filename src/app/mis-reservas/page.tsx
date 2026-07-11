"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useDemoSession } from "@/lib/useDemoSession";
import { useLocalStorageList } from "@/lib/useLocalStorageList";
import { SCHEDULE_STORAGE_KEYS, type Booking } from "@/lib/schedule-types";
import { formatDateEs } from "@/lib/schedule-utils";
import ChatThread from "@/components/ChatThread";

const statusLabels: Record<Booking["status"], string> = {
  pendiente: "Esperando respuesta",
  cotizada: "Te propusieron un precio",
  confirmada: "Confirmada",
  rechazada: "Rechazada",
  cancelada: "Cancelada",
};

const statusStyles: Record<Booking["status"], string> = {
  pendiente: "bg-amber-50 text-amber-700",
  cotizada: "bg-blue-50 text-blue-700",
  confirmada: "bg-brand-50 text-brand-700",
  rechazada: "bg-red-50 text-red-700",
  cancelada: "bg-ink-100 text-ink-500",
};

export default function MisReservasPage() {
  const { session, ready: sessionReady } = useDemoSession();
  const { items: bookings, update: updateBooking } = useLocalStorageList<Booking>(
    SCHEDULE_STORAGE_KEYS.bookings,
    () => []
  );
  const [openBookingId, setOpenBookingId] = useState<string | null>(null);

  useEffect(() => {
    const highlight = new URLSearchParams(window.location.search).get("highlight");
    if (highlight) setOpenBookingId(highlight);
  }, []);

  const myBookings = useMemo(
    () =>
      bookings
        .filter((b) => b.clientEmail.toLowerCase() === session.clientEmail.toLowerCase())
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [bookings, session.clientEmail]
  );

  if (!sessionReady) return null;

  return (
    <section className="section bg-ink-50">
      <div className="container-page max-w-3xl">
        <h1 className="text-3xl font-extrabold text-ink-900">Mis reservas</h1>
        <p className="mt-2 text-ink-600">
          Estás viendo las reservas de <strong>{session.clientEmail}</strong>. Cambiá tu email desde una nueva
          solicitud si querés simular otro cliente.
        </p>

        <div className="mt-8 space-y-3">
          {myBookings.length === 0 && (
            <div className="rounded-2xl border border-dashed border-ink-200 bg-white p-8 text-center">
              <p className="text-sm text-ink-500">Todavía no hiciste ninguna solicitud de turno.</p>
              <Link href="/servicios" className="btn-primary mt-4">Buscar un profesional</Link>
            </div>
          )}
          {myBookings.map((b) => (
            <div key={b.id} className="rounded-2xl border border-ink-100 bg-white shadow-soft">
              <button
                type="button"
                onClick={() => setOpenBookingId(openBookingId === b.id ? null : b.id)}
                className="flex w-full flex-wrap items-center justify-between gap-3 px-5 py-4 text-left"
              >
                <div>
                  <p className="text-sm font-semibold text-ink-900">{b.providerName} · {b.blockLabel}</p>
                  <p className="text-xs text-ink-500">{formatDateEs(b.date)} · {b.startTime}-{b.endTime}</p>
                </div>
                <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[b.status]}`}>
                  {statusLabels[b.status]}
                  {b.quoteAmount ? ` · $${b.quoteAmount.toLocaleString("es-AR")}` : ""}
                </span>
              </button>

              {openBookingId === b.id && (
                <div className="border-t border-ink-100 p-4">
                  <ChatThread booking={b} viewerRole="cliente" onUpdateBooking={(patch) => updateBooking(b.id, patch)} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
