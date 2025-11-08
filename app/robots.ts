import { MetadataRoute } from "next";

export default function robots(): MetadataRoute.Robots {
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";

  return {
    rules: [
      {
        userAgent: "*",
        allow: "/",
        disallow: ["/api/", "/private/"],
      },
      {
        userAgent: "Googlebot",
        allow: "/",
        disallow: [],
      },
      {
        userAgent: "Googlebot-Image",
        allow: "/",
        disallow: [],
      },
    ],
    sitemap: `${siteUrl}/sitemap.xml`,
  };
}
