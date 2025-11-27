import { render, screen, fireEvent } from '@testing-library/react';
import ThemeToggle from '@/components/ThemeToggle';
import { useTheme } from 'next-themes';

// Mock next-themes
jest.mock('next-themes', () => ({
  useTheme: jest.fn(),
}));

// Mock LanguageContext
jest.mock('@/context/LanguageContext', () => ({
  useLanguage: jest.fn().mockReturnValue({ language: 'en', setLanguage: jest.fn() }),
}));

describe('ThemeToggle', () => {
  const mockSetTheme = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders sun icon when theme is dark', () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: 'dark',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('renders moon icon when theme is light', () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: 'light',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toBeInTheDocument();
  });

  it('toggles theme when clicked in light mode', () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: 'light',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('dark');
  });

  it('toggles theme when clicked in dark mode', () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: 'dark',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    fireEvent.click(button);

    expect(mockSetTheme).toHaveBeenCalledWith('light');
  });

  it('has proper styling classes', () => {
    (useTheme as jest.Mock).mockReturnValue({
      resolvedTheme: 'light',
      setTheme: mockSetTheme,
    });

    render(<ThemeToggle />);

    const button = screen.getByRole('button');
    expect(button).toHaveClass('p-2');
    expect(button).toHaveClass('rounded-full');
  });

  it('handles undefined theme gracefully', () => {
    (useTheme as jest.Mock).mockReturnValue({
      theme: undefined,
      setTheme: mockSetTheme,
    });

    const { container } = render(<ThemeToggle />);
    expect(container.firstChild).toBeInTheDocument();
  });
});
