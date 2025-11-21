import Link from 'next/link';
import { getAllPosts } from '@/lib/mdx';
import { Metadata } from 'next';
import { siteConfig } from '@/data/content';
import { ArrowLeft } from 'lucide-react';
import PageWrapper from '@/components/PageWrapper';

export const metadata: Metadata = {
    title: `${siteConfig.blog.title} | ${siteConfig.personal.name}`,
    description: siteConfig.blog.description,
};

export default function BlogIndex() {
    const posts = getAllPosts(['slug', 'title', 'date', 'description', 'readingTime', 'tags']);

    return (
        <PageWrapper>
            <div className="max-w-3xl mx-auto">
                <header className="mb-8 pt-8">
                    <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-gray-500 uppercase bg-gray-100 rounded-full">
                        Journal
                    </div>
                    <h1 className="text-5xl md:text-6xl font-bold text-gray-900 mb-6 tracking-tight">{siteConfig.blog.title}</h1>
                    <p className="text-xl md:text-2xl text-gray-500 max-w-2xl leading-normal">
                        {siteConfig.blog.description}
                    </p>
                </header>

                <div className="space-y-12">
                    {posts.length === 0 ? (
                        <div className="flex flex-col items-center justify-center min-h-[400px] text-center bg-gray-50 rounded-2xl border border-gray-100 p-12">
                            <div className="inline-flex items-center justify-center w-20 h-20 mb-6 bg-white rounded-full shadow-sm border border-gray-100">
                                <span className="text-3xl">✍️</span>
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 mb-3">Writing in progress</h3>
                            <p className="text-gray-500 max-w-md mx-auto text-lg leading-relaxed">
                                I'm currently crafting some thoughts on engineering, systems, and life.
                                Check back soon!
                            </p>
                        </div>
                    ) : (
                        posts.map((post) => (
                            <article key={post.slug} className="group">
                                <Link href={`/blog/${post.slug}`} className="block">
                                    <div className="flex items-center gap-3 text-sm text-gray-500 mb-2">
                                        <time dateTime={post.date}>
                                            {new Date(post.date).toLocaleDateString('en-US', {
                                                year: 'numeric',
                                                month: 'long',
                                                day: 'numeric',
                                            })}
                                        </time>
                                        <span>•</span>
                                        <span>{post.readingTime}</span>
                                    </div>
                                    <h2 className="text-2xl font-bold text-gray-900 mb-3 group-hover:text-gray-600 transition-colors">
                                        {post.title}
                                    </h2>
                                    <p className="text-gray-600 mb-4 leading-normal">
                                        {post.description}
                                    </p>
                                    <div className="flex flex-wrap gap-2">
                                        {post.tags.map((tag: string) => (
                                            <span key={tag} className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded-md">
                                                #{tag}
                                            </span>
                                        ))}
                                    </div>
                                </Link>
                            </article>
                        ))
                    )}
                </div>
            </div>
        </PageWrapper>
    );
}
