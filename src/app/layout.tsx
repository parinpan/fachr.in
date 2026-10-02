import { Plus_Jakarta_Sans } from 'next/font/google';
import type { Metadata, Viewport } from 'next';
import './globals.css';
import ErrorBoundary from '@/components/ErrorBoundary';
import StructuredData from '@/components/StructuredData';
import { GoogleAnalytics } from '@next/third-parties/google';
import Clarity from '@/components/Clarity';
import Providers from '@/components/Providers';
import ClientShell from '@/components/ClientShell';
import { siteConfig } from '@/data/content';
import { getAllPosts } from '@/lib/mdx';

const jakarta = Plus_Jakarta_Sans({
  subsets: ['latin'],
  variable: '--font-jakarta',
  display: 'swap',
});

export const viewport: Viewport = {
  width: 'device-width',
  initialScale: 1,
  maximumScale: 5,
  viewportFit: 'cover',
};

export const metadata: Metadata = {
  metadataBase: new URL('https://fachr.in'),
  title: siteConfig.seo.title,
  description: siteConfig.seo.description,
  keywords: siteConfig.seo.keywords,
  authors: [{ name: siteConfig.personal.name, url: siteConfig.seo.url }],
  creator: siteConfig.personal.name,
  alternates: {
    canonical: 'https://fachr.in',
    types: {
      'application/rss+xml': 'https://fachr.in/feed.xml',
    },
  },
  openGraph: {
    type: 'website',
    locale: 'en_US',
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
  manifest: '/manifest.webmanifest',
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

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const posts = getAllPosts(['slug', 'title']);

  return (
    <html lang="en" suppressHydrationWarning className={jakarta.variable}>
      <body className="font-sans antialiased font-medium">
        <Providers>
          <ClientShell posts={posts} />
          <ErrorBoundary>{children}</ErrorBoundary>
          <StructuredData />
          {process.env.NODE_ENV === 'production' && siteConfig.analytics.googleAnalyticsId && (
            <GoogleAnalytics gaId={siteConfig.analytics.googleAnalyticsId} />
          )}
          {process.env.NODE_ENV === 'production' && siteConfig.analytics.clarityId && (
            <Clarity clarityId={siteConfig.analytics.clarityId} />
          )}
        </Providers>
      </body>
    </html>
  );
}
