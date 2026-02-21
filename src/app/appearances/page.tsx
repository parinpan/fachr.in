import { siteConfig } from '@/data/content';
import AppearancesContent from '@/components/AppearancesContent';
import type { Metadata } from 'next';

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

// Structured data for the appearances page (server-rendered in <head>)
const appearancesJsonLd = {
  '@context': 'https://schema.org',
  '@type': 'ItemList',
  name: `${siteConfig.appearances.title} – ${siteConfig.appearances.subtitle}`,
  description: siteConfig.appearances.description,
  url: 'https://fachr.in/appearances',
  numberOfItems: siteConfig.appearances.items.length,
  itemListElement: siteConfig.appearances.items.map((item, index) => {
    if (item.type === 'video') {
      return {
        '@type': 'ListItem',
        position: index + 1,
        item: {
          '@type': 'VideoObject',
          name: item.title,
          description: item.description,
          url: item.url,
          thumbnailUrl: item.image.startsWith('http')
            ? item.image
            : `https://fachr.in${item.image}`,
          uploadDate: new Date(item.date).toISOString(),
          inLanguage: item.language ?? 'en',
          author: {
            '@type': 'Person',
            name: siteConfig.personal.name,
            url: 'https://fachr.in',
          },
        },
      };
    }
    return {
      '@type': 'ListItem',
      position: index + 1,
      item: {
        '@type': 'Event',
        name: item.title,
        description: item.description,
        url: item.url,
        image: item.image.startsWith('http') ? item.image : `https://fachr.in${item.image}`,
        startDate: new Date(item.date).toISOString(),
        eventStatus: 'https://schema.org/EventScheduled',
        eventAttendanceMode: 'https://schema.org/OnlineEventAttendanceMode',
        organizer: {
          '@type': 'Person',
          name: siteConfig.personal.name,
          url: 'https://fachr.in',
        },
        location: {
          '@type': 'VirtualLocation',
          url: item.url,
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
