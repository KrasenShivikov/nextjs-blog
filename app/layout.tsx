import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import Link from "next/link";
import { getCurrentSession } from "@/src/lib/auth";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "Next Blog",
  description: "Modern Next.js blog with Drizzle and auth",
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const session = await getCurrentSession();

  return (
    <html
      lang="en"
      className={`${geistSans.variable} ${geistMono.variable} h-full antialiased`}
    >
      <body className="min-h-full flex flex-col bg-zinc-100 text-zinc-900">
        <header className="sticky top-0 z-20 border-b border-zinc-200/80 bg-white/90 backdrop-blur">
          <div className="mx-auto flex w-full max-w-6xl items-center justify-between px-4 py-4 sm:px-6 lg:px-8">
            <Link href="/" className="text-lg font-semibold tracking-tight">
              Next Blog
            </Link>

            <nav className="flex items-center gap-2 text-sm font-medium">
              <Link
                href="/"
                className="rounded-full px-3 py-1.5 text-zinc-700 transition hover:bg-zinc-100"
              >
                Posts
              </Link>

              {session ? (
                <>
                  <Link
                    href="/posts/new"
                    className="rounded-full bg-teal-600 px-3 py-1.5 text-white transition hover:bg-teal-700"
                  >
                    Create
                  </Link>
                  <span className="hidden rounded-full bg-teal-100 px-3 py-1.5 text-teal-800 sm:inline-block">
                    {session.name}
                  </span>
                  <Link
                    href="/logout"
                    className="rounded-full bg-zinc-900 px-3 py-1.5 text-white transition hover:bg-zinc-700"
                  >
                    Logout
                  </Link>
                </>
              ) : (
                <>
                  <Link
                    href="/login"
                    className="rounded-full px-3 py-1.5 text-zinc-700 transition hover:bg-zinc-100"
                  >
                    Login
                  </Link>
                  <Link
                    href="/register"
                    className="rounded-full bg-orange-500 px-3 py-1.5 text-white transition hover:bg-orange-600"
                  >
                    Register
                  </Link>
                </>
              )}
            </nav>
          </div>
        </header>

        {children}
      </body>
    </html>
  );
}
