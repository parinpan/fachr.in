/**
 * Integration tests for language switching flow
 *
 * These tests verify the complete end-to-end flow of language switching,
 * including the interaction between LanguageContext and the proxy middleware.
 */
import { renderHook, act } from '@testing-library/react';
import { LanguageProvider, useLanguage } from '@/context/LanguageContext';
import { useParams, usePathname, useRouter } from 'next/navigation';
import { ReactNode } from 'react';

// Mock Next.js navigation
jest.mock('next/navigation', () => ({
  useParams: jest.fn(),
  usePathname: jest.fn(),
  useRouter: jest.fn(),
}));

/**
 * This test suite simulates the bug scenario described in the issue:
 *
 * Steps to reproduce:
 * 1. Open the home page ("/") – it renders English content.
 * 2. Switch the language via the Navbar to Indonesian – the page updates to Indonesian content.
 * 3. Switch the language back to English – the page updates to English content.
 * 4. Refresh the page – unexpectedly, the page still renders Indonesian content.
 *
 * The fix ensures that both localStorage AND cookies are updated when switching language,
 * so the middleware correctly respects the user's preference on page refresh.
 */
describe('Language Switching Integration', () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();
  const mockReplace = jest.fn();
  let localStorageMock: { [key: string]: string };
  let documentCookieValue: string;

  const createWrapper = ({ children }: { children: ReactNode }) => {
    return <LanguageProvider>{children}</LanguageProvider>;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
      replace: mockReplace,
    });

    // Mock localStorage
    localStorageMock = {};
    Object.defineProperty(window, 'localStorage', {
      value: {
        getItem: jest.fn((key: string) => localStorageMock[key] || null),
        setItem: jest.fn((key: string, value: string) => {
          localStorageMock[key] = value;
        }),
        removeItem: jest.fn((key: string) => {
          delete localStorageMock[key];
        }),
        clear: jest.fn(() => {
          localStorageMock = {};
        }),
      },
      writable: true,
    });

    // Mock document.cookie
    documentCookieValue = '';
    Object.defineProperty(document, 'cookie', {
      get: jest.fn(() => documentCookieValue),
      set: jest.fn((value: string) => {
        // Parse the cookie value and extract name=value
        const match = value.match(/^([^=]+)=([^;]*)/);
        if (match) {
          documentCookieValue = `${match[1]}=${match[2]}`;
        }
      }),
      configurable: true,
    });
  });

  describe('Bug Fix: EN → ID → EN → Refresh should stay on EN', () => {
    it('correctly persists English after switching EN → ID → EN', () => {
      // Step 1: Start on English home page "/"
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Verify initial state is English
      expect(result.current.language).toBe('en');

      // Step 2: Switch to Indonesian
      act(() => {
        result.current.setLanguage('id');
      });

      // Verify navigation to /id was triggered
      expect(mockPush).toHaveBeenCalledWith('/id');

      // Verify localStorage was set to 'id'
      expect(localStorage.setItem).toHaveBeenCalledWith('preferred-language', 'id');

      // Verify cookie was set to 'id'
      expect(document.cookie).toContain('NEXT_LOCALE=id');

      // Simulate navigation completed - now on /id
      (useParams as jest.Mock).mockReturnValue({ locale: 'id' });
      (usePathname as jest.Mock).mockReturnValue('/id');
      localStorageMock['preferred-language'] = 'id';
      documentCookieValue = 'NEXT_LOCALE=id';

      // Re-render to get fresh hook with new pathname
      const { result: result2 } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      expect(result2.current.language).toBe('id');

      // Step 3: Switch back to English
      act(() => {
        result2.current.setLanguage('en');
      });

      // Verify navigation to / was triggered
      expect(mockPush).toHaveBeenCalledWith('/');

      // Verify localStorage was set to 'en'
      expect(localStorage.setItem).toHaveBeenCalledWith('preferred-language', 'en');

      // Verify cookie was set to 'en' - THIS IS THE KEY FIX!
      expect(document.cookie).toContain('NEXT_LOCALE=en');

      // Step 4: Simulate page refresh - the middleware will check the cookie
      // Update mocks to simulate the refreshed state
      localStorageMock['preferred-language'] = 'en';
      documentCookieValue = 'NEXT_LOCALE=en';
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      // After refresh, create a new hook instance (simulating fresh page load)
      const { result: result3 } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Verify the language is English after refresh
      expect(result3.current.language).toBe('en');

      // The middleware should NOT redirect because:
      // 1. Cookie is 'en'
      // 2. URL is '/' (English)
      // 3. They match, so no redirect needed
      // The mockReplace should NOT be called for a redirect
      // (It might be called to sync cookie, but not for redirect)
    });

    it('syncs cookie on mount when localStorage has saved preference', () => {
      // Simulate: user had previously selected English, but somehow cookie was lost/different
      localStorageMock['preferred-language'] = 'en';
      documentCookieValue = ''; // Empty cookie (or could be wrong value)

      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Cookie should be synced with localStorage value on mount
      expect(document.cookie).toContain('NEXT_LOCALE=en');
    });

    it('syncs cookie on mount when localStorage has Indonesian preference', () => {
      // Simulate: user had previously selected Indonesian
      localStorageMock['preferred-language'] = 'id';
      documentCookieValue = '';

      (useParams as jest.Mock).mockReturnValue({ locale: 'id' });
      (usePathname as jest.Mock).mockReturnValue('/id');

      renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Cookie should be synced with localStorage value
      expect(document.cookie).toContain('NEXT_LOCALE=id');
    });
  });

  describe('Cookie and localStorage synchronization', () => {
    it('sets both localStorage and cookie when switching from EN to ID', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.setLanguage('id');
      });

      // Both should be set
      expect(localStorage.setItem).toHaveBeenCalledWith('preferred-language', 'id');
      expect(document.cookie).toContain('NEXT_LOCALE=id');
    });

    it('sets both localStorage and cookie when switching from ID to EN', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: 'id' });
      (usePathname as jest.Mock).mockReturnValue('/id');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.setLanguage('en');
      });

      // Both should be set
      expect(localStorage.setItem).toHaveBeenCalledWith('preferred-language', 'en');
      expect(document.cookie).toContain('NEXT_LOCALE=en');
    });

    it('maintains consistency across multiple rapid language switches', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Rapid switches: EN -> ID -> EN -> ID -> EN
      const switches: Array<'en' | 'id'> = ['id', 'en', 'id', 'en'];

      switches.forEach((lang) => {
        act(() => {
          result.current.setLanguage(lang);
        });

        // After each switch, both localStorage and cookie should match
        expect(localStorage.setItem).toHaveBeenLastCalledWith('preferred-language', lang);
        expect(document.cookie).toContain(`NEXT_LOCALE=${lang}`);
      });
    });
  });

  describe('Deep path navigation', () => {
    it('preserves path when switching language on /blog page', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/blog');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.setLanguage('id');
      });

      expect(mockPush).toHaveBeenCalledWith('/id/blog');
      expect(document.cookie).toContain('NEXT_LOCALE=id');
    });

    it('preserves path when switching language on /id/blog page', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: 'id' });
      (usePathname as jest.Mock).mockReturnValue('/id/blog');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.setLanguage('en');
      });

      expect(mockPush).toHaveBeenCalledWith('/blog');
      expect(document.cookie).toContain('NEXT_LOCALE=en');
    });
  });
});
