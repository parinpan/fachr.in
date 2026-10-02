'use client';

import useSWR from 'swr';
import { Star, GitFork, ExternalLink } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { GITHUB_CONFIG } from '@/lib/constants';
import { Repository } from '@/types/components';
import IconWithText from '@/components/ui/IconWithText';

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GithubRepos() {
  const siteConfig = useContent();
  const { data } = useSWR<Repository[]>(
    `${GITHUB_CONFIG.API_URL}/users/${GITHUB_CONFIG.USERNAME}/repos?per_page=${GITHUB_CONFIG.PER_PAGE}&sort=stars&direction=desc`,
    fetcher
  );

  const repos = Array.isArray(data)
    ? data
        .filter((repo) => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, GITHUB_CONFIG.REPOS_LIMIT)
    : [];

  if (repos.length === 0) return null;

  return (
    <section className="mb-12" aria-labelledby="github-repos-heading">
      <h3
        id="github-repos-heading"
        className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]"
      >
        {siteConfig.ui.githubRepos}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {repos.map((repo: Repository) => (
          <a
            key={repo.id}
            href={repo.html_url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={siteConfig.ui.githubActions.viewRepoOnGithub.replace('{name}', repo.name)}
            className="group h-full"
          >
            <div className="h-full p-6 bg-[var(--color-surface)] border border-[var(--color-border)] rounded-xl shadow-sm hover:shadow-md hover:border-[var(--color-border-hover)] transition-all duration-200 flex flex-col">
              <div className="flex items-start justify-between mb-4">
                <div className="p-2 bg-[var(--color-interactive-bg)] rounded-lg group-hover:bg-[var(--color-interactive-bg-hover)] transition-colors">
                  <ExternalLink
                    size={20}
                    className="text-[var(--color-text-tertiary)] group-hover:text-[var(--color-text-primary)]"
                  />
                </div>
                <div className="flex items-center gap-3 text-[var(--color-text-muted)] text-sm">
                  <IconWithText icon={Star} value={repo.stargazers_count} size={14} />
                  <IconWithText icon={GitFork} value={repo.forks_count} size={14} />
                </div>
              </div>
              <h4 className="font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-text-secondary)] transition-colors">
                {repo.name}
              </h4>
              <p className="text-[var(--color-text-tertiary)] text-sm mb-4 line-clamp-2 flex-grow">
                {repo.description}
              </p>
              <div className="flex items-center gap-4 text-xs text-[var(--color-text-muted)] mt-auto">
                {repo.language && (
                  <span className="flex items-center gap-1">
                    <span className="w-2 h-2 rounded-full bg-yellow-400"></span>
                    {repo.language}
                  </span>
                )}
              </div>
            </div>
          </a>
        ))}
      </div>
      <div className="text-center mt-8">
        <a
          href={`https://github.com/${GITHUB_CONFIG.USERNAME}`}
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 py-2 px-4 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] font-medium transition-colors"
        >
          {siteConfig.ui.githubActions.viewAllRepos}
          <ExternalLink size={16} />
        </a>
      </div>
    </section>
  );
}
