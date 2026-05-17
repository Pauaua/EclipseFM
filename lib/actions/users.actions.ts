"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import bcrypt from "bcryptjs";
import { Role, UserStatus } from "@prisma/client";

const createUserSchema = z.object({
  nombre: z.string().min(1, "Nombre requerido"),
  apellido: z.string().min(1, "Apellido requerido"),
  username: z.string().min(3, "Username mínimo 3 caracteres"),
  email: z.string().email("Email inválido"),
  password: z.string().min(6, "Contraseña mínimo 6 caracteres"),
  telefono: z.string().optional(),
  direccion: z.string().optional(),
  role: z.nativeEnum(Role),
});

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") {
    throw new Error("No autorizado");
  }
  return session;
}

export async function getUsers(filters?: { role?: Role; status?: UserStatus }) {
  await requireAdmin();
  return prisma.user.findMany({
    where: filters,
    orderBy: { createdAt: "desc" },
    select: {
      id: true,
      nombre: true,
      apellido: true,
      username: true,
      email: true,
      telefono: true,
      role: true,
      status: true,
      createdAt: true,
    },
  });
}

export async function createUser(data: z.infer<typeof createUserSchema>) {
  await requireAdmin();
  const parsed = createUserSchema.safeParse(data);
  if (!parsed.success) {
    return { success: false, error: parsed.error.errors[0].message };
  }
  try {
    const hashed = await bcrypt.hash(parsed.data.password, 12);
    const user = await prisma.user.create({
      data: { ...parsed.data, password: hashed },
    });
    return { success: true, data: { id: user.id } };
  } catch (e: unknown) {
    const msg = e instanceof Error ? e.message : "";
    if (msg.includes("Unique constraint")) {
      return { success: false, error: "Email o username ya existe." };
    }
    return { success: false, error: "Error al crear usuario." };
  }
}

export async function toggleUserStatus(userId: string) {
  await requireAdmin();
  const user = await prisma.user.findUnique({ where: { id: userId } });
  if (!user) return { success: false, error: "Usuario no encontrado" };
  const updated = await prisma.user.update({
    where: { id: userId },
    data: { status: user.status === "ACTIVE" ? "INACTIVE" : "ACTIVE" },
  });
  return { success: true, data: { status: updated.status } };
}

export async function deleteUser(userId: string) {
  await requireAdmin();
  const session = await auth();
  if (session?.user.id === userId) {
    return { success: false, error: "No puedes eliminar tu propia cuenta." };
  }
  await prisma.user.delete({ where: { id: userId } });
  return { success: true };
}
