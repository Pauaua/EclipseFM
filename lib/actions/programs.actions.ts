"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";
import { ProgramCategory } from "@prisma/client";

const programSchema = z.object({
  titulo: z.string().min(1, "Título requerido"),
  descripcion: z.string().min(1, "Descripción requerida"),
  conductor: z.string().min(1, "Conductor requerido"),
  horarioInicio: z.string().min(1, "Horario inicio requerido"),
  horarioFin: z.string().min(1, "Horario fin requerido"),
  dias: z.array(z.string()).min(1, "Selecciona al menos un día"),
  categoria: z.nativeEnum(ProgramCategory),
});

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") throw new Error("No autorizado");
}

export async function getPrograms(soloActivos = false) {
  return prisma.program.findMany({
    where: soloActivos ? { activo: true } : undefined,
    orderBy: { createdAt: "desc" },
  });
}

export async function createProgram(data: z.infer<typeof programSchema>) {
  await requireAdmin();
  const parsed = programSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };
  const program = await prisma.program.create({ data: parsed.data });
  return { success: true, data: program };
}

export async function updateProgram(id: string, data: Partial<z.infer<typeof programSchema>>) {
  await requireAdmin();
  const program = await prisma.program.update({ where: { id }, data });
  return { success: true, data: program };
}

export async function deleteProgram(id: string) {
  await requireAdmin();
  await prisma.program.delete({ where: { id } });
  return { success: true };
}

export async function toggleProgramStatus(id: string) {
  await requireAdmin();
  const p = await prisma.program.findUnique({ where: { id } });
  if (!p) return { success: false, error: "Programa no encontrado" };
  const updated = await prisma.program.update({
    where: { id },
    data: { activo: !p.activo },
  });
  return { success: true, data: { activo: updated.activo } };
}
