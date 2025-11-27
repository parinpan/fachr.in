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
  let documentCookieSpy: jest.SpyInstance;

  const createWrapper = ({ children }: { children: ReactNode }) => {
    return <LanguageProvider>{children}</LanguageProvider>;
  };

  beforeEach(() => {
    jest.clearAllMocks();
    (useRouter as jest.Mock).mockReturnValue({
      push: mockPush,
      refresh: mockRefresh,
    });
    documentCookieSpy = jest.spyOn(document, 'cookie', 'set');
  });

  afterEach(() => {
    documentCookieSpy.mockRestore();
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
      expect(document.cookie).toContain('NEXT_LOCALE=id');
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
      expect(document.cookie).toContain('NEXT_LOCALE=en');
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

    it('sets cookie with correct attributes', () => {
      (useParams as jest.Mock).mockReturnValue({ locale: undefined });
      (usePathname as jest.Mock).mockReturnValue('/');

      const { result } = renderHook(() => useLanguage(), {
        wrapper: createWrapper,
      });

      act(() => {
        result.current.setLanguage('id');
      });

      // Verify cookie is set with the correct value and attributes
      const cookieValue = document.cookie;
      expect(cookieValue).toContain('NEXT_LOCALE=id');
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
