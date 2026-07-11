import Link from "next/link";
import { categories } from "@/lib/categories";
import { categoryIcons, ArrowRightIcon } from "@/components/Icons";

export default function CategoryGrid({ limit }: { limit?: number }) {
  const items = limit ? categories.slice(0, limit) : categories;

  return (
    <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 lg:grid-cols-5">
      {items.map((c) => {
        const Icon = categoryIcons[c.icon];
        return (
          <Link
            key={c.slug}
            href={`/servicios/${c.slug}`}
            className="group flex flex-col gap-3 rounded-2xl border border-ink-100 bg-white p-5 shadow-soft transition-all hover:-translate-y-0.5 hover:border-brand-200 hover:shadow-card"
          >
            <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-brand-50 text-brand-600">
              {Icon && <Icon className="h-6 w-6" />}
            </span>
            <span className="text-sm font-semibold text-ink-900">{c.name}</span>
            <span className="line-clamp-2 text-xs text-ink-500">{c.shortDescription}</span>
            <span className="mt-auto flex items-center gap-1 text-xs font-semibold text-brand-600 opacity-0 transition-opacity group-hover:opacity-100">
              Ver profesionales <ArrowRightIcon className="h-3.5 w-3.5" />
            </span>
          </Link>
        );
      })}
    </div>
  );
}
