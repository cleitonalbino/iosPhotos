import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Photo Viewer - Explore Stunning Photography",
    short_name: "Photo Viewer",
    description:
      "Browse and download high-quality photos with infinite scroll. Discover stunning photography from our curated collection.",
    start_url: "/",
    display: "standalone",
    display_override: ["window-controls-overlay", "standalone"],
    background_color: "#000000",
    theme_color: "#000000",
    orientation: "portrait",
    prefer_related_applications: false,
    icons: [
      {
        src: "/favicon.ico",
        sizes: "any",
        type: "image/x-icon",
      },
      // Add more icon sizes when you have them
      // {
      //   src: "/icon-192.png",
      //   sizes: "192x192",
      //   type: "image/png",
      // },
      // {
      //   src: "/icon-512.png",
      //   sizes: "512x512",
      //   type: "image/png",
      // },
    ],
    categories: ["photography", "art", "lifestyle"],
  };
}
