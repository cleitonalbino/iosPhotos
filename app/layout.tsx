import type { Metadata, Viewport } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
  display: "swap",
  preload: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(
    process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com"
  ),
  title: {
    default:
      "iPhone Wallpapers iOS 26 - Free HD Backgrounds & Lock Screen Images",
    template: "%s | iPhone Wallpapers iOS 26",
  },
  description:
    "Discover stunning iPhone wallpapers optimized for iOS 26. Browse and download free HD backgrounds, lock screen images, and home screen wallpapers. Perfect quality for iPhone 15, 16 Pro Max and all iOS devices.",
  keywords: [
    "iPhone wallpapers",
    "iOS 26 wallpapers",
    "iPhone backgrounds",
    "lock screen wallpapers",
    "home screen wallpapers",
    "iPhone 16 wallpapers",
    "iPhone 15 Pro Max wallpapers",
    "HD iPhone wallpapers",
    "4K iPhone backgrounds",
    "free iPhone wallpapers",
    "iOS backgrounds",
    "iPhone lock screen",
    "aesthetic wallpapers",
    "iPhone homescreen",
    "wallpaper download",
  ],
  authors: [{ name: "iPhone Wallpapers iOS 26" }],
  creator: "iPhone Wallpapers iOS 26",
  publisher: "iPhone Wallpapers iOS 26",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "/",
    siteName: "iPhone Wallpapers iOS 26",
    title:
      "iPhone Wallpapers iOS 26 - Free HD Backgrounds & Lock Screen Images",
    description:
      "Discover stunning iPhone wallpapers optimized for iOS 26. Browse and download free HD backgrounds, lock screen images, and home screen wallpapers for all iPhone models.",
    images: [
      {
        url: "/og-image.jpg", // Add your Open Graph image
        width: 1200,
        height: 630,
        alt: "iPhone Wallpapers iOS 26 - HD Backgrounds Collection",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "iPhone Wallpapers iOS 26 - Free HD Backgrounds",
    description:
      "Discover stunning iPhone wallpapers optimized for iOS 26. Free HD backgrounds and lock screen images.",
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
  category: "lifestyle",
};

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 1,
  userScalable: false,
  viewportFit: "cover",
  themeColor: "#000000",
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
          src={`https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=${process.env.NEXT_PUBLIC_CA_PUB_KEY}`}
          crossOrigin="anonymous"
        ></script>
      </head>
      <body
        className={`${geistSans.variable} ${geistMono.variable} antialiased m-0 p-0`}
      >
        {children}
      </body>
    </html>
  );
}
