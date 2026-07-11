import Link from "next/link";
import type { Metadata } from "next";
import CategoryGrid from "@/components/CategoryGrid";
import JsonLd from "@/components/JsonLd";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClipboardIcon,
  HandshakeIcon,
  SearchIcon,
  ShieldIcon,
  StarIcon,
  WalletIcon,
} from "@/components/Icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: `${siteConfig.name} — Plomeros, electricistas y gasistas cerca tuyo`,
  description: siteConfig.description,
  alternates: { canonical: "/" },
};

const clientSteps = [
  {
    icon: ClipboardIcon,
    title: "Contá qué necesitás",
    text: "Describí el trabajo, subí fotos y elegí tu zona. Tarda menos de 2 minutos y es gratis.",
  },
  {
    icon: SearchIcon,
    title: "Recibí presupuestos",
    text: "Profesionales verificados de tu zona te envían presupuesto. Compará precio, reseñas y disponibilidad.",
  },
  {
    icon: HandshakeIcon,
    title: "Elegí y coordiná",
    text: "Chateá dentro de la plataforma, acordá el día y hora, y confirmá el trabajo.",
  },
  {
    icon: WalletIcon,
    title: "Pagá seguro desde La Obra",
    text: "El pago se hace por la plataforma y se libera al profesional cuando el trabajo está terminado.",
  },
];

const trustPoints = [
  {
    icon: ShieldIcon,
    title: "Profesionales verificados",
    text: "Validamos identidad, matrícula (cuando aplica) y antecedentes antes de habilitar un perfil.",
  },
  {
    icon: WalletIcon,
    title: "Pago 100% protegido",
    text: "Tu dinero queda retenido en La Obra hasta que confirmás que el trabajo se hizo bien.",
  },
  {
    icon: StarIcon,
    title: "Reseñas reales",
    text: "Solo pueden calificar los clientes que efectivamente contrataron el servicio por la plataforma.",
  },
];

const testimonials = [
  {
    quote: "Pedí un presupuesto para una pérdida de agua y en 20 minutos ya tenía tres plomeros ofreciendo turno para el mismo día.",
    name: "Cecilia M.",
    role: "Cliente en Palermo",
  },
  {
    quote: "Como electricista, La Obra me ordenó la agenda y me consigue clientes nuevos todas las semanas sin gastar en publicidad.",
    name: "Diego T.",
    role: "Electricista matriculado",
  },
  {
    quote: "Me encantó poder ver las reseñas de otros vecinos antes de decidir. Se siente mucho más seguro que buscar en un grupo de Facebook.",
    name: "Martín R.",
    role: "Cliente en Vicente López",
  },
];

