import { useEffect, useRef, useState, RefObject, useCallback } from 'react';

/**
 * useScroll Hook
 * Manages horizontal scroll state for scrollable containers
 * Resize events are debounced (150ms) to avoid excessive layout recalculations
 */
export function useScroll(containerRef: RefObject<HTMLElement | null>) {
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);
  const resizeTimerId = useRef<ReturnType<typeof setTimeout> | undefined>(undefined);

  const checkScroll = useCallback(() => {
    if (containerRef.current) {
      const { scrollLeft, scrollWidth, clientWidth } = containerRef.current;
      setCanScrollLeft(scrollLeft > 0);
      setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
    }
  }, [containerRef]);

  useEffect(() => {
    checkScroll();
    const handleResize = () => {
      clearTimeout(resizeTimerId.current);
      resizeTimerId.current = setTimeout(checkScroll, 150);
    };
    window.addEventListener('resize', handleResize);
    return () => {
      window.removeEventListener('resize', handleResize);
      clearTimeout(resizeTimerId.current);
    };
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
