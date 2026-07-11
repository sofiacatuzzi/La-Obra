"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import { createClient } from "@/lib/supabase/client";
import { categories } from "@/lib/categories";

const licensedCategories = new Set(["gas", "electricidad"]);

export default function CompleteProviderProfileForm({ userId }: { userId: string }) {
  const router = useRouter();
  const [categorySlug, setCategorySlug] = useState("");
  const [city, setCity] = useState("");
  const [bio, setBio] = useState("");
  const [licenseNumber, setLicenseNumber] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);

    if (!categorySlug) {
      setError("Elegí tu rubro principal");
      return;
    }
    if (licensedCategories.has(categorySlug) && !licenseNumber.trim()) {
      setError("Este rubro requiere número de matrícula");
      return;
    }

    setLoading(true);
    const supabase = createClient();
    const { error: upsertError } = await supabase.from("provider_profiles").upsert({
      id: userId,
      category_slug: categorySlug,
      city,
      bio,
      license_number: licenseNumber || null,
    });
    setLoading(false);

    if (upsertError) {
      setError(upsertError.message);
      return;
    }

    router.push("/panel-profesional");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-4">
        <div>
          <label htmlFor="categoria" className="text-sm font-semibold text-ink-900">Rubro principal</label>
          <select
            id="categoria"
            value={categorySlug}
            onChange={(e) => setCategorySlug(e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 bg-white px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          >
            <option value="">Elegí tu rubro</option>
            {categories.map((c) => (
              <option key={c.slug} value={c.slug}>{c.name}</option>
            ))}
          </select>
        </div>

        {licensedCategories.has(categorySlug) && (
          <div>
            <label htmlFor="matricula" className="text-sm font-semibold text-ink-900">Número de matrícula</label>
            <input
              id="matricula"
              value={licenseNumber}
              onChange={(e) => setLicenseNumber(e.target.value)}
              placeholder="Ej: MAT-12345"
              className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
            />
          </div>
        )}

        <div>
          <label htmlFor="ciudad" className="text-sm font-semibold text-ink-900">Zona de trabajo</label>
          <input
            id="ciudad"
            required
            value={city}
            onChange={(e) => setCity(e.target.value)}
            placeholder="Ej: CABA y zona norte"
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>

        <div>
          <label htmlFor="bio" className="text-sm font-semibold text-ink-900">Contanos tu experiencia</label>
          <textarea
            id="bio"
            rows={3}
            required
            value={bio}
            onChange={(e) => setBio(e.target.value)}
            placeholder="Ej: 15 años de experiencia en instalaciones sanitarias y urgencias."
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-60">
        {loading ? "Guardando..." : "Guardar y continuar"}
      </button>
    </form>
  );
}
