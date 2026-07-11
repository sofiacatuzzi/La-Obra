"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";

export default function LoginForm() {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error: signInError } = await supabase.auth.signInWithPassword({ email, password });

    if (signInError) {
      setLoading(false);
      setError(signInError.message);
      return;
    }

    const { data: profile } = await supabase
      .from("profiles")
      .select("role")
      .eq("id", data.user.id)
      .single();

    if (profile?.role === "profesional") {
      const { data: providerProfile } = await supabase
        .from("provider_profiles")
        .select("id")
        .eq("id", data.user.id)
        .maybeSingle();

      if (!providerProfile) {
        router.push("/completar-perfil-profesional");
        router.refresh();
        setLoading(false);
        return;
      }
    }

    setLoading(false);
    router.push("/");
    router.refresh();
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
      <div className="grid gap-4">
        <div>
          <label htmlFor="email" className="text-sm font-semibold text-ink-900">Email</label>
          <input
            id="email"
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
        <div>
          <label htmlFor="password" className="text-sm font-semibold text-ink-900">Contraseña</label>
          <input
            id="password"
            type="password"
            required
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-60">
        {loading ? "Ingresando..." : "Iniciar sesión"}
      </button>

      <p className="mt-4 text-center text-sm text-ink-500">
        ¿No tenés cuenta? <Link href="/registro" className="font-semibold text-brand-600">Registrate</Link>
      </p>
    </form>
  );
}
