import Link from "next/link";

export default function NotFound() {
  return (
    <section className="section">
      <div className="container-page flex flex-col items-center gap-4 text-center">
        <h1 className="text-4xl font-extrabold text-ink-900">404</h1>
        <p className="text-ink-600">No encontramos la página que buscás.</p>
        <Link href="/" className="btn-primary">Volver al inicio</Link>
      </div>
    </section>
  );
}
