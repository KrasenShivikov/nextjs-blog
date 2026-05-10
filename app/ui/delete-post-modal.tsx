'use client';

import { useState } from 'react';
import { useFormStatus } from 'react-dom';
import { deletePostAction } from '@/app/actions/posts';

type DeletePostModalProps = {
  postId: string;
  postTitle: string;
  isOpen: boolean;
  onClose: () => void;
};

function ModalContent({ postId, postTitle, onClose }: Omit<DeletePostModalProps, 'isOpen'>) {
  const [isPending, setIsPending] = useState(false);
  const [error, setError] = useState<string | undefined>();

  const handleDelete = async () => {
    setIsPending(true);
    setError(undefined);
    
    const result = await deletePostAction(postId);
    
    // If there's an error, display it; otherwise the redirect will happen automatically
    if (result?.error) {
      setError(result.error);
      setIsPending(false);
    }
    // If no error, the server action's redirect() will handle navigation
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto overflow-x-hidden bg-black bg-opacity-50">
      <div className="relative w-full max-w-lg rounded-3xl border border-rose-200 bg-white p-8 shadow-2xl m-4">
        <p className="inline-block rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-rose-700">
          Confirm delete
        </p>
        <h2 className="mt-3 text-2xl font-semibold tracking-tight text-zinc-900">
          Delete post
        </h2>
        <p className="mt-3 text-zinc-600">
          You are about to delete <span className="font-semibold text-zinc-900">{postTitle}</span>.
          This cannot be undone.
        </p>

        {error && (
          <div className="mt-4 rounded-lg bg-rose-50 p-3 text-sm text-rose-700">
            {error}
          </div>
        )}

        <div className="mt-8 flex flex-wrap gap-3">
          <button
            onClick={handleDelete}
            disabled={isPending}
            className="rounded-xl bg-rose-600 px-6 py-3 text-sm font-semibold text-white transition hover:bg-rose-700 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {isPending ? 'Deleting...' : 'Delete permanently'}
          </button>
          <button
            type="button"
            onClick={onClose}
            disabled={isPending}
            className="rounded-xl border border-zinc-300 px-6 py-3 text-sm font-semibold text-zinc-700 transition hover:bg-zinc-100 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

export function DeletePostModal({ postId, postTitle, isOpen, onClose }: DeletePostModalProps) {
  if (!isOpen) return null;

  return (
    <>
      <ModalContent postId={postId} postTitle={postTitle} onClose={onClose} />
    </>
  );
}
