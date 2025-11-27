import type { Metadata } from 'next';
import { notFound } from 'next/navigation';
import { locales, isValidLocale, type Locale } from '@/lib/i18n';
import { siteConfig } from '@/data/content';
import { siteConfigId } from '@/data/content-id';

interface Props {
    children: React.ReactNode;
    params: Promise<{ locale: string }>;
}

export async function generateStaticParams() {
    return locales.map((locale) => ({ locale }));
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
    const baseUrl = 'https://fachr.in';
    const currentUrl = locale === 'en' ? baseUrl : `${baseUrl}/${locale}`;
    
    return {
        metadataBase: new URL(baseUrl),
        title: config.seo.title,
        description: config.seo.description,
        keywords: config.seo.keywords,
        alternates: {
            canonical: currentUrl,
            languages: {
                'en': baseUrl,
                'id': `${baseUrl}/id`,
                'x-default': baseUrl,
            },
        },
        openGraph: {
            type: 'website',
            locale: locale === 'id' ? 'id_ID' : 'en_US',
            alternateLocale: locale === 'id' ? ['en_US'] : ['id_ID'],
            url: currentUrl,
            siteName: config.personal.name,
            title: config.seo.title,
            description: config.seo.description,
            images: [
                {
                    url: config.seo.ogImage,
                    width: 1200,
                    height: 630,
                    alt: config.seo.title,
                },
            ],
        },
        twitter: {
            card: 'summary_large_image',
            site: config.seo.twitterHandle,
            creator: config.seo.twitterHandle,
            title: config.seo.title,
            description: config.seo.description,
            images: [config.seo.ogImage],
        },
        robots: {
            index: true,
            follow: true,
            googleBot: {
                index: true,
                follow: true,
                'max-video-preview': -1,
                'max-image-preview': 'large',
                'max-snippet': -1,
            },
        },
    };
}

export default async function LocaleLayout({ children, params }: Props) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    return <>{children}</>;
}
