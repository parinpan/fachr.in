import { render, screen } from '@testing-library/react';
import About from '@/components/About';

// Mock content data
jest.mock('@/data/content', () => ({
  siteConfig: {
    about: {
      title: 'About',
      greeting: "Hi, Fachrin's here",
      description: 'A software engineer based in Berlin, Germany.',
      cta: {
        text: "let's get in touch",
        link: '#contact-heading',
      },
    },
  },
}));

// Mock icons
jest.mock('lucide-react', () => ({
  Hand: function MockHand() {
    return <svg data-testid="icon-hand" />;
  },
  ArrowRight: function MockArrowRight() {
    return <svg data-testid="icon-arrow-right" />;
  },
}));

describe('About', () => {
  it('renders about section with title', () => {
    render(<About />);

    expect(screen.getByText('About')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
  });

  it('renders greeting and description', () => {
    render(<About />);

    expect(screen.getByText(/Hi, Fachrin's here/)).toBeInTheDocument();
    expect(screen.getByText(/A software engineer based in Berlin/)).toBeInTheDocument();
  });

  it('renders call to action link', () => {
    render(<About />);

    const ctaLink = screen.getByText("let's get in touch");
    expect(ctaLink).toBeInTheDocument();
    expect(ctaLink.closest('a')).toHaveAttribute('href', '#contact-heading');
  });

  it('has proper accessibility structure', () => {
    render(<About />);

    const section = screen.getByRole('region', { name: 'About' });
    expect(section).toBeInTheDocument();
  });
});
