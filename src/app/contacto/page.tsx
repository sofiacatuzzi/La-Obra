import type { Metadata } from "next";
import ContactForm from "@/components/ContactForm";
import { siteConfig } from "@/lib/site";

export const metadata: Metadata = {
  title: "Contacto",
  description: "Escribinos ante cualquier consulta sobre La Obra, pedidos, pagos o comisiones.",
  alternates: { canonical: "/contacto" },
};

export default function ContactoPage() {
  return (
    <section className="section bg-ink-50">
      <div className="container-page grid gap-10 lg:grid-cols-3">
        <div>
          <h1 className="text-3xl font-extrabold text-ink-900">Contacto</h1>
          <p className="mt-3 text-ink-600">¿Tenés dudas sobre un pedido, un pago o querés sumarte como profesional? Escribinos.</p>
          <div className="mt-8 space-y-4 text-sm text-ink-700">
            <p><span className="font-semibold text-ink-900">Email: </span>{siteConfig.supportEmail}</p>
            <p><span className="font-semibold text-ink-900">Teléfono: </span>{siteConfig.phone}</p>
            <p><span className="font-semibold text-ink-900">Ubicación: </span>Buenos Aires, Argentina</p>
          </div>
        </div>
        <div className="lg:col-span-2">
          <ContactForm />
        </div>
      </div>
    </section>
  );
}
