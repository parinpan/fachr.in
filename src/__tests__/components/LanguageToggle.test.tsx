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

describe('LanguageToggle - Regression Tests', () => {
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

  describe('Bug Fix: Language toggle responsiveness', () => {
    it('should immediately reflect language change when switching from EN to ID', () => {
      // Set up initial mock BEFORE first render
      (useLanguage as jest.Mock).mockReturnValue({
        language: 'en',
        setLanguage: mockSetLanguage,
      });

      render(<LanguageToggle />);

      const button = screen.getByRole('button', { name: 'Toggle Language' });
      expect(button).toHaveTextContent('ID');

      // Click to switch to ID
      fireEvent.click(button);
      expect(mockSetLanguage).toHaveBeenCalledWith('id');
    });

    it('should work on first click when switching from ID back to EN', () => {
      // Set up initial mock BEFORE first render
      (useLanguage as jest.Mock).mockReturnValue({
        language: 'id',
        setLanguage: mockSetLanguage,
      });

      render(<LanguageToggle />);

      const button = screen.getByRole('button', { name: 'Toggle Language' });
      expect(button).toHaveTextContent('EN');

      // Click to switch to EN - should work on FIRST click
      fireEvent.click(button);
      expect(mockSetLanguage).toHaveBeenCalledTimes(1);
      expect(mockSetLanguage).toHaveBeenCalledWith('en');
    });

    it('should handle rapid back-and-forth switching EN → ID → EN', async () => {
      let currentLang: 'en' | 'id' = 'en';

      // Mock setLanguage to simulate state change
      const mockSetLang = jest.fn((lang: 'en' | 'id') => {
        currentLang = lang;
      });

      (useLanguage as jest.Mock).mockImplementation(() => ({
        language: currentLang,
        setLanguage: mockSetLang,
      }));

      const { rerender } = render(<LanguageToggle />);

      // EN → ID
      let button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockSetLang).toHaveBeenNthCalledWith(1, 'id');

      // Simulate rerender after state change
      rerender(<LanguageToggle />);

      // ID → EN (the problematic case)
      button = screen.getByRole('button');
      fireEvent.click(button);
      expect(mockSetLang).toHaveBeenNthCalledWith(2, 'en');

      // Should have exactly 2 calls, not more
      expect(mockSetLang).toHaveBeenCalledTimes(2);
    });

    it('should not require multiple clicks for the same language switch', () => {
      (useLanguage as jest.Mock).mockReturnValue({
        language: 'id',
        setLanguage: mockSetLanguage,
      });

      render(<LanguageToggle />);

      const button = screen.getByRole('button');

      // First click
      fireEvent.click(button);
      expect(mockSetLanguage).toHaveBeenCalledWith('en');

      // Should not need to click again
      expect(mockSetLanguage).toHaveBeenCalledTimes(1);
    });

    it('should display correct next language in button text', () => {
      // When on EN, button should show ID
      (useLanguage as jest.Mock).mockReturnValue({
        language: 'en',
        setLanguage: mockSetLanguage,
      });

      const { rerender } = render(<LanguageToggle />);
      let button = screen.getByRole('button');
      expect(button).toHaveTextContent('ID');

      // When on ID, button should show EN
      (useLanguage as jest.Mock).mockReturnValue({
        language: 'id',
        setLanguage: mockSetLanguage,
      });

      rerender(<LanguageToggle />);
      button = screen.getByRole('button');
      expect(button).toHaveTextContent('EN');
    });
  });

  describe('Original functionality', () => {
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
});
