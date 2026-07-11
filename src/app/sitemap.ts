import type { MetadataRoute } from "next";
import { categories } from "@/lib/categories";
import { siteConfig } from "@/lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
  const staticRoutes = [
    "",
    "/servicios",
    "/como-funciona",
    "/profesionales",
    "/precios",
    "/solicitar",
    "/registro-profesional",
    "/preguntas-frecuentes",
    "/contacto",
  ].map((path) => ({
    url: `${siteConfig.url}${path}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: path === "" ? 1 : 0.8,
  }));

  const categoryRoutes = categories.map((c) => ({
    url: `${siteConfig.url}/servicios/${c.slug}`,
    lastModified: new Date(),
    changeFrequency: "weekly" as const,
    priority: 0.7,
  }));

  return [...staticRoutes, ...categoryRoutes];
}
