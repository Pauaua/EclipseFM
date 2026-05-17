"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const sponsorSchema = z.object({
  empresa: z.string().min(1, "Empresa requerida"),
  contacto: z.string().min(1, "Contacto requerido"),
  email: z.string().email().optional().or(z.literal("")),
  telefono: z.string().optional(),
  descripcion: z.string().optional(),
});

async function requireAdmin() {
  const session = await auth();
  if (!session || session.user.role !== "ADMIN") throw new Error("No autorizado");
}

export async function getSponsors() {
  await requireAdmin();
  return prisma.sponsor.findMany({ orderBy: { createdAt: "desc" } });
}

export async function createSponsor(data: z.infer<typeof sponsorSchema>) {
  await requireAdmin();
  const parsed = sponsorSchema.safeParse(data);
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };
  const sponsor = await prisma.sponsor.create({ data: parsed.data });
  return { success: true, data: sponsor };
}

export async function updateSponsor(id: string, data: Partial<z.infer<typeof sponsorSchema>>) {
  await requireAdmin();
  const sponsor = await prisma.sponsor.update({ where: { id }, data });
  return { success: true, data: sponsor };
}

export async function deleteSponsor(id: string) {
  await requireAdmin();
  await prisma.sponsor.delete({ where: { id } });
  return { success: true };
}

export async function toggleSponsorStatus(id: string) {
  await requireAdmin();
  const s = await prisma.sponsor.findUnique({ where: { id } });
  if (!s) return { success: false, error: "Sponsor no encontrado" };
  const updated = await prisma.sponsor.update({
    where: { id },
    data: { activo: !s.activo },
  });
  return { success: true, data: { activo: updated.activo } };
}
