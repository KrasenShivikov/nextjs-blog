import Link from "next/link";
export const dynamic = 'force-static';

export default function AboutPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">About</h1>
        <p className="mt-4 text-zinc-600">
          This is a minimal blog demo built with Next.js App Router, Drizzle ORM, and
          server actions. It demonstrates authentication, post CRUD, and incremental
          static regeneration.
        </p>

        <div className="mt-6">
          <Link
            href="/"
            className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
          >
            Back to home
          </Link>
        </div>
      </section>
    </main>
  );
}
