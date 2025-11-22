# Theme System Guide

## 🎨 Centralized Theme Configuration

All theme colors are now centralized in **two places**:

1. **`src/lib/theme.ts`** - TypeScript theme configuration (reference)
2. **`src/app/globals.css`** - CSS custom properties (actual implementation)

## 🚀 How to Change Colors

### Quick Method (Recommended)
Edit `src/app/globals.css` and update the CSS variable values:

```css
:root {
  --color-surface: #ffffff;  /* Change this for light mode */
}

:root.dark {
  --color-surface: #262626;  /* Change this for dark mode */
}
```

That's it! All components using these variables will automatically update.

## 📝 Using Theme Colors in Components

### Method 1: Direct CSS Variables (Recommended)
```tsx
<div className="bg-[var(--color-surface)] text-[var(--color-text-primary)]">
```

### Method 2: Theme Utility Helper
```tsx
import { theme } from '@/lib/theme-utils';

<div className={theme.bg.surface}>
<div className={theme.text.primary}>
<div className={theme.components.card}>
```

## 🎯 Available Color Tokens

### Backgrounds
- `--color-bg` - Main page background
- `--color-surface` - Card/container backgrounds
- `--color-surface-secondary` - Secondary surfaces
- `--color-interactive-bg` - Interactive element backgrounds
- `--color-interactive-bg-hover` - Interactive hover backgrounds

### Borders
- `--color-border` - Default borders
- `--color-border-light` - Light borders
- `--color-border-hover` - Hover border color

### Text
- `--color-text-primary` - Primary text (headings, important content)
- `--color-text-secondary` - Secondary text (body, descriptions)
- `--color-text-tertiary` - Tertiary text (metadata, labels)
- `--color-text-muted` - Muted text (subtle information)

### Interactive Elements
- `--color-interactive` - Interactive element color
- `--color-interactive-hover` - Interactive hover color

### Special Components
- `--color-navbar-bg` - Navbar background
- `--color-navbar-border` - Navbar border
- `--color-nav-active` - Active nav item background
- `--color-nav-active-text` - Active nav item text
- `--color-footer-text` - Footer text color
- `--color-badge-bg` - Badge background
- `--color-badge-text` - Badge text
- `--color-badge-border` - Badge border
- `--color-focus` - Focus outline color

## 🔄 Migration Example

**Before:**
```tsx
<div className="bg-white dark:bg-neutral-800 text-gray-900 dark:text-neutral-100">
```

**After:**
```tsx
<div className="bg-[var(--color-surface)] text-[var(--color-text-primary)]">
```

## ✨ Benefits

1. **Single Source of Truth** - Change colors in one place
2. **Automatic Dark Mode** - Colors adapt automatically
3. **Type Safety** - TypeScript theme config available
4. **Easy Maintenance** - No need to update multiple components
5. **Consistent** - All components use the same color system

## 📚 Example: Changing the Dark Mode Background

1. Open `src/app/globals.css`
2. Find `:root.dark { --color-bg: #1a1a1a; }`
3. Change to your desired color: `--color-bg: #0f0f0f;`
4. Save - all components update automatically!

That's it! No need to touch any component files. 🎉

