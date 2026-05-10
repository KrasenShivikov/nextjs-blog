import Link from "next/link";
export const revalidate = 60;
import { notFound } from "next/navigation";
import { DeletePostButton } from "@/app/ui/delete-post-button";
import { getPostById } from "@/app/actions/posts";
import { getCurrentSession } from "@/src/lib/auth";

type PostDetailPageProps = {
  params: Promise<{ id: string }>;
};

export default async function PostDetailPage({ params }: PostDetailPageProps) {
  const { id } = await params;

  const post = await getPostById(id);

  if (!post) {
    notFound();
  }

  const session = await getCurrentSession();
  const isOwner = session?.userId === post.owner;

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <article className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <Link href="/" className="text-sm font-medium text-teal-700 hover:text-teal-800">
          Back to posts
        </Link>

        <h1 className="mt-4 text-3xl font-semibold tracking-tight text-zinc-900">
          {post.title}
        </h1>

        <p className="mt-3 text-sm text-zinc-500">
          {new Date(post.date).toLocaleDateString()} by {post.ownerName ?? "Unknown author"}
          {post.ownerEmail ? ` (${post.ownerEmail})` : ""}
        </p>

        <div className="prose prose-zinc mt-8 max-w-none whitespace-pre-line text-zinc-700">
          {post.content}
        </div>

        <div className="mt-8 flex flex-wrap gap-2">
          {(post.tags ?? []).map((tag) => (
            <span
              key={tag}
              className="rounded-full border border-orange-200 bg-orange-50 px-3 py-1 text-xs font-medium text-orange-700"
            >
              #{tag}
            </span>
          ))}
        </div>

        {isOwner ? (
          <div className="mt-8 border-t border-zinc-100 pt-6">
            <p className="mb-3 text-sm font-medium text-zinc-700">Owner actions</p>
            <div className="flex flex-wrap gap-2">
              <DeletePostButton postId={post.id} postTitle={post.title} />
              <Link
                href={`/posts/${post.id}/edit`}
                className="rounded-xl border border-zinc-300 px-4 py-2 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
              >
                Edit
              </Link>
            </div>
          </div>
        ) : null}
      </article>
    </main>
  );
}
