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
      className={`fixed bottom-8 right-8 p-3 rounded-full bg-[var(--color-button-bg)] text-[var(--color-button-text)] shadow-lg transition-all duration-300 z-50 hover:scale-110 hover:bg-[var(--color-button-bg-hover)] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-[var(--color-focus)] ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 translate-y-10 pointer-events-none'
      }`}
      aria-label={siteConfig.ui.backToTop}
    >
      <ArrowUp className="w-6 h-6" />
    </button>
  );
}
