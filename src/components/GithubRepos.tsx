'use client';

import useSWR from 'swr';
import { Star, GitFork, ExternalLink, Loader2 } from 'lucide-react';

interface Repo {
    id: number;
    name: string;
    description: string;
    html_url: string;
    stargazers_count: number;
    forks_count: number;
    fork: boolean;
    language: string | null;
}

const fetcher = (url: string) => fetch(url).then((res) => res.json());

export default function GithubRepos() {
    const { data, error, isLoading } = useSWR<Repo[]>(
        'https://api.github.com/users/parinpan/repos?per_page=100&sort=stars&direction=desc',
        fetcher
    );

    const repos = data
        ?.filter(repo => !repo.fork)
        .sort((a, b) => b.stargazers_count - a.stargazers_count)
        .slice(0, 6) || [];

    return (
        <section className="mb-12" aria-labelledby="github-repos-heading">
            <h3 id="github-repos-heading" className="text-2xl font-bold mb-6 text-gray-900 dark:text-neutral-100">Github Repositories</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {repos.map((repo: Repo) => (
                    <a
                        key={repo.id}
                        href={repo.html_url}
                        target="_blank"
                        rel="noopener noreferrer"
                        aria-label={`View ${repo.name} on GitHub`}
                        className="group h-full"
                    >
                        <div className="h-full p-6 bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 dark:hover:border-neutral-600 transition-all duration-200 flex flex-col">
                            <div className="flex items-start justify-between mb-4">
                                <div className="p-2 bg-gray-50 dark:bg-neutral-700 rounded-lg group-hover:bg-gray-100 dark:group-hover:bg-neutral-600 transition-colors">
                                    <ExternalLink size={20} className="text-gray-600 dark:text-neutral-300 group-hover:text-gray-900 dark:group-hover:text-neutral-100" />
                                </div>
                                <div className="flex items-center gap-3 text-gray-500 dark:text-neutral-400 text-sm">
                                    <span className="flex items-center gap-1">
                                        <Star size={14} />
                                        {repo.stargazers_count}
                                    </span>
                                    <span className="flex items-center gap-1">
                                        <GitFork size={14} />
                                        {repo.forks_count}
                                    </span>
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
                    href="https://github.com/parinpan"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-2 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-200 font-medium transition-colors"
                >
                    View all repositories
                    <ExternalLink size={16} />
                </a>
            </div>
        </section>
    );
}
