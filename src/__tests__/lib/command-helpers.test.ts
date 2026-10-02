import { handleNavigationAction } from '@/lib/command-helpers';

describe('handleNavigationAction', () => {
  const mockRouter = {
    push: jest.fn(),
  };

  const mockOnComplete = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    // Mock document.getElementById
    document.getElementById = jest.fn().mockReturnValue({
      scrollIntoView: jest.fn(),
    });
  });

  it('navigates to path when item has path', () => {
    handleNavigationAction({ path: '/blog' }, mockRouter, mockOnComplete);

    expect(mockOnComplete).toHaveBeenCalled();
    expect(mockRouter.push).toHaveBeenCalledWith('/blog');
  });

  it('scrolls to element when item has id and on home page', () => {
    // Default pathname in jsdom is '/'
    const mockElement = { scrollIntoView: jest.fn() };
    (document.getElementById as jest.Mock).mockReturnValue(mockElement);

    handleNavigationAction({ id: 'about-section' }, mockRouter, mockOnComplete);

    expect(mockOnComplete).toHaveBeenCalled();
    expect(document.getElementById).toHaveBeenCalledWith('about-section');
    expect(mockElement.scrollIntoView).toHaveBeenCalledWith({ behavior: 'smooth' });
  });

  it('does nothing when element not found', () => {
    (document.getElementById as jest.Mock).mockReturnValue(null);

    handleNavigationAction({ id: 'nonexistent' }, mockRouter, mockOnComplete);

    expect(mockOnComplete).toHaveBeenCalled();
    // Should not throw
  });

  it('does nothing when item has neither path nor id', () => {
    handleNavigationAction({}, mockRouter, mockOnComplete);

    expect(mockRouter.push).not.toHaveBeenCalled();
    expect(document.getElementById).not.toHaveBeenCalled();
  });
});
