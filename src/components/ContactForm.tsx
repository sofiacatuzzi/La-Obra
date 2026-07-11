"use client";

import { FormEvent, useState } from "react";
import { CheckCircleIcon } from "@/components/Icons";

type FormState = { nombre: string; email: string; mensaje: string };

export default function ContactForm() {
  const [form, setForm] = useState<FormState>({ nombre: "", email: "", mensaje: "" });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [sent, setSent] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.nombre.trim()) next.nombre = "Ingresá tu nombre";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Ingresá un email válido";
    if (form.mensaje.trim().length < 10) next.mensaje = "Contanos un poco más (mínimo 10 caracteres)";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSent(true);
  }

  if (sent) {
    return (
      <div className="rounded-2xl2 border border-ink-100 bg-white p-8 shadow-card">
        <CheckCircleIcon className="h-10 w-10 text-brand-600" />
        <h2 className="mt-4 text-xl font-bold text-ink-900">¡Mensaje enviado!</h2>
        <p className="mt-2 text-sm text-ink-600">
          Gracias {form.nombre.split(" ")[0]}, te vamos a responder a {form.email} a la brevedad.
        </p>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-5">
        <div>
          <label htmlFor="nombre" className="text-sm font-semibold text-ink-900">Nombre</label>
          <input
            id="nombre"
            type="text"
            value={form.nombre}
            onChange={(e) => update("nombre", e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {errors.nombre && <p className="mt-1 text-xs text-red-600">{errors.nombre}</p>}
        </div>
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink-900">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
        <div>
          <label htmlFor="mensaje" className="text-sm font-semibold text-ink-900">Mensaje</label>
          <textarea
            id="mensaje"
            rows={5}
            value={form.mensaje}
            onChange={(e) => update("mensaje", e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {errors.mensaje && <p className="mt-1 text-xs text-red-600">{errors.mensaje}</p>}
        </div>
      </div>
      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">Enviar mensaje</button>
    </form>
  );
}
