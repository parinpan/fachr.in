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

describe('LanguageContext', () => {
  const mockPush = jest.fn();
  const mockRefresh = jest.fn();
  const mockReplace = jest.fn();
  let localStorageMock: { [key: string]: string };

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
  });

  describe('language detection', () => {
    it('detects English from root path', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      expect(result.current.language).toBe('en');
    });

    it('detects Indonesian from /id path', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: 'id' });
      (usePathname as jest.Mock).mockReturnValue('/id');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      expect(result.current.language).toBe('id');
    });

    it('detects Indonesian from /id/about path', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: 'id' });
      (usePathname as jest.Mock).mockReturnValue('/id/about');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      expect(result.current.language).toBe('id');
    });

    it('detects English from /about path', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/about');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      expect(result.current.language).toBe('en');
    });

    it('detects locale from pathname when params are unavailable', () => {
      (useParams as jest.Mock).mockReturnValue({});
      (usePathname as jest.Mock).mockReturnValue('/id/work');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      expect(result.current.language).toBe('id');
    });
  });

  describe('setLanguage function', () => {
    it('switches from EN to ID on root path', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.setLanguage('id');
      });

      expect(mockPush).toHaveBeenCalledWith('/id');
      expect(mockRefresh).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith('preferred-language', 'id');
    });

    it('switches from ID to EN on /id path', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: 'id' });
      (usePathname as jest.Mock).mockReturnValue('/id');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.setLanguage('en');
      });

      expect(mockPush).toHaveBeenCalledWith('/');
      expect(mockRefresh).toHaveBeenCalled();
      expect(localStorage.setItem).toHaveBeenCalledWith('preferred-language', 'en');
    });

    it('switches from EN to ID on /about path', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/about');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.setLanguage('id');
      });

      expect(mockPush).toHaveBeenCalledWith('/id/about');
      expect(mockRefresh).toHaveBeenCalled();
    });

    it('switches from ID to EN on /id/about path', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: 'id' });
      (usePathname as jest.Mock).mockReturnValue('/id/about');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.setLanguage('en');
      });

      expect(mockPush).toHaveBeenCalledWith('/about');
      expect(mockRefresh).toHaveBeenCalled();
    });

    it('handles multiple rapid language switches correctly', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Simulate rapid clicking: EN -> ID -> EN -> ID
      act(() => {
        result.current.setLanguage('id');
      });

      expect(mockPush).toHaveBeenNthCalledWith(1, '/id');

      // Update pathname to simulate navigation
      (usePathname as jest.Mock).mockReturnValue('/id');
      (useParams as jest.Mock).mockReturnValue({ locale: 'id' });

      const { result: result2 } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result2.current.setLanguage('en');
      });

      expect(mockPush).toHaveBeenNthCalledWith(2, '/');

      // The key fix: switching back should work immediately
      (usePathname as jest.Mock).mockReturnValue('/');
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });

      const { result: result3 } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result3.current.setLanguage('id');
      });

      expect(mockPush).toHaveBeenNthCalledWith(3, '/id');
    });

    it('saves language preference to localStorage', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.setLanguage('id');
      });

      // Verify localStorage is set with the correct value
      expect(localStorage.setItem).toHaveBeenCalledWith('preferred-language', 'id');
    });

    it('preserves deep paths when switching languages', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/work/projects/something');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.setLanguage('id');
      });

      expect(mockPush).toHaveBeenCalledWith('/id/work/projects/something');
    });

    it('handles switching to the same language gracefully', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: 'id' });
      (usePathname as jest.Mock).mockReturnValue('/id');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.setLanguage('id');
      });

      // Should still navigate (could be a refresh behavior)
      expect(mockPush).toHaveBeenCalledWith('/id');
      expect(mockRefresh).toHaveBeenCalled();
    });
  });

  describe('language persistence', () => {
    it('redirects to saved language on initial mount when visiting root path', () => {
      // Simulate user visiting root path with Indonesian saved in localStorage
      localStorageMock['preferred-language'] = 'id';
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Should redirect to Indonesian version
      expect(mockReplace).toHaveBeenCalledWith('/id');
    });

    it('redirects to saved language on initial mount when visiting deep path', () => {
      // Simulate user visiting /about with Indonesian saved in localStorage
      localStorageMock['preferred-language'] = 'id';
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/about');

      renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Should redirect to Indonesian version of the page
      expect(mockReplace).toHaveBeenCalledWith('/id/about');
    });

    it('redirects to English when saved and currently on Indonesian path', () => {
      // Simulate user on Indonesian page with English saved in localStorage
      localStorageMock['preferred-language'] = 'en';
      (useParams as jest.Mock).mockReturnValue({ locale: 'id' });
      (usePathname as jest.Mock).mockReturnValue('/id');

      renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Should redirect to English version
      expect(mockReplace).toHaveBeenCalledWith('/');
    });

    it('does not redirect when URL language matches saved language', () => {
      // Simulate user on correct language page
      localStorageMock['preferred-language'] = 'id';
      (useParams as jest.Mock).mockReturnValue({ locale: 'id' });
      (usePathname as jest.Mock).mockReturnValue('/id');

      renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Should not redirect since already on correct language
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it('does not redirect when no saved language preference exists', () => {
      // Simulate user with no saved preference
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Should not redirect since no preference saved
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it('ignores invalid saved language values', () => {
      // Simulate invalid language value in localStorage
      localStorageMock['preferred-language'] = 'invalid';
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Should not redirect since saved value is invalid
      expect(mockReplace).not.toHaveBeenCalled();
    });

    it('persists language across setLanguage calls', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      // Set Indonesian
      act(() => {
        result.current.setLanguage('id');
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('preferred-language', 'id');

      // Set English
      act(() => {
        result.current.setLanguage('en');
      });
      expect(localStorage.setItem).toHaveBeenCalledWith('preferred-language', 'en');
    });
  });

  describe('error handling', () => {
    it('throws error when useLanguage is used outside provider', () => {
      // Suppress console.error for this test
      const consoleErrorSpy = jest.spyOn(console, 'error').mockImplementation();

      expect(() => {
        renderHook(() => useLanguage());
      }).toThrow('useLanguage must be used within a LanguageProvider');

      consoleErrorSpy.mockRestore();
    });
  });
});
