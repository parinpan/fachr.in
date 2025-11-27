import { render, screen, fireEvent } from '@testing-library/react';
import LanguageToggle from '@/components/LanguageToggle';
import { useLanguage } from '@/context/LanguageContext';
import { useContent } from '@/hooks/useContent';

// Mock the hooks
jest.mock('@/context/LanguageContext', () => ({
  useLanguage: jest.fn(),
}));

jest.mock('@/hooks/useContent', () => ({
  useContent: jest.fn(),
}));

describe('LanguageToggle', () => {
  const mockSetLanguage = jest.fn();
  const mockSiteConfig = {
    ui: {
      languageToggle: 'Toggle Language',
    },
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useContent as jest.Mock).mockReturnValue(mockSiteConfig);
  });

  it('renders with EN locale and shows ID button', () => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
    });

    render(<LanguageToggle />);

    const button = screen.getByRole('button', { name: 'Toggle Language' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('ID');
  });

  it('renders with ID locale and shows EN button', () => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'id',
      setLanguage: mockSetLanguage,
    });

    render(<LanguageToggle />);

    const button = screen.getByRole('button', { name: 'Toggle Language' });
    expect(button).toBeInTheDocument();
    expect(button).toHaveTextContent('EN');
  });

  it('switches from EN to ID when clicked', () => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
    });

    render(<LanguageToggle />);

    const button = screen.getByRole('button', { name: 'Toggle Language' });
    fireEvent.click(button);

    expect(mockSetLanguage).toHaveBeenCalledTimes(1);
    expect(mockSetLanguage).toHaveBeenCalledWith('id');
  });

  it('switches from ID to EN when clicked', () => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'id',
      setLanguage: mockSetLanguage,
    });

    render(<LanguageToggle />);

    const button = screen.getByRole('button', { name: 'Toggle Language' });
    fireEvent.click(button);

    expect(mockSetLanguage).toHaveBeenCalledTimes(1);
    expect(mockSetLanguage).toHaveBeenCalledWith('en');
  });

  it('calls setLanguage multiple times for consecutive clicks', () => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
    });

    render(<LanguageToggle />);

    const button = screen.getByRole('button', { name: 'Toggle Language' });

    // Click multiple times rapidly
    fireEvent.click(button);
    fireEvent.click(button);
    fireEvent.click(button);

    expect(mockSetLanguage).toHaveBeenCalledTimes(3);
    // All calls should be with 'id' since the language in the mock doesn't change
    expect(mockSetLanguage).toHaveBeenNthCalledWith(1, 'id');
    expect(mockSetLanguage).toHaveBeenNthCalledWith(2, 'id');
    expect(mockSetLanguage).toHaveBeenNthCalledWith(3, 'id');
  });

  it('has correct accessibility attributes', () => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
    });

    render(<LanguageToggle />);

    const button = screen.getByRole('button', { name: 'Toggle Language' });
    expect(button).toHaveAttribute('aria-label', 'Toggle Language');
  });

  it('has correct CSS classes for styling', () => {
    (useLanguage as jest.Mock).mockReturnValue({
      language: 'en',
      setLanguage: mockSetLanguage,
    });

    render(<LanguageToggle />);

    const button = screen.getByRole('button', { name: 'Toggle Language' });
    expect(button).toHaveClass('p-2');
    expect(button).toHaveClass('rounded-md');
    expect(button).toHaveClass('hover:bg-zinc-100');
    expect(button).toHaveClass('dark:hover:bg-zinc-800');
    expect(button).toHaveClass('transition-colors');
    expect(button).toHaveClass('text-sm');
    expect(button).toHaveClass('font-medium');
  });
});
