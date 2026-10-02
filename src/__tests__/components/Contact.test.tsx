import { render, screen } from '@testing-library/react';
import Contact from '@/components/Contact';

// Mock content data
jest.mock('@/data/content', () => ({
  siteConfig: {
    contact: {
      title: 'Get In Touch',
      links: [
        {
          name: 'Email',
          value: 'hi@fachr.in',
          href: 'mailto:hi@fachr.in',
          type: 'email',
        },
        {
          name: 'LinkedIn',
          value: 'Fachrin Aulia Nasution',
          href: 'https://www.linkedin.com/in/fachrinfan',
          type: 'linkedin',
        },
      ],
      calendlyUrl: 'https://calendly.com/fachrin/30min',
      collaboration: {
        title: 'Interested in collaboration?',
        text: 'I work on distributed systems.',
        cta: 'Schedule a call',
      },
    },
  },
}));

// Mock icon-maps
jest.mock('@/lib/icon-maps', () => ({
  CONTACT_ICONS: {
    email: function MockMail() {
      return <svg data-testid="icon-mail" />;
    },
    linkedin: function MockLinkedin() {
      return <svg data-testid="icon-linkedin" />;
    },
    github: function MockGithub() {
      return <svg data-testid="icon-github" />;
    },
    twitter: function MockTwitter() {
      return <svg data-testid="icon-twitter" />;
    },
  },
}));

// Mock icons
jest.mock('lucide-react', () => ({
  Phone: function MockPhone() {
    return <svg data-testid="icon-phone" />;
  },
}));

describe('Contact', () => {
  it('renders contact section with title', () => {
    render(<Contact />);

    expect(screen.getByText('Get In Touch')).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Get In Touch' })).toBeInTheDocument();
  });

  it('renders contact links', () => {
    render(<Contact />);

    expect(screen.getByText('Email')).toBeInTheDocument();
    expect(screen.getByText('hi@fachr.in')).toBeInTheDocument();
    expect(screen.getByText('LinkedIn')).toBeInTheDocument();
    expect(screen.getByText('Fachrin Aulia Nasution')).toBeInTheDocument();
  });

  it('renders collaboration section', () => {
    render(<Contact />);

    expect(screen.getByText('Interested in collaboration?')).toBeInTheDocument();
    expect(screen.getByText('I work on distributed systems.')).toBeInTheDocument();
    expect(screen.getByText('Schedule a call')).toBeInTheDocument();
  });

  it('has correct link attributes', () => {
    render(<Contact />);

    const emailLink = screen.getByText('hi@fachr.in').closest('a');
    expect(emailLink).toHaveAttribute('href', 'mailto:hi@fachr.in');

    const linkedinLink = screen.getByText('Fachrin Aulia Nasution').closest('a');
    expect(linkedinLink).toHaveAttribute('href', 'https://www.linkedin.com/in/fachrinfan');
    expect(linkedinLink).toHaveAttribute('target', '_blank');
    expect(linkedinLink).toHaveAttribute('rel', 'noopener noreferrer');
  });

  it('renders calendly link with correct attributes', () => {
    render(<Contact />);

    const scheduleLink = screen.getByText('Schedule a call').closest('a');
    expect(scheduleLink).toHaveAttribute('href', 'https://calendly.com/fachrin/30min');
    expect(scheduleLink).toHaveAttribute('target', '_blank');
  });
});
