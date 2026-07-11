import Link from "next/link";
import type { Metadata } from "next";
import { categories } from "@/lib/categories";
import { categoryIcons, ArrowRightIcon } from "@/components/Icons";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Todos los servicios para el hogar",
  description:
    "Encontrá plomeros, electricistas, gasistas, pintores, albañiles y más profesionales verificados para arreglar tu casa. Pedí presupuesto gratis por La Obra.",
  alternates: { canonical: "/servicios" },
};

export default function ServiciosPage() {
  return (
    <>
      <section className="bg-ink-50">
        <div className="container-page py-16 text-center sm:py-20">
          <h1 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">Todos los servicios</h1>
          <p className="mx-auto mt-4 max-w-2xl text-ink-600">
            Elegí el rubro que necesitás. Todos los profesionales de {siteConfig.name} pasan por un proceso de
            verificación antes de poder recibir pedidos.
          </p>
        </div>
      </section>

      <section className="section">
        <div className="container-page">
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {categories.map((c) => {
              const Icon = categoryIcons[c.icon];
              return (
                <Link
                  key={c.slug}
                  href={`/servicios/${c.slug}`}
                  className="group flex flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-6 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
                >
                  <span className="flex h-12 w-12 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
                    {Icon && <Icon className="h-6 w-6" />}
                  </span>
                  <h2 className="text-lg font-semibold text-ink-900">{c.name}</h2>
                  <p className="text-sm text-ink-600">{c.shortDescription}</p>
                  <p className="text-xs font-medium text-ink-400">Rango habitual: {c.avgPriceRange}</p>
                  <span className="mt-1 flex items-center gap-1 text-sm font-semibold text-brand-600">
                    Ver {c.nameSingular}s <ArrowRightIcon className="h-4 w-4" />
                  </span>
                </Link>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
