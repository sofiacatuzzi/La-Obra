"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useSupabaseUser } from "@/lib/supabase/useUser";
import { supabaseConfigured } from "@/lib/supabase/env";

export default function AccountBar() {
  const router = useRouter();
  const { user, profile, loading, signOut } = useSupabaseUser();

  if (!supabaseConfigured) return null;
  if (loading) return <div className="h-9 bg-ink-900" />;

  async function handleSignOut() {
    await signOut();
    router.push("/");
    router.refresh();
  }

  return (
    <div className="bg-ink-900 text-white">
      <div className="container-page flex flex-wrap items-center justify-between gap-2 py-1.5 text-xs">
        {user && profile ? (
          <>
            <span className="text-ink-400">
              Hola, <strong className="text-white">{profile.full_name || user.email}</strong>
            </span>
            <div className="flex flex-wrap items-center gap-2">
              <Link
                href={profile.role === "profesional" ? "/panel-profesional" : "/mis-reservas"}
                className="rounded-full bg-white px-3 py-1 font-semibold text-ink-900 hover:bg-ink-100"
              >
                {profile.role === "profesional" ? "Mi panel" : "Mis reservas"}
              </Link>
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full border border-ink-700 px-3 py-1 font-semibold text-ink-300 hover:text-white"
              >
                Cerrar sesión
              </button>
            </div>
          </>
        ) : (
          <>
            <span className="text-ink-400">¿Ya tenés cuenta en La Obra?</span>
            <div className="flex items-center gap-2">
              <Link href="/login" className="rounded-full border border-ink-700 px-3 py-1 font-semibold text-ink-300 hover:text-white">
                Iniciar sesión
              </Link>
              <Link href="/registro" className="rounded-full bg-white px-3 py-1 font-semibold text-ink-900 hover:bg-ink-100">
                Registrarme
              </Link>
            </div>
          </>
        )}
      </div>
    </div>
  );
}
