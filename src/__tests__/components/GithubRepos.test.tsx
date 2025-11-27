import { render, screen } from '@testing-library/react';
import GithubRepos from '@/components/GithubRepos';
import { useContent } from '@/hooks/useContent';

// Mock SWR
jest.mock('swr', () => ({
    __esModule: true,
    default: jest.fn(),
}));

import useSWR from 'swr';

// Mock hooks
jest.mock('@/hooks/useContent', () => ({
    useContent: jest.fn(),
}));

// Mock icons
jest.mock('lucide-react', () => ({
    Star: function MockStar() { return <svg data-testid="icon-star" />; },
    GitFork: function MockGitFork() { return <svg data-testid="icon-git-fork" />; },
    ExternalLink: function MockExternalLink() { return <svg data-testid="icon-external-link" />; },
}));

// Mock IconWithText component
jest.mock('@/components/ui/IconWithText', () => {
    return function MockIconWithText({ value }: { value: number }) {
        return <span data-testid="icon-with-text">{value}</span>;
    };
});

describe('GithubRepos', () => {
    const mockSiteConfig = {
        ui: {
            githubRepos: 'GitHub Repositories',
            githubActions: {
                viewAllRepos: 'View all repositories',
                viewRepoOnGithub: 'View {name} on GitHub',
            },
        },
    };

    const mockRepos = [
        {
            id: 1,
            name: 'awesome-project',
            description: 'An awesome project',
            html_url: 'https://github.com/user/awesome-project',
            stargazers_count: 100,
            forks_count: 25,
            fork: false,
            language: 'TypeScript',
        },
        {
            id: 2,
            name: 'another-project',
            description: 'Another cool project',
            html_url: 'https://github.com/user/another-project',
            stargazers_count: 50,
            forks_count: 10,
            fork: false,
            language: 'Go',
        },
    ];

    beforeEach(() => {
        (useContent as jest.Mock).mockReturnValue(mockSiteConfig);
        (useSWR as jest.Mock).mockReturnValue({ data: mockRepos });
    });

    it('renders github repos section with title', () => {
        render(<GithubRepos />);

        expect(screen.getByText('GitHub Repositories')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'GitHub Repositories' })).toBeInTheDocument();
    });

    it('renders repository cards', () => {
        render(<GithubRepos />);

        expect(screen.getByText('awesome-project')).toBeInTheDocument();
        expect(screen.getByText('An awesome project')).toBeInTheDocument();
        expect(screen.getByText('another-project')).toBeInTheDocument();
        expect(screen.getByText('Another cool project')).toBeInTheDocument();
    });

    it('renders repository languages', () => {
        render(<GithubRepos />);

        expect(screen.getByText('TypeScript')).toBeInTheDocument();
        expect(screen.getByText('Go')).toBeInTheDocument();
    });

    it('renders star and fork counts', () => {
        render(<GithubRepos />);

        const iconTexts = screen.getAllByTestId('icon-with-text');
        expect(iconTexts).toHaveLength(4); // 2 repos * 2 counts each
    });

    it('renders view all repositories link', () => {
        render(<GithubRepos />);

        const viewAllLink = screen.getByText('View all repositories');
        expect(viewAllLink).toBeInTheDocument();
        expect(viewAllLink.closest('a')).toHaveAttribute('href', 'https://github.com/parinpan');
    });

    it('has correct link attributes for repo cards', () => {
        render(<GithubRepos />);

        const repoLinks = screen.getAllByRole('link', { name: /View .* on GitHub/ });
        repoLinks.forEach((link) => {
            expect(link).toHaveAttribute('target', '_blank');
            expect(link).toHaveAttribute('rel', 'noopener noreferrer');
        });
    });

    it('filters out forked repositories', () => {
        const reposWithFork = [
            ...mockRepos,
            {
                id: 3,
                name: 'forked-repo',
                description: 'A forked repo',
                html_url: 'https://github.com/user/forked-repo',
                stargazers_count: 200,
                forks_count: 50,
                fork: true,
                language: 'Python',
            },
        ];

        (useSWR as jest.Mock).mockReturnValue({ data: reposWithFork });

        render(<GithubRepos />);

        expect(screen.queryByText('forked-repo')).not.toBeInTheDocument();
    });

    it('handles empty data gracefully', () => {
        (useSWR as jest.Mock).mockReturnValue({ data: undefined });

        render(<GithubRepos />);

        // Should still render the section title
        expect(screen.getByText('GitHub Repositories')).toBeInTheDocument();
    });
});
