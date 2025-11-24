/**
 * Post Interface
 * Type definition for blog posts
 */
export interface Post {
    slug: string;
    title: string;
    date: string;
    description: string;
    readingTime: string;
    tags: string[];
}

/**
 * BlogContent Props
 */
export interface BlogContentProps {
    posts: Post[];
}

/**
 * Navigation Item Interface
 */
export interface NavigationItem {
    name: string;
    path?: string;
    id?: string;
    icon: string;
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

/**
 * Appearance Item Interface
 */
export interface AppearanceItem {
    type: 'video' | 'talk' | 'flyer';
    title: string;
    image: string;
    url: string;
    description: string;
    date: string;
    platform: string;
    duration?: string;
    language?: string;
}
