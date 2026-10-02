import { render, screen, fireEvent } from '@testing-library/react';
import BackToTop from '@/components/BackToTop';
import { useVisibility } from '@/hooks/useVisibility';

// Mock hooks
jest.mock('@/hooks/useContent', () => ({
  useContent: () => ({
    ui: {
      backToTop: 'Back to top',
    },
  }),
}));

jest.mock('@/hooks/useVisibility', () => ({
  useVisibility: jest.fn(),
}));

const mockUseVisibility = useVisibility as jest.Mock;

describe('BackToTop', () => {
  const mockScrollTo = jest.fn();
  const originalScrollTo = window.scrollTo;

  beforeEach(() => {
    jest.clearAllMocks();
    window.scrollTo = mockScrollTo;
  });

  afterEach(() => {
    window.scrollTo = originalScrollTo;
  });

  it('renders the button when visible', () => {
    mockUseVisibility.mockReturnValue(true);

    render(<BackToTop />);

    const button = screen.getByRole('button', { name: 'Back to top' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveClass('opacity-100');
  });

  it('hides the button when not visible', () => {
    mockUseVisibility.mockReturnValue(false);

    render(<BackToTop />);

    const button = screen.getByRole('button', { name: 'Back to top' });
    expect(button).toHaveClass('opacity-0');
    expect(button).toHaveClass('pointer-events-none');
  });

  it('scrolls to top when clicked', () => {
    mockUseVisibility.mockReturnValue(true);

    render(<BackToTop />);

    const button = screen.getByRole('button', { name: 'Back to top' });
    fireEvent.click(button);

    expect(mockScrollTo).toHaveBeenCalledWith({
      top: 0,
      behavior: 'smooth',
    });
  });

  it('has correct styling classes', () => {
    mockUseVisibility.mockReturnValue(true);

    render(<BackToTop />);

    const button = screen.getByRole('button', { name: 'Back to top' });
    expect(button).toHaveClass('fixed');
    expect(button).toHaveClass('bottom-8');
    expect(button).toHaveClass('right-8');
    expect(button).toHaveClass('rounded-full');
  });

  it('renders ArrowUp icon', () => {
    mockUseVisibility.mockReturnValue(true);

    const { container } = render(<BackToTop />);

    // Check for SVG element (Lucide icons render as SVG)
    const svg = container.querySelector('svg');
    expect(svg).toBeInTheDocument();
  });
});
