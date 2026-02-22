# AGENTS.md - LLM Navigation Guide

This document provides guidelines for AI agents and LLMs working on this codebase. It covers project structure, best practices, common patterns, and potential pitfalls.

## Project Overview

This is a **Next.js 16** personal portfolio website with:

- **App Router** architecture
- **TypeScript** throughout
- **Tailwind CSS 4** for styling
- **React 19** with Server and Client Components
- **MDX** for blog content

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── appearances/       # Appearances page
│   ├── blog/              # Blog pages
│   │   └── [slug]/        # Dynamic blog post pages
│   ├── now/               # Now page
│   ├── sitemap.xml/       # Dynamic sitemap route
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page
│
├── components/            # React components
│   ├── ui/               # Reusable UI primitives (Badge)
│   └── *.tsx             # Feature components (Hero, Contact, etc.)
│
├── data/                 # Static content data
│   ├── content.ts        # Content (English)
│   └── types.ts          # TypeScript types for content
│
├── hooks/                # Custom React hooks
│   ├── useContent.ts     # Content hook (API boundary for future i18n)
│   ├── useScroll.ts      # Scroll management
│   └── useVisibility.ts  # Visibility detection
│
├── lib/                  # Utility functions & helpers
│   ├── utils.ts          # cn() helper (clsx + tailwind-merge)
│   ├── constants.ts      # App constants (GitHub config, scroll thresholds)
│   ├── formatters.ts     # Date formatter, Spotify theme URL builder
│   ├── navigation.ts     # Navigation utilities
│   ├── icon-maps.ts      # Icon component mappings
│   ├── command-helpers.ts # Command menu helpers
│   └── mdx.ts            # MDX/blog utilities
│
├── posts/                # MDX blog posts
│
├── types/                # TypeScript type definitions
│   └── components.ts     # Component prop types (BlogContentProps, Repository)
│
└── __tests__/            # Test files (mirrors src structure)
    ├── components/
    │   └── ui/
    ├── hooks/
    └── lib/
```

## Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run test     # Run Jest tests
npm run test:watch  # Watch mode testing
```

## Key Patterns & Conventions

### 1. Component Architecture

**Server vs Client Components:**

- Default to Server Components unless client-side interactivity is needed
- Use `'use client'` directive only when required (hooks, event handlers, browser APIs)
- Client components: `Hero.tsx`, `Experience.tsx`, `Navbar.tsx`, etc.

**Component Structure:**

```tsx
'use client'; // Only if needed

import { useContent } from '@/hooks/useContent';
import { cn } from '@/lib/utils';

export default function ComponentName() {
  const siteConfig = useContent(); // Get content via hook

  return <section aria-labelledby="section-heading">{/* Component JSX */}</section>;
}
```

### 2. Styling Conventions

**Use CSS Variables for theming** (defined in `globals.css`):

```tsx
// Preferred - Uses theme system via Tailwind arbitrary values
<div className="bg-[var(--color-surface)] text-[var(--color-text-primary)]">
```

**Use `cn()` for conditional classes:**

```tsx
import { cn } from '@/lib/utils';

<div
  className={cn(
    'base-styles',
    isActive && 'active-styles',
    className // Pass-through prop
  )}
/>;
```

**Avoid:**

