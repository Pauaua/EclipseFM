"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const noticiaSchema = z.object({
  titulo: z.string().min(1, "Título requerido"),
  slug: z.string().min(1, "Slug requerido").regex(/^[a-z0-9-]+$/, "Slug solo puede contener letras minúsculas, números y guiones"),
  resumen: z.string().optional(),
  contenido: z.string().min(1, "Contenido requerido"),
  imagen: z.string().optional(),
  publicado: z.boolean().optional(),
  autor: z.string().min(1, "Autor requerido"),
});

async function requireEditor() {
  const session = await auth();
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUBADMIN")) {
    throw new Error("No autorizado");
  }
  return session;
}

function generateSlug(titulo: string) {
  return titulo
    .toLowerCase()
    .normalize("NFD")
    .replace(/[\u0300-\u036f]/g, "")
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

export async function getNoticias() {
  await requireEditor();
  return prisma.noticia.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getPublishedNoticias() {
  return prisma.noticia.findMany({ where: { publicado: true }, orderBy: { createdAt: "desc" } });
}

export async function getPublishedNoticiaBySlug(slug: string) {
  return prisma.noticia.findFirst({ where: { slug, publicado: true } });
}

export async function createNoticia(data: Omit<z.infer<typeof noticiaSchema>, "slug"> & { slug?: string }) {
  const session = await requireEditor();
  const slug = data.slug || generateSlug(data.titulo);
  const parsed = noticiaSchema.safeParse({ ...data, slug, autor: data.autor || `${session.user.nombre} ${session.user.apellido}` });
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };
  try {
    const noticia = await prisma.noticia.create({ data: parsed.data });
    return { success: true, data: noticia };
  } catch {
    return { success: false, error: "El slug ya existe, usa uno diferente." };
  }
}

export async function updateNoticia(id: string, data: Partial<z.infer<typeof noticiaSchema>>) {
  await requireEditor();
  try {
    const noticia = await prisma.noticia.update({ where: { id }, data });
    return { success: true, data: noticia };
  } catch {
    return { success: false, error: "Error al actualizar." };
  }
}

export async function deleteNoticia(id: string) {
  await requireEditor();
  await prisma.noticia.delete({ where: { id } });
  return { success: true };
}

export async function toggleNoticiaPublicado(id: string) {
  await requireEditor();
  const noticia = await prisma.noticia.findUnique({ where: { id } });
  if (!noticia) return { success: false, error: "No encontrada" };
  const updated = await prisma.noticia.update({ where: { id }, data: { publicado: !noticia.publicado } });
  return { success: true, data: { publicado: updated.publicado } };
}
