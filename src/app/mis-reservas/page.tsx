"use client";

import { useEffect, useMemo, useState } from "react";
import Link from "next/link";
import { useSupabaseUser } from "@/lib/supabase/useUser";
import { fetchBookingsForClient } from "@/lib/supabase/scheduleApi";
import type { Booking } from "@/lib/schedule-types";
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
  const { user, loading: userLoading } = useSupabaseUser();
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [dataReady, setDataReady] = useState(false);
  const [openBookingId, setOpenBookingId] = useState<string | null>(null);

  useEffect(() => {
    const highlight = new URLSearchParams(window.location.search).get("highlight");
    if (highlight) setOpenBookingId(highlight);
  }, []);

  useEffect(() => {
    if (!user) return;
    fetchBookingsForClient(user.id).then((data) => {
      setBookings(data);
      setDataReady(true);
    });
  }, [user]);

  const myBookings = useMemo(
    () => [...bookings].sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [bookings]
  );

  function handleUpdateBooking(id: string, patch: Partial<Booking>) {
    setBookings((current) => current.map((b) => (b.id === id ? { ...b, ...patch } : b)));
  }

  if (userLoading) return null;

  if (!user) {
    return (
      <section className="section container-page text-center">
        <p className="text-ink-600">Necesitás iniciar sesión para ver tus reservas.</p>
        <Link href="/login" className="btn-primary mt-4">Iniciar sesión</Link>
      </section>
    );
  }

  return (
    <section className="section bg-ink-50">
      <div className="container-page max-w-3xl">
        <h1 className="text-3xl font-extrabold text-ink-900">Mis reservas</h1>
        <p className="mt-2 text-ink-600">Acá vas a ver el estado de cada solicitud y podés seguir el chat con el profesional.</p>

        <div className="mt-8 space-y-3">
          {dataReady && myBookings.length === 0 && (
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
                  <ChatThread
                    booking={b}
                    viewerRole="cliente"
                    viewerId={user.id}
                    onUpdateBooking={(patch) => handleUpdateBooking(b.id, patch)}
                  />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
