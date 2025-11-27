import { renderHook, act } from '@testing-library/react';
import { useScroll } from '@/hooks/useScroll';
import { RefObject } from 'react';

describe('useScroll', () => {
    const createMockContainer = (scrollLeft: number, scrollWidth: number, clientWidth: number) => {
        return {
            scrollLeft,
            scrollWidth,
            clientWidth,
            scrollBy: jest.fn(),
        } as unknown as HTMLElement;
    };

    it('returns initial scroll state', () => {
        const container = createMockContainer(0, 1000, 500);
        const ref = { current: container } as RefObject<HTMLElement>;

        const { result } = renderHook(() => useScroll(ref));

        expect(result.current.canScrollLeft).toBe(false);
        expect(result.current.canScrollRight).toBe(true);
    });

    it('detects when can scroll left', () => {
        const container = createMockContainer(100, 1000, 500);
        const ref = { current: container } as RefObject<HTMLElement>;

        const { result } = renderHook(() => useScroll(ref));

        act(() => {
            result.current.checkScroll();
        });

        expect(result.current.canScrollLeft).toBe(true);
    });

    it('detects when cannot scroll right (at end)', () => {
        const container = createMockContainer(500, 1000, 500);
        const ref = { current: container } as RefObject<HTMLElement>;

        const { result } = renderHook(() => useScroll(ref));

        act(() => {
            result.current.checkScroll();
        });

        expect(result.current.canScrollRight).toBe(false);
    });

    it('scrolls left correctly', () => {
        const container = createMockContainer(200, 1000, 500);
        const ref = { current: container } as RefObject<HTMLElement>;

        const { result } = renderHook(() => useScroll(ref));

        act(() => {
            result.current.scroll('left', 100);
        });

        expect(container.scrollBy).toHaveBeenCalledWith({
            left: -100,
            behavior: 'smooth',
        });
    });

    it('scrolls right correctly', () => {
        const container = createMockContainer(0, 1000, 500);
        const ref = { current: container } as RefObject<HTMLElement>;

        const { result } = renderHook(() => useScroll(ref));

        act(() => {
            result.current.scroll('right', 100);
        });

        expect(container.scrollBy).toHaveBeenCalledWith({
            left: 100,
            behavior: 'smooth',
        });
    });

    it('uses default scroll amount of 400', () => {
        const container = createMockContainer(0, 1000, 500);
        const ref = { current: container } as RefObject<HTMLElement>;

        const { result } = renderHook(() => useScroll(ref));

        act(() => {
            result.current.scroll('right');
        });

        expect(container.scrollBy).toHaveBeenCalledWith({
            left: 400,
            behavior: 'smooth',
        });
    });

    it('handles null ref gracefully', () => {
        const ref = { current: null } as RefObject<HTMLElement>;

        const { result } = renderHook(() => useScroll(ref));

        expect(result.current.canScrollLeft).toBe(false);
        expect(result.current.canScrollRight).toBe(true);

        // Should not throw when scrolling with null ref
        act(() => {
            result.current.scroll('right');
        });
    });
});
