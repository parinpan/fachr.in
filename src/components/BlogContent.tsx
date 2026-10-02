import { siteConfig } from '@/data/content';
import PageWrapper from '@/components/PageWrapper';
import Link from 'next/link';
import { BlogContentProps } from '@/types/components';
import EmptyState from '@/components/ui/EmptyState';
import Badge from '@/components/ui/Badge';
import { formatDate } from '@/lib/formatters';

export default function BlogContent({ posts }: BlogContentProps) {
  const locale = 'en-US';

  return (
    <PageWrapper>
      <div className="max-w-3xl mx-auto">
        <header className="mb-8 pt-8">
          <div className="inline-block px-3 py-1 mb-4 text-xs font-medium tracking-wider text-[var(--color-text-muted)] uppercase bg-[var(--color-interactive-bg)] rounded-full">
            {siteConfig.blog.title}
          </div>
          <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold text-[var(--color-text-primary)] mb-6 tracking-tight">
            {siteConfig.blog.title}
          </h1>
          <p className="text-xl md:text-2xl text-[var(--color-text-muted)] max-w-2xl leading-normal">
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
                  <div className="flex items-center gap-3 text-sm text-[var(--color-text-muted)] mb-2">
                    <time dateTime={post.date}>{formatDate(post.date, locale)}</time>
                    <span>•</span>
                    <span>{post.readingTime}</span>
                  </div>
                  <h2 className="text-2xl font-bold text-[var(--color-text-primary)] mb-3 group-hover:text-[var(--color-text-tertiary)] transition-colors">
                    {post.title}
                  </h2>
                  <p className="text-[var(--color-text-tertiary)] mb-4 leading-normal">
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
