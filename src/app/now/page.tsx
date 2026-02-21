import { Metadata } from 'next';
import { siteConfig } from '@/data/content';
import { safeIsoDate } from '@/lib/utils';
import NowContent from '@/components/NowContent';

const nowDescription = `${siteConfig.now.subtitle} Currently based in Berlin as a Senior Product Engineer at Upvest. ${siteConfig.now.sections.map((s) => s.title).join(' · ')}.`;

export const metadata: Metadata = {
  title: `Now | ${siteConfig.personal.name}`,
  description: nowDescription,
  alternates: {
    canonical: 'https://fachr.in/now',
  },
  openGraph: {
    type: 'website',
    url: 'https://fachr.in/now',
    title: `Now | ${siteConfig.personal.name}`,
    description: nowDescription,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `What ${siteConfig.personal.name} is focused on right now`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
    title: `Now | ${siteConfig.personal.name}`,
    description: nowDescription,
    images: [siteConfig.seo.ogImage],
  },
};

const nowJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'WebPage',
  '@id': 'https://fachr.in/now#webpage',
  url: 'https://fachr.in/now',
  name: `Now – ${siteConfig.personal.name}`,
  description: nowDescription,
  inLanguage: 'en-US',
  dateModified: safeIsoDate(siteConfig.now.updatedAt),
  author: {
    '@type': 'Person',
    name: siteConfig.personal.name,
    url: 'https://fachr.in',
  },
  breadcrumb: {
    '@type': 'BreadcrumbList',
    itemListElement: [
      { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fachr.in' },
      { '@type': 'ListItem', position: 2, name: 'Now', item: 'https://fachr.in/now' },
    ],
  },
};

export default function NowPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(nowJsonLd) }}
      />
      <NowContent />
    </>
  );
}
