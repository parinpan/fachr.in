import { getAllPosts } from '@/lib/mdx';
import { siteConfig } from '@/data/content';
import type { AppearanceItem } from '@/data/types';

interface FeedItem {
  title: string;
  url: string;
  date: Date;
  description: string;
  tags: string[];
  type: 'post' | 'appearance';
}

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
      const postItems: FeedItem[] = posts.map((post) => ({
        title: post.title as string,
        url: `${siteUrl}/blog/${post.slug}`,
        date: new Date(post.date as string),
        description: post.description as string,
        tags: post.tags as string[],
        type: 'post' as const
      }));

      const appearanceItems: FeedItem[] = siteConfig.appearances.items.map((appearance: AppearanceItem) => ({
        title: `${appearance.title} (${appearance.type})`,
        url: appearance.url,
        date: new Date(appearance.date),
        description: appearance.description,
        tags: [appearance.platform, appearance.type],
        type: 'appearance' as const
      }));

      const allItems = [...postItems, ...appearanceItems].sort((a, b) => b.date.getTime() - a.date.getTime());

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
