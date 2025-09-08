"use server";

import { signIn } from "@/auth/auth";
import { IUser } from "@/types/user";

interface SignInResult {
  user?: IUser;
  error?: string;
}

export async function signInWithCredentials(
  email: string,
  password: string
): Promise<SignInResult> {
  try {
    const user = await signIn("credentials", {
      email,
      password,
      redirect: false,
    });

    return { user };
  } catch (error) {
    console.error("Ошибка авторизации", error);
    return { error: "Ошибка авторизации" };
  }
}
