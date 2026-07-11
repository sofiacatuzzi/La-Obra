import Link from "next/link";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

export default function Footer() {
  return (
    <footer className="border-t border-ink-100 bg-ink-900 text-ink-200">
      <div className="container-page grid gap-10 py-14 sm:grid-cols-2 lg:grid-cols-4">
        <div>
          <Link href="/" className="flex items-center gap-2 text-lg font-extrabold text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">LO</span>
            {siteConfig.name}
          </Link>
          <p className="mt-3 text-sm leading-relaxed text-ink-300">{siteConfig.description}</p>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Servicios populares</h3>
          <ul className="mt-3 space-y-2 text-sm">
            {categories.slice(0, 6).map((c) => (
              <li key={c.slug}>
                <Link href={`/servicios/${c.slug}`} className="hover:text-white">
                  {c.name}
                </Link>
              </li>
            ))}
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">La Obra</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>
              <Link href="/como-funciona" className="hover:text-white">Cómo funciona</Link>
            </li>
            <li>
              <Link href="/profesionales" className="hover:text-white">Para profesionales</Link>
            </li>
            <li>
              <Link href="/precios" className="hover:text-white">Precios y comisiones</Link>
            </li>
            <li>
              <Link href="/preguntas-frecuentes" className="hover:text-white">Preguntas frecuentes</Link>
            </li>
            <li>
              <Link href="/contacto" className="hover:text-white">Contacto</Link>
            </li>
          </ul>
        </div>

        <div>
          <h3 className="text-sm font-semibold text-white">Contacto</h3>
          <ul className="mt-3 space-y-2 text-sm">
            <li>{siteConfig.supportEmail}</li>
            <li>{siteConfig.phone}</li>
            <li>Buenos Aires, Argentina</li>
          </ul>
        </div>
      </div>

      <div className="border-t border-ink-800">
        <div className="container-page flex flex-col gap-2 py-6 text-xs text-ink-400 sm:flex-row sm:items-center sm:justify-between">
          <p>© {new Date().getFullYear()} {siteConfig.name}. Todos los derechos reservados.</p>
          <p>Sitio de demostración — los pagos y perfiles son datos de ejemplo.</p>
        </div>
      </div>
    </footer>
  );
}
