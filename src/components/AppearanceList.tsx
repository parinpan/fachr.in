'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Globe } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { useScroll } from '@/hooks/useScroll';
import { SCROLL_THRESHOLDS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';
import type { AppearanceItem } from '@/data/types';

/** Get the action label for an appearance type */
function getActionLabel(
  type: AppearanceItem['type'],
  labels: { watchVideo: string; viewTalk: string; viewDetails: string }
): string {
  if (type === 'video') return labels.watchVideo;
  if (type === 'talk') return labels.viewTalk;
  return labels.viewDetails;
}

export default function AppearanceList() {
  const siteConfig = useContent();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { canScrollLeft, canScrollRight, scroll, checkScroll } = useScroll(scrollContainerRef);

  return (
    <section className="mb-12" aria-labelledby="appearances-heading">
      <div className="flex items-center justify-between mb-6">
        <h3
          id="appearances-heading"
          className="text-2xl font-bold text-[var(--color-text-primary)]"
        >
          {siteConfig.appearances.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left', SCROLL_THRESHOLDS.APPEARANCE_SCROLL_AMOUNT)}
            disabled={!canScrollLeft}
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={siteConfig.ui.appearanceList.scrollLeft}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right', SCROLL_THRESHOLDS.APPEARANCE_SCROLL_AMOUNT)}
            disabled={!canScrollRight}
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={siteConfig.ui.appearanceList.scrollRight}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide"
        onScroll={checkScroll}
      >
        {siteConfig.appearances.items.map((appearance: AppearanceItem, index: number) => {
          const actionLabel = getActionLabel(appearance.type, siteConfig.ui.appearanceList.actions);

          return (
            <a
              key={index}
              href={appearance.url}
              target="_blank"
              rel="noopener noreferrer"
              className="group flex-shrink-0 w-[85vw] sm:w-[350px] snap-start"
              aria-label={`${actionLabel}: ${appearance.title}`}
            >
              <div className="flex flex-col h-full bg-[var(--color-surface-secondary)] border border-[var(--color-border)] rounded-2xl shadow-sm hover:shadow-md hover:border-[var(--color-border-hover)] transition-all overflow-hidden">
                {/* Thumbnail Section */}
                <div className="relative h-48 flex-shrink-0 bg-[var(--color-interactive-bg)] overflow-hidden">
                  <Image
                    src={appearance.image}
                    alt={appearance.title}
                    fill
                    sizes="(min-width: 640px) 350px, 85vw"
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />

                  {/* Duration Badge - Bottom Right */}
                  {appearance.duration && (
                    <div className="absolute bottom-3 right-3">
                      <div className="px-2.5 py-1 bg-black/80 text-white text-xs font-medium rounded">
                        {appearance.duration}
                      </div>
                    </div>
                  )}
                </div>

                {/* Content Section */}
                <div className="flex flex-col flex-1 p-5">
                  {/* Header: Metadata Pills */}
                  <div className="flex flex-wrap items-center gap-2 mb-3">
                    <Badge variant="date" icon={<Calendar size={12} />}>
                      {appearance.date}
                    </Badge>

                    {appearance.language && (
                      <Badge variant="language" icon={<Globe size={12} />}>
                        {appearance.language}
                      </Badge>
                    )}
                  </div>

                  {/* Title */}
                  <h4 className="font-bold text-[var(--color-text-primary)] mb-2 line-clamp-2 group-hover:text-[var(--color-text-secondary)] transition-colors">
                    {appearance.title}
                  </h4>

                  {/* Description */}
                  <p className="flex-1 text-sm text-[var(--color-text-tertiary)] mb-4 line-clamp-3 leading-relaxed">
                    {appearance.description}
                  </p>

                  {/* View Link */}
                  <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-primary)] transition-colors">
                    <span>{actionLabel}</span>
                    <ExternalLink size={14} />
                  </div>
                </div>
              </div>
            </a>
          );
        })}
      </div>
    </section>
  );
}
