import type { MetadataRoute } from "next";

const SITE_URL = "https://casadedios.es";

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: [
          "/app/",
          "/kiosko/",
          "/api/",
          "/login",
          "/registrarse",
          "/success",
          "/admin",
          "/responsable",
          "/usuario",
          "/lider",
          "/dashboard",
        ],
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
    host: SITE_URL,
  };
}
