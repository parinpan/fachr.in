import { render, screen, fireEvent } from '@testing-library/react';
import Navbar from '@/components/Navbar';
import { usePathname } from 'next/navigation';
import { useContent } from '@/hooks/useContent';
import { getNavItemActiveState } from '@/lib/navigation';

// Mock next/navigation
jest.mock('next/navigation', () => ({
  usePathname: jest.fn(),
}));

// Mock hooks
jest.mock('@/hooks/useContent', () => ({
  useContent: jest.fn(),
}));

// Mock navigation lib
jest.mock('@/lib/navigation', () => ({
  NAV_ITEMS: [
    { path: '/', icon: () => <svg data-testid="icon-home" />, name: 'Home' },
    { path: '/about', icon: () => <svg data-testid="icon-info" />, name: 'About' },
  ],
  getNavItemActiveState: jest.fn().mockReturnValue(false),
}));

// Mock next/link
jest.mock('next/link', () => {
  return function MockLink({
    children,
    href,
    className,
  }: {
    children: React.ReactNode;
    href: string;
    className?: string;
  }) {
    return (
      <a href={href} className={className}>
        {children}
      </a>
    );
  };
});

// Mock sub-components
jest.mock(
  '@/components/ThemeToggle',
  () =>
    function MockThemeToggle() {
      return <div data-testid="theme-toggle">ThemeToggle</div>;
    }
);

// Mock icons
jest.mock('lucide-react', () => ({
  Home: () => <svg data-testid="icon-home" />,
  User: () => <svg data-testid="icon-user" />,
  Briefcase: () => <svg data-testid="icon-briefcase" />,
  FileText: () => <svg data-testid="icon-file-text" />,
  Code: () => <svg data-testid="icon-code" />,
  Mail: () => <svg data-testid="icon-mail" />,
  Command: () => <svg data-testid="icon-command" />,
}));

describe('Navbar', () => {
  const mockSiteConfig = {
    commandMenu: {
      navigation: [
        { path: '/', name: 'Home' },
        { path: '/about', name: 'About' },
      ],
    },
    ui: {
      commandMenu: {
        open: 'Open Command Menu',
      },
    },
  };

  beforeEach(() => {
    (usePathname as jest.Mock).mockReturnValue('/');
    (useContent as jest.Mock).mockReturnValue(mockSiteConfig);
  });

  it('renders navigation items', () => {
    render(<Navbar />);

    expect(screen.getByText('Home')).toBeInTheDocument();
    expect(screen.getByText('About')).toBeInTheDocument();
  });

  it('renders toggles', () => {
    render(<Navbar />);

    expect(screen.getByTestId('theme-toggle')).toBeInTheDocument();
  });

  it('opens command menu on button click', () => {
    render(<Navbar />);

    const dispatchEventSpy = jest.spyOn(document, 'dispatchEvent');
    const commandButton = screen.getByLabelText('Open Command Menu');

    fireEvent.click(commandButton);

    expect(dispatchEventSpy).toHaveBeenCalledWith(expect.any(KeyboardEvent));
    const event = dispatchEventSpy.mock.calls[0][0] as KeyboardEvent;
    expect(event.key).toBe('k');
    expect(event.metaKey).toBe(true);
  });

  it('highlights active link', () => {
    (usePathname as jest.Mock).mockReturnValue('/');
    (getNavItemActiveState as jest.Mock).mockReturnValue(true);
    render(<Navbar />);

    const homeLink = screen.getByText('Home').closest('a');
    expect(homeLink).toHaveClass('bg-[var(--color-nav-active)]');
  });
});
