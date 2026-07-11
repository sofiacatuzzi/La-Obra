"use client";

import { FormEvent, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { createClient } from "@/lib/supabase/client";
import type { UserRole } from "@/lib/schedule-types";

export default function SignupForm({ initialRole }: { initialRole: UserRole }) {
  const router = useRouter();
  const [role, setRole] = useState<UserRole>(initialRole);
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [needsConfirmation, setNeedsConfirmation] = useState(false);

  async function handleSubmit(e: FormEvent) {
    e.preventDefault();
    setError(null);
    setLoading(true);

    const supabase = createClient();
    const { data, error: signUpError } = await supabase.auth.signUp({
      email,
      password,
      options: { data: { full_name: fullName, role } },
    });

    setLoading(false);

    if (signUpError) {
      setError(signUpError.message);
      return;
    }

    if (!data.session) {
      setNeedsConfirmation(true);
      return;
    }

    router.push(role === "profesional" ? "/completar-perfil-profesional" : "/");
    router.refresh();
  }

  if (needsConfirmation) {
    return (
      <div className="rounded-2xl2 border border-ink-100 bg-white p-8 shadow-card">
        <h2 className="text-xl font-bold text-ink-900">Revisá tu email</h2>
        <p className="mt-2 text-sm text-ink-600">
          Te enviamos un link de confirmación a <strong>{email}</strong>. Una vez que confirmes, iniciá sesión para
          continuar.
        </p>
        <Link href="/login" className="btn-primary mt-5">Ir a iniciar sesión</Link>
      </div>
    );
  }

  return (
    <form onSubmit={handleSubmit} className="rounded-2xl2 border border-ink-100 bg-white p-6 shadow-card sm:p-8">
      <div className="flex overflow-hidden rounded-full border border-ink-200">
        <button
          type="button"
          onClick={() => setRole("cliente")}
          className={`flex-1 px-4 py-2.5 text-sm font-semibold transition-colors ${
            role === "cliente" ? "bg-brand-600 text-white" : "text-ink-600 hover:bg-ink-50"
          }`}
        >
          Quiero contratar
        </button>
        <button
          type="button"
          onClick={() => setRole("profesional")}
          className={`flex-1 px-4 py-2.5 text-sm font-semibold transition-colors ${
            role === "profesional" ? "bg-brand-600 text-white" : "text-ink-600 hover:bg-ink-50"
          }`}
        >
          Quiero ofrecer servicios
        </button>
      </div>

      <div className="mt-6 grid gap-4">
        <div>
          <label htmlFor="fullName" className="text-sm font-semibold text-ink-900">Nombre y apellido</label>
          <input
            id="fullName"
            required
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
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
            minLength={6}
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            className="mt-2 w-full rounded-xl border border-ink-200 px-4 py-3 text-sm focus:border-brand-500 focus:outline-none focus:ring-2 focus:ring-brand-100"
          />
        </div>
      </div>

      {error && <p className="mt-4 text-sm text-red-600">{error}</p>}

      <button type="submit" disabled={loading} className="btn-primary mt-6 w-full disabled:opacity-60">
        {loading ? "Creando cuenta..." : "Crear cuenta"}
      </button>

      <p className="mt-4 text-center text-sm text-ink-500">
        ¿Ya tenés cuenta? <Link href="/login" className="font-semibold text-brand-600">Iniciá sesión</Link>
      </p>
    </form>
  );
}
