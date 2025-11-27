import { getAllPosts } from '@/lib/mdx';
import { siteConfig } from '@/data/content';

/**
 * Escape special XML characters to prevent XML injection
 */
function escapeXml(unsafe: string): string {
    return unsafe
        .replace(/&/g, '&amp;')
        .replace(/</g, '&lt;')
        .replace(/>/g, '&gt;')
        .replace(/"/g, '&quot;')
        .replace(/'/g, '&apos;');
}

/**
 * Enhanced Sitemap Generator
 * SEO Best Practice - helps search engines discover and index pages
 * Includes language alternates for multilingual content (EN/ID)
 * Uses industry-standard URL-based locale routing (/id/ prefix for Indonesian)
 * Includes XSL stylesheet for proper browser XML rendering
 */
export async function GET() {
    const posts = getAllPosts(['slug', 'date']);
    const siteUrl = escapeXml(siteConfig.seo.url);

    // Generate blog post URLs with hreflang alternates for both languages
    const blogPostsXml = posts.flatMap((post) => {
        const enPostUrl = escapeXml(`${siteConfig.seo.url}/blog/${post.slug}`);
        const idPostUrl = escapeXml(`${siteConfig.seo.url}/id/blog/${post.slug}`);
        const lastMod = new Date(post.date).toISOString();
        
        // English version
        const enEntry = `
    <url>
        <loc>${enPostUrl}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
        <xhtml:link rel="alternate" hreflang="en" href="${enPostUrl}" />
        <xhtml:link rel="alternate" hreflang="id" href="${idPostUrl}" />
        <xhtml:link rel="alternate" hreflang="x-default" href="${enPostUrl}" />
    </url>`;
        
        // Indonesian version
        const idEntry = `
    <url>
        <loc>${idPostUrl}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
        <xhtml:link rel="alternate" hreflang="en" href="${enPostUrl}" />
        <xhtml:link rel="alternate" hreflang="id" href="${idPostUrl}" />
        <xhtml:link rel="alternate" hreflang="x-default" href="${enPostUrl}" />
    </url>`;
        
        return [enEntry, idEntry];
    }).join('');

    // Static pages with both English and Indonesian versions
    const staticPages = [
        { path: '', changefreq: 'monthly', priority: '1.0' },
        { path: '/blog', changefreq: 'weekly', priority: '0.8' },
        { path: '/now', changefreq: 'monthly', priority: '0.8' },
        { path: '/appearances', changefreq: 'monthly', priority: '0.8' },
    ];

    const staticPagesXml = staticPages.flatMap((page) => {
        const enUrl = `${siteUrl}${page.path}`;
        const idUrl = `${siteUrl}/id${page.path}`;
        const lastMod = new Date().toISOString();
        
        // English version
        const enEntry = `
    <url>
        <loc>${enUrl}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
        <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
        <xhtml:link rel="alternate" hreflang="id" href="${idUrl}" />
        <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
    </url>`;
        
        // Indonesian version
        const idEntry = `
    <url>
        <loc>${idUrl}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
        <xhtml:link rel="alternate" hreflang="en" href="${enUrl}" />
        <xhtml:link rel="alternate" hreflang="id" href="${idUrl}" />
        <xhtml:link rel="alternate" hreflang="x-default" href="${enUrl}" />
    </url>`;
        
        return [enEntry, idEntry];
    }).join('');

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
