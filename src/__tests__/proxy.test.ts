// Mock Next.js server modules before importing
jest.mock('next/server', () => {
  return {
    NextResponse: {
      next: () => ({
        status: 200,
        headers: new Map(),
        cookies: {
          get: jest.fn(),
          set: jest.fn(),
        },
      }),
      redirect: (url: URL | string) => ({
        status: 307,
        headers: new Map([['location', url.toString()]]),
        cookies: {
          get: jest.fn(),
          set: jest.fn(),
        },
      }),
    },
    NextRequest: class NextRequest {},
  };
});

import { proxy, locales, defaultLocale } from '@/proxy';

// Type definitions for mocks
interface MockCookie {
  value: string;
  name: string;
}

interface MockURL extends URL {
  clone(): MockURL;
}

interface MockNextRequest {
  nextUrl: MockURL;
  url: string;
  cookies: {
    get: (name: string) => MockCookie | undefined;
    set: jest.Mock;
  };
  headers: {
    get: (name: string) => string | null;
  };
}

// Helper to create mock NextRequest
function createMockRequest(
  pathname: string,
  options: {
    locale?: string;
    acceptLanguage?: string;
  } = {}
): MockNextRequest {
  const url = new URL(pathname, 'http://localhost:3000') as MockURL;

  // Add clone method to URL
  url.clone = function (this: URL): MockURL {
    const cloned = new URL(this.toString()) as MockURL;
    cloned.clone = this.clone;
    return cloned;
  };

  const headers = new Map<string, string>();
  if (options.acceptLanguage) {
    headers.set('accept-language', options.acceptLanguage);
  }

  const cookies = new Map<string, MockCookie>();
  if (options.locale) {
    cookies.set('NEXT_LOCALE', { value: options.locale, name: 'NEXT_LOCALE' });
  }

  const request: MockNextRequest = {
    nextUrl: url,
    url: url.toString(),
    cookies: {
      get: (name: string) => cookies.get(name),
      set: jest.fn(),
    },
    headers: {
      get: (name: string) => headers.get(name) || null,
    },
  };

  return request;
}

describe('Proxy (Middleware)', () => {
  describe('Locale Configuration', () => {
    it('exports correct locales', () => {
      expect(locales).toEqual(['en', 'id']);
    });

    it('sets correct default locale', () => {
      expect(defaultLocale).toBe('en');
    });
  });

  describe('Public Path Handling', () => {
    const publicPaths = [
      '/sitemap.xml',
      '/robots.txt',
      '/feed.xml',
      '/sitemap.xsl',
      '/_next/static/chunk.js',
      '/_next/image',
      '/api/health',
      '/images/logo.png',
      '/favicon.ico',
    ];

    publicPaths.forEach((path) => {
      it('allows ' + path + ' without redirect', () => {
        const request = createMockRequest(path);
        const response = proxy(request);

        expect(response.status).not.toBe(307); // Not a redirect
      });
    });
  });

  describe('Locale Detection from URL', () => {
    it('detects ID locale from pathname', () => {
      const request = createMockRequest('/id/about');
      const response = proxy(request);

      // Should set cookie for ID locale
      expect(response.cookies.set).toHaveBeenCalledWith('NEXT_LOCALE', 'id', expect.any(Object));
    });

    it('does not redirect when locale is in URL', () => {
      const request = createMockRequest('/id/blog');
      const response = proxy(request);

      expect(response.status).not.toBe(307);
    });
  });

  describe('Cookie-based Redirection', () => {
    it('redirects to /id when cookie is set to id and no locale in URL', () => {
      const request = createMockRequest('/about', { locale: 'id' });
      const response = proxy(request);

      expect(response.status).toBe(307); // Redirect
      expect(response.headers.get('location')).toBe('http://localhost:3000/id/about');
    });

    it('does not redirect when cookie is en (default locale)', () => {
      const request = createMockRequest('/about', { locale: 'en' });
      const response = proxy(request);

      expect(response.status).not.toBe(307);
    });
  });

  describe('Accept-Language Header Detection', () => {
    it('redirects to /id for Indonesian accept-language header', () => {
      const request = createMockRequest('/about', {
        acceptLanguage: 'id-ID,id;q=0.9,en-US;q=0.8,en;q=0.7',
      });
      const response = proxy(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toBe('http://localhost:3000/id/about');
    });

    it('does not redirect for English accept-language header', () => {
      const request = createMockRequest('/about', {
        acceptLanguage: 'en-US,en;q=0.9',
      });
      const response = proxy(request);

      expect(response.status).not.toBe(307);
    });

    it('handles quality values correctly', () => {
      const request = createMockRequest('/about', {
        acceptLanguage: 'en-US;q=0.7,id;q=0.9',
      });
      const response = proxy(request);

      // Should redirect to ID because of higher quality value
      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toContain('/id/about');
    });

    it('falls back to default locale for unsupported language', () => {
      const request = createMockRequest('/about', {
        acceptLanguage: 'fr-FR,fr;q=0.9,de;q=0.8',
      });
      const response = proxy(request);

      expect(response.status).not.toBe(307);
    });

    it('handles missing accept-language header', () => {
      const request = createMockRequest('/about');
      const response = proxy(request);

      expect(response.status).not.toBe(307);
    });
  });

  describe('Priority Order', () => {
    it('prioritizes URL locale over cookie', () => {
      const request = createMockRequest('/id/about', { locale: 'en' });
      const response = proxy(request);

      // Should not redirect, and should update cookie to ID
      expect(response.status).not.toBe(307);
      expect(response.cookies.set).toHaveBeenCalledWith('NEXT_LOCALE', 'id', expect.any(Object));
    });

    it('prioritizes cookie over accept-language header', () => {
      const request = createMockRequest('/about', {
        locale: 'en',
        acceptLanguage: 'id-ID,id;q=0.9',
      });
      const response = proxy(request);

      // Should not redirect because cookie is set to EN
      expect(response.status).not.toBe(307);
    });
  });

  describe('Edge Cases', () => {
    it('handles root path correctly', () => {
      const request = createMockRequest('/');
      const response = proxy(request);

      expect(response.status).not.toBe(307);
    });

    it('handles nested paths correctly', () => {
      const request = createMockRequest('/blog/my-post', { locale: 'id' });
      const response = proxy(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toBe('http://localhost:3000/id/blog/my-post');
    });

    it('handles paths with trailing slashes', () => {
      const request = createMockRequest('/about/', { locale: 'id' });
      const response = proxy(request);

      expect(response.status).toBe(307);
      expect(response.headers.get('location')).toBe('http://localhost:3000/id/about/');
    });

    it('does not double-prefix locale', () => {
      const request = createMockRequest('/id/about', { locale: 'id' });
      const response = proxy(request);

      // Should not redirect
      expect(response.status).not.toBe(307);
    });
  });
});