export default function HomePage() {
  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "WebSite",
          name: siteConfig.name,
          url: siteConfig.url,
          potentialAction: {
            "@type": "SearchAction",
            target: `${siteConfig.url}/servicios?q={search_term_string}`,
            "query-input": "required name=search_term_string",
          },
        }}
      />

      {/* Hero */}
      <section className="relative overflow-hidden bg-gradient-to-b from-brand-50 via-white to-white">
        <div className="container-page grid gap-10 py-16 sm:py-24 lg:grid-cols-2 lg:items-center">
          <div>
            <span className="badge">
              <CheckCircleIcon className="h-4 w-4 text-brand-600" /> Profesionales verificados en toda Argentina
            </span>
            <h1 className="mt-5 text-4xl font-extrabold tracking-tight text-ink-900 sm:text-5xl">
              Arreglá tu casa sin vueltas.
              <span className="block text-brand-600">Encontrá al profesional justo.</span>
            </h1>
            <p className="mt-5 max-w-xl text-lg leading-relaxed text-ink-600">
              Plomeros, electricistas, gasistas y más de 10 rubros, todos verificados. Pedís presupuesto gratis,
              comparás y pagás seguro desde la plataforma — sin efectivo, sin sorpresas.
            </p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/solicitar" className="btn-primary text-base">
                Pedir presupuesto gratis <ArrowRightIcon className="h-4 w-4" />
              </Link>
              <Link href="/registro-profesional" className="btn-outline text-base">
                Quiero ofrecer mis servicios
              </Link>
            </div>
            <div className="mt-8 flex flex-wrap items-center gap-x-8 gap-y-3 text-sm text-ink-500">
              <span className="flex items-center gap-1.5"><StarIcon className="h-4 w-4 text-brand-500" /> 4.8/5 promedio de calificación</span>
              <span>+1.200 profesionales activos</span>
              <span>+8.000 trabajos completados</span>
            </div>
          </div>

          <div className="relative">
            <div className="rounded-2xl2 border border-ink-100 bg-white p-6 shadow-card">
              <p className="text-sm font-semibold text-ink-500">Solicitud activa</p>
              <p className="mt-1 text-lg font-bold text-ink-900">Destapación de cocina — Belgrano</p>
              <div className="mt-4 space-y-3">
                {[
                  { name: "Laura F.", price: "$9.500", eta: "Disponible hoy" },
                  { name: "Marcelo G.", price: "$11.000", eta: "Disponible mañana" },
                  { name: "Hugo P.", price: "$8.800", eta: "Disponible hoy" },
                ].map((offer) => (
                  <div key={offer.name} className="flex items-center justify-between rounded-xl border border-ink-100 bg-ink-50/60 px-4 py-3">
                    <div>
                      <p className="text-sm font-semibold text-ink-900">{offer.name}</p>
                      <p className="text-xs text-ink-500">{offer.eta}</p>
                    </div>
                    <p className="text-sm font-bold text-brand-600">{offer.price}</p>
                  </div>
                ))}
              </div>
              <p className="mt-4 flex items-center gap-1.5 text-xs text-ink-500">
                <ShieldIcon className="h-4 w-4 text-brand-500" /> Pago protegido hasta confirmar el trabajo
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* Categories */}
      <section className="section">
        <div className="container-page">
          <div className="flex flex-col gap-3 sm:flex-row sm:items-end sm:justify-between">
            <div>
              <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Servicios más pedidos</h2>
              <p className="mt-2 text-ink-600">Elegí un rubro y mirá profesionales disponibles en tu zona.</p>
            </div>
            <Link href="/servicios" className="flex items-center gap-1 text-sm font-semibold text-brand-600">
              Ver todos los servicios <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <div className="mt-8">
            <CategoryGrid limit={10} />
          </div>
        </div>
      </section>

      {/* How it works */}
      <section className="section bg-ink-50">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Cómo funciona para vos</h2>
            <p className="mt-2 text-ink-600">De la duda al trabajo terminado, todo dentro de la misma plataforma.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {clientSteps.map((step, i) => (
              <div key={step.title} className="relative rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
                <span className="absolute -top-3 -left-3 flex h-7 w-7 items-center justify-center rounded-full bg-brand-600 text-xs font-bold text-white">
                  {i + 1}
                </span>
                <step.icon className="h-7 w-7 text-brand-600" />
                <h3 className="mt-4 text-base font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-10 text-center">
            <Link href="/como-funciona" className="btn-secondary">
              Ver cómo funciona en detalle
            </Link>
          </div>
        </div>
      </section>

      {/* For professionals */}
      <section className="section">
        <div className="container-page grid items-center gap-10 lg:grid-cols-2">
          <div>
            <span className="badge">Para profesionales</span>
            <h2 className="mt-4 text-2xl font-bold text-ink-900 sm:text-3xl">
              Conseguí clientes nuevos cada semana, sin gastar en publicidad
            </h2>
            <p className="mt-4 text-ink-600">
              Armá tu perfil, recibí pedidos de tu zona y cobrá de forma segura por la plataforma. Nosotros nos
              encargamos de la cobranza, vos te enfocás en trabajar.
            </p>
            <ul className="mt-6 space-y-3">
              {[
                "Publicá tu perfil gratis, sin costo de alta",
                "Solo pagás una comisión cuando facturás un trabajo",
                "Cobros protegidos: el pago llega directo a tu cuenta",
                "Reseñas verificadas que construyen tu reputación",
              ].map((item) => (
                <li key={item} className="flex items-start gap-2 text-sm text-ink-700">
                  <CheckCircleIcon className="mt-0.5 h-5 w-5 shrink-0 text-brand-600" />
                  {item}
                </li>
              ))}
            </ul>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row">
              <Link href="/registro-profesional" className="btn-primary">
                Crear mi perfil profesional
              </Link>
              <Link href="/precios" className="btn-outline">
                Ver comisiones
              </Link>
            </div>
          </div>
          <div className="rounded-2xl2 border border-ink-100 bg-ink-900 p-8 text-white shadow-card">
            <p className="text-sm font-medium text-ink-300">Ejemplo de un trabajo cobrado por La Obra</p>
            <div className="mt-4 space-y-3 text-sm">
              <div className="flex justify-between border-b border-ink-800 pb-3">
                <span className="text-ink-300">Precio del trabajo</span>
                <span className="font-semibold">$20.000</span>
              </div>
              <div className="flex justify-between border-b border-ink-800 pb-3">
                <span className="text-ink-300">Comisión La Obra ({siteConfig.commissionRate})</span>
                <span className="font-semibold">-$3.000</span>
              </div>
              <div className="flex justify-between pt-1 text-base">
                <span className="font-semibold">Vos cobrás</span>
                <span className="font-bold text-brand-400">$17.000</span>
              </div>
            </div>
            <p className="mt-6 text-xs leading-relaxed text-ink-400">
              La comisión solo se cobra sobre trabajos concretados y pagados por la plataforma. Sin comisión, no hay costo.
            </p>
          </div>
        </div>
      </section>

      {/* Trust */}
      <section className="section bg-ink-50">
        <div className="container-page">
          <div className="mx-auto max-w-2xl text-center">
            <h2 className="text-2xl font-bold text-ink-900 sm:text-3xl">Seguridad para las dos partes</h2>
            <p className="mt-2 text-ink-600">Todo pago se procesa por la plataforma, así todos quedan protegidos.</p>
          </div>
          <div className="mt-10 grid gap-6 sm:grid-cols-3">
            {trustPoints.map((point) => (
              <div key={point.title} className="rounded-2xl border border-ink-100 bg-white p-6 text-center shadow-soft">
                <point.icon className="mx-auto h-8 w-8 text-brand-600" />
                <h3 className="mt-4 text-base font-semibold text-ink-900">{point.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{point.text}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Testimonials */}
      <section className="section">
        <div className="container-page">
          <h2 className="text-center text-2xl font-bold text-ink-900 sm:text-3xl">Lo que dice la gente</h2>
          <div className="mt-10 grid gap-6 lg:grid-cols-3">
            {testimonials.map((t) => (
              <figure key={t.name} className="flex flex-col justify-between rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
                <div>
                  <div className="flex gap-0.5 text-brand-500">
                    {Array.from({ length: 5 }).map((_, i) => (
                      <StarIcon key={i} className="h-4 w-4" />
                    ))}
                  </div>
                  <blockquote className="mt-4 text-sm leading-relaxed text-ink-700">“{t.quote}”</blockquote>
                </div>
                <figcaption className="mt-6 text-sm font-semibold text-ink-900">
                  {t.name}
                  <span className="block text-xs font-normal text-ink-500">{t.role}</span>
                </figcaption>
              </figure>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="section bg-brand-600">
        <div className="container-page flex flex-col items-center gap-6 text-center text-white">
          <h2 className="text-2xl font-bold sm:text-3xl">¿Tenés un arreglo pendiente?</h2>
          <p className="max-w-xl text-brand-50">
            Publicá tu pedido gratis y en minutos empezás a recibir presupuestos de profesionales verificados.
          </p>
          <Link href="/solicitar" className="btn bg-white text-brand-700 hover:bg-brand-50">
            Pedir presupuesto ahora <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
