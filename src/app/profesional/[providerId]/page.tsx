import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { providers } from "@/lib/providers";
import { getCategoryBySlug } from "@/lib/categories";
import { siteConfig } from "@/lib/site";
import BookingCalendar from "@/components/BookingCalendar";
import { ShieldIcon, StarIcon } from "@/components/Icons";

export function generateStaticParams() {
  return providers.map((p) => ({ providerId: p.id }));
}

export async function generateMetadata({ params }: { params: Promise<{ providerId: string }> }): Promise<Metadata> {
  const { providerId } = await params;
  const provider = providers.find((p) => p.id === providerId);
  if (!provider) return {};

  return {
    title: `${provider.name} — ${getCategoryBySlug(provider.categorySlug)?.name ?? ""}`,
    description: `${provider.bio} Reservá un turno con ${provider.name} en ${siteConfig.name}.`,
    alternates: { canonical: `/profesional/${provider.id}` },
  };
}

export default async function ProviderProfilePage({ params }: { params: Promise<{ providerId: string }> }) {
  const { providerId } = await params;
  const provider = providers.find((p) => p.id === providerId);
  if (!provider) notFound();

  const category = getCategoryBySlug(provider.categorySlug);

  return (
    <section className="section bg-ink-50">
      <div className="container-page grid gap-10 lg:grid-cols-3">
        <div className="lg:col-span-2">
          <nav className="text-xs text-ink-500">
            <Link href="/" className="hover:text-brand-600">Inicio</Link> /{" "}
            {category && (
              <>
                <Link href={`/servicios/${category.slug}`} className="hover:text-brand-600">{category.name}</Link> /{" "}
              </>
            )}
            {provider.name}
          </nav>

          <div className="mt-4 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-900 text-lg font-bold text-white">
              {provider.initials}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-ink-900">{provider.name}</h1>
                {provider.verified && (
                  <span className="flex items-center gap-1 text-xs font-medium text-brand-600">
                    <ShieldIcon className="h-3.5 w-3.5" /> Verificado
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-500">{category?.name} · {provider.city}</p>
              <div className="mt-1 flex items-center gap-1 text-xs text-ink-500">
                <StarIcon className="h-3.5 w-3.5 text-brand-500" />
                <span className="font-semibold text-ink-900">{provider.rating}</span> ({provider.reviews} reseñas) · {provider.jobsDone} trabajos
              </div>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-sm text-ink-600">{provider.bio}</p>

          <div className="mt-8">
            <BookingCalendar providerId={provider.id} providerName={provider.name} categorySlug={provider.categorySlug} />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
            <h3 className="text-sm font-semibold text-ink-900">Cómo sigue esto</h3>
            <ol className="mt-3 space-y-2 text-sm text-ink-600">
              <li>1. Elegís un horario y contás qué necesitás.</li>
              <li>2. {provider.name.split(" ")[0]} te responde por chat y te dice cuánto sale.</li>
              <li>3. Si están de acuerdo, confirmás y pagás la seña por {siteConfig.name}.</li>
            </ol>
          </div>
          <div className="rounded-2xl border border-ink-100 bg-brand-50 p-5">
            <p className="text-sm font-semibold text-ink-900">Pago protegido</p>
            <p className="mt-2 text-sm text-ink-600">
              El turno se confirma con una seña dentro de la plataforma, así ambas partes se comprometen.
            </p>
          </div>
        </aside>
      </div>
    </section>
  );
}
