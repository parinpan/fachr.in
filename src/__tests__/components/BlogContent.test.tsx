import { render, screen } from '@testing-library/react';
import BlogContent from '@/components/BlogContent';

// Mock content data
jest.mock('@/data/content', () => ({
  siteConfig: {
    blog: {
      title: 'Blog',
      description: 'My thoughts and writings',
      emptyState: {
        title: 'No posts yet',
        description: 'Check back later for new content',
      },
    },
  },
}));

jest.mock('@/lib/formatters', () => ({
  formatDate: (date: string, locale: string) => {
    const d = new Date(date);
    return d.toLocaleDateString(locale, { year: 'numeric', month: 'long', day: 'numeric' });
  },
}));

// Mock child components
jest.mock(
  '@/components/PageWrapper',
  () =>
    function MockPageWrapper({ children }: { children: React.ReactNode }) {
      return <div data-testid="page-wrapper">{children}</div>;
    }
);

describe('BlogContent', () => {
  const mockPosts = [
    {
      slug: 'test-post-1',
      title: 'Test Post 1',
      date: '2024-01-15',
      description: 'This is the first test post',
      readingTime: '5 min read',
      tags: ['javascript', 'react'],
    },
    {
      slug: 'test-post-2',
      title: 'Test Post 2',
      date: '2024-02-20',
      description: 'This is the second test post',
      readingTime: '3 min read',
      tags: ['golang', 'backend'],
    },
  ];

  it('renders within PageWrapper', () => {
    render(<BlogContent posts={mockPosts} />);

    expect(screen.getByTestId('page-wrapper')).toBeInTheDocument();
  });

  it('renders the page title', () => {
    render(<BlogContent posts={mockPosts} />);

    expect(screen.getByRole('heading', { level: 1, name: 'Blog' })).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<BlogContent posts={mockPosts} />);

    expect(screen.getByText('My thoughts and writings')).toBeInTheDocument();
  });

  it('renders all blog posts', () => {
    render(<BlogContent posts={mockPosts} />);

    expect(screen.getByText('Test Post 1')).toBeInTheDocument();
    expect(screen.getByText('Test Post 2')).toBeInTheDocument();
  });

  it('renders post descriptions', () => {
    render(<BlogContent posts={mockPosts} />);

    expect(screen.getByText('This is the first test post')).toBeInTheDocument();
    expect(screen.getByText('This is the second test post')).toBeInTheDocument();
  });

  it('renders reading time for each post', () => {
    render(<BlogContent posts={mockPosts} />);

    expect(screen.getByText('5 min read')).toBeInTheDocument();
    expect(screen.getByText('3 min read')).toBeInTheDocument();
  });

  it('renders tags for each post', () => {
    render(<BlogContent posts={mockPosts} />);

    expect(screen.getByText('#javascript')).toBeInTheDocument();
    expect(screen.getByText('#react')).toBeInTheDocument();
    expect(screen.getByText('#golang')).toBeInTheDocument();
    expect(screen.getByText('#backend')).toBeInTheDocument();
  });

  it('renders links to blog posts', () => {
    render(<BlogContent posts={mockPosts} />);

    const links = screen.getAllByRole('link');
    expect(links[0]).toHaveAttribute('href', '/blog/test-post-1');
    expect(links[1]).toHaveAttribute('href', '/blog/test-post-2');
  });

  it('renders empty state when no posts', () => {
    render(<BlogContent posts={[]} />);

    expect(screen.getByText('No posts yet')).toBeInTheDocument();
    expect(screen.getByText('Check back later for new content')).toBeInTheDocument();
  });

  it('renders formatted dates', () => {
    render(<BlogContent posts={mockPosts} />);

    // Dates are formatted via the formatDate mock
    expect(screen.getByText(/January 15, 2024/)).toBeInTheDocument();
  });

  it('has correct article structure', () => {
    render(<BlogContent posts={mockPosts} />);

    const articles = screen.getAllByRole('article');
    expect(articles.length).toBe(2);
  });
});
