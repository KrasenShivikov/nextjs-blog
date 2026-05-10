import { getCurrentSession } from "@/src/lib/auth";
import { createPostAction } from "@/app/actions/posts";
import { CreatePostForm } from "@/app/ui/create-post-form";

export default async function NewPostPage() {
  const session = await getCurrentSession();

  if (!session) {
    return (
      <main className="mx-auto flex w-full max-w-4xl flex-1 items-center px-4 py-12 sm:px-6 lg:px-8">
        <section className="w-full rounded-3xl border border-zinc-200 bg-white p-8 shadow-sm">
          <h1 className="text-2xl font-semibold tracking-tight text-zinc-900">
            Authentication required
          </h1>
          <p className="mt-2 text-zinc-600">
            You need to log in to create a post.
          </p>
          <a
            href="/login"
            className="mt-6 inline-flex rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700"
          >
            Go to login
          </a>
        </section>
      </main>
    );
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <p className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
            Create
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
            Publish a new post
          </h1>
          <p className="mt-2 text-zinc-600">
            Share your thoughts, ideas, and stories with the community.
          </p>
        </div>

        <CreatePostForm action={createPostAction} />
      </section>
    </main>
  );
}
