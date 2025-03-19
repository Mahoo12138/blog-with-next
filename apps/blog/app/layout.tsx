import '#/styles/global.css'
import '#/styles/tailwind.css'

import { Metadata } from 'next'
import { Space_Grotesk } from 'next/font/google'
// import { Analytics, AnalyticsConfig } from 'pliny/analytics'
// import { SearchProvider, SearchConfig } from 'pliny/search'

import SectionContainer from '#/components/SectionContainer'
import { getSettings } from '@blog/data'

import { Providers } from '@blog/common/components/Providers'

const space_grotesk = Space_Grotesk({
  subsets: ['latin'],
  display: 'swap',
  variable: '--font-space-grotesk',
})

export async function generateMetadata(): Promise<Metadata> {
  const setting = await getSettings()
  if (!setting) {
    return {}
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
      url: './',
      siteName: setting.title,
      locale: 'en_US',
      type: 'website',
    },
    alternates: {
      canonical: './',
      types: {
        'application/rss+xml': `${setting.siteUrl}/feed.xml`,
      },
    },
    robots: {
      index: true,
      follow: true,
      googleBot: {
        index: true,
        follow: true,
        'max-video-preview': -1,
        'max-image-preview': 'large',
        'max-snippet': -1,
      },
    },
  }
}

export default async function RootLayout({ children }: { children: React.ReactNode }) {
  const basePath = process.env.BASE_PATH || ''
  const setting = await getSettings()
  return (
    <html
      lang={setting?.language}
      className={`${space_grotesk.variable} scroll-smooth `}
      suppressHydrationWarning
    >
      <link
        rel="apple-touch-icon"
        sizes="76x76"
        href={`${basePath}/static/favicons/apple-touch-icon.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="32x32"
        href={`${basePath}/static/favicons/favicon-32x32.png`}
      />
      <link
        rel="icon"
        type="image/png"
        sizes="16x16"
        href={`${basePath}/static/favicons/favicon-16x16.png`}
      />
      <link rel="manifest" href={`${basePath}/static/favicons/site.webmanifest`} />
      <link
        rel="mask-icon"
        href={`${basePath}/static/favicons/safari-pinned-tab.svg`}
        color="#5bbad5"
      />
      <meta name="viewport" content="width=device-width, initial-scale=1.0" />
      <meta name="msapplication-TileColor" content="#000000" />
      <meta name="theme-color" media="(prefers-color-scheme: light)" content="#fff" />
      <meta name="theme-color" media="(prefers-color-scheme: dark)" content="#000" />
      <meta name="baidu-site-verification" content="codeva-6eSh3JmhuH" />
      <link rel="alternate" type="application/rss+xml" href={`${basePath}/feed.xml`} />
      <body className="bg-gbg text-black antialiased dark:bg-neutral-900 dark:text-white">
        <Providers>
          {/* <Analytics analyticsConfig={setting.analytics as AnalyticsConfig} /> */}
          <SectionContainer>
            {/* <SearchProvider searchConfig={setting.search as SearchConfig}> */}
            {children}
            {/* </SearchProvider> */}
          </SectionContainer>
        </Providers>
      </body>
    </html>
  )
}
