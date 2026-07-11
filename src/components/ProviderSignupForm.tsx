"use client";

import { FormEvent, useState } from "react";
import Link from "next/link";
import { categories } from "@/lib/categories";
import { CheckCircleIcon, ShieldIcon } from "@/components/Icons";
import { siteConfig } from "@/lib/site";

type FormState = {
  nombre: string;
  categoria: string;
  matricula: string;
  zona: string;
  experiencia: string;
  telefono: string;
  email: string;
  aceptaComision: boolean;
};

const licensedCategories = new Set(["gas", "electricidad"]);

export default function ProviderSignupForm() {
  const [form, setForm] = useState<FormState>({
    nombre: "",
    categoria: "",
    matricula: "",
    zona: "",
    experiencia: "",
    telefono: "",
    email: "",
    aceptaComision: false,
  });
  const [errors, setErrors] = useState<Partial<Record<keyof FormState, string>>>({});
  const [submitted, setSubmitted] = useState(false);

  function update<K extends keyof FormState>(key: K, value: FormState[K]) {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  }

  function validate(): boolean {
    const next: Partial<Record<keyof FormState, string>> = {};
    if (!form.nombre.trim()) next.nombre = "Ingresá tu nombre";
    if (!form.categoria) next.categoria = "Elegí tu rubro principal";
    if (licensedCategories.has(form.categoria) && !form.matricula.trim()) {
      next.matricula = "Este rubro requiere número de matrícula";
    }
    if (!form.zona.trim()) next.zona = "Ingresá tu zona de trabajo";
    if (!/^\+?[\d\s-]{8,}$/.test(form.telefono)) next.telefono = "Ingresá un teléfono válido";
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email)) next.email = "Ingresá un email válido";
    if (!form.aceptaComision) next.aceptaComision = "Necesitás aceptar la política de comisión y pago";
    setErrors(next);
    return Object.keys(next).length === 0;
  }

  function handleSubmit(e: FormEvent) {
    e.preventDefault();
    if (!validate()) return;
    setSubmitted(true);
  }

  if (submitted) {
    return (
      <div className="rounded-2xl2 border border-ink-100 bg-white p-8 shadow-card sm:p-10">
        <CheckCircleIcon className="h-12 w-12 text-brand-600" />
        <h2 className="mt-4 text-2xl font-bold text-ink-900">¡Gracias, {form.nombre.split(" ")[0]}!</h2>
        <p className="mt-2 text-ink-600">
          Recibimos tu solicitud para ofrecer servicios de{" "}
          <strong>{categories.find((c) => c.slug === form.categoria)?.name.toLowerCase()}</strong> en {form.zona}.
        </p>
        <ol className="mt-6 space-y-3 text-sm text-ink-700">
          <li className="flex items-start gap-2"><CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Verificamos tu identidad {licensedCategories.has(form.categoria) ? "y tu matrícula" : ""} (24 a 48hs hábiles).</li>
          <li className="flex items-start gap-2"><CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Te enviamos un email para completar tu perfil y cargar tu método de cobro.</li>
          <li className="flex items-start gap-2"><CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Empezás a recibir pedidos de {form.zona} apenas tu perfil esté activo.</li>
        </ol>
        <div className="mt-6 flex items-center gap-2 rounded-xl bg-brand-50 p-4 text-sm text-brand-800">
          <ShieldIcon className="h-5 w-5 shrink-0" />
          Recordá: todos los cobros se hacen por La Obra. Así protegemos tu pago y tu reputación con reseñas verificadas.
        </div>
        <div className="mt-6 flex flex-col gap-3 sm:flex-row">
          <Link href="/precios" className="btn-outline">Ver comisiones en detalle</Link>
          <Link href="/" className="btn-primary">Volver al inicio</Link>
        </div>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} noValidate className="rounded-2xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-10">
      <div className="grid gap-6 sm:grid-cols-2">
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
          <label htmlFor="categoria" className="text-sm font-semibold text-ink-900">Rubro principal</label>
          <select
            id="categoria"
            value={form.categoria}
            onChange={(e) => update("categoria", e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="">Elegí tu rubro</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
          {errors.categoria && <p className="mt-1 text-xs text-red-600">{errors.categoria}</p>}
        </div>

        {licensedCategories.has(form.categoria) && (
          <div className="sm:col-span-2">
            <label htmlFor="matricula" className="text-sm font-semibold text-ink-900">Número de matrícula</label>
            <input
              id="matricula"
              type="text"
              value={form.matricula}
              onChange={(e) => update("matricula", e.target.value)}
              placeholder="Ej: MAT-12345"
              className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
            {errors.matricula && <p className="mt-1 text-xs text-red-600">{errors.matricula}</p>}
          </div>
        )}

        <div>
          <label htmlFor="zona" className="text-sm font-semibold text-ink-900">Zona de trabajo</label>
          <input
            id="zona"
            type="text"
            value={form.zona}
            onChange={(e) => update("zona", e.target.value)}
            placeholder="Ej: CABA y zona norte"
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
          {errors.zona && <p className="mt-1 text-xs text-red-600">{errors.zona}</p>}
        </div>

        <div>
          <label htmlFor="experiencia" className="text-sm font-semibold text-ink-900">Años de experiencia</label>
          <input
            id="experiencia"
            type="number"
            min={0}
            value={form.experiencia}
            onChange={(e) => update("experiencia", e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm text-ink-900 focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
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

      <label className="mt-6 flex items-start gap-3 text-sm text-ink-600">
        <input
          type="checkbox"
          checked={form.aceptaComision}
          onChange={(e) => update("aceptaComision", e.target.checked)}
          className="mt-0.5 h-4 w-4 rounded border-ink-300 text-brand-600 focus:ring-brand-500"
        />
        Entiendo que los pagos de los trabajos se cobran a través de {siteConfig.name} y que la plataforma retiene
        una comisión del {siteConfig.commissionRate} solo sobre trabajos concretados.
      </label>
      {errors.aceptaComision && <p className="mt-1 text-xs text-red-600">{errors.aceptaComision}</p>}

      <button type="submit" className="btn-primary mt-6 w-full sm:w-auto">
        Crear mi perfil profesional
      </button>
    </form>
  );
}
