'use client';

import Script from 'next/script';
import { useContent } from '@/hooks/useContent';

/**
 * Enhanced Structured Data (JSON-LD) Component
 * Provides comprehensive schema.org markup for SEO optimization
 * Supports multilingual content and multiple schema types
 */
export default function StructuredData() {
  const siteConfig = useContent();

  // Person Schema - Professional Profile
  const personSchema = {
    '@context': 'https://schema.org',
    '@type': 'Person',
    '@id': 'https://fachr.in/#person',
    name: siteConfig.personal.name,
    alternateName: 'Fachrin Aulia Nasution',
    jobTitle: 'Senior Product Engineer',
    description: siteConfig.seo.description,
    url: 'https://fachr.in',
    image: `https://fachr.in${siteConfig.personal.profileImage}`,
    email: siteConfig.personal.email,
    nationality: {
      '@type': 'Country',
      name: 'Indonesia',
    },
    address: {
      '@type': 'PostalAddress',
      addressLocality: 'Berlin',
      addressRegion: 'Berlin',
      addressCountry: 'DE',
    },
    sameAs: [siteConfig.social.github, siteConfig.social.linkedin, siteConfig.social.twitter],
    worksFor: {
      '@type': 'Organization',
      name: 'Upvest',
      url: 'https://upvest.co',
    },
    alumniOf: [
      { '@type': 'Organization', name: 'Choco', url: 'https://choco.com' },
      { '@type': 'Organization', name: 'Delivery Hero', url: 'https://deliveryhero.com' },
      { '@type': 'Organization', name: 'Gojek', url: 'https://gojek.com' },
      { '@type': 'Organization', name: 'Tokopedia', url: 'https://tokopedia.com' },
    ],
    knowsAbout: [
      'Software Engineering',
      'Backend Development',
      'System Architecture',
      'Golang',
      'Python',
      'Kafka',
      'PostgreSQL',
      'gRPC',
      'Microservices',
      'Product Engineering',
      'Distributed Systems',
      'Financial Technology',
    ],
    knowsLanguage: [
      { '@type': 'Language', name: 'English', alternateName: 'en' },
      { '@type': 'Language', name: 'Indonesian', alternateName: 'id' },
    ],
  };

  // WebSite Schema - Site Information
  const websiteSchema = {
    '@context': 'https://schema.org',
    '@type': 'WebSite',
    '@id': 'https://fachr.in/#website',
    name: siteConfig.personal.name,
    description: siteConfig.seo.description,
    url: 'https://fachr.in',
    inLanguage: [{ '@type': 'Language', name: 'English', alternateName: 'en' }],
    author: {
      '@id': 'https://fachr.in/#person',
    },
    potentialAction: {
      '@type': 'SearchAction',
      target: {
        '@type': 'EntryPoint',
        urlTemplate: 'https://fachr.in/blog?q={search_term_string}',
      },
      'query-input': 'required name=search_term_string',
    },
  };

  // BreadcrumbList Schema - Navigation Structure
  const breadcrumbSchema = {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: [
      {
        '@type': 'ListItem',
        position: 1,
        name: 'Home',
        item: 'https://fachr.in',
      },
      {
        '@type': 'ListItem',
        position: 2,
        name: 'Blog',
        item: 'https://fachr.in/blog',
      },
      {
        '@type': 'ListItem',
        position: 3,
        name: 'Appearances',
        item: 'https://fachr.in/appearances',
      },
      {
        '@type': 'ListItem',
        position: 4,
        name: 'Now',
        item: 'https://fachr.in/now',
      },
    ],
  };

  // Profile Page Schema
  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://fachr.in/#profilepage',
    mainEntity: {
      '@id': 'https://fachr.in/#person',
    },
    inLanguage: 'en-US',
    url: 'https://fachr.in',
    name: `${siteConfig.personal.name} - ${siteConfig.hero.title}`,
    description: siteConfig.seo.description,
  };

  // Appearances - ItemList of VideoObject and Event schemas
  const appearancesSchema =
    siteConfig.appearances?.items?.length > 0
      ? {
          '@context': 'https://schema.org',
          '@type': 'ItemList',
          name: 'Talks & Appearances',
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
                  ...(item.duration && {
                    duration: `PT${item.duration.replace(':', 'H').replace(':', 'M')}S`,
                  }),
                  author: { '@id': 'https://fachr.in/#person' },
                },
              };
            }
            // talk / flyer → Event
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
                organizer: { '@id': 'https://fachr.in/#person' },
                location: {
                  '@type': 'VirtualLocation',
                  url: item.url,
                },
              },
            };
          }),
        }
      : null;

  // Blog section schema
  const blogSchema = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://fachr.in/blog#blog',
    name: `${siteConfig.personal.name}'s Journal`,
    description: siteConfig.blog.description,
    url: 'https://fachr.in/blog',
    author: { '@id': 'https://fachr.in/#person' },
    inLanguage: 'en-US',
  };

  // Combine all schemas (cast to unknown[] to allow heterogeneous schema objects)
  const graphs: unknown[] = [
    personSchema,
    websiteSchema,
    breadcrumbSchema,
    profilePageSchema,
    blogSchema,
  ];
  if (appearancesSchema) graphs.push(appearancesSchema);

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': graphs,
  };

  return (
    <Script
      id="structured-data"
      type="application/ld+json"
      strategy="beforeInteractive"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
