import { getAllPosts } from '@/lib/mdx';
import { Metadata } from 'next';
import { siteConfig } from '@/data/content';
import BlogContent from '@/components/BlogContent';

export const metadata: Metadata = {
  title: `${siteConfig.blog.title} | ${siteConfig.personal.name}`,
  description: siteConfig.blog.description,
  alternates: {
    canonical: 'https://fachr.in/blog',
  },
  openGraph: {
    type: 'website',
    url: 'https://fachr.in/blog',
    title: `${siteConfig.blog.title} | ${siteConfig.personal.name}`,
    description: siteConfig.blog.description,
    images: [
      {
        url: siteConfig.seo.ogImage,
        width: 1200,
        height: 630,
        alt: `${siteConfig.personal.name}'s Journal`,
      },
    ],
  },
  twitter: {
    card: 'summary_large_image',
    site: siteConfig.seo.twitterHandle,
    creator: siteConfig.seo.twitterHandle,
    title: `${siteConfig.blog.title} | ${siteConfig.personal.name}`,
    description: siteConfig.blog.description,
    images: [siteConfig.seo.ogImage],
  },
};

export default function BlogIndex() {
  const posts = getAllPosts(['slug', 'title', 'date', 'description', 'readingTime', 'tags']);

  // CollectionPage + Blog structured data
  const blogJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Blog',
    '@id': 'https://fachr.in/blog#blog',
    url: 'https://fachr.in/blog',
    name: `${siteConfig.personal.name}'s Journal`,
    description: siteConfig.blog.description,
    inLanguage: 'en-US',
    author: {
      '@type': 'Person',
      name: siteConfig.personal.name,
      url: 'https://fachr.in',
    },
    breadcrumb: {
      '@type': 'BreadcrumbList',
      itemListElement: [
        { '@type': 'ListItem', position: 1, name: 'Home', item: 'https://fachr.in' },
        { '@type': 'ListItem', position: 2, name: 'Blog', item: 'https://fachr.in/blog' },
      ],
    },
    ...(posts.length > 0 && {
      blogPost: posts.map((post) => ({
        '@type': 'BlogPosting',
        headline: post.title,
        description: post.description,
        url: `https://fachr.in/blog/${post.slug}`,
        datePublished: post.date ? new Date(post.date).toISOString() : undefined,
        author: {
          '@type': 'Person',
          name: siteConfig.personal.name,
          url: 'https://fachr.in',
        },
      })),
    }),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(blogJsonLd) }}
      />
      <BlogContent posts={posts} />
    </>
  );
}
