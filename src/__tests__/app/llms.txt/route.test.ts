import { GET } from '@/app/llms.txt/route';

// Mock siteConfig
jest.mock('@/data/content', () => ({
  siteConfig: {
    personal: {
      name: 'Test User',
      email: 'test@example.com',
      location: 'Berlin, Germany',
    },
    seo: {
      title: 'Test SEO Title',
      description: 'Test SEO description',
      url: 'https://example.com',
    },
    social: {
      github: 'https://github.com/testuser',
      linkedin: 'https://linkedin.com/in/testuser',
      twitter: 'https://twitter.com/testuser',
    },
    about: {
      greeting: "Hi, Test's here",
      description: 'A software engineer based in Berlin.',
    },
    experience: [
      {
        company: 'TestCorp',
        role: 'Senior Engineer',
        location: 'Berlin, Germany',
        period: 'Jan 2023 – Present',
        description: ['Built distributed systems.'],
        techStack: ['Golang', 'Kafka'],
      },
    ],
    works: [
      {
        name: 'Test Project',
        company: 'TestCorp',
        description: 'A test project description',
        role: 'Lead Engineer',
        stack: 'Golang, Redis',
      },
    ],
    appearances: {
      items: [
        {
          type: 'video',
          title: 'Test Talk',
          url: 'https://youtube.com/test',
          description: 'A test talk',
          date: 'January 2024',
          platform: 'YouTube',
          language: 'English',
        },
      ],
    },
    podcasts: [
      {
        title: 'Test Podcast',
        description: 'A test podcast episode',
        date: 'August 2021',
        language: 'Indonesian',
      },
    ],
    now: {
      updatedAt: 'Updated February 2026',
      sections: [
        {
          title: 'Location',
          content: 'Living in <strong>Berlin</strong>.',
        },
      ],
    },
    hero: {
      title: 'Test User',
    },
    blog: {
      description: 'Test blog description',
    },
  },
}));

// Mock getAllPosts
jest.mock('@/lib/mdx', () => ({
  getAllPosts: () => [
    {
      slug: 'test-post',
      title: 'Test Post',
      description: 'A test blog post',
      date: '2024-02-20',
      tags: ['golang', 'systems'],
    },
  ],
}));

describe('llms.txt route', () => {
  it('returns a Response object', async () => {
    const response = await GET();
    expect(response).toBeInstanceOf(Response);
  });

  it('returns content-type text/plain with charset', async () => {
    const response = await GET();
    expect(response.headers.get('Content-Type')).toBe('text/plain; charset=utf-8');
  });

  it('returns proper cache control headers', async () => {
    const response = await GET();
    expect(response.headers.get('Cache-Control')).toBe('s-maxage=3600, stale-while-revalidate');
  });

  it('includes the person name as heading', async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain('# Test User');
  });

  it('includes SEO description as blockquote', async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain('> Test SEO description');
  });

  it('includes contact information', async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain('Email: test@example.com');
    expect(text).toContain('GitHub: https://github.com/testuser');
    expect(text).toContain('LinkedIn: https://linkedin.com/in/testuser');
  });

  it('includes experience entries', async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain('### Senior Engineer at TestCorp');
    expect(text).toContain('Tech Stack: Golang, Kafka');
  });

  it('includes project entries', async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain('### Test Project (TestCorp)');
    expect(text).toContain('Tech Stack: Golang, Redis');
  });

  it('includes appearances', async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain('### Test Talk');
    expect(text).toContain('Platform: YouTube');
  });

  it('includes podcast entries', async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain('### Test Podcast');
    expect(text).toContain('Language: Indonesian');
  });

  it('includes blog posts', async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain('### Test Post');
    expect(text).toContain('Tags: golang, systems');
  });

  it('includes now section with HTML stripped', async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain('### Location');
    expect(text).toContain('Living in Berlin.');
    expect(text).not.toContain('<strong>');
  });

  it('includes navigation links section', async () => {
    const response = await GET();
    const text = await response.text();
    expect(text).toContain('- Blog: https://example.com/blog');
    expect(text).toContain('- RSS Feed: https://example.com/feed.xml');
    expect(text).toContain('- Sitemap: https://example.com/sitemap.xml');
  });
});
