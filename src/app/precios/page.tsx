import Link from "next/link";
import type { Metadata } from "next";
import { ArrowRightIcon, CheckCircleIcon, ShieldIcon, WalletIcon } from "@/components/Icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Precios y comisiones",
  description:
    "Pedir presupuesto en La Obra es gratis. Los profesionales pagan una comisión del 15% solo sobre trabajos concretados y cobrados por la plataforma.",
  alternates: { canonical: "/precios" },
};

const examples = [
  { job: "Destapación simple", price: 9000 },
  { job: "Instalación de termotanque", price: 28000 },
  { job: "Pintura de un ambiente", price: 45000 },
  { job: "Refacción de baño completo", price: 180000 },
];

const commissionRateNumber = 0.15;

export default function PreciosPage() {
  return (
    <>
      <section className="bg-ink-50">
        <div className="container-page py-16 text-center sm:py-20">
          <h1 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Precios simples y transparentes</h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-600">
            Para quienes piden un servicio, {siteConfig.name} es 100% gratis. Los profesionales pagan una única
            comisión, solo cuando cobran un trabajo por la plataforma.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-6 lg:grid-cols-2">
          <div className="rounded-2xl2 border border-ink-100 bg-white p-8 shadow-soft">
            <span className="badge">Clientes</span>
            <p className="mt-4 text-4xl font-extrabold text-ink-900">$0</p>
            <p className="text-sm text-ink-500">Pedir presupuestos, comparar y chatear es gratis siempre.</p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              {[
                "Publicar pedidos ilimitados",
                "Recibir presupuestos de varios profesionales",
                "Chat y coordinación dentro de la plataforma",
                "Pago protegido hasta confirmar el trabajo",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-brand-600" /> {item}</li>
              ))}
            </ul>
            <Link href="/solicitar" className="btn-primary mt-6 w-full">Pedir presupuesto</Link>
          </div>

          <div className="rounded-2xl2 border border-brand-200 bg-brand-50 p-8 shadow-card">
            <span className="badge bg-brand-600 text-white">Profesionales</span>
            <p className="mt-4 text-4xl font-extrabold text-ink-900">{siteConfig.commissionRate}</p>
            <p className="text-sm text-ink-600">Comisión sobre cada trabajo concretado y pagado por la plataforma. Alta gratuita.</p>
            <ul className="mt-6 space-y-3 text-sm text-ink-700">
              {[
                "Sin costo de alta ni mensualidad",
                "Pedidos ilimitados de tu zona y rubro",
                "Cobro automático y seguro por la plataforma",
                "Perfil con reseñas verificadas",
              ].map((item) => (
                <li key={item} className="flex items-center gap-2"><CheckCircleIcon className="h-4 w-4 text-brand-600" /> {item}</li>
              ))}
            </ul>
            <Link href="/registro-profesional" className="btn-secondary mt-6 w-full">Crear mi perfil</Link>
          </div>
        </div>
      </section>

      <section className="section bg-ink-50">
        <div className="container-page">
          <h2 className="text-2xl font-bold text-ink-900">Ejemplos de comisión</h2>
          <p className="mt-2 text-ink-600">Así se calcula lo que recibís por cada trabajo.</p>
          <div className="mt-8 overflow-hidden rounded-2xl border border-ink-100 bg-white shadow-soft">
            <table className="w-full text-left text-sm">
              <thead className="bg-ink-900 text-white">
                <tr>
                  <th className="px-5 py-3 font-semibold">Trabajo</th>
                  <th className="px-5 py-3 font-semibold">Precio cobrado</th>
                  <th className="px-5 py-3 font-semibold">Comisión ({siteConfig.commissionRate})</th>
                  <th className="px-5 py-3 font-semibold">Vos recibís</th>
                </tr>
              </thead>
              <tbody>
                {examples.map((ex, i) => {
                  const commission = Math.round(ex.price * commissionRateNumber);
                  const net = ex.price - commission;
                  return (
                    <tr key={ex.job} className={i % 2 === 0 ? "bg-white" : "bg-ink-50/60"}>
                      <td className="px-5 py-3 font-medium text-ink-900">{ex.job}</td>
                      <td className="px-5 py-3 text-ink-600">${ex.price.toLocaleString("es-AR")}</td>
                      <td className="px-5 py-3 text-ink-600">-${commission.toLocaleString("es-AR")}</td>
                      <td className="px-5 py-3 font-semibold text-brand-600">${net.toLocaleString("es-AR")}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>
        </div>
      </section>

      <section className="section">
        <div className="container-page rounded-2xl2 border border-ink-100 bg-white p-8 shadow-soft sm:p-10">
          <div className="flex items-start gap-4">
            <WalletIcon className="h-8 w-8 shrink-0 text-brand-600" />
            <div>
              <h2 className="text-xl font-bold text-ink-900">¿Por qué cobramos comisión solo sobre trabajos concretados?</h2>
              <p className="mt-3 max-w-3xl text-sm leading-relaxed text-ink-600">
                Creemos que {siteConfig.name} solo debería ganar cuando vos ganás. No cobramos por publicar tu
                perfil, ni por recibir pedidos, ni por enviar presupuestos. La comisión se descuenta automáticamente
                cuando el cliente confirma el trabajo y se libera el pago, así el proceso es simple y previsible.
              </p>
              <div className="mt-5 flex items-center gap-2 text-sm text-ink-700">
                <ShieldIcon className="h-5 w-5 text-brand-600" />
                Todos los cobros se procesan por la plataforma para proteger tanto al profesional como al cliente.
              </div>
            </div>
          </div>
          <Link href="/registro-profesional" className="btn-primary mt-6">
            Crear mi perfil profesional <ArrowRightIcon className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
