import { render, screen } from '@testing-library/react';
import PageWrapper from '@/components/PageWrapper';

// Mock the Navbar component
jest.mock(
  '@/components/Navbar',
  () =>
    function MockNavbar() {
      return <nav data-testid="navbar">Navbar</nav>;
    }
);

// Mock the siteConfig
jest.mock('@/data/content', () => ({
  siteConfig: {
    footer: {
      copyrightText: '© 2024 Test Footer',
    },
  },
}));

describe('PageWrapper', () => {
  it('renders children correctly', () => {
    render(
      <PageWrapper>
        <div data-testid="child-content">Test Content</div>
      </PageWrapper>
    );

    expect(screen.getByTestId('child-content')).toBeInTheDocument();
    expect(screen.getByText('Test Content')).toBeInTheDocument();
  });

  it('renders the Navbar component', () => {
    render(
      <PageWrapper>
        <div>Content</div>
      </PageWrapper>
    );

    expect(screen.getByTestId('navbar')).toBeInTheDocument();
  });

  it('renders the footer with copyright text', () => {
    render(
      <PageWrapper>
        <div>Content</div>
      </PageWrapper>
    );

    const footer = screen.getByRole('contentinfo');
    expect(footer).toBeInTheDocument();
    expect(screen.getByText('© 2024 Test Footer')).toBeInTheDocument();
  });

  it('has correct main element attributes', () => {
    render(
      <PageWrapper>
        <div>Content</div>
      </PageWrapper>
    );

    const main = screen.getByRole('main');
    expect(main).toHaveAttribute('id', 'main-content');
  });

  it('has proper styling classes on main element', () => {
    render(
      <PageWrapper>
        <div>Content</div>
      </PageWrapper>
    );

    const main = screen.getByRole('main');
    expect(main).toHaveClass('min-h-screen');
    expect(main).toHaveClass('flex');
    expect(main).toHaveClass('flex-col');
  });

  it('applies animation classes to children wrapper', () => {
    const { container } = render(
      <PageWrapper>
        <div>Content</div>
      </PageWrapper>
    );

    const animatedDiv = container.querySelector('.animate-in');
    expect(animatedDiv).toBeInTheDocument();
    expect(animatedDiv).toHaveClass('fade-in');
  });
});
