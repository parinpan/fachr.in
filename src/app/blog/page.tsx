import { getAllPosts } from '@/lib/mdx';
import { Metadata } from 'next';
import { siteConfig } from '@/data/content';
import BlogContent from '@/components/BlogContent';

export const metadata: Metadata = {
    title: `${siteConfig.blog.title} | ${siteConfig.personal.name}`,
    description: siteConfig.blog.description,
};

export default function BlogIndex() {
    const posts = getAllPosts(['slug', 'title', 'date', 'description', 'readingTime', 'tags']);

    return <BlogContent posts={posts} />;
}
