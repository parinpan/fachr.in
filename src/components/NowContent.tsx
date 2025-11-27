'use client';

import { useContent } from '@/hooks/useContent';
import PageWrapper from '@/components/PageWrapper';
import type { NowSectionItem } from '@/data/types';

export default function NowContent() {
    const siteConfig = useContent();

    return (
        <PageWrapper>
            <div className="max-w-3xl mx-auto">
                <header className="mb-8 pt-8">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-gray-500 dark:text-neutral-400 uppercase bg-gray-100 dark:bg-neutral-800 rounded-full">
                        {siteConfig.ui.now.update}
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-neutral-100 mb-6 tracking-tight">{siteConfig.now.title}</h1>
                    <p className="text-xl md:text-2xl text-gray-500 dark:text-neutral-400 max-w-2xl leading-normal mb-4">
                        {siteConfig.now.subtitle}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-400 dark:text-neutral-500">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        {siteConfig.now.updatedAt}
                    </div>
                </header>

                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none prose-a:text-gray-900 dark:prose-a:text-neutral-200 prose-a:decoration-gray-300 dark:prose-a:decoration-neutral-600 hover:prose-a:decoration-gray-900 dark:hover:prose-a:decoration-neutral-400 leading-normal prose-headings:mb-3 prose-h1:mb-4 prose-headings:text-gray-900 dark:prose-headings:text-neutral-100 prose-p:text-gray-700 dark:prose-p:text-neutral-300 prose-strong:text-gray-900 dark:prose-strong:text-neutral-100 prose-li:text-gray-700 dark:prose-li:text-neutral-300">
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
