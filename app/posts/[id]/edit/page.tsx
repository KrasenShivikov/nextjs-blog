import { notFound, redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import { db } from "@/src/db";
import { posts } from "@/src/db/schema";
import { getCurrentSession } from "@/src/lib/auth";
import { updatePostAction } from "@/app/actions/posts";
import { EditPostForm } from "@/app/ui/edit-post-form";

type EditPostPageProps = {
  params: Promise<{ id: string }>;
};

export default async function EditPostPage({ params }: EditPostPageProps) {
  const { id } = await params;
  const session = await getCurrentSession();

  if (!session) {
    redirect("/login");
  }

  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      tags: posts.tags,
      owner: posts.owner,
    })
    .from(posts)
    .where(eq(posts.id, id))
    .limit(1);

  const post = result[0];

  if (!post || post.owner !== session.userId) {
    notFound();
  }

  async function handleUpdate(_prevState: any, formData: FormData) {
    'use server'
    return await updatePostAction(post.id, _prevState as any, formData);
  }

  return (
    <main className="mx-auto w-full max-w-4xl flex-1 px-4 py-10 sm:px-6 lg:px-8">
      <section className="rounded-3xl border border-zinc-200 bg-white p-6 shadow-sm sm:p-8">
        <div className="mb-8">
          <p className="inline-block rounded-full bg-teal-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-teal-700">
            Edit
          </p>
          <h1 className="mt-3 text-3xl font-semibold tracking-tight text-zinc-900">
            Edit post
          </h1>
          <p className="mt-2 text-zinc-600">
            Update your post content, title, and tags.
          </p>
        </div>

        <EditPostForm
          action={handleUpdate}
          title={post.title}
          content={post.content}
          tags={(post.tags ?? []).join(", ")}
        />
      </section>
    </main>
  );
}
