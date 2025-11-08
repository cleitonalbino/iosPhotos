import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com"
  ),
  title: {
    default: "Photo Viewer - Explore Stunning High-Quality Photography",
    template: "%s | Photo Viewer",
  },
  description:
    "Discover and download stunning high-quality photos from our curated collection. Browse through beautiful photography with infinite scroll and enjoy a seamless viewing experience.",
  keywords: [
    "photography",
    "photos",
    "high quality images",
    "photo gallery",
    "free photos",
    "image viewer",
    "photo collection",
    "stunning photography",
    "download photos",
    "curated photos",
  ],
  authors: [{ name: "Photo Viewer" }],
  creator: "Photo Viewer",
  publisher: "Photo Viewer",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "Photo Viewer",
    title: "Photo Viewer - Explore Stunning High-Quality Photography",
    description:
      "Discover and download stunning high-quality photos from our curated collection. Browse through beautiful photography with infinite scroll.",
    images: [
      {
        url: "/og-image.jpg", // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: "Photo Viewer - Stunning Photography Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Photo Viewer - Explore Stunning High-Quality Photography",
    description:
      "Discover and download stunning high-quality photos from our curated collection.",
    images: ["/og-image.jpg"], // Add your Twitter card image
    creator: "@yourhandle", // Replace with your Twitter handle
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
  icons: {
    icon: "/favicon.ico",
    // Add more icons when you have them
    // apple: "/apple-icon.png",
  },
  manifest: "/manifest.webmanifest",
  category: "photography",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        {/* Google AdSense Script */}
        <script
          async
          src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-XXXXXXXXXXXXXXXXX"
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0 overflow-hidden`}
      >
        {children}
      </body>
    </html>
  );
}
