import { render, screen, fireEvent } from '@testing-library/react';
import Experience from '@/components/Experience';
import { useContent } from '@/hooks/useContent';

// Mock hooks
jest.mock('@/hooks/useContent', () => ({
    useContent: jest.fn(),
}));

// Mock sub-components
jest.mock('@/components/ui/Badge', () => function MockBadge({ children }: { children: React.ReactNode }) { return <span data-testid="badge">{children}</span>; });

// Mock icons
jest.mock('lucide-react', () => ({
    ChevronDown: () => <svg data-testid="icon-chevron-down" />,
    ChevronUp: () => <svg data-testid="icon-chevron-up" />,
    MapPin: () => <svg data-testid="icon-map-pin" />,
    Calendar: () => <svg data-testid="icon-calendar" />,
    Building2: () => <svg data-testid="icon-building" />,
}));

describe('Experience', () => {
    const mockSiteConfig = {
        ui: {
            experience: {
                title: 'Experience',
                expand: 'Expand',
                collapse: 'Collapse',
                technologies: 'Technologies',
                more: 'more',
            },
        },
        experience: [
            {
                role: 'Senior Engineer',
                company: 'Tech Corp',
                location: 'Berlin',
                period: '2020 - Present',
                description: ['Built amazing things', 'Led a team'],
                techStack: ['React', 'TypeScript', 'Node.js', 'Go', 'AWS'],
            },
            {
                role: 'Junior Engineer',
                company: 'Startup Inc',
                location: 'Remote',
                period: '2018 - 2020',
                description: ['Fixed bugs', 'Learned a lot'],
                techStack: ['JavaScript', 'HTML', 'CSS'],
            },
        ],
    };

    beforeEach(() => {
        (useContent as jest.Mock).mockReturnValue(mockSiteConfig);
    });

    it('renders experience items', () => {
        render(<Experience />);

        expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
        expect(screen.getByText('Tech Corp')).toBeInTheDocument();
        expect(screen.getByText('Junior Engineer')).toBeInTheDocument();
    });

    it('expands and collapses items', () => {
        render(<Experience />);

        // First item is expanded by default
        expect(screen.getByText('Built amazing things')).toBeInTheDocument();

        // Click to collapse first item
        const collapseButton = screen.getAllByLabelText('Collapse')[0];
        fireEvent.click(collapseButton);

        expect(screen.queryByText('Led a team')).not.toBeInTheDocument();

        // Click to expand second item - since first is collapsed, both have 'Expand' label
        const expandButtons = screen.getAllByLabelText('Expand');
        fireEvent.click(expandButtons[1]); // Second item

        expect(screen.getByText('Fixed bugs')).toBeInTheDocument();
    });

    it('renders tech stack', () => {
        render(<Experience />);

        expect(screen.getByText('React')).toBeInTheDocument();
        expect(screen.getByText('TypeScript')).toBeInTheDocument();
    });
});
