"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { desc, eq } from "drizzle-orm";
import { db } from "@/src/db";
import { posts, users } from "@/src/db/schema";
import { getCurrentSession } from "@/src/lib/auth";

export type PostActionState = {
  error?: string;
};

export type PostWithAuthor = {
  id: string;
  title: string;
  content: string;
  date: Date;
  tags: string[] | null;
  ownerName: string | null;
};

export type PostDetail = {
  id: string;
  title: string;
  content: string;
  tags: string[] | null;
  date: Date;
  owner: string;
  ownerName: string | null;
  ownerEmail: string | null;
};

export async function getAllPosts(): Promise<PostWithAuthor[]> {
  const data = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      date: posts.date,
      tags: posts.tags,
      ownerName: users.name,
    })
    .from(posts)
    .leftJoin(users, eq(posts.owner, users.id))
    .orderBy(desc(posts.date));

  return data;
}

export async function getPostById(id: string): Promise<PostDetail | null> {
  const result = await db
    .select({
      id: posts.id,
      title: posts.title,
      content: posts.content,
      tags: posts.tags,
      date: posts.date,
      owner: posts.owner,
      ownerName: users.name,
      ownerEmail: users.email,
    })
    .from(posts)
    .leftJoin(users, eq(posts.owner, users.id))
    .where(eq(posts.id, id))
    .limit(1);

  return result[0] || null;
}

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

export async function createPostAction(
  _prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const session = await getCurrentSession();

  if (!session) {
    return { error: "You must be logged in to create a post." };
  }

  const title = readText(formData, "title");
  const content = readText(formData, "content");
  const tagsStr = readText(formData, "tags");
  const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()) : [];

  if (title.length < 3) {
    return { error: "Title must be at least 3 characters long." };
  }

  if (content.length < 10) {
    return { error: "Content must be at least 10 characters long." };
  }

  try {
    const [createdPost] = await db
      .insert(posts)
      .values({
        title,
        content,
        tags,
        owner: session.userId,
      })
      .returning({ id: posts.id });

    revalidatePath("/");
    revalidatePath("/posts");
  } catch (error) {
    console.error("Error creating post:", error);
    return { error: "Failed to create post. Please try again." };
  }

  // After publishing, redirect to home page
  redirect("/");
}

export async function deletePostAction(postId: string): Promise<PostActionState> {
  const session = await getCurrentSession();

  if (!session) {
    return { error: "You must be logged in to delete a post." };
  }

  try {
    // Verify ownership before deleting
    const [postToDelete] = await db
      .select({ owner: posts.owner })
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (!postToDelete) {
      return { error: "Post not found." };
    }

    if (postToDelete.owner !== session.userId) {
      return { error: "You can only delete your own posts." };
    }

    await db.delete(posts).where(eq(posts.id, postId));

    revalidatePath("/");
    revalidatePath("/posts");
  } catch (error) {
    console.error("Error deleting post:", error);
    return { error: "Failed to delete post. Please try again." };
  }

  redirect("/");
}

export async function updatePostAction(
  postId: string,
  _prevState: PostActionState,
  formData: FormData,
): Promise<PostActionState> {
  const session = await getCurrentSession();

  if (!session) {
    return { error: "You must be logged in to edit a post." };
  }

  const title = readText(formData, "title");
  const content = readText(formData, "content");
  const tagsStr = readText(formData, "tags");
  const tags = tagsStr ? tagsStr.split(",").map((t) => t.trim()).filter(Boolean) : [];

  if (title.length < 3) {
    return { error: "Title must be at least 3 characters long." };
  }

  if (content.length < 10) {
    return { error: "Content must be at least 10 characters long." };
  }

  try {
    const [existingPost] = await db
      .select({ owner: posts.owner })
      .from(posts)
      .where(eq(posts.id, postId))
      .limit(1);

    if (!existingPost) {
      return { error: "Post not found." };
    }

    if (existingPost.owner !== session.userId) {
      return { error: "You can only edit your own posts." };
    }

    await db
      .update(posts)
      .set({
        title,
        content,
        tags,
        updatedAt: new Date(),
      })
      .where(eq(posts.id, postId));

    revalidatePath("/");
    revalidatePath("/posts");
    revalidatePath(`/posts/${postId}`);
  } catch (error) {
    console.error("Error updating post:", error);
    return { error: "Failed to update post. Please try again." };
  }

  redirect(`/posts/${postId}`);
}
