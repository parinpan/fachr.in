import { render, screen } from '@testing-library/react';
import EmptyState from '@/components/ui/EmptyState';

describe('EmptyState', () => {
    it('renders icon', () => {
        render(
            <EmptyState
                icon={<svg data-testid="empty-icon" />}
                title="No Items"
                description="There are no items to display."
            />
        );
        
        expect(screen.getByTestId('empty-icon')).toBeInTheDocument();
    });

    it('renders title', () => {
        render(
            <EmptyState
                icon={<svg />}
                title="No Items Found"
                description="Description text"
            />
        );
        
        expect(screen.getByText('No Items Found')).toBeInTheDocument();
        expect(screen.getByRole('heading', { name: 'No Items Found' })).toBeInTheDocument();
    });

    it('renders description', () => {
        render(
            <EmptyState
                icon={<svg />}
                title="Title"
                description="This is a detailed description of the empty state."
            />
        );
        
        expect(screen.getByText('This is a detailed description of the empty state.')).toBeInTheDocument();
    });

    it('has proper styling for centered content', () => {
        render(
            <EmptyState
                icon={<svg data-testid="icon" />}
                title="Title"
                description="Description"
            />
        );
        
        const container = screen.getByTestId('icon').closest('.flex');
        expect(container).toHaveClass('flex-col');
        expect(container).toHaveClass('items-center');
        expect(container).toHaveClass('justify-center');
    });
});
