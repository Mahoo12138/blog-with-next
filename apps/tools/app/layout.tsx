import type { Metadata } from "next";
import { getSettings } from "@blog/data";
import { Providers } from "@blog/common/components/Providers";

import { PrefetchCrossZoneLinks } from "@blog/common/components/Prefetch";
import SectionContainer from "@blog/common/components/SectionContainer";

import "#/styles/global.css";
import "#/styles/tailwind.css";
export async function generateMetadata(): Promise<Metadata> {
  const setting = await getSettings();
  if (!setting) {
    return {};
  }
  return {
    metadataBase: new URL(setting.siteUrl),
    title: {
      default: setting.title,
      template: `%s | ${setting.title}`,
    },
    description: setting.description,
    openGraph: {
      title: setting.title,
      description: setting.description,
      url: "./",
      siteName: setting.title,
      locale: "en_US",
      type: "website",
    },
    alternates: {
      canonical: "./",
      types: {
        "application/rss+xml": `${setting.siteUrl}/feed.xml`,
      },
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
  };
}

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html>
      <body>
        <Providers>
          <SectionContainer>{children}</SectionContainer>
        </Providers>
        <PrefetchCrossZoneLinks hrefs={["/", "/posts", "/pages"]} />
      </body>
    </html>
  );
}
