import { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "iPhone Wallpapers iOS 26 - HD Backgrounds & Lock Screen",
    short_name: "iPhone Wallpapers",
    description:
      "Browse and download stunning HD iPhone wallpapers optimized for iOS 26. Perfect lock screen and home screen backgrounds for all iPhone models.",
    start_url: "https://ios-wallpapers.app/",
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
    categories: ["lifestyle", "personalization", "entertainment"],
  };
}
