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

/**
 * Set a field on the post object from frontmatter data
 * Uses proper field-specific assignment to maintain type safety
 */
function setPostField(items: Partial<Post>, field: keyof Post, value: unknown): void {
    switch (field) {
        case 'title':
        case 'date':
        case 'description':
        case 'content':
        case 'slug':
        case 'readingTime':
            if (typeof value === 'string') {
                items[field] = value;
            }
            break;
        case 'tags':
            if (Array.isArray(value) && value.every(v => typeof v === 'string')) {
                items.tags = value;
            }
            break;
    }
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
        } else if (field === 'content') {
            items.content = content;
        } else if (typeof data[field] !== 'undefined') {
            setPostField(items, field, data[field]);
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
            // Type system guarantees date exists when included in fields
            const p1 = post1 as { date?: string };
            const p2 = post2 as { date?: string };
            return (p1.date ?? '') > (p2.date ?? '') ? -1 : 1;
        });
    return posts;
}
