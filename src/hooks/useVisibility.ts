import { useEffect, useState } from 'react';

/**
 * useVisibility Hook
 * Tracks visibility based on scroll position
 * Extracted from BackToTop component
 */
export function useVisibility(threshold: number = 300) {
    const [isVisible, setIsVisible] = useState(false);

    useEffect(() => {
        const toggleVisibility = () => {
            if (window.scrollY > threshold) {
                setIsVisible(true);
            } else {
                setIsVisible(false);
            }
        };

        window.addEventListener('scroll', toggleVisibility);
        return () => window.removeEventListener('scroll', toggleVisibility);
    }, [threshold]);

    return isVisible;
}
