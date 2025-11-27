import { render, screen } from '@testing-library/react';
import IconWithText from '@/components/ui/IconWithText';

// Mock lucide-react icon
const MockIcon = ({ size }: { size?: number }) => (
    <svg data-testid="mock-icon" width={size} height={size} />
);

describe('IconWithText', () => {
    it('renders icon and value', () => {
        render(<IconWithText icon={MockIcon} value="42" />);
        
        expect(screen.getByTestId('mock-icon')).toBeInTheDocument();
        expect(screen.getByText('42')).toBeInTheDocument();
    });

    it('renders with numeric value', () => {
        render(<IconWithText icon={MockIcon} value={100} />);
        
        expect(screen.getByText('100')).toBeInTheDocument();
    });

    it('renders with optional label for screen readers', () => {
        render(<IconWithText icon={MockIcon} value="50" label="Stars" />);
        
        expect(screen.getByText('Stars')).toHaveClass('sr-only');
    });

    it('applies custom size to icon', () => {
        render(<IconWithText icon={MockIcon} value="test" size={20} />);
        
        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveAttribute('width', '20');
        expect(icon).toHaveAttribute('height', '20');
    });

    it('applies default size of 14', () => {
        render(<IconWithText icon={MockIcon} value="test" />);
        
        const icon = screen.getByTestId('mock-icon');
        expect(icon).toHaveAttribute('width', '14');
        expect(icon).toHaveAttribute('height', '14');
    });

    it('applies custom className', () => {
        const { container } = render(<IconWithText icon={MockIcon} value="test" className="custom-style" />);
        
        const outerSpan = container.querySelector('span.flex');
        expect(outerSpan).toHaveClass('custom-style');
    });

    it('has proper flex styling for alignment', () => {
        const { container } = render(<IconWithText icon={MockIcon} value="123" />);
        
        const outerSpan = container.querySelector('span');
        expect(outerSpan).toHaveClass('flex');
        expect(outerSpan).toHaveClass('items-center');
        expect(outerSpan).toHaveClass('gap-1.5');
    });
});
