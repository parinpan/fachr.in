import fs from 'fs';
import path from 'path';
import matter from 'gray-matter';
import { serialize } from 'next-mdx-remote/serialize';

const postsDirectory = path.join(process.cwd(), 'src/posts');

export type Post = {
    slug: string;
    title: string;
    date: string;
    description: string;
    tags: string[];
    content: string;
    readingTime: string;
};

export function getPostSlugs() {
    if (!fs.existsSync(postsDirectory)) {
        return [];
    }
    return fs.readdirSync(postsDirectory).filter(file => !file.endsWith('.draft'));
}

export function getPostBySlug(slug: string, fields: string[] = []) {
    const realSlug = slug.replace(/\.mdx$/, '');
    const fullPath = path.join(postsDirectory, `${realSlug}.mdx`);

    if (!fs.existsSync(fullPath)) {
        throw new Error(`Post not found: ${slug}`);
    }

    const fileContents = fs.readFileSync(fullPath, 'utf8');
    const { data, content } = matter(fileContents);

    const items: any = {};

    // Ensure only the minimal needed data is exposed
    fields.forEach((field) => {
        if (field === 'slug') {
            items[field] = realSlug;
        }
        if (field === 'content') {
            items[field] = content;
        }
        if (typeof data[field] !== 'undefined') {
            items[field] = data[field];
        }
    });

    // Calculate reading time (rough estimate)
    if (fields.includes('readingTime')) {
        const words = content.split(/\s+/g).length;
        const minutes = Math.ceil(words / 200);
        items['readingTime'] = `${minutes} min read`;
    }

    return items;
}

export function getAllPosts(fields: string[] = []) {
    const slugs = getPostSlugs();
    const posts = slugs
        .map((slug) => getPostBySlug(slug, fields))
        // sort posts by date in descending order
        .sort((post1, post2) => (post1.date > post2.date ? -1 : 1));
    return posts;
}
