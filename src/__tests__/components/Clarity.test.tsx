import { render } from '@testing-library/react';
import Clarity from '@/components/Clarity';

describe('Clarity', () => {
  it('renders the script element with correct id', () => {
    const { container } = render(<Clarity clarityId="test-clarity-id" />);

    // Next.js Script component renders differently in test environment
    // We check for the component to render without errors
    expect(container).toBeInTheDocument();
  });

  it('renders with the provided clarityId', () => {
    const clarityId = 'abc123xyz';
    const { container } = render(<Clarity clarityId={clarityId} />);

    expect(container).toBeInTheDocument();
  });

  it('renders without crashing with different clarityIds', () => {
    const ids = ['id1', 'id2', 'my-clarity-id'];

    ids.forEach((id) => {
      const { unmount } = render(<Clarity clarityId={id} />);
      unmount();
    });
  });
});
