import { siteConfig } from '@/data/content';

/**
 * Robots.txt Route Handler
 * SEO Best Practice - tells search engines which pages to crawl
 */
export async function GET() {
    const siteUrl = siteConfig.seo.url;

    const robotsTxt = `# https://www.robotstxt.org/robotstxt.html
User-agent: *
Allow: /

# Sitemap
Sitemap: ${siteUrl}/sitemap.xml
`;

    return new Response(robotsTxt, {
        headers: {
            'Content-Type': 'text/plain',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        },
    });
}
