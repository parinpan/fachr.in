'use client';

import { useContent } from '@/hooks/useContent';
import PageWrapper from '@/components/PageWrapper';
import AppearanceList from '@/components/AppearanceList';
import Podcast from '@/components/Podcast';

export default function AppearancesContent() {
  const siteConfig = useContent();

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <header className="mb-12 pt-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-[var(--color-text-muted)] uppercase bg-[var(--color-interactive-bg)] rounded-full">
            {siteConfig.appearances.subtitle}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">
            {siteConfig.appearances.title}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-muted)] max-w-2xl leading-normal">
            {siteConfig.appearances.description}
          </p>
        </header>

        <AppearanceList />

        <div className="border-t border-[var(--color-border-light)] pt-16 mt-16">
          <Podcast />
        </div>
      </div>
    </PageWrapper>
  );
}
