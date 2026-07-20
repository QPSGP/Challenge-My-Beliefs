import type { MetadataRoute } from "next";

import { marketingPersonas } from "@/lib/marketing-content";
import { getSortedCategories, categoryToSlug } from "@/lib/categories";
import { getSiteUrl } from "@/lib/site-url";
import { getBeliefs } from "@/lib/store";

export const dynamic = "force-dynamic";

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const siteUrl = getSiteUrl();
  const beliefs = await getBeliefs();
  const categories = getSortedCategories(beliefs);
  const now = new Date();

  const staticRoutes: MetadataRoute.Sitemap = [
    "",
    "/beliefs",
    "/categories",
    "/about",
    "/about/founder",
    "/definitions",
    "/community",
    "/channels",
    "/channels/podcast",
    "/channels/social",
    "/roadmap",
    "/start",
  ].map((path) => ({
    url: `${siteUrl}${path}`,
    lastModified: now,
    changeFrequency: path === "" || path === "/beliefs" ? "daily" : "weekly",
    priority: path === "" ? 1 : path === "/start" || path === "/beliefs" ? 0.9 : 0.7,
  }));

  const personaRoutes: MetadataRoute.Sitemap = marketingPersonas.map((persona) => ({
    url: `${siteUrl}/start/${persona.slug}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  const beliefRoutes: MetadataRoute.Sitemap = beliefs.map((belief) => ({
    url: `${siteUrl}/beliefs/${belief.id}`,
    lastModified: new Date(belief.updatedAt),
    changeFrequency: "weekly",
    priority: 0.75,
  }));

  const categoryRoutes: MetadataRoute.Sitemap = categories.map((category) => ({
    url: `${siteUrl}/categories/${categoryToSlug(category)}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.65,
  }));

  return [...staticRoutes, ...personaRoutes, ...beliefRoutes, ...categoryRoutes];
}
