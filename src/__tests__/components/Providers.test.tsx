import { render } from '@testing-library/react';
import Providers from '@/components/Providers';

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
  ),
}));

// Mock LanguageProvider
jest.mock('@/context/LanguageContext', () => ({
  LanguageProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="language-provider">{children}</div>
  ),
}));

describe('Providers', () => {
  it('renders children', () => {
    const { getByText } = render(
      <Providers>
        <div>Test Content</div>
      </Providers>
    );

    expect(getByText('Test Content')).toBeInTheDocument();
  });

  it('wraps children with ThemeProvider', () => {
    const { getByTestId } = render(
      <Providers>
        <div>Test</div>
      </Providers>
    );

    expect(getByTestId('theme-provider')).toBeInTheDocument();
  });

  it('wraps children with LanguageProvider', () => {
    const { getByTestId } = render(
      <Providers>
        <div>Test</div>
      </Providers>
    );

    expect(getByTestId('language-provider')).toBeInTheDocument();
  });

  it('properly nests providers', () => {
    const { container } = render(
      <Providers>
        <div>Content</div>
      </Providers>
    );

    const themeProvider = container.querySelector('[data-testid="theme-provider"]');
    const languageProvider = container.querySelector('[data-testid="language-provider"]');

    expect(themeProvider).toBeInTheDocument();
    expect(languageProvider).toBeInTheDocument();
  });
});
