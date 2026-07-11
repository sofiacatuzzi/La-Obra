"use client";

import { useEffect, useMemo, useState } from "react";
import { fetchMessages, sendMessage, subscribeToMessages, updateBookingRecord } from "@/lib/supabase/scheduleApi";
import type { Booking, ChatMessage } from "@/lib/schedule-types";
import { CheckCircleIcon, ShieldIcon, WalletIcon } from "@/components/Icons";

type Props = {
  booking: Booking;
  viewerRole: "cliente" | "profesional";
  viewerId: string;
  onUpdateBooking: (patch: Partial<Booking>) => void;
};

function formatTime(iso: string) {
  return new Date(iso).toLocaleTimeString("es-AR", { hour: "2-digit", minute: "2-digit" });
}

export default function ChatThread({ booking, viewerRole, viewerId, onUpdateBooking }: Props) {
  const [messages, setMessages] = useState<ChatMessage[]>([]);
  const [text, setText] = useState("");
  const [showQuoteInput, setShowQuoteInput] = useState(false);
  const [quoteAmount, setQuoteAmount] = useState("");

  useEffect(() => {
    let active = true;
    fetchMessages(booking.id).then((data) => {
      if (active) setMessages(data);
    });

    const unsubscribe = subscribeToMessages(booking.id, (message) => {
      setMessages((current) => (current.some((m) => m.id === message.id) ? current : [...current, message]));
    });

    return () => {
      active = false;
      unsubscribe();
    };
  }, [booking.id]);

  const lastQuote = useMemo(
    () => [...messages].reverse().find((m) => m.kind === "cotizacion"),
    [messages]
  );

  const bookingClosed = booking.status === "confirmada" || booking.status === "cancelada" || booking.status === "rechazada";
  const canAcceptQuote = !!lastQuote && lastQuote.sender !== viewerRole && !bookingClosed;

  async function pushMessage(kind: ChatMessage["kind"], payload: { text?: string; amount?: number }) {
    await sendMessage({
      bookingId: booking.id,
      senderId: viewerId,
      senderRole: viewerRole,
      kind,
      ...payload,
    });
  }

  async function handleSendText(e: React.FormEvent) {
    e.preventDefault();
    if (!text.trim()) return;
    const value = text.trim();
    setText("");
    await pushMessage("texto", { text: value });
  }

  async function handleSendQuote(e: React.FormEvent) {
    e.preventDefault();
    const amount = Number(quoteAmount);
    if (!amount || amount <= 0) return;
    setQuoteAmount("");
    setShowQuoteInput(false);
    await pushMessage("cotizacion", { amount });
    if (booking.status === "pendiente") {
      await updateBookingRecord(booking.id, { status: "cotizada" });
      onUpdateBooking({ status: "cotizada" });
    }
  }

  async function handleAcceptQuote() {
    if (!lastQuote?.amount) return;
    await updateBookingRecord(booking.id, { status: "confirmada", quoteAmount: lastQuote.amount });
    onUpdateBooking({ status: "confirmada", quoteAmount: lastQuote.amount });
    await pushMessage("sistema", { text: `Cotización de $${lastQuote.amount.toLocaleString("es-AR")} aceptada. Reserva confirmada.` });
  }

  async function handlePayDeposit() {
    await updateBookingRecord(booking.id, { depositPaid: true });
    onUpdateBooking({ depositPaid: true });
    await pushMessage("sistema", { text: "Seña pagada por la plataforma. El turno queda confirmado para ambas partes." });
  }

  return (
    <div className="flex flex-col rounded-2xl border border-ink-100 bg-white shadow-soft">
      <div className="border-b border-ink-100 px-4 py-3">
        <p className="text-sm font-semibold text-ink-900">
          {viewerRole === "profesional" ? booking.clientName : booking.providerName}
        </p>
        <p className="text-xs text-ink-500">
          {booking.blockLabel} · {booking.date} {booking.startTime}-{booking.endTime}
        </p>
      </div>

      <div className="flex max-h-96 flex-col gap-3 overflow-y-auto px-4 py-4">
        {messages.length === 0 && <p className="text-xs text-ink-400">Todavía no hay mensajes.</p>}
        {messages.map((m) => {
          if (m.kind === "sistema") {
            return (
              <p key={m.id} className="mx-auto rounded-full bg-ink-50 px-3 py-1 text-center text-xs text-ink-500">
                {m.text}
              </p>
            );
          }
          const mine = m.sender === viewerRole;
          return (
            <div key={m.id} className={`flex ${mine ? "justify-end" : "justify-start"}`}>
              <div
                className={`max-w-[80%] rounded-2xl px-4 py-2 text-sm ${
                  mine ? "bg-brand-600 text-white" : "bg-ink-100 text-ink-900"
                }`}
              >
                {m.kind === "texto" && <p>{m.text}</p>}
                {m.kind === "cotizacion" && (
                  <div>
                    <p className="text-xs uppercase tracking-wide opacity-80">Propuesta de precio</p>
                    <p className="text-lg font-bold">${m.amount?.toLocaleString("es-AR")}</p>
                  </div>
                )}
                <p className={`mt-1 text-[10px] ${mine ? "text-brand-100" : "text-ink-400"}`}>{formatTime(m.createdAt)}</p>
              </div>
            </div>
          );
        })}
      </div>

      {canAcceptQuote && (
        <div className="flex items-center justify-between gap-3 border-t border-ink-100 bg-brand-50 px-4 py-3">
          <p className="text-xs text-ink-700">
            {lastQuote?.sender === "profesional" ? "Te propusieron" : "Le propusiste"} ${lastQuote?.amount?.toLocaleString("es-AR")}
          </p>
          <button type="button" onClick={handleAcceptQuote} className="btn-primary px-4 py-2 text-xs">
            Aceptar precio
          </button>
        </div>
      )}

      {booking.status === "confirmada" && !booking.depositPaid && (
        <div className="flex items-center justify-between gap-3 border-t border-ink-100 bg-ink-50 px-4 py-3">
          <p className="flex items-center gap-1.5 text-xs text-ink-700">
            <ShieldIcon className="h-4 w-4 text-brand-600" /> Confirmado por ${booking.quoteAmount?.toLocaleString("es-AR")}. Falta pagar la seña.
          </p>
          {viewerRole === "cliente" && (
            <button type="button" onClick={handlePayDeposit} className="btn-secondary px-4 py-2 text-xs">
              Pagar seña
            </button>
          )}
        </div>
      )}

      {booking.status === "confirmada" && booking.depositPaid && (
        <p className="flex items-center gap-1.5 border-t border-ink-100 px-4 py-3 text-xs font-medium text-brand-700">
          <CheckCircleIcon className="h-4 w-4" /> Turno confirmado y seña pagada.
        </p>
      )}

      {!bookingClosed && (
        <div className="border-t border-ink-100 p-3">
          {showQuoteInput && (
            <form onSubmit={handleSendQuote} className="mb-2 flex items-center gap-2">
              <span className="flex items-center gap-1 text-xs text-ink-500"><WalletIcon className="h-4 w-4" /> $</span>
              <input
                type="number"
                min={1}
                autoFocus
                value={quoteAmount}
                onChange={(e) => setQuoteAmount(e.target.value)}
                placeholder="Monto propuesto"
                className="flex-1 rounded-lg border border-ink-200 px-3 py-1.5 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
              />
              <button type="submit" className="btn-primary px-3 py-1.5 text-xs">Enviar</button>
              <button type="button" onClick={() => setShowQuoteInput(false)} className="btn-outline px-3 py-1.5 text-xs">Cancelar</button>
            </form>
          )}
          <form onSubmit={handleSendText} className="flex items-center gap-2">
            <input
              value={text}
              onChange={(e) => setText(e.target.value)}
              placeholder="Escribí un mensaje..."
              className="flex-1 rounded-full border border-ink-200 px-4 py-2 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            <button
              type="button"
              onClick={() => setShowQuoteInput((v) => !v)}
              className="btn-outline whitespace-nowrap px-3 py-2 text-xs"
            >
              Proponer precio
            </button>
            <button type="submit" className="btn-primary px-4 py-2 text-xs">Enviar</button>
          </form>
        </div>
      )}
    </div>
  );
}
