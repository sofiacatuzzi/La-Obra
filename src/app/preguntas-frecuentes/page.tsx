import type { Metadata } from "next";
import FaqAccordion from "@/components/FaqAccordion";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Preguntas frecuentes",
  description:
    "Respondemos las dudas más comunes sobre cómo pedir presupuesto, cómo funciona el pago protegido y cómo funciona la comisión para profesionales en La Obra.",
  alternates: { canonical: "/preguntas-frecuentes" },
};

const generalFaqs = [
  { q: "¿Qué es La Obra?", a: "Es una plataforma que conecta a personas que necesitan arreglos en su casa (plomería, electricidad, gas y más) con profesionales verificados de su zona. Todo el proceso, desde pedir presupuesto hasta pagar el trabajo, se hace dentro de la plataforma." },
  { q: "¿La Obra hace los trabajos?", a: "No. La Obra conecta clientes con profesionales independientes. Nosotros verificamos identidad y, cuando corresponde, matrícula, pero el trabajo lo realiza el profesional que elegís." },
  { q: "¿Por qué tengo que pagar por la plataforma y no en efectivo?", a: "Pagar por La Obra protege a ambas partes: el cliente solo libera el pago cuando el trabajo está confirmado, y el profesional tiene la garantía de que el pago ya está reservado. Los pagos por fuera de la plataforma no tienen respaldo de La Obra ante un reclamo." },
  { q: "¿Qué pasa si el trabajo no me convence?", a: "Podés abrir una disputa desde tu cuenta antes de confirmar el pago final. Nuestro equipo de soporte revisa el caso y media entre ambas partes." },
];

const clientFaqs = [
  { q: "¿Cuánto cuesta pedir un presupuesto?", a: "Nada. Publicar tu pedido y recibir presupuestos es gratis y sin compromiso." },
  { q: "¿Cuántos presupuestos voy a recibir?", a: "Depende de la disponibilidad de profesionales en tu zona y rubro, pero normalmente recibís entre 2 y 5 presupuestos." },
  { q: "¿Puedo cancelar un pedido?", a: "Sí, podés cancelar tu pedido en cualquier momento antes de confirmar un profesional sin ningún costo." },
];

const proFaqs = [
  { q: "¿Cuánto cuesta darme de alta como profesional?", a: "Nada, crear tu perfil es gratis. Solo pagás una comisión cuando facturás un trabajo por la plataforma." },
  { q: "¿Cómo se calcula la comisión?", a: `La comisión es del ${siteConfig.commissionRate} sobre el valor final del trabajo, y se descuenta automáticamente al momento de liberar el pago.` },
  { q: "¿Cuándo recibo el dinero?", a: "Apenas el cliente confirma que el trabajo está terminado, transferimos el pago a tu cuenta, generalmente dentro de las 48 horas hábiles." },
  { q: "¿Qué documentación necesito?", a: "DNI para verificar tu identidad y, si tu rubro lo requiere (gas, electricidad), tu matrícula habilitante vigente." },
];

export default function FaqPage() {
  const allFaqs = [...generalFaqs, ...clientFaqs, ...proFaqs];

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "FAQPage",
          mainEntity: allFaqs.map((f) => ({
            "@type": "Question",
            name: f.q,
            acceptedAnswer: { "@type": "Answer", text: f.a },
          })),
        }}
      />

      <section className="bg-ink-50">
        <div className="container-page py-16 text-center sm:py-20">
          <h1 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Preguntas frecuentes</h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-600">
            Todo lo que necesitás saber sobre cómo funciona {siteConfig.name}, los pagos y las comisiones.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-12 lg:grid-cols-3">
          <div>
            <h2 className="text-lg font-bold text-ink-900">General</h2>
            <div className="mt-4"><FaqAccordion items={generalFaqs} /></div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink-900">Para clientes</h2>
            <div className="mt-4"><FaqAccordion items={clientFaqs} /></div>
          </div>
          <div>
            <h2 className="text-lg font-bold text-ink-900">Para profesionales</h2>
            <div className="mt-4"><FaqAccordion items={proFaqs} /></div>
          </div>
        </div>
      </section>
    </>
  );
}
