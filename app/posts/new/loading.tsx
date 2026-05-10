export default function NewPostLoading() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <div className="h-6 w-20 rounded bg-zinc-200" />
          <div className="mt-3 h-9 w-3/4 rounded bg-zinc-200" />
          <div className="mt-2 h-4 w-2/3 rounded bg-zinc-200" />
        </div>

        <div className="space-y-5">
          <div>
            <div className="mb-2 h-4 w-24 rounded bg-zinc-200" />
            <div className="h-10 w-full rounded bg-zinc-200" />
          </div>
          <div>
            <div className="mb-2 h-4 w-20 rounded bg-zinc-200" />
            <div className="h-48 w-full rounded bg-zinc-200" />
          </div>
          <div>
            <div className="mb-2 h-4 w-32 rounded bg-zinc-200" />
            <div className="h-10 w-full rounded bg-zinc-200" />
          </div>
        </div>
      </section>
    </main>
  );
}
