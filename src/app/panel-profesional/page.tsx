"use client";

import { useMemo, useState } from "react";
import { useDemoSession } from "@/lib/useDemoSession";
import { useLocalStorageList } from "@/lib/useLocalStorageList";
import { providers } from "@/lib/providers";
import { SCHEDULE_STORAGE_KEYS, type Booking, type DateOverride } from "@/lib/schedule-types";
import { formatDateEs } from "@/lib/schedule-utils";
import AvailabilityEditor from "@/components/AvailabilityEditor";
import ChatThread from "@/components/ChatThread";
import { ShieldIcon, XIcon } from "@/components/Icons";

type Tab = "publica" | "privada" | "solicitudes";

const statusLabels: Record<Booking["status"], string> = {
  pendiente: "Pendiente de respuesta",
  cotizada: "Cotizada, esperando al cliente",
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

export default function PanelProfesionalPage() {
  const { session, ready: sessionReady } = useDemoSession();
  const [tab, setTab] = useState<Tab>("solicitudes");
  const [openBookingId, setOpenBookingId] = useState<string | null>(null);
  const [blockDate, setBlockDate] = useState("");

  const { items: bookings, update: updateBooking } = useLocalStorageList<Booking>(
    SCHEDULE_STORAGE_KEYS.bookings,
    () => []
  );
  const { items: overrides, add: addOverride, remove: removeOverride } = useLocalStorageList<DateOverride>(
    SCHEDULE_STORAGE_KEYS.overrides,
    () => []
  );

  const provider = providers.find((p) => p.id === session.providerId);

  const myBookings = useMemo(
    () =>
      bookings
        .filter((b) => b.providerId === session.providerId)
        .sort((a, b) => b.createdAt.localeCompare(a.createdAt)),
    [bookings, session.providerId]
  );

  const myOverrides = overrides
    .filter((o) => o.providerId === session.providerId)
    .sort((a, b) => a.date.localeCompare(b.date));

  const pendingCount = myBookings.filter((b) => b.status === "pendiente" || b.status === "cotizada").length;

  function handleAddOverride(e: React.FormEvent) {
    e.preventDefault();
    if (!blockDate) return;
    addOverride({ id: `ov-${Date.now()}`, providerId: session.providerId, date: blockDate, note: "Bloqueado manualmente" });
    setBlockDate("");
  }

  if (!sessionReady) return null;

  if (!provider) {
    return (
      <section className="section container-page">
        <p className="text-ink-600">No encontramos ese perfil de demo.</p>
      </section>
    );
  }

  return (
    <section className="section bg-ink-50">
      <div className="container-page">
        <div className="flex flex-wrap items-center justify-between gap-3">
          <div>
            <h1 className="text-3xl font-extrabold text-ink-900">Panel de {provider.name}</h1>
            <p className="mt-1 text-ink-600">Gestioná tu agenda pública, tu agenda privada y tus solicitudes.</p>
          </div>
          {session.role !== "profesional" && (
            <span className="rounded-full bg-amber-50 px-3 py-1.5 text-xs font-semibold text-amber-700">
              Estás en modo cliente — cambiá arriba a &quot;Soy profesional&quot; para simular una sesión real
            </span>
          )}
        </div>

        <div className="mt-8 flex flex-wrap gap-2 border-b border-ink-200">
          {[
            { id: "solicitudes" as Tab, label: `Solicitudes y mensajes${pendingCount ? ` (${pendingCount})` : ""}` },
            { id: "publica" as Tab, label: "Agenda pública" },
            { id: "privada" as Tab, label: "Agenda privada" },
          ].map((t) => (
            <button
              key={t.id}
              type="button"
              onClick={() => setTab(t.id)}
              className={`rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-colors ${
                tab === t.id ? "border-b-2 border-brand-600 text-brand-600" : "text-ink-500 hover:text-ink-800"
              }`}
            >
              {t.label}
            </button>
          ))}
        </div>

        <div className="mt-6 rounded-2xl2 border border-ink-100 bg-white p-6 shadow-soft sm:p-8">
          {tab === "publica" && <AvailabilityEditor providerId={provider.id} />}

          {tab === "privada" && (
            <div>
              <h3 className="text-base font-semibold text-ink-900">Tu agenda privada</h3>
              <p className="mt-1 text-sm text-ink-500">
                Acá ves el detalle completo de cada turno, incluso el que no es visible públicamente. También podés
                bloquear fechas puntuales (vacaciones, feriados) sin tener que borrar tus bloques semanales.
              </p>

              <form onSubmit={handleAddOverride} className="mt-5 flex flex-wrap items-end gap-3 rounded-xl border border-ink-100 bg-ink-50/60 p-4">
                <div>
                  <label className="block text-xs font-semibold text-ink-700">Bloquear una fecha</label>
                  <input
                    type="date"
                    value={blockDate}
                    onChange={(e) => setBlockDate(e.target.value)}
                    className="mt-1 rounded-lg border border-ink-200 px-3 py-2 text-sm"
                  />
                </div>
                <button type="submit" className="btn-outline">Bloquear</button>
                <div className="flex flex-wrap gap-2">
                  {myOverrides.map((o) => (
                    <span key={o.id} className="flex items-center gap-1.5 rounded-full bg-ink-100 px-3 py-1.5 text-xs text-ink-700">
                      {formatDateEs(o.date)}
                      <button type="button" onClick={() => removeOverride(o.id)} aria-label="Desbloquear">
                        <XIcon className="h-3 w-3" />
                      </button>
                    </span>
                  ))}
                </div>
              </form>

              <div className="mt-6 space-y-2">
                {myBookings.length === 0 && (
                  <p className="rounded-xl border border-dashed border-ink-200 p-6 text-sm text-ink-500">
                    Todavía no tenés turnos reservados.
                  </p>
                )}
                {myBookings.map((b) => (
                  <div key={b.id} className="flex flex-wrap items-center justify-between gap-3 rounded-xl border border-ink-100 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-ink-900">
                        {formatDateEs(b.date)} · {b.startTime}-{b.endTime} · {b.blockLabel}
                      </p>
                      <p className="text-xs text-ink-500">{b.clientName} · {b.clientEmail}</p>
                    </div>
                    <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[b.status]}`}>
                      {statusLabels[b.status]}
                      {b.quoteAmount ? ` · $${b.quoteAmount.toLocaleString("es-AR")}` : ""}
                    </span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {tab === "solicitudes" && (
            <div>
              <h3 className="text-base font-semibold text-ink-900">Solicitudes y mensajes</h3>
              <p className="mt-1 text-sm text-ink-500">
                Evaluá cada pedido, chateá con el cliente y proponé un precio. El cliente confirma aceptando la
                cotización.
              </p>

              <div className="mt-5 space-y-3">
                {myBookings.length === 0 && (
                  <p className="rounded-xl border border-dashed border-ink-200 p-6 text-sm text-ink-500">
                    Todavía no recibiste solicitudes. Compartí tu perfil o esperá a que alguien reserve un horario
                    público.
                  </p>
                )}
                {myBookings.map((b) => (
                  <div key={b.id} className="rounded-xl border border-ink-100">
                    <button
                      type="button"
                      onClick={() => setOpenBookingId(openBookingId === b.id ? null : b.id)}
                      className="flex w-full flex-wrap items-center justify-between gap-3 px-4 py-3 text-left"
                    >
                      <div>
                        <p className="text-sm font-semibold text-ink-900">{b.clientName} · {b.blockLabel}</p>
                        <p className="text-xs text-ink-500">{formatDateEs(b.date)} · {b.startTime}-{b.endTime}</p>
                      </div>
                      <span className={`rounded-full px-3 py-1 text-xs font-semibold ${statusStyles[b.status]}`}>
                        {statusLabels[b.status]}
                      </span>
                    </button>

                    {openBookingId === b.id && (
                      <div className="space-y-3 border-t border-ink-100 p-4">
                        <p className="text-sm text-ink-700">
                          <span className="font-semibold text-ink-900">Pedido: </span>
                          {b.jobDescription || "Sin descripción."}
                        </p>
                        {b.status === "pendiente" || b.status === "cotizada" ? (
                          <button
                            type="button"
                            onClick={() => updateBooking(b.id, { status: "rechazada" })}
                            className="text-xs font-semibold text-red-600 hover:underline"
                          >
                            Rechazar solicitud
                          </button>
                        ) : null}
                        <ChatThread
                          booking={b}
                          viewerRole="profesional"
                          onUpdateBooking={(patch) => updateBooking(b.id, patch)}
                        />
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>

        <div className="mt-6 flex items-center gap-2 rounded-xl bg-white p-4 text-xs text-ink-500 shadow-soft">
          <ShieldIcon className="h-4 w-4 shrink-0 text-brand-600" />
          En el producto real, esta pantalla estaría protegida por tu cuenta. En esta demo cualquiera puede
          simularla eligiendo un profesional arriba, para que puedas probar el flujo completo.
        </div>
      </div>
    </section>
  );
}
