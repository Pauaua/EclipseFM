import type { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: {
      userAgent: "*",
      allow: "/",
      disallow: ["/dashboard/", "/team/", "/login", "/api/"],
    },
    sitemap: "https://eclipsefm.vercel.app/sitemap.xml",
  };
}
