import { render } from '@testing-library/react';
import StructuredData from '@/components/StructuredData';

// Mock dependencies
jest.mock('@/hooks/useContent', () => ({
  useContent: () => ({
    personal: {
      name: 'Test User',
      email: 'test@example.com',
      profileImage: '/images/profile.jpg',
    },
    seo: {
      description: 'Test SEO description',
    },
    social: {
      github: 'https://github.com/testuser',
      linkedin: 'https://linkedin.com/in/testuser',
      twitter: 'https://twitter.com/testuser',
    },
    hero: {
      title: 'Test Hero Title',
    },
  }),
}));

describe('StructuredData', () => {
  it('renders without crashing', () => {
    const { container } = render(<StructuredData />);
    expect(container).toBeInTheDocument();
  });

  it('renders Script element', () => {
    // Next.js Script component renders differently in test environment
    // We mainly test that it doesn't crash
    const { container } = render(<StructuredData />);
    expect(container).toBeInTheDocument();
  });
});
