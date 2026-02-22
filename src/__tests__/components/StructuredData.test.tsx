import { render } from '@testing-library/react';
import StructuredData from '@/components/StructuredData';

// Mock the actual dependency used by StructuredData (not useContent)
jest.mock('@/data/content', () => ({
  siteConfig: {
    personal: {
      name: 'Test User',
      email: 'test@example.com',
      profileImage: '/images/profile.jpg',
    },
    seo: {
      description: 'Test SEO description',
      url: 'https://fachr.in',
      ogImage: 'https://fachr.in/images/og-image.png',
    },
    social: {
      github: 'https://github.com/testuser',
      linkedin: 'https://linkedin.com/in/testuser',
      twitter: 'https://twitter.com/testuser',
    },
    hero: {
      title: 'Test Hero Title',
    },
    podcasts: [
      {
        title: 'Test Podcast Episode',
        episodeUrl: 'https://spotify.com/episode/test',
        description: 'A test podcast episode',
        date: 'August 2021',
        language: 'Indonesian',
      },
    ],
  },
}));

jest.mock('@/lib/utils', () => ({
  safeIsoDate: (dateStr?: string) => dateStr || '2021-08-01T00:00:00.000Z',
}));

describe('StructuredData', () => {
  it('renders without crashing', () => {
    const { container } = render(<StructuredData />);
    expect(container).toBeInTheDocument();
  });

  it('renders a script element with type application/ld+json', () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    expect(script).toBeInTheDocument();
  });

  it('contains Person schema in @graph', () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);

    const personSchema = data['@graph'].find(
      (item: Record<string, unknown>) => item['@type'] === 'Person'
    );
    expect(personSchema).toBeDefined();
    expect(personSchema.name).toBe('Test User');
    expect(personSchema['@id']).toBe('https://fachr.in/#person');
  });

  it('contains WebSite schema without SearchAction', () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);

    const websiteSchema = data['@graph'].find(
      (item: Record<string, unknown>) => item['@type'] === 'WebSite'
    );
    expect(websiteSchema).toBeDefined();
    expect(websiteSchema.potentialAction).toBeUndefined();
  });

  it('contains ProfilePage schema', () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);

    const profileSchema = data['@graph'].find(
      (item: Record<string, unknown>) => item['@type'] === 'ProfilePage'
    );
    expect(profileSchema).toBeDefined();
    expect(profileSchema.url).toBe('https://fachr.in');
  });

  it('contains PodcastEpisode schema', () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);

    const podcastSchema = data['@graph'].find(
      (item: Record<string, unknown>) => item['@type'] === 'PodcastEpisode'
    );
    expect(podcastSchema).toBeDefined();
    expect(podcastSchema.name).toBe('Test Podcast Episode');
    expect(podcastSchema.inLanguage).toBe('Indonesian');
  });

  it('does not contain Blog or Appearances schemas (page-level only)', () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);

    const blogSchema = data['@graph'].find(
      (item: Record<string, unknown>) => item['@type'] === 'Blog'
    );
    expect(blogSchema).toBeUndefined();

    const itemListSchema = data['@graph'].find(
      (item: Record<string, unknown>) => item['@type'] === 'ItemList'
    );
    expect(itemListSchema).toBeUndefined();
  });

  it('does not contain BreadcrumbList schema (page-level only)', () => {
    const { container } = render(<StructuredData />);
    const script = container.querySelector('script[type="application/ld+json"]');
    const data = JSON.parse(script!.textContent!);

    const breadcrumbSchema = data['@graph'].find(
      (item: Record<string, unknown>) => item['@type'] === 'BreadcrumbList'
    );
    expect(breadcrumbSchema).toBeUndefined();
  });
});
