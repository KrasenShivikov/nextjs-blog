export default function PostDetailLoading() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="animate-pulse rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="h-4 w-32 rounded bg-zinc-200" />
        <div className="mt-5 h-10 w-3/4 rounded bg-zinc-200" />
        <div className="mt-3 h-4 w-1/2 rounded bg-zinc-200" />
        <div className="mt-8 space-y-3">
          <div className="h-4 w-full rounded bg-zinc-200" />
          <div className="h-4 w-full rounded bg-zinc-200" />
          <div className="h-4 w-5/6 rounded bg-zinc-200" />
        </div>
      </section>
    </main>
  );
}
