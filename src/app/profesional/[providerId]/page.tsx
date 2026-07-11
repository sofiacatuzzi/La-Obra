import Link from "next/link";
import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import { getCategoryBySlug } from "@/lib/categories";
import { siteConfig } from "@/lib/site";
import BookingCalendar from "@/components/BookingCalendar";
import { ShieldIcon } from "@/components/Icons";

async function getProvider(providerId: string) {
  const supabase = await createClient();
  const { data, error } = await supabase
    .from("provider_profiles")
    .select("id, category_slug, city, bio, license_number, verified, profiles(full_name)")
    .eq("id", providerId)
    .single();

  if (error || !data) return null;

  const profile = Array.isArray(data.profiles) ? data.profiles[0] : data.profiles;

  return {
    id: data.id as string,
    fullName: (profile?.full_name as string) ?? "Profesional",
    categorySlug: data.category_slug as string,
    city: (data.city as string) ?? "",
    bio: (data.bio as string) ?? "",
    verified: Boolean(data.verified),
  };
}

export const dynamic = "force-dynamic";

export async function generateMetadata({ params }: { params: Promise<{ providerId: string }> }): Promise<Metadata> {
  const { providerId } = await params;
  const provider = await getProvider(providerId);
  if (!provider) return {};

  return {
    title: `${provider.fullName} — ${getCategoryBySlug(provider.categorySlug)?.name ?? ""}`,
    description: `${provider.bio} Reservá un turno con ${provider.fullName} en ${siteConfig.name}.`,
    alternates: { canonical: `/profesional/${provider.id}` },
  };
}

export default async function ProviderProfilePage({ params }: { params: Promise<{ providerId: string }> }) {
  const { providerId } = await params;
  const provider = await getProvider(providerId);
  if (!provider) notFound();

  const category = getCategoryBySlug(provider.categorySlug);
  const initials = provider.fullName
    .split(" ")
    .slice(0, 2)
    .map((p) => p[0]?.toUpperCase())
    .join("");

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
            {provider.fullName}
          </nav>

          <div className="mt-4 flex items-center gap-4">
            <span className="flex h-16 w-16 items-center justify-center rounded-full bg-ink-900 text-lg font-bold text-white">
              {initials || "?"}
            </span>
            <div>
              <div className="flex items-center gap-2">
                <h1 className="text-2xl font-extrabold text-ink-900">{provider.fullName}</h1>
                {provider.verified && (
                  <span className="flex items-center gap-1 text-xs font-medium text-brand-600">
                    <ShieldIcon className="h-3.5 w-3.5" /> Verificado
                  </span>
                )}
              </div>
              <p className="text-sm text-ink-500">{category?.name} · {provider.city}</p>
            </div>
          </div>

          <p className="mt-5 max-w-2xl text-sm text-ink-600">{provider.bio}</p>

          <div className="mt-8">
            <BookingCalendar providerId={provider.id} providerName={provider.fullName} categorySlug={provider.categorySlug} />
          </div>
        </div>

        <aside className="space-y-4">
          <div className="rounded-2xl border border-ink-100 bg-white p-5 shadow-soft">
            <h3 className="text-sm font-semibold text-ink-900">Cómo sigue esto</h3>
            <ol className="mt-3 space-y-2 text-sm text-ink-600">
              <li>1. Elegís un horario y contás qué necesitás.</li>
              <li>2. {provider.fullName.split(" ")[0]} te responde por chat y te dice cuánto sale.</li>
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
