import { useEffect, useRef, useState } from 'react';

/**
 * useVisibility Hook
 * Tracks visibility based on scroll position
 * Uses requestAnimationFrame to throttle scroll events and avoid layout thrashing
 */
export function useVisibility(threshold: number = 300) {
  const [isVisible, setIsVisible] = useState(false);
  const rafId = useRef(0);

  useEffect(() => {
    const toggleVisibility = () => {
      // Cancel any pending rAF to coalesce rapid scroll events
      if (rafId.current) cancelAnimationFrame(rafId.current);
      rafId.current = requestAnimationFrame(() => {
        setIsVisible(window.scrollY > threshold);
      });
    };

    window.addEventListener('scroll', toggleVisibility, { passive: true });
    return () => {
      window.removeEventListener('scroll', toggleVisibility);
      if (rafId.current) cancelAnimationFrame(rafId.current);
    };
  }, [threshold]);

  return isVisible;
}
