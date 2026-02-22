import { render, screen } from '@testing-library/react';
import NowContent from '@/components/NowContent';

// Mock content data
jest.mock('@/data/content', () => ({
  siteConfig: {
    ui: {
      now: {
        update: 'Latest Update',
      },
    },
    now: {
      title: 'Now',
      subtitle: "Here's what I'm focused on",
      updatedAt: 'Updated November 2024',
      sections: [
        {
          title: 'Work',
          content: 'Currently working on <a href="#">exciting projects</a>.',
        },
        {
          title: 'Learning',
          content: 'Studying new technologies.',
        },
        {
          title: 'Life',
          content: 'Living in Berlin, enjoying the city.',
        },
      ],
    },
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

describe('NowContent', () => {
  it('renders within PageWrapper', () => {
    render(<NowContent />);

    expect(screen.getByTestId('page-wrapper')).toBeInTheDocument();
  });

  it('renders the page title', () => {
    render(<NowContent />);

    expect(screen.getByRole('heading', { level: 1, name: 'Now' })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<NowContent />);

    expect(screen.getByText("Here's what I'm focused on")).toBeInTheDocument();
  });

  it('renders the update label', () => {
    render(<NowContent />);

    expect(screen.getByText('Latest Update')).toBeInTheDocument();
  });

  it('renders the updated at timestamp', () => {
    render(<NowContent />);

    expect(screen.getByText('Updated November 2024')).toBeInTheDocument();
  });

  it('renders all sections', () => {
    render(<NowContent />);

    expect(screen.getByRole('heading', { name: 'Work' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Learning' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Life' })).toBeInTheDocument();
  });

  it('renders section content with HTML', () => {
    render(<NowContent />);

    // Check that HTML content is rendered (link in Work section)
    const link = screen.getByRole('link', { name: 'exciting projects' });
    expect(link).toBeInTheDocument();
  });

  it('renders plain text content', () => {
    render(<NowContent />);

    expect(screen.getByText('Studying new technologies.')).toBeInTheDocument();
    expect(screen.getByText('Living in Berlin, enjoying the city.')).toBeInTheDocument();
  });

  it('has a pulse animation indicator', () => {
    const { container } = render(<NowContent />);

    const pulseIndicator = container.querySelector('.animate-pulse');
    expect(pulseIndicator).toBeInTheDocument();
  });

  it('has correct styling on the container', () => {
    const { container } = render(<NowContent />);

    const innerContainer = container.querySelector('.max-w-3xl');
    expect(innerContainer).toBeInTheDocument();
  });

  it('renders prose styling for content', () => {
    const { container } = render(<NowContent />);

    const proseContainer = container.querySelector('.prose');
    expect(proseContainer).toBeInTheDocument();
  });
});
