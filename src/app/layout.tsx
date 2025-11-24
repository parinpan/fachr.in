import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import StructuredData from '@/components/StructuredData';
import CommandMenu from '@/components/CommandMenu';
import { GoogleAnalytics } from '@next/third-parties/google';
import Clarity from '@/components/Clarity';
import BackToTop from '@/components/BackToTop';

import { siteConfig } from '@/data/content';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL('https://fachr.in'),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  alternates: {
    canonical: 'https://fachr.in',
    languages: {
      'en': 'https://fachr.in',
      'id': 'https://fachr.in?lang=id',
      'x-default': 'https://fachr.in',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
    alternateLocale: ['id_ID'],
    url: siteConfig.seo.url,
    siteName: siteConfig.personal.name,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: siteConfig.seo.title,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
    title: siteConfig.seo.title,
    description: siteConfig.seo.description,
    images: [siteConfig.seo.ogImage],
  },
  icons: {
    icon: siteConfig.hero.image,
    shortcut: siteConfig.hero.image,
    apple: siteConfig.hero.image,
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
};

import { getAllPosts } from '@/lib/mdx';

// ...

import Providers from '@/components/Providers';

// ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts(['slug', 'title']);

  return (
    <html lang="en" suppressHydrationWarning>
      <head>
        <link rel="alternate" hrefLang="en" href="https://fachr.in" />
        <link rel="alternate" hrefLang="id" href="https://fachr.in?lang=id" />
        <link rel="alternate" hrefLang="x-default" href="https://fachr.in" />
      </head>
      <body className={inter.className}>
        <Providers>
          <CommandMenu posts={posts} />
          <ErrorBoundary>
            {children}
          </ErrorBoundary>
          <StructuredData />
          {process.env.NODE_ENV === 'production' && siteConfig.analytics.googleAnalyticsId && (
            <GoogleAnalytics gaId={siteConfig.analytics.googleAnalyticsId} />
          )}
          {process.env.NODE_ENV === 'production' && siteConfig.analytics.clarityId && (
            <Clarity clarityId={siteConfig.analytics.clarityId} />
          )}
          <BackToTop />
        </Providers>
      </body>
    </html>
  );
}
