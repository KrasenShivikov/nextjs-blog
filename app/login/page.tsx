import Link from "next/link";
import { loginAction } from "@/app/actions/auth";
import { AuthForm } from "@/app/ui/auth-form";

export default function LoginPage() {
  return (
    <main className="mx-auto flex w-full max-w-5xl flex-1 items-center px-4 py-12 sm:px-6 lg:px-8">
      <section className="grid w-full gap-8 rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm md:grid-cols-2 md:p-10">
        <div className="space-y-4">
          <p className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
            Welcome back
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-zinc-900">
            Log in to your account
          </h1>
          <p className="text-zinc-600">
            Continue where you left off and explore the newest posts from the community.
          </p>
        </div>

        <div className="rounded-2xl border border-zinc-200 bg-zinc-50 p-5 sm:p-6">
          <AuthForm mode="login" action={loginAction} />
          <p className="mt-4 text-sm text-zinc-600">
            New here?{" "}
            <Link href="/register" className="font-semibold text-orange-700 hover:text-orange-800">
              Create an account
            </Link>
          </p>
        </div>
      </section>
    </main>
  );
}
