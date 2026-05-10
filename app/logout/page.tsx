import Link from "next/link";
import { logoutAction } from "@/app/actions/auth";

export default function LogoutPage() {
  return (
    <main className="mx-auto flex w-full max-w-xl flex-1 items-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="w-full rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
        <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">Log out</h1>
        <p className="mt-2 text-zinc-600">
          Ready to leave? You can safely log out now.
        </p>

        <form action={logoutAction} className="mt-6">
          <button
            type="submit"
            className="w-full rounded-xl bg-zinc-900 px-4 py-3 text-sm font-semibold text-white transition hover:bg-zinc-700"
          >
            Confirm logout
          </button>
        </form>

        <Link
          href="/"
          className="mt-3 inline-flex w-full items-center justify-center rounded-xl border border-zinc-300 px-4 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
        >
          Cancel
        </Link>
      </section>
    </main>
  );
}
