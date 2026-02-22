import { render, screen, fireEvent } from '@testing-library/react';
import Experience from '@/components/Experience';
import { useContent } from '@/hooks/useContent';

// Mock hooks
jest.mock('@/hooks/useContent', () => ({
  useContent: jest.fn(),
}));

jest.mock('@/hooks/useScroll', () => ({
  useScroll: () => ({
    canScrollLeft: true,
    canScrollRight: true,
    scroll: jest.fn(),
    checkScroll: jest.fn(),
  }),
}));

import React from 'react';

// Mock framer-motion
jest.mock('framer-motion', () => {
  const ActualFramerMotion = jest.requireActual('framer-motion');
  return {
    ...ActualFramerMotion,
    motion: {
      div: ({
        children,
        onClick,
        className,
        role,
        'aria-modal': ariaModal,
        'aria-labelledby': ariaLabelledby,
      }: {
        children: React.ReactNode;
        onClick?: () => void;
        className?: string;
        role?: string;
        'aria-modal'?: boolean | 'true' | 'false';
        'aria-labelledby'?: string;
      }) => (
        <div
          onClick={onClick}
          className={className}
          data-testid="motion-div"
          role={role}
          aria-modal={ariaModal}
          aria-labelledby={ariaLabelledby}
        >
          {children}
        </div>
      ),
    },
    AnimatePresence: ({ children }: { children: React.ReactNode }) => <>{children}</>,
  };
});

// Mock icons
jest.mock('lucide-react', () => ({
  ChevronLeft: () => <svg data-testid="icon-chevron-left" />,
  ChevronRight: () => <svg data-testid="icon-chevron-right" />,
  MapPin: () => <svg data-testid="icon-map-pin" />,
  Calendar: () => <svg data-testid="icon-calendar" />,
  Building2: () => <svg data-testid="icon-building" />,
  X: () => <span data-testid="icon-x">Close</span>,
}));

describe('Experience Carousel', () => {
  const mockSiteConfig = {
    ui: {
      appearanceList: {
        scrollLeft: 'Scroll left',
        scrollRight: 'Scroll right',
      },
      experience: {
        title: 'Experience',
        technologies: 'Technologies',
        accomplishments: 'Accomplishments',
        scrollLeft: 'Scroll left',
        scrollRight: 'Scroll right',
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
        image: '/techcorp.png',
      },
      {
        role: 'Junior Engineer',
        company: 'Startup Inc',
        location: 'Remote',
        period: '2018 - 2020',
        description: ['Fixed bugs', 'Learned a lot'],
        techStack: ['JavaScript', 'HTML', 'CSS'],
        image: '/startup.png',
      },
    ],
  };

  beforeEach(() => {
    (useContent as jest.Mock).mockReturnValue(mockSiteConfig);
  });

  it('renders the experience heading', () => {
    render(<Experience />);
    expect(screen.getByText('Experience')).toBeInTheDocument();
  });

  it('renders experience cards with basic information', () => {
    render(<Experience />);

    expect(screen.getByText('Senior Engineer')).toBeInTheDocument();
    expect(screen.getByText('Tech Corp')).toBeInTheDocument();
    expect(screen.getByText('Junior Engineer')).toBeInTheDocument();

    // Ensure some pills are rendered
    expect(screen.getByText('React')).toBeInTheDocument();

    // Ensure +N overflow indicator is rendered
    expect(screen.getByText('+2')).toBeInTheDocument();
  });

  it('renders description text in preview cards without bullet markers', () => {
    render(<Experience />);

    // Description text should appear in preview
    expect(screen.getByText('Built amazing things')).toBeInTheDocument();
    expect(screen.getByText('Led a team')).toBeInTheDocument();

    // But no bullet markers (ul/li) should exist in the preview
    // The descriptions are rendered as <p> tags, not <li> tags
    const descriptions = screen.getByText('Built amazing things');
    expect(descriptions.tagName).toBe('P');
  });

  it('opens modal correctly when card is clicked', () => {
    render(<Experience />);

    const cardPreviews = screen.getAllByText('Senior Engineer');
    fireEvent.click(cardPreviews[0]);

    // The modal should open. We check if the Close (X) icon appears.
    expect(screen.getByTestId('icon-x')).toBeInTheDocument();
  });

  it('shows Accomplishments label in modal', () => {
    render(<Experience />);

    // Open modal
    const cardPreviews = screen.getAllByText('Senior Engineer');
    fireEvent.click(cardPreviews[0]);

    // Accomplishments heading should be visible in modal
    expect(screen.getByText('Accomplishments')).toBeInTheDocument();
  });

  it('closes modal correctly when X icon is clicked', () => {
    render(<Experience />);

    // Open the modal
    const cardPreviews = screen.getAllByText('Senior Engineer');
    fireEvent.click(cardPreviews[0]);

    expect(screen.getByTestId('icon-x')).toBeInTheDocument();

    // Close the modal
    const closeButton = screen.getByTestId('icon-x').parentElement;
    fireEvent.click(closeButton!);

    expect(screen.queryByTestId('icon-x')).not.toBeInTheDocument();
  });

  it('closes modal when Escape key is pressed', () => {
    render(<Experience />);

    // Open the modal
    const cardPreviews = screen.getAllByText('Senior Engineer');
    fireEvent.click(cardPreviews[0]);

    expect(screen.getByTestId('icon-x')).toBeInTheDocument();

    // Press Escape key
    fireEvent.keyDown(document, { key: 'Escape' });

    expect(screen.queryByTestId('icon-x')).not.toBeInTheDocument();
  });

  it('closes modal when backdrop overlay is clicked', () => {
    render(<Experience />);

    // Open the modal
    const cardPreviews = screen.getAllByText('Senior Engineer');
    fireEvent.click(cardPreviews[0]);

    expect(screen.getByTestId('icon-x')).toBeInTheDocument();

    // Click the backdrop (first motion-div is the overlay)
    const motionDivs = screen.getAllByTestId('motion-div');
    fireEvent.click(motionDivs[0]);

    expect(screen.queryByTestId('icon-x')).not.toBeInTheDocument();
  });

  it('has proper modal accessibility attributes', () => {
    render(<Experience />);

    // Open modal
    const cardPreviews = screen.getAllByText('Senior Engineer');
    fireEvent.click(cardPreviews[0]);

    const dialog = screen.getByRole('dialog');
    expect(dialog).toHaveAttribute('aria-modal', 'true');
    expect(dialog).toHaveAttribute('aria-labelledby', 'experience-modal-title');
  });
});
