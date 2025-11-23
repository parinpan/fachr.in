'use client';

import { useRef, useState, useEffect } from 'react';
import Image from 'next/image';
import { Play, Calendar, Clock, ExternalLink, Mic, FileText, ChevronLeft, ChevronRight } from 'lucide-react';
import { siteConfig } from '@/data/content';

export default function AppearanceList() {
    const scrollContainerRef = useRef<HTMLDivElement>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false);
    const [canScrollRight, setCanScrollRight] = useState(true);

    const checkScroll = () => {
        if (scrollContainerRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
            setCanScrollLeft(scrollLeft > 0);
            setCanScrollRight(scrollLeft < scrollWidth - clientWidth - 10);
        }
    };

    useEffect(() => {
        checkScroll();
        window.addEventListener('resize', checkScroll);
        return () => window.removeEventListener('resize', checkScroll);
    }, []);

    const scroll = (direction: 'left' | 'right') => {
        if (scrollContainerRef.current) {
            const scrollAmount = direction === 'left' ? -400 : 400;
            scrollContainerRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
            setTimeout(checkScroll, 300);
        }
    };

    return (
        <section className="mb-16" aria-labelledby="appearances-heading">
            <div className="flex items-center justify-between mb-8">
                <h3 id="appearances-heading" className="text-2xl font-bold text-gray-900 dark:text-neutral-100">
                    Appearances
                </h3>
                <div className="flex gap-2">
                    <button
                        onClick={() => scroll('left')}
                        disabled={!canScrollLeft}
                        className={`p-2 rounded-full border transition-all duration-200 ${canScrollLeft
                            ? 'border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800'
                            : 'border-gray-100 dark:border-neutral-800 text-gray-300 dark:text-neutral-700 cursor-not-allowed'
                            }`}
                        aria-label="Scroll left"
                    >
                        <ChevronLeft size={20} />
                    </button>
                    <button
                        onClick={() => scroll('right')}
                        disabled={!canScrollRight}
                        className={`p-2 rounded-full border transition-all duration-200 ${canScrollRight
                            ? 'border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:bg-gray-50 dark:hover:bg-neutral-800'
                            : 'border-gray-100 dark:border-neutral-800 text-gray-300 dark:text-neutral-700 cursor-not-allowed'
                            }`}
                        aria-label="Scroll right"
                    >
                        <ChevronRight size={20} />
                    </button>
                </div>
            </div>

            <div
                ref={scrollContainerRef}
                onScroll={checkScroll}
                className="flex overflow-x-auto gap-6 pb-8 -mx-4 px-4 scrollbar-hide snap-x snap-mandatory"
                style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            >
                {siteConfig.appearances.map((item, index) => (
                    <div key={index} className="min-w-[300px] md:min-w-[380px] snap-center">
                        <a
                            href={item.url}
                            target="_blank"
                            rel="noopener noreferrer"
                            className="group block h-full"
                        >
                            <article className="flex flex-col h-full bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border)] shadow-sm transition-all duration-300 hover:shadow-xl hover:-translate-y-1 hover:border-[var(--color-border-hover)]">
                                {/* Thumbnail Container */}
                                <div className="relative aspect-video w-full overflow-hidden bg-[var(--color-surface-secondary)]">
                                    {/* Placeholder Icon based on type */}
                                    <div className="absolute inset-0 flex items-center justify-center text-[var(--color-text-tertiary)]">
                                        {item.type === 'video' ? (
                                            <Play size={48} className="opacity-20" />
                                        ) : item.type === 'talk' ? (
                                            <Mic size={48} className="opacity-20" />
                                        ) : (
                                            <FileText size={48} className="opacity-20" />
                                        )}
                                    </div>

                                    {/* Actual Image */}
                                    <Image
                                        src={item.image}
                                        alt={item.title}
                                        fill
                                        className="object-cover transition-transform duration-700 group-hover:scale-105"
                                    />

                                    {/* Overlay (only for video) */}
                                    {item.type === 'video' && (
                                        <div className="absolute inset-0 bg-black/20 group-hover:bg-black/40 transition-colors duration-300 flex items-center justify-center">
                                            <div className="w-14 h-14 rounded-full bg-white/90 flex items-center justify-center shadow-lg transform scale-90 opacity-0 group-hover:scale-100 group-hover:opacity-100 transition-all duration-300">
                                                <Play size={24} className="text-black ml-1" fill="currentColor" />
                                            </div>
                                        </div>
                                    )}

                                    {/* Duration Badge (if available) */}
                                    {item.duration && (
                                        <div className="absolute bottom-3 right-3 px-2 py-1 bg-black/70 backdrop-blur-sm rounded-md text-white text-xs font-medium flex items-center gap-1">
                                            <Clock size={12} />
                                            {item.duration}
                                        </div>
                                    )}
                                </div>

                                {/* Content */}
                                <div className="flex flex-col flex-grow p-6">
                                    {/* All pills/badges in one row that wraps naturally */}
                                    <div className="flex items-center gap-2 flex-wrap mb-4">
                                        <span className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium 
                                            ${item.type === 'video' ? 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300' :
                                                item.type === 'talk' ? 'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300' :
                                                    'bg-neutral-100 text-neutral-700 dark:bg-neutral-800 dark:text-neutral-300'
                                            }`}>
                                            {item.type === 'video' && (
                                                <svg viewBox="0 0 24 24" width="12" height="12" fill="currentColor" className="mr-0.5">
                                                    <path d="M23.498 6.186a3.016 3.016 0 0 0-2.122-2.136C19.505 3.545 12 3.545 12 3.545s-7.505 0-9.377.505A3.017 3.017 0 0 0 .502 6.186C0 8.07 0 12 0 12s0 3.93.502 5.814a3.016 3.016 0 0 0 2.122 2.136c1.871.505 9.376.505 9.376.505s7.505 0 9.377-.505a3.015 3.015 0 0 0 2.122-2.136C24 15.93 24 12 24 12s0-3.93-.502-5.814zM9.545 15.568V8.432L15.818 12l-6.273 3.568z" />
                                                </svg>
                                            )}
                                            {item.type === 'talk' && <Mic size={12} className="mr-0.5" />}
                                            {item.type === 'flyer' && <FileText size={12} className="mr-0.5" />}
                                            {item.platform}
                                        </span>
                                        {item.language && (
                                            <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                                {item.language}
                                            </span>
                                        )}
                                        <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                            <Calendar size={12} />
                                            {item.date}
                                        </span>
                                    </div>

                                    <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-3 line-clamp-2 group-hover:text-[var(--color-interactive-hover)] transition-colors">
                                        {item.title}
                                    </h4>

                                    <p className="text-sm text-[var(--color-text-secondary)] line-clamp-3 mb-4 flex-grow leading-relaxed">
                                        {item.description}
                                    </p>

                                    <div className="flex items-center text-sm font-medium text-[var(--color-text-primary)] group-hover:underline decoration-[var(--color-border-hover)] underline-offset-4">
                                        {item.type === 'video' ? 'Watch Video' : item.type === 'talk' ? 'View Talk' : 'View Details'}
                                        <ExternalLink size={14} className="ml-1.5 opacity-50 group-hover:opacity-100 transition-opacity" />
                                    </div>
                                </div>
                            </article>
                        </a>
                    </div>
                ))}
            </div>
        </section>
    );
}
