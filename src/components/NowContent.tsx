import { siteConfig } from '@/data/content';
import PageWrapper from '@/components/PageWrapper';
import type { NowSectionItem } from '@/data/types';

export default function NowContent() {
  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 pt-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-[var(--color-text-muted)] uppercase bg-[var(--color-interactive-bg)] rounded-full">
            {siteConfig.ui.now.update}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">
            {siteConfig.now.title}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-muted)] max-w-2xl leading-normal mb-4">
            {siteConfig.now.subtitle}
          </p>
          <div className="flex items-center gap-2 text-sm text-[var(--color-text-muted)]">
            <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
            {siteConfig.now.updatedAt}
          </div>
        </header>

        <div className="prose prose-lg prose-gray dark:prose-invert max-w-none prose-a:text-gray-900 dark:prose-a:text-neutral-200 prose-a:decoration-gray-300 dark:prose-a:decoration-neutral-600 hover:prose-a:decoration-gray-900 dark:hover:prose-a:decoration-neutral-400 leading-normal prose-headings:mb-3 prose-h1:mb-4 prose-headings:text-gray-900 dark:prose-headings:text-neutral-100 prose-p:text-gray-800 dark:prose-p:text-neutral-200 prose-strong:text-gray-900 dark:prose-strong:text-neutral-100 prose-li:text-gray-800 dark:prose-li:text-neutral-200">
          {siteConfig.now.sections.map((section: NowSectionItem) => (
            <div key={section.title}>
              <h3>{section.title}</h3>
              <p dangerouslySetInnerHTML={{ __html: section.content }} />
            </div>
          ))}
        </div>
      </div>
    </PageWrapper>
  );
}
