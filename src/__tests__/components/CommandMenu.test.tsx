import { render, screen } from '@testing-library/react';
import CommandMenu from '@/components/CommandMenu';
import { useRouter } from 'next/navigation';
import { useContent } from '@/hooks/useContent';

// Mock dependencies
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
}));

jest.mock('@/hooks/useContent', () => ({
  useContent: jest.fn(),
}));

describe('CommandMenu', () => {
  const mockPush = jest.fn();
  const mockSiteConfig = {
    ui: {
      commandMenu: {
        open: 'Open command menu',
        placeholder: 'Search...',
        esc: 'ESC',
        noResults: 'No results found',
        headings: {
          navigation: 'Navigation',
          journal: 'Journal',
          social: 'Social',
          general: 'General',
        },
        actions: {
          copyEmail: 'Copy email',
          sourceCode: 'View source',
        },
      },
    },
    commandMenu: {
      navigation: [
        { name: 'Home', path: '/', icon: 'Home' },
        { name: 'About', path: '/about', icon: 'User' },
      ],
      social: [{ name: 'GitHub', url: 'https://github.com/test', icon: 'Github' }],
      general: [{ name: 'Copy Email', action: 'copy_email', icon: 'Mail' }],
    },
    personal: {
      email: 'test@example.com',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
    });
    (useContent as jest.Mock).mockReturnValue(mockSiteConfig);
  });

  it('renders the component', () => {
    const { container } = render(<CommandMenu posts={[]} />);
    expect(container).toBeInTheDocument();
  });

  it('renders with posts prop', () => {
    const posts = [
      { slug: 'test-post', title: 'Test Post' },
      { slug: 'another-post', title: 'Another Post' },
    ];

    const { container } = render(<CommandMenu posts={posts} />);
    expect(container).toBeInTheDocument();
  });

  it('uses router for navigation', () => {
    render(<CommandMenu posts={[]} />);
    expect(useRouter).toHaveBeenCalled();
  });

  it('loads site config', () => {
    render(<CommandMenu posts={[]} />);
    expect(useContent).toHaveBeenCalled();
  });
});
