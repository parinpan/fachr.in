'use client';

import Image from 'next/image';
import { useRef } from 'react';
import { ChevronLeft, ChevronRight, ExternalLink, Calendar, Globe } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { useScroll } from '@/hooks/useScroll';
import { getAppearanceIcon } from '@/lib/icon-maps';
import { SCROLL_THRESHOLDS } from '@/lib/constants';
import Badge from '@/components/ui/Badge';

export default function AppearanceList() {
    const siteConfig = useContent();
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const { canScrollLeft, canScrollRight, scroll, checkScroll } = useScroll(scrollContainerRef);

    return (
        <section className="mb-12" aria-labelledby="appearances-heading">
            <div className="flex items-center justify-between mb-6">
                <h3 id="appearances-heading" className="text-2xl font-bold text-gray-900 dark:text-neutral-100">
                    {siteConfig.appearances.title}
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left', SCROLL_THRESHOLDS.APPEARANCE_SCROLL_AMOUNT)}
                        disabled={!canScrollLeft}
                        className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:border-gray-300 dark:hover:border-neutral-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label={siteConfig.ui.appearanceList.scrollLeft}
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right', SCROLL_THRESHOLDS.APPEARANCE_SCROLL_AMOUNT)}
                        disabled={!canScrollRight}
                        className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:border-gray-300 dark:hover:border-neutral-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
                        aria-label={siteConfig.ui.appearanceList.scrollRight}
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
                onScroll={checkScroll}
            >
                {siteConfig.appearances.items.map((appearance: any, index: number) => {
                    const Icon = getAppearanceIcon(appearance.type);

                    // Get translatable type label
                    const typeLabel = appearance.type === 'video'
                        ? siteConfig.ui.appearanceList.types.video
                        : appearance.type === 'talk'
                            ? siteConfig.ui.appearanceList.types.talk
                            : siteConfig.ui.appearanceList.types.article;

                    return (
                        <a
                            key={index}
                            href={appearance.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group flex-shrink-0 w-[350px] snap-start"
                            aria-label={`${appearance.type === 'video' ? siteConfig.ui.appearanceList.actions.watchVideo : appearance.type === 'talk' ? siteConfig.ui.appearanceList.actions.viewTalk : siteConfig.ui.appearanceList.actions.viewDetails}: ${appearance.title}`}
                        >
                            <div className="flex flex-col h-full bg-gray-50 dark:bg-neutral-900 border border-gray-200 dark:border-neutral-800 rounded-2xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-neutral-700 transition-all overflow-hidden">
                                {/* Thumbnail Section */}
                                <div className="relative h-48 flex-shrink-0 bg-gray-100 dark:bg-neutral-900 overflow-hidden">
                                    <Image
                                        src={appearance.image}
                                        alt={appearance.title}
                                        fill
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
                                    <h4 className="font-bold text-gray-900 dark:text-neutral-100 mb-2 line-clamp-2 group-hover:text-gray-700 dark:group-hover:text-neutral-200 transition-colors">
                                        {appearance.title}
                                    </h4>

                                    {/* Description - Increased to 3 lines for better context */}
                                    <p className="flex-1 text-sm text-gray-600 dark:text-neutral-400 mb-4 line-clamp-3 leading-relaxed">
                                        {appearance.description}
                                    </p>

                                    {/* View Link */}
                                    <div className="mt-auto flex items-center gap-1.5 text-sm font-medium text-gray-600 dark:text-neutral-400 group-hover:text-gray-900 dark:group-hover:text-neutral-100 transition-colors">
                                        <span>{appearance.type === 'video' ? siteConfig.ui.appearanceList.actions.watchVideo : appearance.type === 'talk' ? siteConfig.ui.appearanceList.actions.viewTalk : siteConfig.ui.appearanceList.actions.viewDetails}</span>
                                        <ExternalLink size={14} />
                                    </div>
                                </div>
                            </div>
                        </a>
                    );
                })}
            </div>

            {/* CSS to hide scrollbar */}
            <style jsx>{`
                div::-webkit-scrollbar {
                    display: none;
                }
            `}</style>
        </section>
    );
}
