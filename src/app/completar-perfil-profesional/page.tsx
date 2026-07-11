import { redirect } from "next/navigation";
import type { Metadata } from "next";
import { createClient } from "@/lib/supabase/server";
import CompleteProviderProfileForm from "@/components/CompleteProviderProfileForm";

export const metadata: Metadata = {
  title: "Completá tu perfil profesional",
  alternates: { canonical: "/completar-perfil-profesional" },
};

export default async function CompletarPerfilProfesionalPage() {
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user) {
    redirect("/login");
  }

  return (
    <section className="section bg-ink-50">
      <div className="container-page max-w-md">
        <h1 className="text-3xl font-extrabold text-ink-900">Completá tu perfil profesional</h1>
        <p className="mt-2 text-ink-600">Esta información la van a ver los clientes antes de reservarte un turno.</p>
        <div className="mt-8">
          <CompleteProviderProfileForm userId={user.id} />
        </div>
      </div>
    </section>
  );
}
