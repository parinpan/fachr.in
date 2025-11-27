import { render, screen } from '@testing-library/react';
import Hero from '@/components/Hero';
import { useContent } from '@/hooks/useContent';

// Mock hooks
jest.mock('@/hooks/useContent', () => ({
    useContent: jest.fn(),
}));

// Mock next/image
jest.mock('next/image', () => ({
    __esModule: true,
    default: (props: any) => <img {...props} />,
}));

describe('Hero', () => {
    const mockSiteConfig = {
        hero: {
            title: 'Test Hero Title',
            subtitle: 'Test Hero Subtitle',
            image: '/test-image.jpg',
            badges: [
                { text: 'Badge 1', icon: '/badge1.png' },
                { text: 'Badge 2', icon: '/badge2.png' },
            ],
        },
    };

    beforeEach(() => {
        (useContent as jest.Mock).mockReturnValue(mockSiteConfig);
    });

    it('renders hero content', () => {
        render(<Hero />);

        expect(screen.getByText('Test Hero Title')).toBeInTheDocument();
        expect(screen.getByText('Test Hero Subtitle')).toBeInTheDocument();
        expect(screen.getByAltText('Test Hero Title')).toBeInTheDocument();
    });

    it('renders badges', () => {
        render(<Hero />);

        expect(screen.getByText('Badge 1')).toBeInTheDocument();
        expect(screen.getByText('Badge 2')).toBeInTheDocument();
    });
});