- Inline styles
- Hardcoded color values (use CSS variables)
- `dark:` Tailwind classes (use CSS variables instead, except for `@tailwindcss/typography` prose classes which don't support CSS variables natively)

### 3. Content

**Content lives in `data/`:**

- `content.ts` - Content definitions
- `types.ts` - TypeScript interfaces

**Use `useContent()` hook in Client Components:**

```tsx
const siteConfig = useContent(); // Returns content object
// Use: siteConfig.hero.title, siteConfig.contact.links, etc.
```

**Server Components** can import `siteConfig` directly since they can't use hooks:

```tsx
import { siteConfig } from '@/data/content';
```

### 4. Testing Patterns

**Test file location:** Mirror the `src/` structure in `__tests__/`

**Mocking patterns:**

```tsx
// Mock hooks
jest.mock('@/hooks/useContent', () => ({
  useContent: jest.fn(),
}));

// Mock next/image (filter Next.js-specific props)
jest.mock('next/image', () => ({
  __esModule: true,
  default: function MockImage({ fill, priority, unoptimized, ...props }) {
    void fill;
    void priority;
    void unoptimized;
    return <img {...props} alt={props.alt || ''} />;
  },
}));

// Mock components with display names (avoid lint errors)
jest.mock(
  '@/components/ThemeToggle',
  () =>
    function MockThemeToggle() {
      return <div>ThemeToggle</div>;
    }
);
```

**Run tests frequently:**

```bash
npm test                    # All tests
npm test -- path/to/test    # Specific test
```

### 5. Type Safety

**Always use TypeScript types:**

```tsx
import type { ExperienceItem, ProjectItem } from '@/data/types';

// Props with explicit types
interface ComponentProps {
  items: ExperienceItem[];
}
```

### 6. Accessibility

Modals must include:

- `role="dialog"` and `aria-modal="true"`
- `aria-labelledby` pointing to a heading
- Escape key handler to close
- Focus management where appropriate

## Common Pitfalls

### 1. Duplicate Utilities

- `cn()` is ONLY in `lib/utils.ts` - don't create duplicates
- Check if utility exists before creating new ones

### 2. Test Assertions

- Match EXACT UI strings from `content.ts` (e.g., "Part of my work at" not "Part of work at")
- Check `aria-label` values match component implementation

### 3. Mock Component Props

- Filter Next.js-specific props (`fill`, `priority`, `unoptimized`) in `next/image` mocks
- Add display names to mock functions to avoid React lint warnings

### 4. CSS Variables

- Theme colors are in `globals.css` under `:root` and `:root.dark`
- Don't hardcode colors - use CSS variables for theme consistency
- Components use `var(--color-*)` directly in Tailwind arbitrary values

### 5. Content Hook

- `useContent()` is a thin wrapper returning `siteConfig` - kept as an API boundary
- Client Components should use `useContent()`, not import `siteConfig` directly

## Pre-Commit Checklist

Before submitting changes:

1. **Lint passes:** `npm run lint`
2. **Tests pass:** `npm run test`
3. **No TypeScript errors:** Check IDE or `npx tsc --noEmit`
4. **Tests for new code:** Add tests for new components/hooks/utilities

## Adding New Features

### New Component

1. Create in `src/components/` (or `src/components/ui/` for primitives)
2. Use `'use client'` only if needed
3. Use `useContent()` for text content in Client Components
4. Use CSS variables for theming (not `dark:` classes)
5. Add test in `src/__tests__/components/`

### New Hook

1. Create in `src/hooks/`
2. Follow naming: `useFeatureName.ts`
3. Add test in `src/__tests__/hooks/`

### New Utility

1. Add to existing file in `src/lib/` if related
2. Or create new file for distinct functionality
3. Add test in `src/__tests__/lib/`

### New Page

1. Create in `src/app/` following Next.js conventions
2. Update navigation in `content.ts`

## Key Files Reference

| Purpose           | File                         |
| ----------------- | ---------------------------- |
| Theme colors      | `src/app/globals.css`        |
| Class merging     | `src/lib/utils.ts` -> `cn()` |
| Content           | `src/data/content.ts`        |
| Content types     | `src/data/types.ts`          |
| Navigation config | `src/lib/navigation.ts`      |
| Component types   | `src/types/components.ts`    |

## Quality Standards

1. **Accessibility:** Use semantic HTML, ARIA labels, proper heading hierarchy, modal accessibility
2. **Performance:** Prefer Server Components, optimize images with `next/image`
3. **Type Safety:** No `any` types, proper interfaces for all props
4. **Testing:** Aim for comprehensive coverage of user interactions
5. **Theming:** All colors via CSS variables, no hardcoded light/dark values
6. **Documentation:** Update AGENTS.md when adding new patterns

---

_Last updated after comprehensive codebase refactoring_
