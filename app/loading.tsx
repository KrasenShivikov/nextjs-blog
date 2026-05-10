export default function GlobalLoading() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {Array.from({ length: 6 }).map((_, idx) => (
          <article
            key={idx}
            className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
          >
            <div className="h-5 w-3/4 rounded bg-zinc-200" />
            <div className="mt-3 h-4 w-full rounded bg-zinc-200" />
            <div className="mt-2 h-4 w-5/6 rounded bg-zinc-200" />
            <div className="mt-4 h-4 w-1/3 rounded bg-zinc-200" />
          </article>
        ))}
      </section>
    </main>
  );
}
