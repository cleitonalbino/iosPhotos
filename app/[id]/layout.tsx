import { Metadata } from "next";
import imagesData from "../../data/images.json";

interface Props {
  params: Promise<{ id: string }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const { id } = await params;
  const image = imagesData.find((img) => img.id === id);

  if (!image) {
    return {
      title: "Wallpaper Not Found | iPhone Wallpapers iOS 26",
      description: "The requested iPhone wallpaper could not be found.",
    };
  }

  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ios-wallpapers.app/";
  const pageUrl = `${siteUrl}/${id}`;
  const imageUrl = image.img;
  const title = `HD iPhone Wallpaper ${id.substring(
    0,
    8
  )} - Free Download iOS 26`;
  const description = `Download stunning HD iPhone wallpaper optimized for iOS 26. Perfect for iPhone lock screen and home screen. Free high-quality background for iPhone 15, 16 Pro Max and all iOS devices.`;

  return {
    title,
    description,
    keywords: [
      "iPhone wallpaper",
      "iOS 26 wallpaper",
      "iPhone background",
      "lock screen wallpaper",
      "home screen wallpaper",
      "iPhone 16 wallpaper",
      "iPhone 15 Pro wallpaper",
      "HD iPhone wallpaper",
      "4K wallpaper",
      "free wallpaper download",
      "iOS background",
      "aesthetic wallpaper",
      `wallpaper ${id.substring(0, 8)}`,
      "mobile wallpaper",
      "iPhone homescreen background",
    ],
    authors: [{ name: "iPhone Wallpapers iOS 26" }],
    creator: "iPhone Wallpapers iOS 26",
    publisher: "iPhone Wallpapers iOS 26",
    metadataBase: new URL(siteUrl),
    alternates: {
      canonical: pageUrl,
    },
    openGraph: {
      type: "website",
      locale: "en_US",
      url: pageUrl,
      title,
      description,
      siteName: "iPhone Wallpapers iOS 26",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1800,
          alt: `HD iPhone wallpaper for iOS 26 - ${id.substring(0, 8)}`,
          type: "image/webp",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
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
    verification: {
      // Add your verification codes here when you have them
      google:
        "google-site-verification=vlxcskZtRrBdZg7KMXsIrNkwVrLdqlKMQFsjvCXihy8",
      // yandex: "your-yandex-verification-code",
      // bing: "your-bing-verification-code",
    },
  };
}

export default async function PhotoLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ id: string }>;
}) {
  const { id } = await params;
  const image = imagesData.find((img) => img.id === id);
  const siteUrl =
    process.env.NEXT_PUBLIC_SITE_URL || "https://ios-wallpapers.app/";

  if (!image) {
    return <>{children}</>;
  }

  // JSON-LD structured data for SEO
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "ImageObject",
    contentUrl: image.img,
    thumbnailUrl: image.thumb,
    url: `${siteUrl}/${id}`,
    name: `HD iPhone Wallpaper ${id.substring(0, 8)} - iOS 26`,
    description: `Download stunning HD iPhone wallpaper optimized for iOS 26. Perfect for iPhone lock screen and home screen backgrounds.`,
    encodingFormat: "image/webp",
    width: "1200",
    height: "1800",
    keywords:
      "iPhone wallpaper, iOS 26, lock screen, home screen, HD wallpaper, iPhone background",
    creator: {
      "@type": "Organization",
      name: "iPhone Wallpapers iOS 26",
    },
    publisher: {
      "@type": "Organization",
      name: "iPhone Wallpapers iOS 26",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`, // Add your logo
      },
    },
    isPartOf: {
      "@type": "WebPage",
      "@id": `${siteUrl}/${id}`,
      url: `${siteUrl}/${id}`,
      name: `HD iPhone Wallpaper ${id.substring(0, 8)} - Free Download iOS 26`,
      description: `Download stunning HD iPhone wallpaper optimized for iOS 26. Perfect for lock screen and home screen.`,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "iPhone Wallpapers",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `Wallpaper ${id.substring(0, 8)}`,
            item: `${siteUrl}/${id}`,
          },
        ],
      },
    },
    license: "https://creativecommons.org/licenses/by/4.0/", // Update with your license
  };

  return (
    <>
      {/* JSON-LD Structured Data - Google reads this from body too */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        suppressHydrationWarning
      />
      {children}
    </>
  );
}
