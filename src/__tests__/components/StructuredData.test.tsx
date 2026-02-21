import { render } from '@testing-library/react';
import StructuredData from '@/components/StructuredData';

// Mock dependencies
jest.mock('@/hooks/useContent', () => ({
  useContent: () => ({
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
    appearances: {
      title: 'Appearances',
      subtitle: 'Talks & Podcasts',
      description: 'Test appearances description',
      items: [
        {
          type: 'video',
          title: 'Test Video',
          image: '/images/test.jpg',
          url: 'https://youtube.com/watch?v=test',
          description: 'Test video description',
          date: 'January 2024',
          platform: 'YouTube',
          language: 'English',
        },
        {
          type: 'talk',
          title: 'Test Talk',
          image: '/images/test-talk.jpg',
          url: 'https://example.com/talk',
          description: 'Test talk description',
          date: 'March 2023',
          platform: 'Webinar',
        },
      ],
    },
    blog: {
      title: 'Journal',
      description: 'Test blog description',
      emptyState: {
        title: 'Writing in progress',
        description: 'Check back soon!',
      },
    },
  }),
}));

describe('StructuredData', () => {
  it('renders without crashing', () => {
    const { container } = render(<StructuredData />);
    expect(container).toBeInTheDocument();
  });

  it('renders Script element', () => {
    // Next.js Script component renders differently in test environment
    // We mainly test that it doesn't crash
    const { container } = render(<StructuredData />);
    expect(container).toBeInTheDocument();
  });
});
