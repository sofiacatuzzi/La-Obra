import type { Metadata } from "next";
import LoginForm from "@/components/LoginForm";

export const metadata: Metadata = {
  title: "Iniciar sesión",
  description: "Iniciá sesión en tu cuenta de La Obra.",
  alternates: { canonical: "/login" },
};

export default function LoginPage() {
  return (
    <section className="section bg-ink-50">
      <div className="container-page max-w-md">
        <h1 className="text-3xl font-extrabold text-ink-900">Iniciar sesión</h1>
        <p className="mt-2 text-ink-600">Ingresá con tu email y contraseña.</p>
        <div className="mt-8">
          <LoginForm />
        </div>
      </div>
    </section>
  );
}
