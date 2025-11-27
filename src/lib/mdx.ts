import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export interface Post {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    content: string;
    readingTime: string;
}

export function getPostSlugs(): string[] {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    return fs.readdirSync(postsDirectory).filter(file => !file.endsWith('.draft'));
}

export function getPostBySlug<T extends (keyof Post)[]>(slug: string, fields: T): Pick<Post, T[number]> {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const items: Partial<Post> = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items.slug = realSlug;
        }
        if (field === 'content') {
            items.content = content;
        }
        if (typeof data[field] !== 'undefined') {
            (items as Record<string, unknown>)[field] = data[field];
        }
    });

    // Calculate reading time (rough estimate)
    if (fields.includes('readingTime')) {
        const words = content.split(/\s+/g).length;
        const minutes = Math.ceil(words / 200);
        items.readingTime = `${minutes} min read`;
    }

    return items as Pick<Post, T[number]>;
}

export function getAllPosts<T extends (keyof Post)[]>(fields: T): Pick<Post, T[number]>[] {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => {
            const date1 = 'date' in post1 ? post1.date as string : '';
            const date2 = 'date' in post2 ? post2.date as string : '';
            return date1 > date2 ? -1 : 1;
        });
    return posts;
}
