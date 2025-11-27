import { render, screen, fireEvent } from '@testing-library/react';
import WorkList from '@/components/WorkList';
import { useContent } from '@/hooks/useContent';

// Mock hooks
jest.mock('@/hooks/useContent', () => ({
    useContent: jest.fn(),
}));

// Mock next/image - filters out Next.js-specific props that shouldn't be on <img>
jest.mock('next/image', () => ({
    __esModule: true,
    default: function MockImage({ fill, priority, unoptimized, ...props }: React.ImgHTMLAttributes<HTMLImageElement> & { fill?: boolean; priority?: boolean; unoptimized?: boolean }) {
        // Suppress unused variable warnings
        void fill;
        void priority;
        void unoptimized;
        // eslint-disable-next-line @next/next/no-img-element
        return <img {...props} alt={props.alt || ''} />;
    },
}));

// Mock icons
jest.mock('lucide-react', () => ({
    X: () => <svg data-testid="icon-x" />,
}));

describe('WorkList', () => {
    const mockSiteConfig = {
        ui: {
            workList: {
                featuredProjects: 'Featured Projects',
                partOfWork: 'Part of my work at',
                closeDetails: 'Close project details',
                labels: {
                    project: 'Project',
                    description: 'Description',
                    role: 'My Role',
                    stack: 'Tech Stack',
                },
            },
        },
        works: [
            {
                name: 'Project A',
                description: 'Description A',
                image: '/project-a.jpg',
                company: 'Company A',
                role: 'Lead',
                stack: 'React, Node',
            },
            {
                name: 'Project B',
                description: 'Description B',
                image: '/project-b.jpg',
                company: 'Company B',
                role: 'Dev',
                stack: 'Vue, Python',
            },
        ],
    };

    beforeEach(() => {
        (useContent as jest.Mock).mockReturnValue(mockSiteConfig);
    });

    it('renders work items', () => {
        render(<WorkList />);

        expect(screen.getByText('Featured Projects')).toBeInTheDocument();
        expect(screen.getByText('Project A')).toBeInTheDocument();
        expect(screen.getByText('Project B')).toBeInTheDocument();
    });

    it('opens modal on item click', async () => {
        render(<WorkList />);

        const projectCard = screen.getByTestId('work-item-0');
        fireEvent.click(projectCard);

        expect(await screen.findByText('Part of my work at Company A')).toBeInTheDocument();
        expect(screen.getByText('My Role')).toBeInTheDocument();
        expect(screen.getByText('Lead')).toBeInTheDocument();
    });

    it('closes modal on close button click', async () => {
        render(<WorkList />);

        // Open modal
        const projectCard = screen.getByTestId('work-item-0');
        fireEvent.click(projectCard);

        // Close modal
        const closeButton = await screen.findByLabelText('Close project details', {}, { timeout: 3000 });
        fireEvent.click(closeButton);

        expect(screen.queryByText('Part of my work at Company A')).not.toBeInTheDocument();
    });
});
