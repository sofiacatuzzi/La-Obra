"use client";

import Link from "next/link";
import { useState } from "react";
import { usePathname } from "next/navigation";
import { siteConfig } from "@/lib/site";
import { MenuIcon, XIcon } from "@/components/Icons";

const navLinks = [
  { href: "/servicios", label: "Servicios" },
  { href: "/como-funciona", label: "Cómo funciona" },
  { href: "/profesionales", label: "Para profesionales" },
  { href: "/precios", label: "Precios" },
  { href: "/preguntas-frecuentes", label: "Preguntas frecuentes" },
];

export default function Header() {
  const [open, setOpen] = useState(false);
  const pathname = usePathname();

  return (
    <header className="sticky top-0 z-50 border-b border-ink-100 bg-white/90 backdrop-blur">
      <div className="mx-auto flex h-16 w-full max-w-7xl items-center justify-between gap-4 px-5 sm:px-6 lg:px-8">
        <Link href="/" className="flex shrink-0 items-center gap-2 text-lg font-extrabold tracking-tight text-ink-900">
          <span className="flex h-8 w-8 items-center justify-center rounded-lg bg-brand-600 text-white">LO</span>
          {siteConfig.name}
        </Link>

        <nav className="hidden items-center gap-5 xl:flex">
          {navLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`whitespace-nowrap text-sm font-medium transition-colors hover:text-brand-600 ${
                pathname === link.href ? "text-brand-600" : "text-ink-700"
              }`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <div className="hidden shrink-0 items-center gap-3 xl:flex">
          <Link href="/registro-profesional" className="whitespace-nowrap text-sm font-semibold text-ink-700 hover:text-brand-600">
            Ofrecer mis servicios
          </Link>
          <Link href="/solicitar" className="btn-primary whitespace-nowrap">
            Pedir presupuesto
          </Link>
        </div>

        <button
          type="button"
          aria-label={open ? "Cerrar menú" : "Abrir menú"}
          className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg text-ink-700 xl:hidden"
          onClick={() => setOpen((v) => !v)}
        >
          {open ? <XIcon className="h-6 w-6" /> : <MenuIcon className="h-6 w-6" />}
        </button>
      </div>

      {open && (
        <div className="border-t border-ink-100 bg-white xl:hidden">
          <nav className="container-page flex flex-col gap-1 py-3">
            {navLinks.map((link) => (
              <Link
                key={link.href}
                href={link.href}
                onClick={() => setOpen(false)}
                className="rounded-lg px-2 py-2.5 text-sm font-medium text-ink-700 hover:bg-ink-50"
              >
                {link.label}
              </Link>
            ))}
            <div className="mt-2 flex flex-col gap-2 border-t border-ink-100 pt-3">
              <Link href="/registro-profesional" onClick={() => setOpen(false)} className="btn-outline w-full">
                Ofrecer mis servicios
              </Link>
              <Link href="/solicitar" onClick={() => setOpen(false)} className="btn-primary w-full">
                Pedir presupuesto
              </Link>
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}
