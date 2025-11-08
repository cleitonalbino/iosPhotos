import { MetadataRoute } from "next";
import imagesData from "../data/images.json";

export default function sitemap(): MetadataRoute.Sitemap {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";
  const currentDate = new Date();

  // Homepage
  const routes: MetadataRoute.Sitemap = [
    {
      url: siteUrl,
      lastModified: currentDate,
      changeFrequency: "daily",
      priority: 1.0,
    },
  ];

  // Individual photo pages
  const photoRoutes = imagesData.map((image) => ({
    url: `${siteUrl}/${image.id}`,
    lastModified: currentDate,
    changeFrequency: "weekly" as const,
    priority: 0.8,
  }));

  return [...routes, ...photoRoutes];
}
