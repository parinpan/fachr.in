import { GET } from '@/app/manifest.webmanifest/route';

// Mock siteConfig
jest.mock('@/data/content', () => ({
  siteConfig: {
    personal: {
      name: 'Test User',
    },
    seo: {
      description: 'Test SEO description',
    },
    hero: {
      image: '/images/test.png',
    },
  },
}));

describe('manifest.webmanifest route', () => {
  it('returns a Response object', async () => {
    const response = await GET();
    expect(response).toBeInstanceOf(Response);
  });

  it('returns content-type application/manifest+json', async () => {
    const response = await GET();
    expect(response.headers.get('Content-Type')).toBe('application/manifest+json');
  });

  it('returns proper cache control headers', async () => {
    const response = await GET();
    expect(response.headers.get('Cache-Control')).toBe('s-maxage=86400, stale-while-revalidate');
  });

  it('includes valid JSON with required fields', async () => {
    const response = await GET();
    const manifest = JSON.parse(await response.text());

    expect(manifest.name).toBe('Test User');
    expect(manifest.short_name).toBe('Fachrin');
    expect(manifest.description).toBe('Test SEO description');
    expect(manifest.start_url).toBe('/');
    expect(manifest.display).toBe('standalone');
  });

  it('includes icon configuration', async () => {
    const response = await GET();
    const manifest = JSON.parse(await response.text());

    expect(manifest.icons).toHaveLength(2);
    expect(manifest.icons[0].src).toBe('/images/test.png');
    expect(manifest.icons[0].sizes).toBe('192x192');
    expect(manifest.icons[1].sizes).toBe('512x512');
  });

  it('includes theme and background colors', async () => {
    const response = await GET();
    const manifest = JSON.parse(await response.text());

    expect(manifest.background_color).toBeDefined();
    expect(manifest.theme_color).toBeDefined();
  });
});
