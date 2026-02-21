import { siteConfig } from '@/data/content';
import AppearancesContent from '@/components/AppearancesContent';
import type { Metadata } from 'next';
import { safeIsoDate } from '@/lib/utils';

export const metadata: Metadata = {
  title: `Appearances | ${siteConfig.personal.name}`,
  description: siteConfig.appearances.description,
  alternates: {
    canonical: 'https://fachr.in/appearances',
  },
  openGraph: {
    type: 'website',
    url: 'https://fachr.in/appearances',
    title: `Appearances | ${siteConfig.personal.name}`,
    description: siteConfig.appearances.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `Talks and appearances by ${siteConfig.personal.name}`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
    title: `Appearances | ${siteConfig.personal.name}`,
    description: siteConfig.appearances.description,
    images: [siteConfig.seo.ogImage],
  },
};

const appearancesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${siteConfig.appearances.title} – ${siteConfig.appearances.subtitle}`,
  description: siteConfig.appearances.description,
  url: 'https://fachr.in/appearances',
  numberOfItems: siteConfig.appearances.items.length,
  itemListElement: siteConfig.appearances.items.map((item, index) => {
    const isVideo = item.type === 'video';
    return {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': isVideo ? 'VideoObject' : 'Event',
        name: item.title,
        description: item.description,
        url: item.url,
        image: item.image.startsWith('http') ? item.image : `https://fachr.in${item.image}`,
        ...(isVideo
          ? {
              thumbnailUrl: item.image.startsWith('http')
                ? item.image
                : `https://fachr.in${item.image}`,
              uploadDate: safeIsoDate(item.date),
              inLanguage: item.language ?? 'en',
            }
          : {
              startDate: safeIsoDate(item.date),
              eventStatus: 'https://schema.org/EventScheduled',
              eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
              location: { '@type': 'VirtualLocation', url: item.url },
            }),
        author: {
          '@type': 'Person',
          name: siteConfig.personal.name,
          url: 'https://fachr.in',
        },
      },
    };
  }),
};

export default function AppearancesPage() {
  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(appearancesJsonLd) }}
      />
      <AppearancesContent />
    </>
  );
}
