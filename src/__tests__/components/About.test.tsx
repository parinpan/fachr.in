import { render, screen } from '@testing-library/react';
import About from '@/components/About';
import { useContent } from '@/hooks/useContent';

// Mock hooks
jest.mock('@/hooks/useContent', () => ({
    useContent: jest.fn(),
}));

// Mock icons
jest.mock('lucide-react', () => ({
    Hand: function MockHand() { return <svg data-testid="icon-hand" />; },
    ArrowRight: function MockArrowRight() { return <svg data-testid="icon-arrow-right" />; },
}));

describe('About', () => {
    const mockSiteConfig = {
        about: {
            title: 'About',
            greeting: "Hi, Fachrin's here",
            description: 'A software engineer based in Berlin, Germany.',
            cta: {
                text: "let's get in touch",
                link: '#contact-heading',
            },
        },
    };

    beforeEach(() => {
        (useContent as jest.Mock).mockReturnValue(mockSiteConfig);
    });

    it('renders about section with title', () => {
        render(<About />);

        expect(screen.getByText('About')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'About' })).toBeInTheDocument();
    });

    it('renders greeting and description', () => {
        render(<About />);

        expect(screen.getByText(/Hi, Fachrin's here/)).toBeInTheDocument();
        expect(screen.getByText(/A software engineer based in Berlin/)).toBeInTheDocument();
    });

    it('renders call to action link', () => {
        render(<About />);

        const ctaLink = screen.getByText("let's get in touch");
        expect(ctaLink).toBeInTheDocument();
        expect(ctaLink.closest('a')).toHaveAttribute('href', '#contact-heading');
    });

    it('has proper accessibility structure', () => {
        render(<About />);

        const section = screen.getByRole('region', { name: 'About' });
        expect(section).toBeInTheDocument();
    });
});
