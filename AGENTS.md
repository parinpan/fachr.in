# AGENTS.md - LLM Navigation Guide

This document provides guidelines for AI agents and LLMs working on this codebase. It covers project structure, best practices, common patterns, and potential pitfalls.

## 📁 Project Overview

This is a **Next.js 16** personal portfolio website with:
- **App Router** architecture
- **TypeScript** throughout
- **Tailwind CSS 4** for styling
- **React 19** with Server and Client Components
- **Internationalization** (English/Indonesian)
- **MDX** for blog content

## 🗂 Directory Structure

```
src/
├── app/                    # Next.js App Router pages
│   ├── [locale]/          # Localized routes (en/id)
│   ├── appearances/       # Appearances page
│   ├── blog/              # Blog pages
│   │   └── [slug]/        # Dynamic blog post pages
│   ├── now/               # Now page
│   ├── globals.css        # Global styles & CSS variables
│   ├── layout.tsx         # Root layout
│   └── page.tsx           # Home page
│
├── components/            # React components
│   ├── ui/               # Reusable UI primitives (Badge, Card, etc.)
│   └── *.tsx             # Feature components (Hero, Contact, etc.)
│
├── context/              # React Context providers
│   └── LanguageContext.tsx
│
├── data/                 # Static content data
│   ├── content.ts        # English content
│   ├── content-id.ts     # Indonesian content
│   └── types.ts          # TypeScript types for content
│
├── hooks/                # Custom React hooks
│   ├── useContent.ts     # Language-aware content hook
│   ├── useScroll.ts      # Scroll management
│   └── useVisibility.ts  # Visibility detection
│
├── lib/                  # Utility functions & helpers
│   ├── utils.ts          # cn() helper (clsx + tailwind-merge)
│   ├── constants.ts      # App constants (GitHub config, scroll thresholds)
│   ├── formatters.ts     # Date/number formatters
│   ├── navigation.ts     # Navigation utilities
│   ├── i18n.ts           # Internationalization helpers
│   ├── icon-maps.ts      # Icon component mappings
│   ├── command-helpers.ts # Command menu helpers
│   ├── theme.ts          # Theme color definitions
│   ├── theme-utils.ts    # Theme class generators
│   └── mdx.ts            # MDX/blog utilities
│
├── posts/                # MDX blog posts
│
├── styles/               # Reusable style constants
│   ├── components.ts     # Style patterns for components
│   └── index.ts          # Style exports
│
├── types/                # TypeScript type definitions
│   └── components.ts     # Component prop types
│
├── __tests__/            # Test files (mirrors src structure)
│   ├── components/
│   │   └── ui/
│   ├── hooks/
│   └── lib/
│
└── middleware.ts         # Next.js middleware (locale routing)
```

## 🛠 Development Commands

```bash
npm run dev      # Start development server
npm run build    # Build for production
npm run lint     # Run ESLint
npm run test     # Run Jest tests
npm run test:watch  # Watch mode testing
```

## 🔑 Key Patterns & Conventions

### 1. Component Architecture

**Server vs Client Components:**
- Default to Server Components unless client-side interactivity is needed
- Use `'use client'` directive only when required (hooks, event handlers, browser APIs)
- Client components: `Hero.tsx`, `Experience.tsx`, `Navbar.tsx`, etc.

**Component Structure:**
```tsx
'use client';  // Only if needed

import { useContent } from '@/hooks/useContent';
import { cn } from '@/lib/utils';

export default function ComponentName() {
    const siteConfig = useContent();  // Get localized content
    
    return (
        <section aria-labelledby="section-heading">
            {/* Component JSX */}
        </section>
    );
}
```

### 2. Styling Conventions

**Use CSS Variables for theming** (defined in `globals.css`):
```tsx
// ✅ Preferred - Uses theme system
<div className="bg-[var(--color-surface)] text-[var(--color-text-primary)]">

// ⚠️ Acceptable - Direct Tailwind classes
<div className="bg-white dark:bg-neutral-800 text-gray-900 dark:text-neutral-100">
```

**Use `cn()` for conditional classes:**
```tsx
import { cn } from '@/lib/utils';

<div className={cn(
    "base-styles",
    isActive && "active-styles",
    className  // Pass-through prop
)} />
```

**Avoid:**
- Inline styles
- Extremely long `className` strings (extract to `styles/components.ts`)

### 3. Content & Internationalization

**Content lives in `data/`:**
- `content.ts` - English (default)
- `content-id.ts` - Indonesian
- `types.ts` - TypeScript interfaces

**Always use `useContent()` hook:**
```tsx
const siteConfig = useContent();  // Returns correct language content
// Use: siteConfig.hero.title, siteConfig.contact.links, etc.
```

**Locale routing:**
- English: `/`, `/blog`, `/now`
- Indonesian: `/id`, `/id/blog`, `/id/now`

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
        void fill; void priority; void unoptimized;
        return <img {...props} alt={props.alt || ''} />;
    },
}));

// Mock components with display names (avoid lint errors)
jest.mock('@/components/ThemeToggle', () => 
    function MockThemeToggle() { return <div>ThemeToggle</div>; }
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

## ⚠️ Common Pitfalls

### 1. Duplicate Utilities
- `cn()` is ONLY in `lib/utils.ts` - don't create duplicates
- Check if utility exists before creating new ones

### 2. Test Assertions
- Match EXACT UI strings from `content.ts` (e.g., "Part of my work at" not "Part of work at")
- Check `aria-label` values match component implementation

### 3. Mock Component Props
- Filter Next.js-specific props (`fill`, `priority`, `unoptimized`) in `next/image` mocks
- Add display names to mock functions to avoid React lint warnings

### 4. Content Updates
- When updating English content, update Indonesian content too
- Use the same structure in both `content.ts` and `content-id.ts`

### 5. CSS Variables
- Theme colors are in `globals.css` under `:root` and `:root.dark`
- Don't hardcode colors - use CSS variables for theme consistency

## 📋 Pre-Commit Checklist

Before submitting changes:

1. **Lint passes:** `npm run lint`
2. **Tests pass:** `npm run test`
3. **No TypeScript errors:** Check IDE or `npx tsc --noEmit`
4. **Content in both languages:** If modifying `content.ts`, update `content-id.ts`
5. **Tests for new code:** Add tests for new components/hooks/utilities

## 🔧 Adding New Features

### New Component
1. Create in `src/components/` (or `src/components/ui/` for primitives)
2. Use `'use client'` only if needed
3. Use `useContent()` for text content
4. Add test in `src/__tests__/components/`

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
2. Add localized version in `src/app/[locale]/` if needed
3. Update navigation in `content.ts` and `content-id.ts`

## 📚 Key Files Reference

| Purpose | File |
|---------|------|
| Theme colors | `src/app/globals.css` |
| Theme utilities | `src/lib/theme-utils.ts` |
| Class merging | `src/lib/utils.ts` → `cn()` |
| Content (EN) | `src/data/content.ts` |
| Content (ID) | `src/data/content-id.ts` |
| Content types | `src/data/types.ts` |
| Navigation config | `src/lib/navigation.ts` |
| Locale middleware | `src/middleware.ts` |
| Style patterns | `src/styles/components.ts` |

## 🎯 Quality Standards

1. **Accessibility:** Use semantic HTML, ARIA labels, proper heading hierarchy
2. **Performance:** Prefer Server Components, optimize images with `next/image`
3. **Type Safety:** No `any` types, proper interfaces for all props
4. **Testing:** Aim for comprehensive coverage of user interactions
5. **Documentation:** Update AGENTS.md when adding new patterns

---

*Last updated based on refactoring completed in PR by @copilot*
