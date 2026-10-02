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
 * Sitemap Generator
 * SEO Best Practice - helps search engines discover and index pages
 * Includes XSL stylesheet for proper browser XML rendering
 */
export async function GET() {
  const posts = getAllPosts(['slug', 'date']);
  const siteUrl = escapeXml(siteConfig.seo.url);

  const blogPostsXml = posts
    .map((post) => {
      const postUrl = escapeXml(`${siteConfig.seo.url}/blog/${post.slug}`);
      const lastMod = new Date(post.date).toISOString();
      return `
    <url>
        <loc>${postUrl}</loc>
        <lastmod>${lastMod}</lastmod>
        <changefreq>monthly</changefreq>
        <priority>0.7</priority>
    </url>`;
    })
    .join('');

  const staticPages = [
    { path: '', changefreq: 'monthly', priority: '1.0', lastmod: '2026-02-22' },
    { path: '/blog', changefreq: 'weekly', priority: '0.8', lastmod: '2026-02-22' },
    { path: '/now', changefreq: 'monthly', priority: '0.8', lastmod: '2026-02-21' },
    { path: '/appearances', changefreq: 'monthly', priority: '0.8', lastmod: '2026-02-22' },
  ];

  const staticPagesXml = staticPages
    .map((page) => {
      const url = `${siteUrl}${page.path}`;
      return `
    <url>
        <loc>${url}</loc>
        <lastmod>${page.lastmod}</lastmod>
        <changefreq>${page.changefreq}</changefreq>
        <priority>${page.priority}</priority>
    </url>`;
    })
    .join('');

  const sitemap = `<?xml version="1.0" encoding="UTF-8"?>
<?xml-stylesheet type="text/xsl" href="/sitemap.xsl"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
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
