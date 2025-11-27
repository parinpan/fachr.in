import { Metadata } from 'next';
import { siteConfig } from '@/data/content';
import { siteConfigId } from '@/data/content-id';
import AppearancesContent from '@/components/AppearancesContent';
import { isValidLocale, type Locale } from '@/lib/i18n';
import { notFound } from 'next/navigation';

interface Props {
    params: Promise<{ locale: string }>;
}

function getConfig(locale: Locale) {
    return locale === 'id' ? siteConfigId : siteConfig;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { locale } = await params;
    
    if (!isValidLocale(locale)) {
        return {};
    }
    
    const config = getConfig(locale);
    return {
        title: `${config.appearances.title} | ${config.personal.name}`,
        description: config.appearances.description,
    };
}

export default async function AppearancesPage({ params }: Props) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    return <AppearancesContent />;
}
