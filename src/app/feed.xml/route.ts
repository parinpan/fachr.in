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
    ${(() => {
      const allItems = [
        ...posts.map((post) => ({
          title: post.title,
          url: `${siteUrl}/blog/${post.slug}`,
          date: new Date(post.date),
          description: post.description,
          tags: post.tags,
          type: 'post'
        })),
        ...siteConfig.appearances.map((appearance) => ({
          title: `${appearance.title} (${appearance.type})`,
          url: appearance.url,
          date: new Date(appearance.date), // Assumes "Month Year" format works with new Date()
          description: appearance.description,
          tags: [appearance.platform, appearance.type],
          type: 'appearance'
        }))
      ].sort((a, b) => b.date.getTime() - a.date.getTime());

      return allItems.map((item) => `
      <item>
        <title><![CDATA[${item.title}]]></title>
        <link>${item.url}</link>
        <guid isPermaLink="${item.type === 'post'}">${item.url}</guid>
        <pubDate>${item.date.toUTCString()}</pubDate>
        <description><![CDATA[${item.description}]]></description>
        ${item.tags ? item.tags.map((tag: string) => `<category>${tag}</category>`).join('') : ''}
      </item>`).join('');
    })()}
  </channel>
</rss>`;

  return new Response(rss, {
    headers: {
      'Content-Type': 'application/xml',
      'Cache-Control': 's-maxage=3600, stale-while-revalidate',
    },
  });
}
