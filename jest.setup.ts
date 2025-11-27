import '@testing-library/jest-dom';

// Mock ResizeObserver
global.ResizeObserver = class ResizeObserver {
  observe() {}
  unobserve() {}
  disconnect() {}
};

// Mock matchMedia
Object.defineProperty(window, 'matchMedia', {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(),
    removeListener: jest.fn(),
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

// Mock scrollIntoView
Element.prototype.scrollIntoView = jest.fn();

// Polyfill Response and Headers for Node.js environment (used by Next.js route handlers)
if (typeof Response === 'undefined') {
  class MockHeaders {
    private headers: Map<string, string> = new Map();

    constructor(init?: Record<string, string>) {
      if (init) {
        Object.entries(init).forEach(([key, value]) => {
          this.headers.set(key.toLowerCase(), value);
        });
      }
    }

    get(name: string): string | null {
      return this.headers.get(name.toLowerCase()) || null;
    }

    set(name: string, value: string): void {
      this.headers.set(name.toLowerCase(), value);
    }
  }

  class MockResponse {
    private _body: string;
    private _headers: MockHeaders;
    private _status: number;

    constructor(
      body?: string | null,
      init?: { headers?: Record<string, string>; status?: number }
    ) {
      this._body = body || '';
      this._headers = new MockHeaders(init?.headers);
      this._status = init?.status || 200;
    }

    get headers() {
      return this._headers;
    }

    get status() {
      return this._status;
    }

    async text(): Promise<string> {
      return this._body;
    }

    async json(): Promise<unknown> {
      return JSON.parse(this._body);
    }
  }

  (global as { Response?: typeof MockResponse }).Response =
    MockResponse as unknown as typeof Response;
}
