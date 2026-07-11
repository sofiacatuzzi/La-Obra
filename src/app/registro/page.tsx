import type { Metadata } from "next";
import SignupForm from "@/components/SignupForm";
import type { UserRole } from "@/lib/schedule-types";

export const metadata: Metadata = {
  title: "Creá tu cuenta",
  description: "Registrate en La Obra como cliente o como profesional.",
  alternates: { canonical: "/registro" },
};

export default async function RegistroPage({
  searchParams,
}: {
  searchParams: Promise<{ role?: string }>;
}) {
  const { role } = await searchParams;
  const initialRole: UserRole = role === "profesional" ? "profesional" : "cliente";

  return (
    <section className="section bg-ink-50">
      <div className="container-page max-w-md">
        <h1 className="text-3xl font-extrabold text-ink-900">Creá tu cuenta</h1>
        <p className="mt-2 text-ink-600">Sumate para pedir presupuestos o para ofrecer tus servicios.</p>
        <div className="mt-8">
          <SignupForm initialRole={initialRole} />
        </div>
      </div>
    </section>
  );
}
