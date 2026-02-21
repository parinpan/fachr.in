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
      }: {
        children: React.ReactNode;
        onClick?: () => void;
        className?: string;
      }) => (
        <div onClick={onClick} className={className} data-testid="motion-div">
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

  it('opens modal correctly when "View details" is clicked', () => {
    render(<Experience />);

    // The modal should not be open, therefore only the preview versions of the role exist.
    // Wait, the roles are identical in preview and modal. Let's just click the first role card.
    const cardPreviews = screen.getAllByText('Senior Engineer');
    fireEvent.click(cardPreviews[0]); // Click the first matching card

    // The modal should open. We check if the Close (X) icon appears.
    expect(screen.getByTestId('icon-x')).toBeInTheDocument();
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
});
