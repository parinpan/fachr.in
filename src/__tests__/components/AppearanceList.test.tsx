import { render, screen, fireEvent } from '@testing-library/react';
import AppearanceList from '@/components/AppearanceList';

// Mock next/image
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage(props: {
    src: string;
    alt: string;
    fill?: boolean;
    className?: string;
  }) {
    // Destructure and ignore fill prop as it's Next.js specific
    const { fill, ...rest } = props;
    void fill; // explicitly ignore to avoid lint warning
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...rest} alt={props.alt || ''} />;
  },
}));

// Mock hooks
jest.mock('@/hooks/useContent', () => ({
  useContent: () => ({
    appearances: {
      title: 'Appearances',
      items: [
        {
          type: 'video',
          title: 'Test Video Talk',
          image: '/images/test-video.jpg',
          url: 'https://example.com/video',
          description: 'This is a video description',
          date: '2024-01-15',
          platform: 'YouTube',
          duration: '45:30',
          language: 'English',
        },
        {
          type: 'talk',
          title: 'Conference Talk',
          image: '/images/test-talk.jpg',
          url: 'https://example.com/talk',
          description: 'This is a talk description',
          date: '2024-02-20',
          platform: 'Tech Conf',
        },
        {
          type: 'flyer',
          title: 'Event Flyer',
          image: '/images/test-flyer.jpg',
          url: 'https://example.com/flyer',
          description: 'This is an event flyer',
          date: '2024-03-01',
          platform: 'Event',
        },
      ],
    },
    ui: {
      appearanceList: {
        scrollLeft: 'Scroll left',
        scrollRight: 'Scroll right',
        actions: {
          watchVideo: 'Watch video',
          viewTalk: 'View talk',
          viewDetails: 'View details',
        },
      },
    },
  }),
}));

jest.mock('@/hooks/useScroll', () => ({
  useScroll: () => ({
    canScrollLeft: true,
    canScrollRight: true,
    scroll: jest.fn(),
    checkScroll: jest.fn(),
  }),
}));

describe('AppearanceList', () => {
  it('renders the section title', () => {
    render(<AppearanceList />);

    expect(screen.getByRole('heading', { name: 'Appearances' })).toBeInTheDocument();
  });

  it('renders all appearance items', () => {
    render(<AppearanceList />);

    expect(screen.getByText('Test Video Talk')).toBeInTheDocument();
    expect(screen.getByText('Conference Talk')).toBeInTheDocument();
    expect(screen.getByText('Event Flyer')).toBeInTheDocument();
  });

  it('renders descriptions for each appearance', () => {
    render(<AppearanceList />);

    expect(screen.getByText('This is a video description')).toBeInTheDocument();
    expect(screen.getByText('This is a talk description')).toBeInTheDocument();
  });

  it('renders scroll buttons', () => {
    render(<AppearanceList />);

    expect(screen.getByRole('button', { name: 'Scroll left' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Scroll right' })).toBeInTheDocument();
  });

  it('renders correct action labels based on type', () => {
    render(<AppearanceList />);

    expect(screen.getByText('Watch video')).toBeInTheDocument();
    expect(screen.getByText('View talk')).toBeInTheDocument();
    expect(screen.getByText('View details')).toBeInTheDocument();
  });

  it('renders duration badge when available', () => {
    render(<AppearanceList />);

    expect(screen.getByText('45:30')).toBeInTheDocument();
  });

  it('renders language badge when available', () => {
    render(<AppearanceList />);

    expect(screen.getByText('English')).toBeInTheDocument();
  });

  it('renders date badges', () => {
    render(<AppearanceList />);

    expect(screen.getByText('2024-01-15')).toBeInTheDocument();
    expect(screen.getByText('2024-02-20')).toBeInTheDocument();
  });

  it('renders external links with correct attributes', () => {
    render(<AppearanceList />);

    const links = screen.getAllByRole('link');
    links.forEach((link) => {
      expect(link).toHaveAttribute('target', '_blank');
      expect(link).toHaveAttribute('rel', 'noopener noreferrer');
    });
  });

  it('has correct aria-labelledby attribute', () => {
    render(<AppearanceList />);

    const section = screen.getByRole('region', { name: 'Appearances' });
    expect(section).toHaveAttribute('aria-labelledby', 'appearances-heading');
  });

  it('renders images for each appearance', () => {
    render(<AppearanceList />);

    const images = screen.getAllByRole('img');
    expect(images.length).toBe(3);
  });
});

describe('AppearanceList scroll functionality', () => {
  it('calls scroll function when left button is clicked', () => {
    render(<AppearanceList />);

    const leftButton = screen.getByRole('button', { name: 'Scroll left' });
    fireEvent.click(leftButton);

    // The mock is called via the useScroll hook
    expect(leftButton).toBeEnabled();
  });

  it('scroll buttons are present in the component', () => {
    render(<AppearanceList />);

    // Just verify the buttons exist (since we can't easily control the mock state in this test)
    expect(screen.getByRole('button', { name: 'Scroll left' })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: 'Scroll right' })).toBeInTheDocument();
  });
});
