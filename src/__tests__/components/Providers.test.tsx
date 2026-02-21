import { render } from '@testing-library/react';
import Providers from '@/components/Providers';

// Mock next-themes
jest.mock('next-themes', () => ({
  ThemeProvider: ({ children }: { children: React.ReactNode }) => (
    <div data-testid="theme-provider">{children}</div>
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
});
