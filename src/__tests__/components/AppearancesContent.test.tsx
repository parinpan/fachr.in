import { render, screen } from '@testing-library/react';
import AppearancesContent from '@/components/AppearancesContent';

// Mock dependencies
jest.mock('@/hooks/useContent', () => ({
  useContent: () => ({
    appearances: {
      title: 'Appearances',
      subtitle: 'My Appearances',
      description: 'Videos, talks, and podcasts',
    },
  }),
}));

// Mock child components
jest.mock(
  '@/components/PageWrapper',
  () =>
    function MockPageWrapper({ children }: { children: React.ReactNode }) {
      return <div data-testid="page-wrapper">{children}</div>;
    }
);

jest.mock(
  '@/components/AppearanceList',
  () =>
    function MockAppearanceList() {
      return <div data-testid="appearance-list">Appearance List</div>;
    }
);

jest.mock(
  '@/components/Podcast',
  () =>
    function MockPodcast() {
      return <div data-testid="podcast">Podcast</div>;
    }
);

describe('AppearancesContent', () => {
  it('renders within PageWrapper', () => {
    render(<AppearancesContent />);

    expect(screen.getByTestId('page-wrapper')).toBeInTheDocument();
  });

  it('renders the page title', () => {
    render(<AppearancesContent />);

    expect(screen.getByRole('heading', { level: 1, name: 'Appearances' })).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<AppearancesContent />);

    expect(screen.getByText('My Appearances')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<AppearancesContent />);

    expect(screen.getByText('Videos, talks, and podcasts')).toBeInTheDocument();
  });

  it('renders AppearanceList component', () => {
    render(<AppearancesContent />);

    expect(screen.getByTestId('appearance-list')).toBeInTheDocument();
  });

  it('renders Podcast component', () => {
    render(<AppearancesContent />);

    expect(screen.getByTestId('podcast')).toBeInTheDocument();
  });

  it('has proper header structure', () => {
    render(<AppearancesContent />);

    const header = screen.getByRole('banner');
    expect(header).toBeInTheDocument();
  });

  it('has correct styling on the container', () => {
    const { container } = render(<AppearancesContent />);

    const innerContainer = container.querySelector('.max-w-3xl');
    expect(innerContainer).toBeInTheDocument();
  });
});
