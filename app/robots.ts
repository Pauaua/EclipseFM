import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/team/", "/login", "/api/"],
    },
    sitemap: `${process.env.NEXT_PUBLIC_SITE_URL ?? "https://www.radioeclipsefm.cl"}/sitemap.xml`,
  };
}
