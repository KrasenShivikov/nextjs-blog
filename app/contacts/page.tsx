import Link from "next/link";
export const dynamic = 'force-static';

export default function ContactsPage() {
  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">Contact</h1>
        <p className="mt-4 text-zinc-600">If you have questions or feedback, reach out at:</p>
        <ul className="mt-4 space-y-2 text-zinc-700">
          <li>Email: <span className="font-medium">hello@example.com</span></li>
          <li>Twitter: <span className="font-medium">@example</span></li>
        </ul>

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
