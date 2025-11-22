import { getAllPosts } from '@/lib/mdx';
import { siteConfig } from '@/data/content';

export async function GET() {
  const posts = getAllPosts(['slug', 'title', 'description', 'date', 'tags']);
  const siteUrl = siteConfig.seo.url;

  const rss = `<?xml version="1.0" encoding="UTF-8" ?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title><![CDATA[${siteConfig.seo.title}]]></title>
    <link>${siteUrl}</link>
    <description><![CDATA[${siteConfig.seo.description}]]></description>
    <language>en</language>
    <lastBuildDate>${new Date().toUTCString()}</lastBuildDate>
    <atom:link href="${siteUrl}/feed.xml" rel="self" type="application/rss+xml" />
    ${posts
      .map((post) => {
        return `
      <item>
        <title><![CDATA[${post.title}]]></title>
        <link>${siteUrl}/blog/${post.slug}</link>
        <guid isPermaLink="true">${siteUrl}/blog/${post.slug}</guid>
        <pubDate>${new Date(post.date).toUTCString()}</pubDate>
        <description><![CDATA[${post.description}]]></description>
        ${post.tags ? post.tags.map((tag: string) => `<category>${tag}</category>`).join('') : ''}
      </item>`;
      })
      .join('')}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
