'use client';

import { ArrowUp } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { useVisibility } from '@/hooks/useVisibility';
import { SCROLL_THRESHOLDS } from '@/lib/constants';

export default function BackToTop() {
    const siteConfig = useContent();
    const isVisible = useVisibility(SCROLL_THRESHOLDS.BACK_TO_TOP);

    const scrollToTop = () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth',
        });
    };

    return (
        <button
            onClick={scrollToTop}
            className={`fixed bottom-8 right-8 p-3 rounded-full bg-gray-900 dark:bg-neutral-100 text-white dark:text-gray-900 shadow-lg transition-all duration-300 z-50 hover:scale-110 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-gray-900 dark:focus:ring-neutral-100 ${isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
                }`}
            aria-label={siteConfig.ui.backToTop}
        >
            <ArrowUp className="w-6 h-6" />
        </button>
    );
}
