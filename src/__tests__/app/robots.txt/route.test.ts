import { GET } from '@/app/robots.txt/route';

// Mock siteConfig
jest.mock('@/data/content', () => ({
  siteConfig: {
    seo: {
      url: 'https://example.com',
    },
  },
}));

describe('robots.txt route', () => {
  it('returns a Response object', async () => {
    const response = await GET();

    expect(response).toBeInstanceOf(Response);
  });

  it('returns content-type text/plain', async () => {
    const response = await GET();

    expect(response.headers.get('Content-Type')).toBe('text/plain');
  });

  it('returns proper cache control headers', async () => {
    const response = await GET();

    expect(response.headers.get('Cache-Control')).toBe('s-maxage=3600, stale-while-revalidate');
  });

  it('includes User-agent directive', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('User-agent: *');
  });

  it('includes Allow directive', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('Allow: /');
  });

  it('includes Sitemap reference', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('Sitemap: https://example.com/sitemap.xml');
  });

  it('includes comment header', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('https://www.robotstxt.org/robotstxt.html');
  });

  it('includes llms.txt reference for AI crawlers', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('Llms-txt: https://example.com/llms.txt');
  });
});
