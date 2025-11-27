import { theme, themeClass } from '@/lib/theme-utils';

describe('theme-utils', () => {
  describe('theme object', () => {
    describe('bg (background classes)', () => {
      it('should have surface class', () => {
        expect(theme.bg.surface).toBe('bg-[var(--color-surface)]');
      });

      it('should have surfaceSecondary class', () => {
        expect(theme.bg.surfaceSecondary).toBe('bg-[var(--color-surface-secondary)]');
      });

      it('should have interactive class', () => {
        expect(theme.bg.interactive).toBe('bg-[var(--color-interactive-bg)]');
      });

      it('should have interactiveHover class', () => {
        expect(theme.bg.interactiveHover).toBe('hover:bg-[var(--color-interactive-bg-hover)]');
      });
    });

    describe('border (border classes)', () => {
      it('should have default border class', () => {
        expect(theme.border.default).toBe('border-[var(--color-border)]');
      });

      it('should have light border class', () => {
        expect(theme.border.light).toBe('border-[var(--color-border-light)]');
      });

      it('should have hover border class', () => {
        expect(theme.border.hover).toBe('hover:border-[var(--color-border-hover)]');
      });
    });

    describe('text (text classes)', () => {
      it('should have primary text class', () => {
        expect(theme.text.primary).toBe('text-[var(--color-text-primary)]');
      });

      it('should have secondary text class', () => {
        expect(theme.text.secondary).toBe('text-[var(--color-text-secondary)]');
      });

      it('should have tertiary text class', () => {
        expect(theme.text.tertiary).toBe('text-[var(--color-text-tertiary)]');
      });

      it('should have muted text class', () => {
        expect(theme.text.muted).toBe('text-[var(--color-text-muted)]');
      });

      it('should have interactive text class', () => {
        expect(theme.text.interactive).toBe('text-[var(--color-interactive)]');
      });

      it('should have interactiveHover text class', () => {
        expect(theme.text.interactiveHover).toBe('hover:text-[var(--color-interactive-hover)]');
      });
    });

    describe('badge (badge classes)', () => {
      it('should have base badge class', () => {
        expect(theme.badge.base).toBe(
          'bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] border-[var(--color-badge-border)]'
        );
      });
    });

    describe('navbar (navbar classes)', () => {
      it('should have navbar bg class', () => {
        expect(theme.navbar.bg).toBe('bg-[var(--color-navbar-bg)]');
      });

      it('should have navbar border class', () => {
        expect(theme.navbar.border).toBe('border-[var(--color-navbar-border)]');
      });

      it('should have navbar active class', () => {
        expect(theme.navbar.active).toBe(
          'bg-[var(--color-nav-active)] text-[var(--color-nav-active-text)]'
        );
      });
    });

    describe('footer (footer classes)', () => {
      it('should have footer text class', () => {
        expect(theme.footer.text).toBe('text-[var(--color-footer-text)]');
      });
    });

    describe('components (component combinations)', () => {
      it('should have card component class', () => {
        expect(theme.components.card).toBe(
          'bg-[var(--color-surface)] border-[var(--color-border)] rounded-xl'
        );
      });

      it('should have cardHover component class', () => {
        expect(theme.components.cardHover).toContain('bg-[var(--color-surface)]');
        expect(theme.components.cardHover).toContain('hover:border-[var(--color-border-hover)]');
      });

      it('should have button component class', () => {
        expect(theme.components.button).toContain('bg-[var(--color-interactive-bg)]');
        expect(theme.components.button).toContain('text-[var(--color-interactive)]');
      });

      it('should have input component class', () => {
        expect(theme.components.input).toContain('bg-[var(--color-surface)]');
        expect(theme.components.input).toContain('text-[var(--color-text-primary)]');
      });
    });
  });

  describe('themeClass function', () => {
    it('should join multiple classes with space', () => {
      expect(themeClass('class1', 'class2', 'class3')).toBe('class1 class2 class3');
    });

    it('should handle a single class', () => {
      expect(themeClass('single-class')).toBe('single-class');
    });

    it('should handle empty strings', () => {
      expect(themeClass('', 'class1', '')).toBe(' class1 ');
    });

    it('should work with theme object classes', () => {
      expect(themeClass(theme.bg.surface, theme.text.primary)).toBe(
        'bg-[var(--color-surface)] text-[var(--color-text-primary)]'
      );
    });
  });
});
