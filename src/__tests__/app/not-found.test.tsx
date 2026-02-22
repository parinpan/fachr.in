import { render, screen } from '@testing-library/react';
import NotFound from '@/app/not-found';

// Mock content data
jest.mock('@/data/content', () => ({
  siteConfig: {
    ui: {
      notFound: {
        title: '404',
        subtitle: 'Page Not Found',
        description: 'The page you are looking for does not exist.',
        backButton: 'cd ~',
        buttonText: 'Go Home',
      },
    },
  },
}));

describe('NotFound', () => {
  it('renders the 404 title', () => {
    render(<NotFound />);

    expect(screen.getByText('404')).toBeInTheDocument();
  });

  it('renders the subtitle', () => {
    render(<NotFound />);

    expect(screen.getByText('Page Not Found')).toBeInTheDocument();
  });

  it('renders the description', () => {
    render(<NotFound />);

    expect(screen.getByText('The page you are looking for does not exist.')).toBeInTheDocument();
  });

  it('renders the back button', () => {
    render(<NotFound />);

    const link = screen.getByRole('link', { name: /Go Home/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveAttribute('href', '/');
  });

  it('renders the terminal hint', () => {
    render(<NotFound />);

    expect(screen.getByText(/cd ~/)).toBeInTheDocument();
  });

  it('renders the terminal icon', () => {
    const { container } = render(<NotFound />);

    // Check for SVG element (Lucide icons render as SVG)
    const svgs = container.querySelectorAll('svg');
    expect(svgs.length).toBeGreaterThanOrEqual(1);
  });

  it('has correct styling', () => {
    const { container } = render(<NotFound />);

    const mainContainer = container.firstChild;
    expect(mainContainer).toHaveClass('min-h-screen');
    expect(mainContainer).toHaveClass('bg-[var(--color-bg)]');
  });

  it('has gradient background', () => {
    const { container } = render(<NotFound />);

    // Check for the radial gradient div with absolute positioning
    const gradientElement = container.querySelector('.absolute.inset-0');
    expect(gradientElement).toBeInTheDocument();
  });
});
