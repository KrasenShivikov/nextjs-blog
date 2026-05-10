import Link from "next/link";
import { registerAction } from "@/app/actions/auth";
import { AuthForm } from "@/app/ui/auth-form";

export default function RegisterPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid w-full gap-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="space-y-4">
          <p className="inline-block rounded-full bg-orange-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-orange-700">
            Join the writing room
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Create your account
          </h1>
          <p className="text-zinc-600">
            Sign up to publish posts and keep your reading list synced across devices.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
          <AuthForm mode="register" action={registerAction} />
          <p className="mt-4 text-sm text-zinc-600">
            Already have an account?{" "}
            <Link href="/login" className="font-semibold text-teal-700 hover:text-teal-800">
              Log in
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
