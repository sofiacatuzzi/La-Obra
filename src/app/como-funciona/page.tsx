import Link from "next/link";
import type { Metadata } from "next";
import {
  ArrowRightIcon,
  CheckCircleIcon,
  ClipboardIcon,
  HandshakeIcon,
  SearchIcon,
  ShieldIcon,
  WalletIcon,
} from "@/components/Icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Cómo funciona",
  description:
    "Descubrí cómo funciona La Obra para pedir presupuestos de arreglos en tu casa y cómo funciona para profesionales que quieren conseguir clientes y cobrar de forma segura.",
  alternates: { canonical: "/como-funciona" },
};

const clientSteps = [
  {
    icon: ClipboardIcon,
    title: "1. Publicá tu pedido",
    text: "Contanos qué necesitás arreglar, en qué zona estás y cuándo te viene bien. Podés sumar fotos para que los profesionales entiendan mejor el trabajo. Es gratis y no te compromete a nada.",
  },
  {
    icon: SearchIcon,
    title: "2. Recibí presupuestos",
    text: "Los profesionales verificados de tu zona y rubro te envían su presupuesto con precio, disponibilidad y su perfil con reseñas de otros clientes.",
  },
  {
    icon: HandshakeIcon,
    title: "3. Comparás y elegís",
    text: "Mirá calificaciones, trabajos realizados y tiempo de respuesta. Chateá con los profesionales dentro de la plataforma para resolver dudas antes de decidir.",
  },
  {
    icon: WalletIcon,
    title: "4. Pagás seguro desde La Obra",
    text: "El pago se hace por la plataforma con tarjeta o transferencia y queda retenido hasta que confirmás que el trabajo se completó correctamente.",
  },
  {
    icon: ShieldIcon,
    title: "5. Calificás el trabajo",
    text: "Dejás tu reseña para ayudar a otros vecinos a elegir mejor, y el profesional recibe el pago automáticamente.",
  },
];

const proSteps = [
  {
    icon: ClipboardIcon,
    title: "1. Creá tu perfil gratis",
    text: "Contanos tu rubro, zona de trabajo, experiencia y matrícula si tu oficio lo requiere (gasista, electricista). Verificamos tu identidad antes de activar el perfil.",
  },
  {
    icon: SearchIcon,
    title: "2. Recibí pedidos de tu zona",
    text: "Te llegan notificaciones de clientes que necesitan tu servicio cerca tuyo. Vos elegís a cuáles responder y con qué precio.",
  },
  {
    icon: HandshakeIcon,
    title: "3. Coordiná y trabajá",
    text: "Chateá con el cliente, acordá el día y horario, y hacé el trabajo con la tranquilidad de que el pago ya está reservado en la plataforma.",
  },
  {
    icon: WalletIcon,
    title: "4. Cobrá automáticamente",
    text: `Cuando el cliente confirma que el trabajo está terminado, el pago se transfiere a tu cuenta menos la comisión de La Obra (${siteConfig.commissionRate}). Sin efectivo, sin perseguir pagos.`,
  },
  {
    icon: ShieldIcon,
    title: "5. Construí tu reputación",
    text: "Cada trabajo bien hecho suma reseñas verificadas que te ayudan a conseguir más y mejores clientes.",
  },
];

export default function ComoFuncionaPage() {
  return (
    <>
      <section className="bg-ink-50">
        <div className="container-page py-16 text-center sm:py-20">
          <h1 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Cómo funciona La Obra</h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-600">
            Una plataforma, dos beneficios: clientes que encuentran profesionales de confianza y profesionales que
            consiguen trabajo sin gastar en publicidad. Todo el pago pasa por La Obra para que sea seguro para
            ambas partes.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-ink-900">Si necesitás un arreglo</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-5">
            {clientSteps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
                <step.icon className="h-7 w-7 text-brand-600" />
                <h3 className="mt-4 text-sm font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/solicitar" className="btn-primary">
              Pedir presupuesto gratis <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section bg-ink-50">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-ink-900">Si sos profesional</h2>
          <div className="mt-8 grid gap-6 lg:grid-cols-5">
            {proSteps.map((step) => (
              <div key={step.title} className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
                <step.icon className="h-7 w-7 text-brand-600" />
                <h3 className="mt-4 text-sm font-semibold text-ink-900">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-ink-600">{step.text}</p>
              </div>
            ))}
          </div>
          <div className="mt-8">
            <Link href="/registro-profesional" className="btn-primary">
              Crear mi perfil profesional <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page rounded-2xl2 border border-ink-100 bg-white p-8 shadow-soft sm:p-10">
          <div className="flex items-start gap-4">
            <ShieldIcon className="h-8 w-8 shrink-0 text-brand-600" />
            <div>
              <h2 className="text-xl font-bold text-ink-900">¿Por qué todo el pago pasa por La Obra?</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-600">
                Porque así protegemos a las dos partes: el cliente sabe que su dinero solo se libera si el trabajo
                se hizo, y el profesional tiene la garantía de que el pago ya está reservado antes de empezar. Pagar
                por fuera de la plataforma no tiene respaldo de La Obra ante un reclamo, no genera reseña verificada
                y va en contra de nuestros{" "}
                <Link href="/preguntas-frecuentes" className="font-semibold text-brand-600 underline">
                  términos de uso
                </Link>
                .
              </p>
              <ul className="mt-4 grid gap-2 text-sm text-ink-700 sm:grid-cols-2">
                {[
                  "Reembolso si el trabajo no se realiza",
                  "Historial de pagos y facturas",
                  "Soporte ante disputas",
                  "Reseñas verificadas de trabajos reales",
                ].map((item) => (
                  <li key={item} className="flex items-center gap-2">
                    <CheckCircleIcon className="h-4 w-4 text-brand-600" /> {item}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
