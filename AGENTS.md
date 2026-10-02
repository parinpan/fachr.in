# AGENTS.md - LLM Navigation Guide

This document provides guidelines for AI agents and LLMs working on this codebase. It covers project structure, best practices, common patterns, and potential pitfalls.

## Project Overview

This is a **Next.js 16** personal portfolio website with:

- **App Router** architecture
- **TypeScript** throughout
- **Tailwind CSS 4** for styling
- **React 19** with Server and Client Components
- **MDX** for blog content
- **Performance-optimized** (dynamic imports, throttled/debounced handlers)
- **SEO-optimized** (structured data, RSS feed, llms.txt, sitemap, manifest)
- **Mobile-first** (responsive sizing, 44px touch targets, safe-area insets)

## Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── appearances/       # Appearances page
│   ├── blog/              # Blog pages
│   │   └── [slug]/        # Dynamic blog post pages
│   ├── feed.xml/          # RSS feed route
│   ├── llms.txt/          # LLM-readable content route
│   ├── manifest.webmanifest/ # Web App Manifest route
│   ├── now/               # Now page
│   ├── robots.txt/        # Robots.txt route
│   ├── sitemap.xml/       # Dynamic sitemap route
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout (viewport export, RSS autodiscovery)
│   ├── not-found.tsx      # 404 page
│   └── page.tsx           # Home page
│
├── components/            # React components
│   ├── ui/               # Reusable UI primitives (Badge, EmptyState, IconWithText)
│   ├── ClientShell.tsx   # Dynamic import wrapper for CommandMenu + BackToTop
│   └── *.tsx             # Feature components (Hero, Contact, etc.)
│
├── data/                 # Static content data
│   ├── content.ts        # Content (English)
│   └── types.ts          # TypeScript types for content
│
├── hooks/                # Custom React hooks
│   ├── useContent.ts     # Content hook (API boundary for future i18n)
│   ├── useScroll.ts      # Scroll management (debounced resize handler)
│   └── useVisibility.ts  # Visibility detection (rAF-throttled scroll)
│
├── lib/                  # Utility functions & helpers
│   ├── utils.ts          # cn() helper + safeIsoDate() (Safari-safe date parsing)
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
    ├── app/              # Route handler tests
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
- Server components: `About.tsx`, `Contact.tsx`, `StructuredData.tsx`, `BlogContent.tsx`, `NowContent.tsx`, `AppearancesContent.tsx`
- Client components: `Hero.tsx`, `Experience.tsx`, `Navbar.tsx`, `CommandMenu.tsx`, `BackToTop.tsx`, `ThemeToggle.tsx`, `WorkList.tsx`, `GithubRepos.tsx`, `AppearanceList.tsx`, `Podcast.tsx`

**Dynamic Imports via ClientShell:**

`ClientShell.tsx` uses `next/dynamic` with `{ ssr: false }` to lazily load `CommandMenu` and `BackToTop`, reducing initial bundle size.

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

**Mobile-first responsive sizing:**

```tsx
// Use responsive breakpoints: base (mobile) → sm → md → lg
<h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl">
<div className="w-[85vw] sm:w-[350px]">
```

**Touch target minimums (44px):**

All interactive elements must have `min-h-[44px] min-w-[44px]` for mobile accessibility.

**Avoid:**

