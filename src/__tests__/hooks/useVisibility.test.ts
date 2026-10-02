import { renderHook, act } from '@testing-library/react';
import { useVisibility } from '@/hooks/useVisibility';

describe('useVisibility', () => {
  const originalScrollY = window.scrollY;
  const originalRAF = window.requestAnimationFrame;
  const originalCAF = window.cancelAnimationFrame;

  beforeEach(() => {
    // Reset scrollY before each test
    Object.defineProperty(window, 'scrollY', {
      value: 0,
      writable: true,
      configurable: true,
    });

    // Mock requestAnimationFrame to execute synchronously
    window.requestAnimationFrame = (cb: FrameRequestCallback) => {
      cb(0);
      return 0;
    };
    window.cancelAnimationFrame = jest.fn();
  });

  afterEach(() => {
    // Restore originals
    Object.defineProperty(window, 'scrollY', {
      value: originalScrollY,
      writable: true,
      configurable: true,
    });
    window.requestAnimationFrame = originalRAF;
    window.cancelAnimationFrame = originalCAF;
  });

  it('returns false initially when scroll is at top', () => {
    const { result } = renderHook(() => useVisibility(300));
    expect(result.current).toBe(false);
  });

  it('returns true when scroll exceeds threshold', () => {
    const { result } = renderHook(() => useVisibility(300));

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('returns false when scroll is below threshold', () => {
    const { result } = renderHook(() => useVisibility(300));

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 400, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 100, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(false);
  });

  it('uses default threshold of 300', () => {
    const { result } = renderHook(() => useVisibility());

    act(() => {
      Object.defineProperty(window, 'scrollY', { value: 301, writable: true, configurable: true });
      window.dispatchEvent(new Event('scroll'));
    });

    expect(result.current).toBe(true);
  });

  it('cleans up event listener on unmount', () => {
    const removeEventListenerSpy = jest.spyOn(window, 'removeEventListener');
    const { unmount } = renderHook(() => useVisibility(300));

    unmount();

    expect(removeEventListenerSpy).toHaveBeenCalledWith('scroll', expect.any(Function));
    removeEventListenerSpy.mockRestore();
  });
});
