type FaqItem = { q: string; a: string };

export default function FaqAccordion({ items }: { items: FaqItem[] }) {
  return (
    <div className="space-y-3">
      {items.map((item) => (
        <details key={item.q} className="group rounded-2xl border border-ink-100 bg-white p-5 shadow-soft open:shadow-card">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 text-sm font-semibold text-ink-900">
            {item.q}
            <span className="shrink-0 text-lg text-brand-600 transition-transform group-open:rotate-45">+</span>
          </summary>
          <p className="mt-3 text-sm leading-relaxed text-ink-600">{item.a}</p>
        </details>
      ))}
    </div>
  );
}
