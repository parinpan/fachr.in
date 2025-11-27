import { render, screen } from '@testing-library/react';
import Podcast from '@/components/Podcast';

// Mock dependencies
jest.mock('@/hooks/useContent', () => ({
  useContent: () => ({
    podcast: {
      title: 'Podcast Section',
    },
    podcasts: [
      {
        title: 'Test Podcast 1',
        episodeUrl: 'https://open.spotify.com/embed/episode/test1',
        description: 'Description for podcast 1',
        date: '2024-01-01',
        language: 'English',
      },
      {
        title: 'Test Podcast 2',
        episodeUrl: 'https://open.spotify.com/embed/episode/test2',
        description: 'Description for podcast 2',
        date: '2024-02-01',
      },
    ],
  }),
}));

jest.mock('next-themes', () => ({
  useTheme: () => ({
    resolvedTheme: 'light',
  }),
}));

jest.mock('@/lib/formatters', () => ({
  buildSpotifyThemeUrl: (url: string, isDark: boolean) =>
    `${url}?theme=${isDark ? 'dark' : 'light'}`,
}));

describe('Podcast', () => {
  it('renders the podcast section with title', () => {
    render(<Podcast />);

    expect(screen.getByRole('heading', { name: 'Podcast Section' })).toBeInTheDocument();
  });

  it('renders all podcasts', () => {
    render(<Podcast />);

    expect(screen.getByText('Test Podcast 1')).toBeInTheDocument();
    expect(screen.getByText('Test Podcast 2')).toBeInTheDocument();
  });

  it('renders podcast descriptions', () => {
    render(<Podcast />);

    expect(screen.getByText('Description for podcast 1')).toBeInTheDocument();
    expect(screen.getByText('Description for podcast 2')).toBeInTheDocument();
  });

  it('renders language badge when language is provided', () => {
    render(<Podcast />);

    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('has correct aria-labelledby attribute', () => {
    render(<Podcast />);

    const section = screen.getByRole('region', { name: 'Podcast Section' });
    expect(section).toHaveAttribute('aria-labelledby', 'podcast-heading');
  });

  it('renders iframe for each podcast after mount', () => {
    const { container } = render(<Podcast />);

    // Since useSyncExternalStore returns true on client, iframes should be rendered
    const iframes = container.querySelectorAll('iframe');
    expect(iframes.length).toBe(2);
  });

  it('applies correct styling to podcast cards', () => {
    const { container } = render(<Podcast />);

    const cards = container.querySelectorAll('.group');
    expect(cards.length).toBe(2);
  });
});