- Inline styles (except `scrollbarWidth: 'thin'` which has no Tailwind equivalent)
- Hardcoded color values (use CSS variables)
- `dark:` Tailwind classes (use CSS variables instead, except for `@tailwindcss/typography` prose classes which don't support CSS variables natively)
- `text-justify` on mobile (use `text-left md:text-justify`)

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

**Coverage threshold:** Minimum **80%** across statements, branches, functions, and lines (enforced in `jest.config.ts`). Current coverage: ~84% functions, ~99% statements.

**Test count:** 40 test suites, 275 tests.

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

// Mock framer-motion (pass through aria/role attributes for accessibility tests)
jest.mock('framer-motion', () => ({
  motion: {
    div: ({
      children,
      onClick,
      className,
      role,
      'aria-modal': ariaModal,
      'aria-labelledby': ariaLabelledby,
      ...rest
    }) => (
      <div
        onClick={onClick}
        className={className}
        role={role}
        aria-modal={ariaModal}
        aria-labelledby={ariaLabelledby}
        data-testid="motion-div"
      >
        {children}
      </div>
    ),
  },
  AnimatePresence: ({ children }) => <>{children}</>,
}));
```

**Run tests frequently:**

```bash
npm test                    # All tests
npm test -- path/to/test    # Specific test
npx jest --coverage         # Coverage report
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

**Touch targets:** All buttons and interactive elements must be at least 44x44px (`min-h-[44px] min-w-[44px]`).

**Modals must include:**

- `role="dialog"` and `aria-modal="true"`
- `aria-labelledby` pointing to a heading
- Escape key handler to close
- Backdrop click to close
- `document.body.style.overflow = 'hidden'` when open

**Safe-area insets:** Applied in `globals.css` for notched devices. `BackToTop` uses `pb-[env(safe-area-inset-bottom)]`.

### 7. Experience Component Pattern

The Experience section uses a **preview card + modal** pattern:

- **Preview cards:** Show role, company, location, period, description text (plain `<p>` tags, no bullet markers), technologies (first 3 + overflow count), and a "View details" link
- **Modal:** Shows full details with an **"Accomplishments"** heading (`siteConfig.ui.experience.accomplishments`) above bulleted description list, plus full tech stack
- Cards have fixed `h-[360px]` height with translucent overlay at the bottom -- content clipping in preview is intentional

### 8. Performance Patterns

- **Dynamic imports:** `ClientShell.tsx` lazy-loads `CommandMenu` + `BackToTop` with `{ ssr: false }`
- **Throttled scroll:** `useVisibility` uses `requestAnimationFrame` to throttle scroll event handlers
- **Debounced resize:** `useScroll` debounces window resize handlers
- **Image optimization:** All `<Image fill>` components include `sizes` prop for responsive loading
- **Server Components by default:** Components that don't need interactivity are Server Components

## Common Pitfalls

### 1. Duplicate Utilities

- `cn()` is ONLY in `lib/utils.ts` - don't create duplicates
- `safeIsoDate()` is also in `lib/utils.ts` - use it for Safari-safe date parsing
- Check if utility exists before creating new ones

### 2. Test Assertions

- Match EXACT UI strings from `content.ts` (e.g., "Part of my work at" not "Part of work at")
- Check `aria-label` values match component implementation
- When testing modals, the framer-motion mock must pass through `role`, `aria-modal`, and `aria-labelledby` props

### 3. Mock Component Props

- Filter Next.js-specific props (`fill`, `priority`, `unoptimized`) in `next/image` mocks
- Add display names to mock functions to avoid React lint warnings

### 4. CSS Variables

- Theme colors are in `globals.css` under `:root` and `:root.dark`
- Don't hardcode colors - use CSS variables for theme consistency
- Components use `var(--color-*)` directly in Tailwind arbitrary values
- Safe-area CSS custom properties are defined in `globals.css`

### 5. Content Hook

- `useContent()` is a thin wrapper returning `siteConfig` - kept as an API boundary
- Client Components should use `useContent()`, not import `siteConfig` directly

### 6. LSP Ghost Errors

- The LSP sometimes reports false `Cannot find module '@/...'` errors
- These are transient/stale -- `npx tsc --noEmit` and Jest both compile clean
- Ignore these LSP errors; verify with `tsc` if unsure

### 7. Mobile Responsive Rules

- Never use fixed widths without responsive breakpoints (e.g., `w-[85vw] sm:w-[350px]`)
- Never use `text-justify` on mobile (causes awkward spacing on narrow screens)
- Large headings must scale down: `text-3xl sm:text-4xl md:text-5xl lg:text-6xl`
- Touch targets must be at least 44x44px

## Pre-Commit Checklist

Before submitting changes:

1. **Lint passes:** `npm run lint`
2. **Tests pass:** `npm run test`
3. **Coverage >= 80%:** `npx jest --coverage` (all four metrics must be >= 80%)
4. **No TypeScript errors:** `npx tsc --noEmit`
5. **Build passes:** `npm run build`
6. **Tests for new code:** Add tests for new components/hooks/utilities

## Adding New Features

### New Component

1. Create in `src/components/` (or `src/components/ui/` for primitives)
2. Use `'use client'` only if needed
3. Use `useContent()` for text content in Client Components
4. Use CSS variables for theming (not `dark:` classes)
5. Ensure 44px minimum touch targets on interactive elements
6. Use responsive sizing (mobile-first breakpoints)
7. Add test in `src/__tests__/components/`

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
3. Add to sitemap in `src/app/sitemap.xml/route.ts`

### New Route Handler

1. Create in `src/app/<route>/route.ts`
2. Add test in `src/__tests__/app/<route>/route.test.ts`

## Key Files Reference

| Purpose             | File                                   |
| ------------------- | -------------------------------------- |
| Theme colors        | `src/app/globals.css`                  |
| Class merging       | `src/lib/utils.ts` -> `cn()`           |
| Safari-safe dates   | `src/lib/utils.ts` -> `safeIsoDate()`  |
| Content             | `src/data/content.ts`                  |
| Content types       | `src/data/types.ts`                    |
| Navigation config   | `src/lib/navigation.ts`                |
| Component types     | `src/types/components.ts`              |
| Dynamic imports     | `src/components/ClientShell.tsx`       |
| Structured data/SEO | `src/components/StructuredData.tsx`    |
| Scroll constants    | `src/lib/constants.ts`                 |
| Viewport config     | `src/app/layout.tsx` (viewport export) |

## Quality Standards

1. **Accessibility:** Use semantic HTML, ARIA labels, proper heading hierarchy, modal accessibility, 44px touch targets
2. **Performance:** Prefer Server Components, optimize images with `next/image`, use dynamic imports for heavy client components
3. **Type Safety:** No `any` types, proper interfaces for all props
4. **Testing:** Minimum 80% coverage across all metrics; currently 40 suites, 275 tests
5. **Theming:** All colors via CSS variables, no hardcoded light/dark values
6. **Mobile:** Responsive breakpoints, safe-area insets, no text-justify on mobile, touch-friendly sizing
7. **SEO:** Structured data (JSON-LD), RSS feed, sitemap, robots.txt, llms.txt, Web App Manifest
8. **Documentation:** Update AGENTS.md when adding new patterns

---

_Last updated after performance, SEO, mobile optimization, Experience card redesign, and test coverage improvements_
