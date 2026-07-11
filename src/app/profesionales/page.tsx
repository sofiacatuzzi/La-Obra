import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, CheckCircleIcon, ShieldIcon, StarIcon, WalletIcon } from "@/components/Icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Para profesionales — Conseguí clientes y cobrá seguro",
  description:
    "Sumate como plomero, electricista, gasista u otro profesional. Recibí pedidos de tu zona y cobrá de forma segura por La Obra. Alta gratuita, solo pagás comisión sobre trabajos concretados.",
  alternates: { canonical: "/profesionales" },
};

const benefits = [
  { icon: WalletIcon, title: "Cobrás seguro, sin perseguir pagos", text: "El cliente paga por la plataforma antes de que empieces. Vos recibís el dinero en tu cuenta apenas se confirma el trabajo." },
  { icon: StarIcon, title: "Reputación que trabaja para vos", text: "Cada reseña verificada suma a tu perfil y te ayuda a conseguir mejores clientes con el tiempo." },
  { icon: ShieldIcon, title: "Menos cancelaciones", text: "Como el cliente ya pagó, el compromiso es real. Menos turnos perdidos y menos tiempo desperdiciado." },
];

const faqs = [
  { q: "¿Cuánto cuesta darme de alta?", a: "Nada. Crear tu perfil y recibir pedidos es gratis. Solo pagás una comisión cuando facturás un trabajo a través de la plataforma." },
  { q: "¿Cómo y cuándo cobro?", a: "El cliente paga por adelantado dentro de La Obra. Cuando confirma que el trabajo está terminado, transferimos el pago a tu cuenta bancaria menos la comisión." },
  { q: "¿Puedo elegir qué pedidos aceptar?", a: "Sí, vos decidís a qué pedidos responder, qué precio cobrar y qué disponibilidad ofrecer." },
  { q: "¿Necesito matrícula?", a: "Para rubros regulados como gas y electricidad, sí. Para otros rubros pedimos referencias y verificación de identidad." },
];

export default function ProfesionalesPage() {
  return (
    <>
      <section className="bg-ink-900 text-white">
        <div className="container-page grid gap-10 py-16 sm:py-20 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="badge bg-white/10 text-white">Para profesionales</span>
            <h1 className="mt-4 text-3xl font-extrabold sm:text-4xl">
              Conseguí trabajo constante sin gastar en publicidad
            </h1>
            <p className="mt-4 text-ink-300">
              Miles de personas buscan plomeros, electricistas, gasistas y otros oficios todos los días. Armá tu
              perfil gratis, recibí pedidos de tu zona y cobrá seguro por {siteConfig.name}.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/registro-profesional" className="btn bg-brand-600 text-white hover:bg-brand-700">
                Crear mi perfil gratis <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/precios" className="btn border border-white/20 text-white hover:bg-white/10">
                Ver cómo funciona la comisión
              </Link>
            </div>
          </div>
          <div className="rounded-2xl2 bg-white p-8 text-ink-900 shadow-card">
            <p className="text-sm font-medium text-ink-500">Ejemplo de ganancias mensuales</p>
            <p className="mt-2 text-3xl font-extrabold text-ink-900">$340.000<span className="text-base font-medium text-ink-500"> / mes</span></p>
            <p className="mt-1 text-sm text-ink-500">Profesional con 14 trabajos completados al mes</p>
            <div className="mt-6 space-y-3 text-sm">
              <div className="flex justify-between border-b border-ink-100 pb-3">
                <span className="text-ink-500">Facturación total</span>
                <span className="font-semibold">$400.000</span>
              </div>
              <div className="flex justify-between border-b border-ink-100 pb-3">
                <span className="text-ink-500">Comisión La Obra ({siteConfig.commissionRate})</span>
                <span className="font-semibold">-$60.000</span>
              </div>
              <div className="flex justify-between text-base">
                <span className="font-semibold">Neto en tu cuenta</span>
                <span className="font-bold text-brand-600">$340.000</span>
              </div>
            </div>
            <p className="mt-4 text-xs text-ink-400">Cifras estimadas a modo ilustrativo, no constituyen una garantía de ingresos.</p>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="text-center text-2xl font-bold text-ink-900 sm:text-3xl">Por qué elegir {siteConfig.name}</h2>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {benefits.map((b) => (
              <div key={b.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
                <b.icon className="h-7 w-7 text-brand-600" />
                <h3 className="mt-4 text-base font-semibold text-ink-900">{b.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{b.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-ink-50">
        <div className="container-page rounded-2xl2 border border-ink-100 bg-white p-8 shadow-soft sm:p-10">
          <h2 className="text-xl font-bold text-ink-900">Requisitos para sumarte</h2>
          <ul className="mt-5 grid gap-3 sm:grid-cols-2">
            {[
              "Ser mayor de 18 años",
              "DNI vigente para verificar tu identidad",
              "Matrícula habilitante para gas y electricidad",
              "Datos bancarios o CBU/alias para recibir pagos",
              "Referencias o trabajos anteriores (opcional pero recomendado)",
              "Disponibilidad para responder pedidos en tu zona",
            ].map((r) => (
              <li key={r} className="flex items-center gap-2 text-sm text-ink-700">
                <CheckCircleIcon className="h-4 w-4 text-brand-600" /> {r}
              </li>
            ))}
          </ul>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-ink-900">Preguntas frecuentes de profesionales</h2>
          <div className="mt-6 grid gap-4 sm:grid-cols-2">
            {faqs.map((f) => (
              <div key={f.q} className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
                <p className="text-sm font-semibold text-ink-900">{f.q}</p>
                <p className="mt-2 text-sm text-ink-600">{f.a}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className="section bg-brand-600">
        <div className="container-page flex flex-col items-center gap-6 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">Empezá a recibir pedidos esta semana</h2>
          <Link href="/registro-profesional" className="btn bg-white text-brand-700 hover:bg-brand-50">
            Crear mi perfil profesional <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
