import { GET } from '@/app/feed.xml/route';

// Mock siteConfig
jest.mock('@/data/content', () => ({
  siteConfig: {
    seo: {
      url: 'https://example.com',
      title: 'Test Site',
      description: 'Test Description',
    },
    appearances: {
      items: [
        {
          title: 'Test Appearance',
          url: 'https://example.com/appearance',
          date: '2024-01-15',
          description: 'Test appearance description',
          platform: 'YouTube',
          type: 'video',
        },
      ],
    },
  },
}));

// Mock getAllPosts
jest.mock('@/lib/mdx', () => ({
  getAllPosts: () => [
    {
      slug: 'test-post',
      title: 'Test Post',
      description: 'Test post description',
      date: '2024-02-20',
      tags: ['javascript', 'react'],
    },
  ],
}));

describe('feed.xml route', () => {
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

  it('includes RSS 2.0 declaration', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<?xml version="1.0" encoding="UTF-8" ?>');
    expect(text).toContain('<rss version="2.0"');
  });

  it('includes channel information', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<channel>');
    expect(text).toContain('<title><![CDATA[Test Site]]></title>');
    expect(text).toContain('<description><![CDATA[Test Description]]></description>');
  });

  it('includes site link', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<link>https://example.com</link>');
  });

  it('includes blog post items', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<title><![CDATA[Test Post]]></title>');
    expect(text).toContain('<link>https://example.com/blog/test-post</link>');
    expect(text).toContain('<description><![CDATA[Test post description]]></description>');
  });

  it('includes appearance items', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<title><![CDATA[Test Appearance (video)]]></title>');
    expect(text).toContain('<link>https://example.com/appearance</link>');
  });

  it('includes post tags as categories', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<category>javascript</category>');
    expect(text).toContain('<category>react</category>');
  });

  it('includes atom:link for self reference', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('atom:link href="https://example.com/feed.xml"');
  });

  it('includes language declaration', async () => {
    const response = await GET();
    const text = await response.text();

    expect(text).toContain('<language>en</language>');
  });
});
