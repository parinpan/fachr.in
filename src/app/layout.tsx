import type { Metadata } from 'next';
import { Inter } from 'next/font/google';
import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import StructuredData from '@/components/StructuredData';
import JsonLd from '@/components/JsonLd';
import CommandMenu from '@/components/CommandMenu';
import { GoogleAnalytics } from '@next/third-parties/google';
import Clarity from '@/components/Clarity';

import { siteConfig } from '@/data/content';

const inter = Inter({
  subsets: ['latin'],
  display: 'swap',
});

export const metadata: Metadata = {
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  openGraph: {
    type: 'website',
    url: siteConfig.seo.url,
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
  },
  icons: {
    icon: siteConfig.hero.image,
    shortcut: siteConfig.hero.image,
    apple: siteConfig.hero.image,
  },
};

import { getAllPosts } from '@/lib/mdx';

// ...

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts(['slug', 'title']);

  return (
    <html lang="en">
      <body className={inter.className}>
        <CommandMenu posts={posts} />
        <ErrorBoundary>
          {children}
        </ErrorBoundary>
        <StructuredData />
        <JsonLd />
        <JsonLd />
        {siteConfig.analytics.googleAnalyticsId && (
          <GoogleAnalytics gaId={siteConfig.analytics.googleAnalyticsId} />
        )}
        {siteConfig.analytics.clarityId && (
          <Clarity clarityId={siteConfig.analytics.clarityId} />
        )}
      </body>
    </html>
  );
}
