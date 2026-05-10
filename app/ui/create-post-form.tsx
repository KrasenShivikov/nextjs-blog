"use client";

import Link from "next/link";
import { useActionState } from "react";
import { useFormStatus } from "react-dom";
import type { PostActionState } from "@/app/actions/posts";

const initialState: PostActionState = {};

function SubmitButton({ label }: { label: string }) {
  const { pending } = useFormStatus();

  return (
    <button
      type="submit"
      disabled={pending}
      className="rounded-xl bg-teal-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-teal-700 disabled:cursor-not-allowed disabled:opacity-60"
    >
      {pending ? "Publishing..." : label}
    </button>
  );
}

type CreatePostFormProps = {
  action: (state: PostActionState, formData: FormData) => Promise<PostActionState>;
};

export function CreatePostForm({ action }: CreatePostFormProps) {
  const [state, formAction] = useActionState(action, initialState);

  return (
    <form action={formAction} className="space-y-5">
      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="title">
          Post Title
        </label>
        <input
          id="title"
          name="title"
          required
          minLength={3}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-teal-300 transition focus:ring"
          placeholder="Enter your post title"
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="content">
          Content
        </label>
        <textarea
          id="content"
          name="content"
          required
          minLength={10}
          rows={12}
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-teal-300 transition focus:ring"
          placeholder="Write your post content here..."
        />
      </div>

      <div>
        <label className="mb-2 block text-sm font-medium text-zinc-700" htmlFor="tags">
          Tags (comma-separated)
        </label>
        <input
          id="tags"
          name="tags"
          type="text"
          className="w-full rounded-xl border border-zinc-300 bg-white px-4 py-3 text-sm text-zinc-900 outline-none ring-teal-300 transition focus:ring"
          placeholder="e.g., javascript, react, next.js"
        />
      </div>

      {state?.error ? (
        <p className="rounded-lg border border-rose-200 bg-rose-50 px-3 py-2 text-sm text-rose-700">
          {state.error}
        </p>
      ) : null}

      <div className="flex gap-3 pt-2">
        <SubmitButton label="Publish Post" />
        <Link
          href="/"
          className="inline-flex items-center justify-center rounded-xl border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100"
        >
          Cancel
        </Link>
      </div>
    </form>
  );
}
