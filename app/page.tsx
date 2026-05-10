import Link from "next/link";
import { Suspense } from "react";
import { getAllPosts } from "@/app/actions/posts";

async function PostsGrid() {
  const data = await getAllPosts();

  if (data.length === 0) {
    return (
      <div className="rounded-2xl border border-zinc-200 bg-white p-8 text-center shadow-sm">
        <p className="text-zinc-600">No posts yet. Seed or create one to get started.</p>
      </div>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {data.map((post) => (
        <article
          key={post.id}
          className="group rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm transition hover:-translate-y-1 hover:shadow-md"
        >
          <p className="text-xs font-medium uppercase tracking-wide text-teal-700">
            {new Date(post.date).toLocaleDateString()}
          </p>

          <h2 className="mt-2 line-clamp-2 text-xl font-semibold tracking-tight text-zinc-900">
            {post.title}
          </h2>

          <p className="mt-3 line-clamp-3 text-sm text-zinc-600">{post.content}</p>

          <div className="mt-4 flex flex-wrap gap-2">
            {(post.tags ?? []).slice(0, 3).map((tag) => (
              <span
                key={tag}
                className="rounded-full border border-orange-200 bg-orange-50 px-2.5 py-1 text-xs font-medium text-orange-700"
              >
                #{tag}
              </span>
            ))}
          </div>

          <div className="mt-5 flex items-center justify-between border-t border-zinc-100 pt-4 text-sm">
            <span className="text-zinc-500">by {post.ownerName ?? "Unknown"}</span>
            <Link
              href={`/posts/${post.id}`}
              className="font-semibold text-teal-700 transition group-hover:text-teal-800"
            >
              Read more
            </Link>
          </div>
        </article>
      ))}
    </div>
  );
}

function PostsGridFallback() {
  return (
    <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {Array.from({ length: 6 }).map((_, idx) => (
        <article
          key={idx}
          className="animate-pulse rounded-2xl border border-zinc-200 bg-white p-5 shadow-sm"
        >
          <div className="h-4 w-1/3 rounded bg-zinc-200" />
          <div className="mt-3 h-7 w-4/5 rounded bg-zinc-200" />
          <div className="mt-2 h-4 w-full rounded bg-zinc-200" />
          <div className="mt-2 h-4 w-5/6 rounded bg-zinc-200" />
        </article>
      ))}
    </div>
  );
}

export default function HomePage() {
  return (
    <main className="mx-auto w-full max-w-6xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="mb-8 rounded-3xl bg-gradient-to-r from-teal-600 via-teal-500 to-orange-500 p-8 text-white shadow-sm">
        <h1 className="text-3xl font-semibold tracking-tight sm:text-4xl">Community Journal</h1>
        <p className="mt-2 max-w-2xl text-sm text-teal-50 sm:text-base">
          Discover practical ideas, engineering notes, and personal stories shared by the blog community.
        </p>
      </section>

      <Suspense fallback={<PostsGridFallback />}>
        <PostsGrid />
      </Suspense>
    </main>
  );
}
