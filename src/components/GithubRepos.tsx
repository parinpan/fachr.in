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

    const repos = data
        ?.filter(repo => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, GITHUB_CONFIG.REPOS_LIMIT) || [];

    return (
        <section className="mb-12" aria-labelledby="github-repos-heading">
            <h3 id="github-repos-heading" className="text-2xl font-bold mb-6 text-gray-900 dark:text-neutral-100">{siteConfig.ui.githubRepos}</h3>
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
                        <div className="h-full p-6 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-neutral-600 transition-all duration-200 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-gray-50 dark:bg-neutral-700 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-neutral-600 transition-colors">
                                    <ExternalLink size={20} className="text-gray-600 dark:text-neutral-300 group-hover:text-gray-900 dark:group-hover:text-neutral-100" />
                                </div>
                                <div className="flex items-center gap-3 text-gray-500 dark:text-neutral-400 text-sm">
                                    <IconWithText icon={Star} value={repo.stargazers_count} size={14} />
                                    <IconWithText icon={GitFork} value={repo.forks_count} size={14} />
                                </div>
                            </div>
                            <h4 className="font-bold text-gray-900 dark:text-neutral-100 mb-2 group-hover:text-gray-900 dark:group-hover:text-neutral-200 transition-colors">
                                {repo.name}
                            </h4>
                            <p className="text-gray-600 dark:text-neutral-400 text-sm mb-4 line-clamp-2 flex-grow">
                                {repo.description}
                            </p>
                            <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-neutral-400 mt-auto">
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
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-200 font-medium transition-colors"
                >
                    {siteConfig.ui.githubActions.viewAllRepos}
                    <ExternalLink size={16} />
                </a>
            </div>
        </section>
    );
}
