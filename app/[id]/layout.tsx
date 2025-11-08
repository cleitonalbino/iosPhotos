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
      title: "Photo Not Found | Photo Viewer",
      description: "The requested photo could not be found.",
    };
  }

  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";
  const pageUrl = `${siteUrl}/${id}`;
  const imageUrl = image.img;
  const title = `Photo ${id} | Photo Viewer`;
  const description = `View and download high-quality photo ${id} from our curated collection. Explore stunning photography with infinite scroll.`;

  return {
    title,
    description,
    keywords: [
      "photography",
      "photos",
      "images",
      "high quality photos",
      "free photos",
      "photo gallery",
      "photo viewer",
      `photo ${id}`,
      "vertical scroll gallery",
      "image collection",
    ],
    authors: [{ name: "Photo Viewer" }],
    creator: "Photo Viewer",
    publisher: "Photo Viewer",
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
      siteName: "Photo Viewer",
      images: [
        {
          url: imageUrl,
          width: 1200,
          height: 1800,
          alt: `High-quality photo ${id}`,
          type: "image/jpeg",
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: [imageUrl],
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
    verification: {
      // Add your verification codes here when you have them
      // google: "your-google-verification-code",
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
  const siteUrl = process.env.NEXT_PUBLIC_SITE_URL || "https://yoursite.com";

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
    name: `Photo ${id}`,
    description: `High-quality photo ${id} from our curated collection`,
    encodingFormat: "image/jpeg",
    width: "1200",
    height: "1800",
    creator: {
      "@type": "Organization",
      name: "Photo Viewer",
    },
    publisher: {
      "@type": "Organization",
      name: "Photo Viewer",
      logo: {
        "@type": "ImageObject",
        url: `${siteUrl}/logo.png`, // Add your logo
      },
    },
    isPartOf: {
      "@type": "WebPage",
      "@id": `${siteUrl}/${id}`,
      url: `${siteUrl}/${id}`,
      name: `Photo ${id} | Photo Viewer`,
      description: `View and download high-quality photo ${id}`,
      breadcrumb: {
        "@type": "BreadcrumbList",
        itemListElement: [
          {
            "@type": "ListItem",
            position: 1,
            name: "Home",
            item: siteUrl,
          },
          {
            "@type": "ListItem",
            position: 2,
            name: `Photo ${id}`,
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
