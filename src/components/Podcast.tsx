'use client';

import { siteConfig } from '@/data/content';

import { useTheme } from 'next-themes';
import { useEffect, useState } from 'react';

export default function Podcast() {
    const { resolvedTheme } = useTheme();
    const [mounted, setMounted] = useState(false);

    useEffect(() => {
        setMounted(true);
    }, []);

    return (
        <section className="mb-12" aria-labelledby="podcast-heading">
            <h3 id="podcast-heading" className="text-2xl font-bold mb-8 text-gray-900 dark:text-neutral-100">
                Podcasts
            </h3>
            <div className="grid grid-cols-1 gap-8">
                {siteConfig.podcasts.map((podcast, index) => (
                    <div key={index} className="bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-700 shadow-sm">
                        <div className="p-6 border-b border-gray-100 dark:border-neutral-700">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-neutral-100">
                                    {podcast.title}
                                </h4>
                                {podcast.language && (
                                    <span className="inline-flex items-center px-2.5 py-1 rounded-full text-xs font-medium bg-neutral-100 text-neutral-600 dark:bg-neutral-800 dark:text-neutral-400">
                                        {podcast.language}
                                    </span>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                {podcast.description}
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-black rounded-b-2xl overflow-hidden">
                            {mounted ? (
                                <iframe
                                    src={`${podcast.episodeUrl}&theme=${resolvedTheme === 'dark' ? '1' : '0'}`}
                                    width="100%"
                                    height="352"
                                    frameBorder="0"
                                    allowFullScreen
                                    allow="autoplay; clipboard-write; encrypted-media; fullscreen; picture-in-picture"
                                    loading="lazy"
                                    className="transition-opacity duration-500"
                                ></iframe>
                            ) : (
                                <div className="h-[352px] w-full bg-gray-100 dark:bg-neutral-900 animate-pulse" />
                            )}
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
