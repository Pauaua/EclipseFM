"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import bcrypt from "bcryptjs";

const updateProfileSchema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  apellido: z.string().min(1, "Apellido requerido"),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
});

const changePasswordSchema = z.object({
  passwordActual: z.string().min(1, "Contraseña actual requerida"),
  passwordNueva: z.string().min(6, "La nueva contraseña debe tener al menos 6 caracteres"),
});

export async function updateProfile(data: z.infer<typeof updateProfileSchema>) {
  const session = await auth();
  if (!session) return { success: false, error: "No autorizado" };

  const parsed = updateProfileSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };

  await prisma.user.update({
    where: { id: session.user.id },
    data: parsed.data,
  });

  return { success: true };
}

export async function changePassword(data: z.infer<typeof changePasswordSchema>) {
  const session = await auth();
  if (!session) return { success: false, error: "No autorizado" };

  const parsed = changePasswordSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };

  const user = await prisma.user.findUnique({ where: { id: session.user.id } });
  if (!user) return { success: false, error: "Usuario no encontrado" };

  const match = await bcrypt.compare(parsed.data.passwordActual, user.password);
  if (!match) return { success: false, error: "La contraseña actual es incorrecta" };

  const hashed = await bcrypt.hash(parsed.data.passwordNueva, 12);
  await prisma.user.update({
    where: { id: session.user.id },
    data: { password: hashed },
  });

  return { success: true };
}
