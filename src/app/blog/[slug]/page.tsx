import { getPostBySlug, getPostSlugs } from '@/lib/mdx';
import { MDXRemote } from 'next-mdx-remote/rsc';
import Link from 'next/link';
import { ArrowLeft } from 'lucide-react';
import { Metadata } from 'next';
import PageWrapper from '@/components/PageWrapper';

interface Props {
    params: Promise<{
        slug: string;
    }>;
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
    const { slug } = await params;
    const post = getPostBySlug(slug, ['title', 'description']);
    return {
        title: `${post.title} | Fachrin Aulia Nasution`,
        description: post.description,
    };
}

export async function generateStaticParams() {
    const posts = getPostSlugs();
    return posts.map((post) => ({
        slug: post.replace(/\.mdx$/, ''),
    }));
}

export default async function BlogPost({ params }: Props) {
    const { slug } = await params;
    const post = getPostBySlug(slug, ['title', 'date', 'content', 'readingTime', 'tags']);

    return (
        <PageWrapper>
            <article className="max-w-3xl mx-auto">
                <Link
                    href="/blog"
                    className="inline-flex items-center gap-2 text-gray-500 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-200 mb-8 transition-colors"
                >
                    <ArrowLeft size={20} />
                    Back to Journal
                </Link>

                <header className="mb-12">
                    <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-neutral-400 mb-4">
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
                    <h1 className="text-4xl md:text-5xl font-bold text-gray-900 dark:text-neutral-100 mb-6 leading-tight">
                        {post.title}
                    </h1>
                    <div className="flex flex-wrap gap-2">
                        {post.tags.map((tag: string) => (
                            <span key={tag} className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 text-sm font-medium text-gray-600 dark:text-neutral-300 rounded-full">
                                #{tag}
                            </span>
                        ))}
                    </div>
                </header>

                <div className="prose prose-lg prose-gray dark:prose-invert max-w-none prose-headings:font-bold prose-headings:text-gray-900 dark:prose-headings:text-neutral-100 prose-a:text-gray-900 dark:prose-a:text-neutral-200 prose-a:decoration-gray-300 dark:prose-a:decoration-neutral-600 hover:prose-a:decoration-gray-900 dark:hover:prose-a:decoration-neutral-400 prose-code:text-gray-800 dark:prose-code:text-neutral-200 prose-code:bg-gray-100 dark:prose-code:bg-neutral-800 prose-code:px-1 prose-code:py-0.5 prose-code:rounded prose-code:before:content-none prose-code:after:content-none leading-normal prose-headings:mb-3 prose-h1:mb-4 prose-p:text-gray-700 dark:prose-p:text-neutral-300 prose-strong:text-gray-900 dark:prose-strong:text-neutral-100 prose-li:text-gray-700 dark:prose-li:text-neutral-300">
                    <MDXRemote source={post.content} />
                </div>
            </article>
        </PageWrapper>
    );
}
