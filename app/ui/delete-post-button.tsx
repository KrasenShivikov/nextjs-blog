'use client';

import { useState } from 'react';
import { DeletePostModal } from './delete-post-modal';

type DeletePostButtonProps = {
  postId: string;
  postTitle: string;
};

export function DeletePostButton({ postId, postTitle }: DeletePostButtonProps) {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <>
      <button
        onClick={() => setIsModalOpen(true)}
        className="rounded-xl bg-rose-600 px-4 py-2 text-sm font-semibold text-white transition hover:bg-rose-700"
      >
        Delete
      </button>
      <DeletePostModal
        postId={postId}
        postTitle={postTitle}
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </>
  );
}
