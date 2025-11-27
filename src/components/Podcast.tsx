'use client';

import { useContent } from '@/hooks/useContent';
import { useTheme } from 'next-themes';
import { useSyncExternalStore } from 'react';
import { buildSpotifyThemeUrl } from '@/lib/formatters';
import { Globe } from 'lucide-react';
import Badge from '@/components/ui/Badge';
import type { PodcastItem } from '@/data/types';

/** Subscribe function for useSyncExternalStore - always returns noop since we only need initial mount state */
const subscribeNoop = () => () => {};

/** Get server snapshot - always false on server */
const getServerSnapshot = () => false;

/** Get client snapshot - always true on client */
const getClientSnapshot = () => true;

export default function Podcast() {
    const siteConfig = useContent();
    const { resolvedTheme } = useTheme();
    
    // Use useSyncExternalStore for hydration-safe mounting detection
    const mounted = useSyncExternalStore(subscribeNoop, getClientSnapshot, getServerSnapshot);

    return (
        <section className="mb-12" aria-labelledby="podcast-heading">
            <h3 id="podcast-heading" className="text-2xl font-bold mb-8 text-gray-900 dark:text-neutral-100">
                {siteConfig.podcast.title}
            </h3>
            <div className="grid grid-cols-1 gap-6">
                {siteConfig.podcasts.map((podcast: PodcastItem, index: number) => (
                    <div key={index} className="group relative bg-gray-50 dark:bg-neutral-900 rounded-2xl p-6 border border-gray-200 dark:border-neutral-800 shadow-sm hover:shadow-md transition-all">
                        <div className="border-b border-gray-200 dark:border-neutral-800 pb-6 mb-6">
                            <div className="flex items-center justify-between mb-2">
                                <h4 className="text-lg font-bold text-gray-900 dark:text-neutral-100">
                                    {podcast.title}
                                </h4>
                                {podcast.language && (
                                    <Badge variant="language" icon={<Globe size={12} />}>
                                        {podcast.language}
                                    </Badge>
                                )}
                            </div>
                            <p className="text-sm text-gray-600 dark:text-neutral-400">
                                {podcast.description}
                            </p>
                        </div>
                        <div className="bg-gray-50 dark:bg-black rounded-b-2xl overflow-hidden">
                            {mounted ? (
                                <iframe
                                    src={buildSpotifyThemeUrl(podcast.episodeUrl, resolvedTheme === 'dark')}
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
