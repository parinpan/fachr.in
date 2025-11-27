import { render, screen, fireEvent } from '@testing-library/react';
import Card from '@/components/ui/Card';

describe('Card', () => {
    it('renders children correctly', () => {
        render(<Card>Card Content</Card>);
        expect(screen.getByText('Card Content')).toBeInTheDocument();
    });

    it('applies default variant styles', () => {
        render(<Card>Default Card</Card>);
        const card = screen.getByText('Default Card').closest('div');
        expect(card).toHaveClass('bg-white');
        expect(card).toHaveClass('rounded-xl');
        expect(card).toHaveClass('shadow-sm');
    });

    it('applies elevated variant styles', () => {
        render(<Card variant="elevated">Elevated Card</Card>);
        const card = screen.getByText('Elevated Card').closest('div');
        expect(card).toHaveClass('rounded-2xl');
        expect(card).toHaveClass('shadow-md');
    });

    it('applies interactive variant styles', () => {
        render(<Card variant="interactive">Interactive Card</Card>);
        const card = screen.getByText('Interactive Card').closest('div');
        expect(card).toHaveClass('hover:shadow-md');
        expect(card).toHaveClass('cursor-pointer');
    });

    it('applies custom className', () => {
        render(<Card className="custom-class">Custom Card</Card>);
        const card = screen.getByText('Custom Card').closest('div');
        expect(card).toHaveClass('custom-class');
    });

    it('handles onClick when provided', () => {
        const handleClick = jest.fn();
        render(<Card onClick={handleClick}>Clickable Card</Card>);
        
        const card = screen.getByText('Clickable Card').closest('div');
        fireEvent.click(card!);
        
        expect(handleClick).toHaveBeenCalledTimes(1);
    });

    it('sets role="button" when onClick is provided', () => {
        render(<Card onClick={() => {}}>Button Card</Card>);
        const card = screen.getByRole('button');
        expect(card).toBeInTheDocument();
    });

    it('sets tabIndex="0" when onClick is provided', () => {
        render(<Card onClick={() => {}}>Focusable Card</Card>);
        const card = screen.getByRole('button');
        expect(card).toHaveAttribute('tabIndex', '0');
    });

    it('does not set role or tabIndex when onClick is not provided', () => {
        render(<Card>Static Card</Card>);
        const card = screen.getByText('Static Card').closest('div');
        expect(card).not.toHaveAttribute('role');
        expect(card).not.toHaveAttribute('tabIndex');
    });
});
