"use server";

import { revalidatePath } from "next/cache";
import { redirect } from "next/navigation";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { db } from "@/src/db";
import { users } from "@/src/db/schema";
import {
  clearAuthCookie,
  setAuthCookie,
  signSessionToken,
} from "@/src/lib/auth";

export type AuthState = {
  error?: string;
};

function readText(formData: FormData, key: string): string {
  const value = formData.get(key);
  if (typeof value !== "string") {
    return "";
  }
  return value.trim();
}

export async function registerAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const name = readText(formData, "name");
  const email = readText(formData, "email").toLowerCase();
  const password = readText(formData, "password");

  if (name.length < 2) {
    return { error: "Name must be at least 2 characters long." };
  }

  if (!email.includes("@")) {
    return { error: "Please enter a valid email address." };
  }

  if (password.length < 6) {
    return { error: "Password must be at least 6 characters long." };
  }

  const existing = await db
    .select({ id: users.id })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (existing.length > 0) {
    return { error: "This email is already registered." };
  }

  const passwordHash = await bcrypt.hash(password, 10);

  const [createdUser] = await db
    .insert(users)
    .values({
      name,
      email,
      passwordHash,
    })
    .returning({
      id: users.id,
      email: users.email,
      name: users.name,
    });

  const token = await signSessionToken({
    userId: createdUser.id,
    email: createdUser.email,
    name: createdUser.name,
  });

  await setAuthCookie(token);
  revalidatePath("/");
  redirect("/");
}

export async function loginAction(
  _prevState: AuthState,
  formData: FormData,
): Promise<AuthState> {
  const email = readText(formData, "email").toLowerCase();
  const password = readText(formData, "password");

  if (!email || !password) {
    return { error: "Please provide both email and password." };
  }

  const [user] = await db
    .select({
      id: users.id,
      email: users.email,
      name: users.name,
      passwordHash: users.passwordHash,
    })
    .from(users)
    .where(eq(users.email, email))
    .limit(1);

  if (!user) {
    return { error: "Invalid email or password." };
  }

  const isValidPassword = await bcrypt.compare(password, user.passwordHash);

  if (!isValidPassword) {
    return { error: "Invalid email or password." };
  }

  const token = await signSessionToken({
    userId: user.id,
    email: user.email,
    name: user.name,
  });

  await setAuthCookie(token);
  revalidatePath("/");
  redirect("/");
}

export async function logoutAction(): Promise<void> {
  await clearAuthCookie();
  revalidatePath("/");
  redirect("/login");
}
