import { siteConfig } from '@/data/content';
import { safeIsoDate } from '@/lib/utils';

/**
 * Enhanced Structured Data (JSON-LD) Component (Server Component)
 * Provides comprehensive schema.org markup for SEO optimization.
 * Rendered on server to avoid client-side date parsing issues (Safari).
 *
 * Note: Page-specific schemas (Blog, BlogPosting, Appearances ItemList,
 * per-page BreadcrumbList) are defined in their respective page components
 * to avoid duplication.
 */
export default function StructuredData() {
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
      'Go',
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

  // WebSite Schema (no SearchAction — site has no search functionality)
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
  };

  // Profile Page Schema
  const profilePageSchema = {
    '@context': 'https://schema.org',
    '@type': 'ProfilePage',
    '@id': 'https://fachr.in/#profilepage',
    mainEntity: { '@id': 'https://fachr.in/#person' },
    inLanguage: 'en-US',
    url: 'https://fachr.in',
    name: `${siteConfig.personal.name} - ${siteConfig.hero.title}`,
    description: siteConfig.seo.description,
  };

  // Podcast Episode Schema
  const podcastSchemas = siteConfig.podcasts.map((podcast) => ({
    '@context': 'https://schema.org',
    '@type': 'PodcastEpisode',
    name: podcast.title,
    description: podcast.description,
    url: podcast.episodeUrl,
    datePublished: safeIsoDate(podcast.date),
    inLanguage: podcast.language ?? 'en',
    author: { '@id': 'https://fachr.in/#person' },
    associatedMedia: {
      '@type': 'MediaObject',
      contentUrl: podcast.episodeUrl,
    },
  }));

  const graphs: unknown[] = [personSchema, websiteSchema, profilePageSchema, ...podcastSchemas];

  const structuredData = {
    '@context': 'https://schema.org',
    '@graph': graphs,
  };

  return (
    <script
      id="structured-data"
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
    />
  );
}
