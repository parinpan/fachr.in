import { useEffect, useState, RefObject, useCallback } from 'react';

/**
 * useScroll Hook
 * Manages horizontal scroll state for scrollable containers
 * Extracted from AppearanceList component
 */
export function useScroll(containerRef: RefObject<HTMLElement | null>) {
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = useCallback(() => {
        if (containerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    }, [containerRef]);

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, [checkScroll]);

    const scroll = (direction: 'left' | 'right', amount: number = 400) => {
        if (containerRef.current) {
            const scrollAmount = direction === 'left' ? -amount : amount;
            containerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(checkScroll, 300);
        }
    };

    return {
        canScrollLeft,
        canScrollRight,
        scroll,
        checkScroll,
    };
}
