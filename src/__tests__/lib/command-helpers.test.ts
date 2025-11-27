import { handleNavigationAction, handleGeneralAction } from '@/lib/command-helpers';

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

describe('handleGeneralAction', () => {
    const mockOnComplete = jest.fn();

    beforeEach(() => {
        jest.clearAllMocks();
        // Mock clipboard
        Object.assign(navigator, {
            clipboard: {
                writeText: jest.fn().mockResolvedValue(undefined),
            },
        });
        // Mock window.open
        window.open = jest.fn();
    });

    it('copies email for copyEmail action', () => {
        handleGeneralAction('copyEmail', mockOnComplete);

        expect(mockOnComplete).toHaveBeenCalled();
        expect(navigator.clipboard.writeText).toHaveBeenCalledWith('hi@fachr.in');
    });

    it('opens GitHub for viewGithub action', () => {
        handleGeneralAction('viewGithub', mockOnComplete);

        expect(mockOnComplete).toHaveBeenCalled();
        expect(window.open).toHaveBeenCalledWith('https://github.com/parinpan', '_blank');
    });

    it('opens LinkedIn for viewLinkedIn action', () => {
        handleGeneralAction('viewLinkedIn', mockOnComplete);

        expect(mockOnComplete).toHaveBeenCalled();
        expect(window.open).toHaveBeenCalledWith('https://www.linkedin.com/in/parinpan', '_blank');
    });

    it('opens Twitter for viewTwitter action', () => {
        handleGeneralAction('viewTwitter', mockOnComplete);

        expect(mockOnComplete).toHaveBeenCalled();
        expect(window.open).toHaveBeenCalledWith('https://twitter.com/parinpan', '_blank');
    });

    it('does nothing for unknown action', () => {
        handleGeneralAction('unknownAction', mockOnComplete);

        expect(mockOnComplete).toHaveBeenCalled();
        expect(navigator.clipboard.writeText).not.toHaveBeenCalled();
        expect(window.open).not.toHaveBeenCalled();
    });
});
