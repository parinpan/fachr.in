import { MetadataRoute } from 'next';
import { getAllPosts } from '@/lib/mdx';

/**
 * Sitemap Generator
 * SEO Best Practice - helps search engines discover and index pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
    const posts = getAllPosts(['slug', 'date']);
    const blogPosts = posts.map((post) => ({
        url: `https://fachr.in/blog/${post.slug}`,
        lastModified: new Date(post.date),
        changeFrequency: 'monthly' as const,
        priority: 0.7,
    }));

    return [
        {
            url: 'https://fachr.in',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 1,
        },
        {
            url: 'https://fachr.in/blog',
            lastModified: new Date(),
            changeFrequency: 'weekly',
            priority: 0.8,
        },
        {
            url: 'https://fachr.in/now',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        {
            url: 'https://fachr.in/appearances',
            lastModified: new Date(),
            changeFrequency: 'monthly',
            priority: 0.8,
        },
        ...blogPosts,
    ];
}
