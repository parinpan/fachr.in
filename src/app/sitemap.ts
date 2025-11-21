import { MetadataRoute } from 'next';

/**
 * Sitemap Generator
 * SEO Best Practice - helps search engines discover and index pages
 */
export default function sitemap(): MetadataRoute.Sitemap {
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
    ];
}
