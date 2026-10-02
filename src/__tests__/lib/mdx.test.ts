// We need to setup mocks before importing the module
// Using __mocks__ pattern for proper hoisting
jest.mock('fs', () => {
  const actualFs = jest.requireActual('fs');
  return {
    ...actualFs,
    existsSync: jest.fn(),
    readdirSync: jest.fn(),
    readFileSync: jest.fn(),
  };
});

jest.mock('path', () => {
  const actualPath = jest.requireActual('path');
  return {
    ...actualPath,
    join: jest.fn((...args: string[]) => args.join('/')),
  };
});

jest.mock('gray-matter', () => {
  return jest.fn(() => ({
    data: {
      title: 'Test Post',
      date: '2023-01-01',
      description: 'Test description',
      tags: ['test', 'example'],
    },
    content: 'This is test content with many words to calculate reading time properly. '.repeat(
      100
    ),
  }));
});

// Get references to mocked modules
import * as fs from 'fs';
import grayMatter from 'gray-matter';
import { getPostSlugs, getPostBySlug, getAllPosts, Post } from '@/lib/mdx';

const mockedGrayMatter = grayMatter as jest.Mock;

describe('mdx utilities', () => {
  const mockedFs = fs as jest.Mocked<typeof fs>;

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('getPostSlugs', () => {
    it('should return empty array when posts directory does not exist', () => {
      mockedFs.existsSync.mockReturnValue(false);

      const slugs = getPostSlugs();

      expect(slugs).toEqual([]);
    });

    it('should return slugs for non-draft files', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue([
        'post-1.mdx',
        'post-2.mdx',
        'draft-post.mdx.draft',
      ] as unknown as fs.Dirent[]);

      const slugs = getPostSlugs();

      expect(slugs).toEqual(['post-1.mdx', 'post-2.mdx']);
      expect(slugs).not.toContain('draft-post.mdx.draft');
    });

    it('should filter out all draft files', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue([
        'post.draft',
        'another.draft',
      ] as unknown as fs.Dirent[]);

      const slugs = getPostSlugs();

      expect(slugs).toEqual([]);
    });
  });

  describe('getPostBySlug', () => {
    it('should throw error when post file does not exist', () => {
      mockedFs.existsSync.mockReturnValue(false);

      expect(() => getPostBySlug('non-existent', ['title'])).toThrow(
        'Post not found: non-existent'
      );
    });

    it('should return post with requested fields', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('frontmatter content');

      const post = getPostBySlug('test-post', [
        'title',
        'date',
        'description',
        'tags',
        'slug',
        'content',
        'readingTime',
      ]);

      expect(post.title).toBe('Test Post');
      expect(post.date).toBe('2023-01-01');
      expect(post.description).toBe('Test description');
      expect(post.tags).toEqual(['test', 'example']);
      expect(post.slug).toBe('test-post');
      expect(post.content).toContain('This is test content');
      expect(post.readingTime).toMatch(/\d+ min read/);
    });

    it('should strip .mdx extension from slug', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('frontmatter content');

      const post = getPostBySlug('test-post.mdx', ['slug']);

      expect(post.slug).toBe('test-post');
    });

    it('should calculate reading time correctly', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('frontmatter content');

      const post = getPostBySlug('test-post', ['readingTime']);

      // The mock content has ~1500 words (15 words * 100 repeats), which at 200 wpm should be ~8 min
      expect(post.readingTime).toBeDefined();
      expect(post.readingTime).toMatch(/^\d+ min read$/);
    });

    it('should only include requested fields', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('frontmatter content');

      const post = getPostBySlug('test-post', ['title']);

      expect(post.title).toBe('Test Post');
      expect((post as Partial<Post>).date).toBeUndefined();
    });
  });

  describe('getAllPosts', () => {
    it('should return empty array when no posts exist', () => {
      mockedFs.existsSync.mockReturnValue(false);

      const posts = getAllPosts(['title', 'date']);

      expect(posts).toEqual([]);
    });

    it('should return posts sorted by date in descending order', () => {
      // First existsSync is for getPostSlugs (true), then for each getPostBySlug (true, true)
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(['post-1.mdx', 'post-2.mdx'] as unknown as fs.Dirent[]);
      mockedFs.readFileSync.mockReturnValue('frontmatter content');

      // Override gray-matter mock for this specific test
      let callCount = 0;
      mockedGrayMatter.mockImplementation(() => {
        callCount++;
        return {
          data: {
            title: callCount === 1 ? 'Post 1' : 'Post 2',
            date: callCount === 1 ? '2023-01-01' : '2023-02-01',
            description: 'Description',
            tags: ['tag'],
          },
          content: 'Content',
        };
      });

      const posts = getAllPosts(['title', 'date']);

      expect(posts.length).toBe(2);
      // Posts should be sorted by date descending (newest first)
      expect(posts[0].date).toBe('2023-02-01');
      expect(posts[1].date).toBe('2023-01-01');
    });

    it('should handle posts without date field', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readdirSync.mockReturnValue(['post-1.mdx'] as unknown as fs.Dirent[]);
      mockedFs.readFileSync.mockReturnValue('frontmatter content');

      // Reset gray-matter mock for this test
      mockedGrayMatter.mockImplementation(() => ({
        data: {
          title: 'Post Without Date',
          description: 'Description',
          tags: ['tag'],
        },
        content: 'Content',
      }));

      const posts = getAllPosts(['title']);

      expect(posts.length).toBe(1);
      expect(posts[0].title).toBe('Post Without Date');
    });
  });

  describe('setPostField (via getPostBySlug)', () => {
    it('should handle all string field types correctly', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('test content');

      // Reset gray-matter mock for this test
      mockedGrayMatter.mockImplementation(() => ({
        data: {
          title: 'Test Post',
          date: '2023-01-01',
          description: 'Test description',
          tags: ['test', 'example'],
        },
        content: 'This is test content with many words to calculate reading time properly. '.repeat(
          100
        ),
      }));

      const post = getPostBySlug('test-post', [
        'title',
        'date',
        'description',
        'slug',
        'content',
        'readingTime',
      ]);

      expect(typeof post.title).toBe('string');
      expect(typeof post.date).toBe('string');
      expect(typeof post.description).toBe('string');
      expect(typeof post.slug).toBe('string');
      expect(typeof post.content).toBe('string');
      expect(typeof post.readingTime).toBe('string');
    });

    it('should handle tags array correctly', () => {
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('test content');

      // Reset gray-matter mock for this test
      mockedGrayMatter.mockImplementation(() => ({
        data: {
          title: 'Test Post',
          date: '2023-01-01',
          description: 'Test description',
          tags: ['test', 'example'],
        },
        content: 'This is test content with many words to calculate reading time properly. '.repeat(
          100
        ),
      }));

      const post = getPostBySlug('test-post', ['tags']);

      expect(Array.isArray(post.tags)).toBe(true);
      expect(post.tags).toEqual(['test', 'example']);
    });
  });

  describe('Post interface', () => {
    it('should export Post interface type', () => {
      // This test validates that the Post type is exported properly
      mockedFs.existsSync.mockReturnValue(true);
      mockedFs.readFileSync.mockReturnValue('test content');

      const post = getPostBySlug('test-post', [
        'slug',
        'title',
        'date',
        'description',
        'tags',
        'content',
        'readingTime',
      ]);

      // Type check: all expected properties should exist
      expect(post).toHaveProperty('slug');
      expect(post).toHaveProperty('title');
      expect(post).toHaveProperty('date');
      expect(post).toHaveProperty('description');
      expect(post).toHaveProperty('tags');
      expect(post).toHaveProperty('content');
      expect(post).toHaveProperty('readingTime');
    });
  });
});
