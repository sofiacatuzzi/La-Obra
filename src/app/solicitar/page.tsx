import type { Metadata } from "next";
import RequestQuoteForm from "@/components/RequestQuoteForm";
import { ShieldIcon, StarIcon, WalletIcon } from "@/components/Icons";

export const metadata: Metadata = {
  title: "Pedir presupuesto gratis",
  description:
    "Publicá tu pedido de plomería, electricidad, gas u otro arreglo del hogar y recibí presupuestos de profesionales verificados cerca tuyo. Es gratis y sin compromiso.",
  alternates: { canonical: "/solicitar" },
};

export default async function SolicitarPage({
  searchParams,
}: {
  searchParams: Promise<{ categoria?: string }>;
}) {
  const { categoria } = await searchParams;
  return (
    <section className="section bg-ink-50">
      <div className="container-page grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Contanos qué necesitás</h1>
          <p className="mt-3 text-ink-600">
            Publicá tu pedido gratis. En minutos, profesionales verificados de tu zona te envían presupuesto.
          </p>
          <div className="mt-8">
            <RequestQuoteForm initialCategory={categoria} />
          </div>
        </div>

        <aside className="space-y-4">
          {[
            { icon: WalletIcon, title: "100% gratis para pedir", text: "No pagás nada por publicar tu pedido ni por recibir presupuestos." },
            { icon: ShieldIcon, title: "Profesionales verificados", text: "Validamos identidad y, cuando corresponde, matrícula profesional." },
            { icon: StarIcon, title: "Elegí con reseñas reales", text: "Mirá calificaciones de otros clientes antes de decidir." },
          ].map((item) => (
            <div key={item.title} className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
              <item.icon className="h-6 w-6 text-brand-600" />
              <h3 className="mt-3 text-sm font-semibold text-ink-900">{item.title}</h3>
              <p className="mt-1 text-sm text-ink-600">{item.text}</p>
            </div>
          ))}
        </aside>
      </div>
    </section>
  );
}
