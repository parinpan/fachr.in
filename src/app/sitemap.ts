import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

/**
 * Enhanced Sitemap Generator
 * SEO Best Practice - helps search engines discover and index pages
 * Includes language alternates for multilingual content (EN/ID)
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts(['slug', 'date']);

    // Blog posts with language variants
    const blogPosts: MetadataRoute.Sitemap = [];
    posts.forEach((post) => {
        // English version
        blogPosts.push({
            url: `https://fachr.in/blog/${post.slug}`,
            lastModified: new Date(post.date),
            changeFrequency: 'monthly' as const,
            priority: 0.7,
            alternates: {
                languages: {
                    en: `https://fachr.in/blog/${post.slug}`,
                    id: `https://fachr.in/blog/${post.slug}?lang=id`,
                },
            },
        });
    });

    const staticPages: MetadataRoute.Sitemap = [
        {
            url: 'https://fachr.in',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
            alternates: {
                languages: {
                    en: 'https://fachr.in',
                    id: 'https://fachr.in?lang=id',
                },
            },
        },
        {
            url: 'https://fachr.in/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
            alternates: {
                languages: {
                    en: 'https://fachr.in/blog',
                    id: 'https://fachr.in/blog?lang=id',
                },
            },
        },
        {
            url: 'https://fachr.in/now',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: {
                languages: {
                    en: 'https://fachr.in/now',
                    id: 'https://fachr.in/now?lang=id',
                },
            },
        },
        {
            url: 'https://fachr.in/appearances',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
            alternates: {
                languages: {
                    en: 'https://fachr.in/appearances',
                    id: 'https://fachr.in/appearances?lang=id',
                },
            },
        },
    ];

    return [...staticPages, ...blogPosts];
}
