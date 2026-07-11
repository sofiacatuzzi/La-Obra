import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { categories, getCategoryBySlug } from "@/lib/categories";
import { getProvidersByCategory } from "@/lib/providers";
import { categoryIcons, ArrowRightIcon, CheckCircleIcon, StarIcon, ShieldIcon } from "@/components/Icons";
import JsonLd from "@/components/JsonLd";
import { siteConfig } from "@/lib/site";

export function generateStaticParams() {
  return categories.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) return {};

  const title = `${category.name} — Presupuestos de ${category.nameSingular}s verificados`;
  return {
    title,
    description: category.longDescription,
    keywords: category.keywords,
    alternates: { canonical: `/servicios/${category.slug}` },
    openGraph: {
      title: `${title} | ${siteConfig.name}`,
      description: category.longDescription,
    },
  };
}

export default async function CategoryPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const category = getCategoryBySlug(slug);
  if (!category) notFound();

  const Icon = categoryIcons[category.icon];
  const proProviders = getProvidersByCategory(category.slug);

  return (
    <>
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "Service",
          serviceType: category.name,
          name: `${category.name} — ${siteConfig.name}`,
          description: category.longDescription,
          areaServed: "Argentina",
          provider: {
            "@type": "Organization",
            name: siteConfig.name,
          },
        }}
      />
      <JsonLd
        data={{
          "@context": "https://schema.org",
          "@type": "BreadcrumbList",
          itemListElement: [
            { "@type": "ListItem", position: 1, name: "Inicio", item: siteConfig.url },
            { "@type": "ListItem", position: 2, name: "Servicios", item: `${siteConfig.url}/servicios` },
            { "@type": "ListItem", position: 3, name: category.name, item: `${siteConfig.url}/servicios/${category.slug}` },
          ],
        }}
      />

      <section className="bg-ink-50">
        <div className="container-page py-14 sm:py-16">
          <nav className="text-xs text-ink-500">
            <Link href="/" className="hover:text-brand-600">Inicio</Link> /{" "}
            <Link href="/servicios" className="hover:text-brand-600">Servicios</Link> / {category.name}
          </nav>
          <div className="mt-4 flex flex-col gap-6 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex items-center gap-4">
              <span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-brand-50 text-brand-600">
                {Icon && <Icon className="h-8 w-8" />}
              </span>
              <div>
                <h1 className="text-3xl font-extrabold text-ink-900 sm:text-4xl">{category.name}</h1>
                <p className="mt-1 text-ink-600">Rango de precio habitual: {category.avgPriceRange}</p>
              </div>
            </div>
            <Link href={`/solicitar?categoria=${category.slug}`} className="btn-primary">
              Pedir presupuesto de {category.nameSingular} <ArrowRightIcon className="h-4 w-4" />
            </Link>
          </div>
          <p className="mt-6 max-w-3xl text-ink-600">{category.longDescription}</p>
        </div>
      </section>

      <section className="section">
        <div className="container-page grid gap-10 lg:grid-cols-3">
          <div className="lg:col-span-2">
            <h2 className="text-xl font-bold text-ink-900">Trabajos habituales de {category.nameSingular}</h2>
            <ul className="mt-4 grid gap-2 sm:grid-cols-2">
              {category.commonJobs.map((job) => (
                <li key={job} className="flex items-center gap-2 rounded-xl border border-ink-100 bg-white px-4 py-3 text-sm text-ink-700 shadow-soft">
                  <CheckCircleIcon className="h-4 w-4 shrink-0 text-brand-600" /> {job}
                </li>
              ))}
            </ul>

            <h2 className="mt-10 text-xl font-bold text-ink-900 capitalize">
              {category.name === "Gasista" ? "Gasistas" : `${category.nameSingular}s`} destacados
            </h2>
            <div className="mt-4 space-y-4">
              {proProviders.map((p) => (
                <div key={p.id} className="flex flex-col gap-4 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft sm:flex-row sm:items-center sm:justify-between">
                  <div className="flex items-center gap-4">
                    <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-ink-900 text-sm font-bold text-white">
                      {p.initials}
                    </span>
                    <div>
                      <div className="flex items-center gap-2">
                        <p className="font-semibold text-ink-900">{p.name}</p>
                        {p.verified && (
                          <span className="flex items-center gap-1 text-xs font-medium text-brand-600">
                            <ShieldIcon className="h-3.5 w-3.5" /> Verificado
                          </span>
                        )}
                      </div>
                      <p className="text-xs text-ink-500">{p.city} · {p.responseTime}</p>
                      <p className="mt-1 text-sm text-ink-600">{p.bio}</p>
                      <div className="mt-1 flex items-center gap-1 text-xs text-ink-500">
                        <StarIcon className="h-3.5 w-3.5 text-brand-500" />
                        <span className="font-semibold text-ink-900">{p.rating}</span> ({p.reviews} reseñas) · {p.jobsDone} trabajos
                      </div>
                    </div>
                  </div>
                  <Link href={`/solicitar?categoria=${category.slug}`} className="btn-outline w-full sm:w-auto">
                    Pedir presupuesto
                  </Link>
                </div>
              ))}
              {proProviders.length === 0 && (
                <p className="rounded-xl border border-dashed border-ink-200 p-6 text-sm text-ink-500">
                  Todavía no hay profesionales cargados en esta categoría en la demo. ¡Publicá tu pedido igual y te avisamos apenas se sume uno!
                </p>
              )}
            </div>
          </div>

          <aside className="space-y-6">
            <div className="rounded-2xl border border-ink-100 bg-white p-6 shadow-soft">
              <h3 className="font-semibold text-ink-900">¿Por qué pedir por {siteConfig.name}?</h3>
              <ul className="mt-4 space-y-3 text-sm text-ink-600">
                <li className="flex items-start gap-2"><CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Presupuestos gratis y sin compromiso</li>
                <li className="flex items-start gap-2"><CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Profesionales verificados y con reseñas reales</li>
                <li className="flex items-start gap-2"><CheckCircleIcon className="mt-0.5 h-4 w-4 shrink-0 text-brand-600" /> Pago protegido hasta terminar el trabajo</li>
              </ul>
            </div>
            <div className="rounded-2xl border border-ink-100 bg-brand-50 p-6">
              <h3 className="font-semibold text-ink-900">¿Sos {category.nameSingular}?</h3>
              <p className="mt-2 text-sm text-ink-600">Sumate y empezá a recibir pedidos de esta categoría en tu zona.</p>
              <Link href="/registro-profesional" className="btn-primary mt-4 w-full">
                Ofrecer mis servicios
              </Link>
            </div>
          </aside>
        </div>
      </section>

      <section className="section bg-ink-50">
        <div className="container-page">
          <h2 className="text-xl font-bold text-ink-900">Otros servicios que te pueden interesar</h2>
          <div className="mt-6 flex flex-wrap gap-3">
            {categories
              .filter((c) => c.slug !== category.slug)
              .map((c) => (
                <Link key={c.slug} href={`/servicios/${c.slug}`} className="badge hover:bg-ink-200">
                  {c.name}
                </Link>
              ))}
          </div>
        </div>
      </section>
    </>
  );
}
