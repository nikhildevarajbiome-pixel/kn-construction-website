export function PageHeader({ title, intro }: { title: string; intro?: string }) {
  return (
    <section className="relative overflow-hidden bg-navy py-20 text-white sm:py-28">
      <div className="absolute inset-y-0 left-0 w-1 bg-gold" aria-hidden />
      <div className="container-x">
        <h1 className="max-w-3xl text-5xl sm:text-6xl">{title}</h1>
        {intro && <p className="mt-5 max-w-2xl text-lg leading-relaxed text-white/80">{intro}</p>}
      </div>
    </section>
  );
}
