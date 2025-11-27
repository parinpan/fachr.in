import Hero from '@/components/Hero';
import About from '@/components/About';
import Experience from '@/components/Experience';
import WorkList from '@/components/WorkList';
import GithubRepos from '@/components/GithubRepos';
import Contact from '@/components/Contact';
import PageWrapper from '@/components/PageWrapper';
import { isValidLocale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ locale: string }>;
}

export default async function LocaleHome({ params }: Props) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    return (
        <PageWrapper>
            <Hero />
            <About />
            <Experience />
            <WorkList />
            <GithubRepos />
            <Contact />
        </PageWrapper>
    );
}
