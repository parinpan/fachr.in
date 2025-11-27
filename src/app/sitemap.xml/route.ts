import { getAllPosts } from '@/lib/mdx';
import { siteConfig } from '@/data/content';

/**
 * Enhanced Sitemap Generator
 * SEO Best Practice - helps search engines discover and index pages
 * Includes language alternates for multilingual content (EN/ID)
 * Includes XSL stylesheet for proper browser XML rendering
 */
export async function GET() {
    const posts = getAllPosts(['slug', 'date']);
    const siteUrl = siteConfig.seo.url;

    // Generate blog post URLs with hreflang alternates
    const blogPostsXml = posts.map((post) => {
        const postUrl = `${siteUrl}/blog/${post.slug}`;
        const lastMod = new Date(post.date).toISOString();
        return `
    <url>
        <loc>${postUrl}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
        <xhtml:link rel="alternate" hreflang="en" href="${postUrl}" />
        <xhtml:link rel="alternate" hreflang="id" href="${postUrl}?lang=id" />
        <xhtml:link rel="alternate" hreflang="x-default" href="${postUrl}" />
    </url>`;
    }).join('');

    // Static pages
    const staticPages = [
        { url: siteUrl, changefreq: 'monthly', priority: '1.0' },
        { url: `${siteUrl}/blog`, changefreq: 'weekly', priority: '0.8' },
        { url: `${siteUrl}/now`, changefreq: 'monthly', priority: '0.8' },
        { url: `${siteUrl}/appearances`, changefreq: 'monthly', priority: '0.8' },
    ];

    const staticPagesXml = staticPages.map((page) => `
    <url>
        <loc>${page.url}</loc>
        <lastmod>${new Date().toISOString()}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
        <xhtml:link rel="alternate" hreflang="en" href="${page.url}" />
        <xhtml:link rel="alternate" hreflang="id" href="${page.url}?lang=id" />
        <xhtml:link rel="alternate" hreflang="x-default" href="${page.url}" />
    </url>`).join('');

    const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
        xmlns:xhtml="http://www.w3.org/1999/xhtml">
${staticPagesXml}
${blogPostsXml}
</urlset>`;

    return new Response(sitemap, {
        headers: {
            'Content-Type': 'application/xml',
            'Cache-Control': 's-maxage=3600, stale-while-revalidate',
        },
    });
}
