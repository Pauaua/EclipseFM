"use server";

import { signIn, signOut } from "@/lib/auth";
import { AuthError } from "next-auth";

export async function loginAction(email: string, password: string) {
  try {
    await signIn("credentials", {
      email,
      password,
      redirect: false,
    });
    return { success: true };
  } catch (error) {
    if (error instanceof AuthError) {
      if (error.cause?.err?.message === "Cuenta desactivada") {
        return { success: false, error: "Cuenta desactivada. Contacta al administrador." };
      }
      return { success: false, error: "Credenciales inválidas." };
    }
    return { success: false, error: "Error al iniciar sesión." };
  }
}

export async function logoutAction() {
  await signOut({ redirectTo: "/login" });
}
