import type { Metadata } from "next";
import ProviderSignupForm from "@/components/ProviderSignupForm";
import { CheckCircleIcon } from "@/components/Icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Registrate como profesional",
  description:
    "Creá tu perfil profesional gratis en La Obra y empezá a recibir pedidos de clientes en tu zona. Cobrá seguro por la plataforma.",
  alternates: { canonical: "/registro-profesional" },
};

export default function RegistroProfesionalPage() {
  return (
    <section className="section bg-ink-50">
      <div className="container-page grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <h1 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Creá tu perfil profesional</h1>
          <p className="mt-3 text-ink-600">
            Completá tus datos para empezar a recibir pedidos. La verificación toma entre 24 y 48hs hábiles.
          </p>
          <div className="mt-8">
            <ProviderSignupForm />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
            <h3 className="text-sm font-semibold text-ink-900">Qué pasa después de registrarte</h3>
            <ul className="mt-4 space-y-3 text-sm text-ink-600">
              <li className="flex items-start gap-2"><CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Verificamos tu identidad y matrícula si corresponde.</li>
              <li className="flex items-start gap-2"><CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Completás tu perfil con fotos de trabajos y método de cobro.</li>
              <li className="flex items-start gap-2"><CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Empezás a recibir pedidos de tu zona y rubro.</li>
            </ul>
          </div>
          <div className="rounded-2xl border border-ink-100 bg-brand-50 p-5">
            <p className="text-sm font-semibold text-ink-900">Comisión de {siteConfig.name}</p>
            <p className="mt-2 text-sm text-ink-600">
              Solo el {siteConfig.commissionRate} sobre trabajos concretados y pagados por la plataforma. Sin
              trabajo, no hay comisión.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
