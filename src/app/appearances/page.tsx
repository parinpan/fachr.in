import PageWrapper from '@/components/PageWrapper';
import AppearanceList from '@/components/AppearanceList';
import Podcast from '@/components/Podcast';
import { siteConfig } from '@/data/content';

export const metadata = {
    title: `Appearances | ${siteConfig.personal.name}`,
    description: 'Watch my latest talks, interviews, and podcast appearances.',
};

export default function AppearancesPage() {
    return (
        <PageWrapper>
            <div className="max-w-3xl mx-auto">
                <header className="mb-12 pt-8">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-gray-500 dark:text-neutral-400 uppercase bg-gray-100 dark:bg-neutral-800 rounded-full">
                        Talks & Podcasts
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-neutral-100 mb-6 tracking-tight">
                        Appearances
                    </h1>
                    <p className="text-xl md:text-2xl text-gray-500 dark:text-neutral-400 max-w-2xl leading-normal">
                        A collection of talks, interviews, and features on software engineering and technology.
                    </p>
                </header>

                <AppearanceList />

                <div className="border-t border-gray-100 dark:border-neutral-800 pt-16 mt-16">
                    <Podcast />
                </div>
            </div>
        </PageWrapper>
    );
}
