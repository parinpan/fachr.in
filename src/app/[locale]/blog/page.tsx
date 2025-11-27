import { getAllPosts } from '@/lib/mdx';
import { Metadata } from 'next';
import { siteConfig } from '@/data/content';
import { siteConfigId } from '@/data/content-id';
import BlogContent from '@/components/BlogContent';
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
        title: `${config.blog.title} | ${config.personal.name}`,
        description: config.blog.description,
    };
}

export default async function BlogIndex({ params }: Props) {
    const { locale } = await params;

    if (!isValidLocale(locale)) {
        notFound();
    }

    const posts = getAllPosts(['slug', 'title', 'date', 'description', 'readingTime', 'tags']);

    return <BlogContent posts={posts} />;
}
