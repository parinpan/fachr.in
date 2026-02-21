'use client';

import { useContent } from '@/hooks/useContent';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { BlogContentProps } from '@/types/components';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/formatters';

export default function BlogContent({ posts }: BlogContentProps) {
  const siteConfig = useContent();
  const locale = 'en-US';

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 pt-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-gray-500 dark:text-neutral-400 uppercase bg-gray-100 dark:bg-neutral-800 rounded-full">
            {siteConfig.blog.title}
          </div>
          <h1 className="text-5xl md:text-6xl font-bold text-gray-900 dark:text-neutral-100 mb-6 tracking-tight">
            {siteConfig.blog.title}
          </h1>
          <p className="text-xl md:text-2xl text-gray-500 dark:text-neutral-400 max-w-2xl leading-normal">
            {siteConfig.blog.description}
          </p>
        </header>

        <div className="space-y-12">
          {posts.length === 0 ? (
            <EmptyState
              icon={<span className="text-3xl">✍️</span>}
              title={siteConfig.blog.emptyState.title}
              description={siteConfig.blog.emptyState.description}
            />
          ) : (
            posts.map((post) => (
              <article key={post.slug} className="group">
                <Link href={`/blog/${post.slug}`} className="block">
                  <div className="flex items-center gap-3 text-sm text-gray-500 dark:text-neutral-400 mb-2">
                    <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-gray-900 dark:text-neutral-100 mb-3 group-hover:text-gray-600 dark:group-hover:text-neutral-300 transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-gray-600 dark:text-neutral-400 mb-4 leading-normal">
                    {post.description}
                  </p>
                  <div className="flex flex-wrap gap-2">
                    {post.tags.map((tag: string) => (
                      <Badge key={tag} variant="default">
                        #{tag}
                      </Badge>
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
