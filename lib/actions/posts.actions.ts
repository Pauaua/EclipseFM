"use server";

import { prisma } from "@/lib/prisma";
import { auth } from "@/lib/auth";
import { z } from "zod";

const postSchema = z.object({
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
  if (!session || (session.user.role !== "ADMIN" && session.user.role !== "SUBADMIN" && session.user.role !== "TEAM")) {
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

export async function getPosts() {
  await requireEditor();
  return prisma.post.findMany({ orderBy: { createdAt: "desc" } });
}

export async function getPublishedPosts() {
  return prisma.post.findMany({ where: { publicado: true }, orderBy: { createdAt: "desc" } });
}

export async function getPublishedPostBySlug(slug: string) {
  return prisma.post.findFirst({ where: { slug, publicado: true } });
}

export async function createPost(data: Omit<z.infer<typeof postSchema>, "slug"> & { slug?: string }) {
  const session = await requireEditor();
  const slug = data.slug || generateSlug(data.titulo);
  const parsed = postSchema.safeParse({ ...data, slug, autor: data.autor || `${session.user.nombre} ${session.user.apellido}` });
  if (!parsed.success) return { success: false, error: parsed.error.errors[0].message };
  try {
    const post = await prisma.post.create({ data: parsed.data });
    return { success: true, data: post };
  } catch {
    return { success: false, error: "El slug ya existe, usa uno diferente." };
  }
}

export async function updatePost(id: string, data: Partial<z.infer<typeof postSchema>>) {
  await requireEditor();
  try {
    const post = await prisma.post.update({ where: { id }, data });
    return { success: true, data: post };
  } catch {
    return { success: false, error: "Error al actualizar." };
  }
}

export async function deletePost(id: string) {
  await requireEditor();
  await prisma.post.delete({ where: { id } });
  return { success: true };
}

export async function togglePostPublicado(id: string) {
  await requireEditor();
  const post = await prisma.post.findUnique({ where: { id } });
  if (!post) return { success: false, error: "No encontrado" };
  const updated = await prisma.post.update({ where: { id }, data: { publicado: !post.publicado } });
  return { success: true, data: { publicado: updated.publicado } };
}
