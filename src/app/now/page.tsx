import { Metadata } from 'next';
import { siteConfig } from '@/data/content';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

export const metadata: Metadata = {
    title: `Now | ${siteConfig.personal.name}`,
    description: siteConfig.now.subtitle,
};

export default function NowPage() {
    return (
        <PageWrapper>
            <div className="max-w-3xl mx-auto">
                <header className="mb-8 pt-8">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-gray-500 uppercase bg-gray-100 rounded-full">
                        Update
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">{siteConfig.now.title}</h1>
                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl leading-normal mb-4">
                        {siteConfig.now.subtitle}
                    </p>
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                        <span className="w-2 h-2 bg-green-500 rounded-full animate-pulse"></span>
                        {siteConfig.now.updatedAt}
                    </div>
                </header>

                <div className="prose prose-lg prose-gray max-w-none prose-a:text-gray-900 prose-a:decoration-gray-300 hover:prose-a:decoration-gray-900 leading-normal prose-headings:mb-3 prose-h1:mb-4">
                    {siteConfig.now.sections.map((section) => (
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
