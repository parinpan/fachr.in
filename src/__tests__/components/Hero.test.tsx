import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';

// Mock content data
jest.mock('@/data/content', () => ({
  siteConfig: {
    hero: {
      title: 'Test Hero Title',
      subtitle: 'Test Hero Subtitle',
      image: '/test-image.jpg',
      badges: [
        { text: 'Badge 1', icon: '/badge1.png' },
        { text: 'Badge 2', icon: '/badge2.png' },
      ],
    },
  },
}));

// Mock next/image - filters out Next.js-specific props that shouldn't be on <img>
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({
    fill,
    priority,
    unoptimized,
    ...props
  }: React.ImgHTMLAttributes<HTMLImageElement> & {
    fill?: boolean;
    priority?: boolean;
    unoptimized?: boolean;
  }) {
    // Suppress unused variable warnings
    void fill;
    void priority;
    void unoptimized;
    // eslint-disable-next-line @next/next/no-img-element
    return <img {...props} alt={props.alt || ''} />;
  },
}));

describe('Hero', () => {
  it('renders hero content', () => {
    render(<Hero />);

    expect(screen.getByText('Test Hero Title')).toBeInTheDocument();
    expect(screen.getByText('Test Hero Subtitle')).toBeInTheDocument();
    expect(screen.getByAltText('Test Hero Title')).toBeInTheDocument();
  });

  it('renders badges', () => {
    render(<Hero />);

    expect(screen.getByText('Badge 1')).toBeInTheDocument();
    expect(screen.getByText('Badge 2')).toBeInTheDocument();
  });
});
