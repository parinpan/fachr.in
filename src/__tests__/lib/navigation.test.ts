import { getNavItemActiveState } from '@/lib/navigation';

describe('getNavItemActiveState', () => {
  describe('exact path matching', () => {
    it('returns true when pathname exactly matches item path', () => {
      expect(getNavItemActiveState('/', '/')).toBe(true);
      expect(getNavItemActiveState('/blog', '/blog')).toBe(true);
      expect(getNavItemActiveState('/now', '/now')).toBe(true);
    });

    it('returns false when pathname does not match item path', () => {
      expect(getNavItemActiveState('/blog', '/')).toBe(false);
      expect(getNavItemActiveState('/about', '/blog')).toBe(false);
    });
  });

  describe('prefix matching for non-root paths', () => {
    it('returns true when pathname starts with item path', () => {
      expect(getNavItemActiveState('/blog/some-post', '/blog')).toBe(true);
      expect(getNavItemActiveState('/now/2024', '/now')).toBe(true);
      expect(getNavItemActiveState('/appearances/talks', '/appearances')).toBe(true);
    });

    it('does not match root path with prefixes', () => {
      // Root path "/" should NOT match "/blog" etc as a prefix
      expect(getNavItemActiveState('/blog', '/')).toBe(false);
      expect(getNavItemActiveState('/now', '/')).toBe(false);
    });
  });

  describe('edge cases', () => {
    it('handles empty paths by normalizing to root', () => {
      expect(getNavItemActiveState('', '')).toBe(true);
      // Empty pathname normalizes to '/' which matches '/'
      expect(getNavItemActiveState('', '/')).toBe(true);
    });

    it('handles paths with special characters', () => {
      expect(getNavItemActiveState('/blog/post-with-dashes', '/blog')).toBe(true);
      expect(getNavItemActiveState('/blog/post_with_underscores', '/blog')).toBe(true);
    });
  });
});
