import { render, screen } from '@testing-library/react';
import Badge from '@/components/ui/Badge';

describe('Badge', () => {
    it('renders children correctly', () => {
        render(<Badge>Test Badge</Badge>);
        expect(screen.getByText('Test Badge')).toBeInTheDocument();
    });

    it('applies default variant styles', () => {
        const { container } = render(<Badge>Default</Badge>);
        // The outer span is the first span child of the container
        const outerBadge = container.querySelector('span.inline-flex');
        expect(outerBadge).toBeInTheDocument();
        expect(outerBadge).toHaveClass('items-center');
    });

    it('applies tech variant styles', () => {
        const { container } = render(<Badge variant="tech">Tech Badge</Badge>);
        const outerBadge = container.querySelector('span');
        expect(outerBadge).toHaveClass('bg-[var(--color-badge-bg)]');
    });

    it('applies date variant styles', () => {
        const { container } = render(<Badge variant="date">Jan 2024</Badge>);
        const outerBadge = container.querySelector('span');
        expect(outerBadge).toHaveClass('border');
    });

    it('renders with an icon', () => {
        const TestIcon = <svg data-testid="test-icon" />;
        render(<Badge icon={TestIcon}>With Icon</Badge>);
        
        expect(screen.getByTestId('test-icon')).toBeInTheDocument();
        expect(screen.getByText('With Icon')).toBeInTheDocument();
    });

    it('applies custom className', () => {
        const { container } = render(<Badge className="custom-class">Custom</Badge>);
        const outerBadge = container.querySelector('span');
        expect(outerBadge).toHaveClass('custom-class');
    });

    it('renders with language variant', () => {
        const { container } = render(<Badge variant="language">English</Badge>);
        const outerBadge = container.querySelector('span');
        expect(outerBadge).toHaveClass('border');
    });

    it('renders with platform variant', () => {
        const { container } = render(<Badge variant="platform">YouTube</Badge>);
        const outerBadge = container.querySelector('span');
        expect(outerBadge).toHaveClass('border');
    });
});
