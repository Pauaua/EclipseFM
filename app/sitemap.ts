import type { MetadataRoute } from "next";
import { getPublishedPosts } from "@/lib/actions/posts.actions";
import { getPublishedNoticias } from "@/lib/actions/noticias.actions";

const BASE_URL = "https://eclipsefm.vercel.app";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const [posts, noticias] = await Promise.all([
    getPublishedPosts(),
    getPublishedNoticias(),
  ]);

  const staticRoutes: MetadataRoute.Sitemap = [
    { url: BASE_URL, lastModified: new Date(), changeFrequency: "daily", priority: 1 },
    { url: `${BASE_URL}/en-vivo`, lastModified: new Date(), changeFrequency: "always", priority: 0.9 },
    { url: `${BASE_URL}/programas`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/programacion`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.8 },
    { url: `${BASE_URL}/noticias`, lastModified: new Date(), changeFrequency: "daily", priority: 0.8 },
    { url: `${BASE_URL}/blog`, lastModified: new Date(), changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE_URL}/nosotros`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
    { url: `${BASE_URL}/contacto`, lastModified: new Date(), changeFrequency: "monthly", priority: 0.5 },
  ];

  const postRoutes: MetadataRoute.Sitemap = posts.map((p) => ({
    url: `${BASE_URL}/blog/${p.slug}`,
    lastModified: p.createdAt,
    changeFrequency: "monthly",
    priority: 0.6,
  }));

  const noticiaRoutes: MetadataRoute.Sitemap = noticias.map((n) => ({
    url: `${BASE_URL}/noticias/${n.slug}`,
    lastModified: n.createdAt,
    changeFrequency: "monthly",
    priority: 0.7,
  }));

  return [...staticRoutes, ...postRoutes, ...noticiaRoutes];
}
