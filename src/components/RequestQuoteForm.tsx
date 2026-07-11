"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { CheckCircleIcon, ShieldIcon } from "@/components/Icons";

type FormState = {
  categoria: string;
  descripcion: string;
  zona: string;
  urgencia: string;
  nombre: string;
  telefono: string;
  email: string;
};

const urgencyOptions = [
  { value: "hoy", label: "Hoy / es urgente" },
  { value: "semana", label: "Esta semana" },
  { value: "sin-apuro", label: "Sin apuro, quiero comparar" },
];

export default function RequestQuoteForm({ initialCategory }: { initialCategory?: string }) {
  const [form, setForm] = useState<FormState>({
    categoria: initialCategory ?? "",
    descripcion: "",
    zona: "",
    urgencia: "hoy",
    nombre: "",
    telefono: "",
    email: "",
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.categoria) next.categoria = "Elegí un rubro";
    if (form.descripcion.trim().length < 10) next.descripcion = "Contanos un poco más (mínimo 10 caracteres)";
    if (!form.zona.trim()) next.zona = "Ingresá tu barrio o localidad";
    if (!form.nombre.trim()) next.nombre = "Ingresá tu nombre";
    if (!/^\+?[\d\s-]{8,}$/.test(form.telefono)) next.telefono = "Ingresá un teléfono válido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Ingresá un email válido";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  if (submitted) {
    const category = categories.find((c) => c.slug === form.categoria);
    return (
      <div className="rounded-2xl2 border border-ink-100 bg-white p-8 shadow-card sm:p-10">
        <CheckCircleIcon className="h-12 w-12 text-brand-600" />
        <h2 className="mt-4 text-2xl font-bold text-ink-900">¡Listo, {form.nombre.split(" ")[0]}!</h2>
        <p className="mt-2 text-ink-600">
          Publicamos tu pedido de <strong>{category?.name.toLowerCase()}</strong> en {form.zona}. Avisamos a los
          profesionales verificados de esa categoría en tu zona para que te envíen presupuesto.
        </p>
        <div className="mt-6 flex items-center gap-2 rounded-xl bg-brand-50 p-4 text-sm text-brand-800">
          <ShieldIcon className="h-5 w-5 shrink-0" />
          Vas a recibir los presupuestos por email y podrás pagar de forma segura desde La Obra cuando elijas uno.
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/" className="btn-outline">Volver al inicio</Link>
          <Link href="/servicios" className="btn-primary">Ver más servicios</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
        <div className="sm:col-span-2">
          <label htmlFor="categoria" className="text-sm font-semibold text-ink-900">¿Qué tipo de servicio necesitás?</label>
          <select
            id="categoria"
            value={form.categoria}
            onChange={(e) => update("categoria", e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="">Elegí un rubro</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          {errors.categoria && <p className="mt-1 text-xs text-red-600">{errors.categoria}</p>}
        </div>

        <div className="sm:col-span-2">
          <label htmlFor="descripcion" className="text-sm font-semibold text-ink-900">Contanos qué necesitás</label>
          <textarea
            id="descripcion"
            rows={4}
            value={form.descripcion}
            onChange={(e) => update("descripcion", e.target.value)}
            placeholder="Ej: Tengo una pérdida debajo de la pileta de la cocina que moja el mueble."
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {errors.descripcion && <p className="mt-1 text-xs text-red-600">{errors.descripcion}</p>}
        </div>

        <div>
          <label htmlFor="zona" className="text-sm font-semibold text-ink-900">Barrio o localidad</label>
          <input
            id="zona"
            type="text"
            value={form.zona}
            onChange={(e) => update("zona", e.target.value)}
            placeholder="Ej: Belgrano, CABA"
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {errors.zona && <p className="mt-1 text-xs text-red-600">{errors.zona}</p>}
        </div>

        <div>
          <label htmlFor="urgencia" className="text-sm font-semibold text-ink-900">Urgencia</label>
          <select
            id="urgencia"
            value={form.urgencia}
            onChange={(e) => update("urgencia", e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            {urgencyOptions.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>
        </div>

        <div>
          <label htmlFor="nombre" className="text-sm font-semibold text-ink-900">Nombre y apellido</label>
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
          <label htmlFor="telefono" className="text-sm font-semibold text-ink-900">Teléfono</label>
          <input
            id="telefono"
            type="tel"
            value={form.telefono}
            onChange={(e) => update("telefono", e.target.value)}
            placeholder="11 5555-5555"
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {errors.telefono && <p className="mt-1 text-xs text-red-600">{errors.telefono}</p>}
        </div>

        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink-900">Email</label>
          <input
            id="email"
            type="email"
            value={form.email}
            onChange={(e) => update("email", e.target.value)}
            placeholder="vos@email.com"
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {errors.email && <p className="mt-1 text-xs text-red-600">{errors.email}</p>}
        </div>
      </div>

      <p className="mt-6 text-xs text-ink-500">
        Al publicar tu pedido aceptás que profesionales verificados de La Obra vean tu solicitud y te contacten con
        presupuestos. Es gratis y sin compromiso.
      </p>

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Publicar pedido y recibir presupuestos
      </button>
    </form>
  );
}
