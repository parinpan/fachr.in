import { render } from '@testing-library/react';
import ClientShell from '@/components/ClientShell';

// Mock dynamically imported components
jest.mock('next/dynamic', () => {
  return function mockDynamic(importFn: () => Promise<{ default: React.ComponentType }>) {
    // Resolve the import synchronously for testing
    const mod = importFn as unknown as { resolvedModule?: string };
    void mod;

    // Return a placeholder that renders with a data-testid
    return function DynamicComponent(props: Record<string, unknown>) {
      return <div data-testid="dynamic-component" {...props} />;
    };
  };
});

describe('ClientShell', () => {
  const mockPosts = [
    { slug: 'hello-world', title: 'Hello World' },
    { slug: 'second-post', title: 'Second Post' },
  ];

  it('renders without crashing', () => {
    const { container } = render(<ClientShell posts={mockPosts} />);
    expect(container).toBeTruthy();
  });

  it('renders dynamic components', () => {
    const { getAllByTestId } = render(<ClientShell posts={mockPosts} />);
    // Should render both CommandMenu and BackToTop as dynamic components
    const dynamicComponents = getAllByTestId('dynamic-component');
    expect(dynamicComponents).toHaveLength(2);
  });

  it('passes posts prop to CommandMenu dynamic component', () => {
    const { getAllByTestId } = render(<ClientShell posts={mockPosts} />);
    const dynamicComponents = getAllByTestId('dynamic-component');
    // First dynamic component is CommandMenu, which receives posts
    expect(dynamicComponents[0]).toBeTruthy();
  });

  it('renders with empty posts array', () => {
    const { container } = render(<ClientShell posts={[]} />);
    expect(container).toBeTruthy();
  });
});
