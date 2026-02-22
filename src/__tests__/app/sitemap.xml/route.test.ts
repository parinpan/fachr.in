import { GET } from '@/app/sitemap.xml/route';

// Mock siteConfig
jest.mock('@/data/content', () => ({
  siteConfig: {
    seo: {
      url: 'https://example.com',
    },
  },
}));

// Mock getAllPosts
jest.mock('@/lib/mdx', () => ({
  getAllPosts: () => [
    {
      slug: 'test-post',
      date: '2024-02-20',
    },
    {
      slug: 'another-post',
      date: '2024-01-15',
    },
  ],
}));

describe('sitemap.xml route', () => {
  it('returns a Response object', async () => {
    const response = await GET();

    expect(response).toBeInstanceOf(Response);
  });

  it('returns content-type application/xml', async () => {
    const response = await GET();

    expect(response.headers.get('Content-Type')).toBe('application/xml');
  });

  it('returns proper cache control headers', async () => {
    const response = await GET();

    expect(response.headers.get('Cache-Control')).toBe('s-maxage=3600, stale-while-revalidate');
  });

  it('includes XML declaration', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<?xml version="1.0" encoding="UTF-8"?>');
  });

  it('includes XSL stylesheet reference', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>');
  });

  it('includes urlset with proper namespace', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"');
  });

  it('includes static pages', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<loc>https://example.com</loc>');
    expect(text).toContain('<loc>https://example.com/blog</loc>');
    expect(text).toContain('<loc>https://example.com/now</loc>');
    expect(text).toContain('<loc>https://example.com/appearances</loc>');
  });

  it('does not include non-existent i18n URLs', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).not.toContain('/id/');
    expect(text).not.toContain('hreflang');
  });

  it('includes blog post URLs', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<loc>https://example.com/blog/test-post</loc>');
    expect(text).toContain('<loc>https://example.com/blog/another-post</loc>');
  });

  it('includes changefreq for static pages', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<changefreq>monthly</changefreq>');
    expect(text).toContain('<changefreq>weekly</changefreq>');
  });

  it('includes priority for pages', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<priority>1.0</priority>');
    expect(text).toContain('<priority>0.8</priority>');
    expect(text).toContain('<priority>0.7</priority>');
  });

  it('includes lastmod dates for static pages as YYYY-MM-DD', async () => {
    const response = await GET();
    const text = await response.text();

    // Static pages use fixed YYYY-MM-DD dates, not dynamic ISO timestamps
    expect(text).toMatch(/<lastmod>\d{4}-\d{2}-\d{2}<\/lastmod>/);
  });

  it('includes lastmod dates for blog posts as ISO strings', async () => {
    const response = await GET();
    const text = await response.text();

    // Blog posts use ISO date strings derived from post dates
    expect(text).toContain('<lastmod>2024-02-20');
  });

  it('escapes special XML characters in URL', async () => {
    const response = await GET();
    const text = await response.text();

    // The URLs should be properly formatted
    expect(text).not.toContain('&amp;amp;'); // Should not have double-escaped
    expect(text).toContain('https://example.com');
  });
});
