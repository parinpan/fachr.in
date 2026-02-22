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
      <h3 id="podcast-heading" className="text-2xl font-bold mb-8 text-[var(--color-text-primary)]">
        {siteConfig.ui.podcastsTitle}
      </h3>
      <div className="grid grid-cols-1 gap-6">
        {siteConfig.podcasts.map((podcast: PodcastItem, index: number) => (
          <div
            key={index}
            className="group relative bg-[var(--color-surface-secondary)] rounded-2xl p-6 border border-[var(--color-border)] shadow-sm hover:shadow-md transition-all"
          >
            <div className="border-b border-[var(--color-border)] pb-6 mb-6">
              <div className="flex flex-wrap items-center justify-between gap-2 mb-2">
                <h4 className="text-lg font-bold text-[var(--color-text-primary)]">
                  {podcast.title}
                </h4>
                {podcast.language && (
                  <Badge variant="language" icon={<Globe size={12} />}>
                    {podcast.language}
                  </Badge>
                )}
              </div>
              <p className="text-sm text-[var(--color-text-tertiary)]">{podcast.description}</p>
            </div>
            <div className="bg-[var(--color-surface-secondary)] rounded-b-2xl overflow-hidden">
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
                <div className="h-[352px] w-full bg-[var(--color-interactive-bg)] animate-pulse" />
              )}
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
