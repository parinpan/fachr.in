/**
 * BlogContent Props
 */
export interface BlogContentProps {
  posts: {
    slug: string;
    title: string;
    date: string;
    description: string;
    readingTime: string;
    tags: string[];
  }[];
}

/**
 * Repository Interface (GitHub)
 */
export interface Repository {
  id: number;
  name: string;
  description: string;
  html_url: string;
  stargazers_count: number;
  forks_count: number;
  fork: boolean;
  language: string | null;
}
