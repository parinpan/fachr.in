import { theme, Theme } from '@/lib/theme';

describe('theme', () => {
  describe('light theme', () => {
    it('should have background color', () => {
      expect(theme.light.background).toBe('#ffffff');
    });

    it('should have foreground color', () => {
      expect(theme.light.foreground).toBe('#262626');
    });

    it('should have surface colors', () => {
      expect(theme.light.surface).toBe('#ffffff');
      expect(theme.light.surfaceSecondary).toBe('#f9fafb');
    });

    it('should have border colors', () => {
      expect(theme.light.border).toBe('#e5e7eb');
      expect(theme.light.borderLight).toBe('#f3f4f6');
      expect(theme.light.borderHover).toBe('#d1d5db');
    });

    it('should have text colors', () => {
      expect(theme.light.textPrimary).toBe('#111827');
      expect(theme.light.textSecondary).toBe('#4b5563');
      expect(theme.light.textTertiary).toBe('#6b7280');
      expect(theme.light.textMuted).toBe('#9ca3af');
    });

    it('should have interactive colors', () => {
      expect(theme.light.interactive).toBe('#262626');
      expect(theme.light.interactiveHover).toBe('#111827');
      expect(theme.light.interactiveBg).toBe('#f3f4f6');
      expect(theme.light.interactiveBgHover).toBe('#e5e7eb');
    });

    it('should have focus color', () => {
      expect(theme.light.focus).toBe('#737373');
    });

    it('should have badge colors', () => {
      expect(theme.light.badgeBg).toBe('#f3f4f6');
      expect(theme.light.badgeText).toBe('#4b5563');
      expect(theme.light.badgeBorder).toBe('#d1d5db');
    });

    it('should have navbar colors', () => {
      expect(theme.light.navbarBg).toBe('rgba(255, 255, 255, 0.7)');
      expect(theme.light.navbarBorder).toBe('#f3f4f6');
      expect(theme.light.navActive).toBe('#262626');
      expect(theme.light.navActiveText).toBe('#ffffff');
    });

    it('should have footer text color', () => {
      expect(theme.light.footerText).toBe('#6b7280');
    });
  });

  describe('dark theme', () => {
    it('should have background color', () => {
      expect(theme.dark.background).toBe('#0f0f0f');
    });

    it('should have foreground color', () => {
      expect(theme.dark.foreground).toBe('#e8e8e8');
    });

    it('should have surface colors', () => {
      expect(theme.dark.surface).toBe('#1a1a1a');
      expect(theme.dark.surfaceSecondary).toBe('rgba(26, 26, 26, 0.6)');
    });

    it('should have border colors', () => {
      expect(theme.dark.border).toBe('#2d2d2d');
      expect(theme.dark.borderLight).toBe('#1f1f1f');
      expect(theme.dark.borderHover).toBe('#3a3a3a');
    });

    it('should have text colors', () => {
      expect(theme.dark.textPrimary).toBe('#f0f0f0');
      expect(theme.dark.textSecondary).toBe('#c8c8c8');
      expect(theme.dark.textTertiary).toBe('#9a9a9a');
      expect(theme.dark.textMuted).toBe('#6e6e6e');
    });

    it('should have interactive colors', () => {
      expect(theme.dark.interactive).toBe('#e8e8e8');
      expect(theme.dark.interactiveHover).toBe('#ffffff');
      expect(theme.dark.interactiveBg).toBe('#2a2a2a');
      expect(theme.dark.interactiveBgHover).toBe('#353535');
    });

    it('should have focus color', () => {
      expect(theme.dark.focus).toBe('#888888');
    });

    it('should have badge colors', () => {
      expect(theme.dark.badgeBg).toBe('#252525');
      expect(theme.dark.badgeText).toBe('#d0d0d0');
      expect(theme.dark.badgeBorder).toBe('#353535');
    });

    it('should have navbar colors', () => {
      expect(theme.dark.navbarBg).toBe('rgba(15, 15, 15, 0.8)');
      expect(theme.dark.navbarBorder).toBe('#1f1f1f');
      expect(theme.dark.navActive).toBe('#2a2a2a');
      expect(theme.dark.navActiveText).toBe('#f0f0f0');
    });

    it('should have footer text color', () => {
      expect(theme.dark.footerText).toBe('#9a9a9a');
    });
  });

  describe('Theme type', () => {
    it('should be properly typed', () => {
      const typedTheme: Theme = theme;
      expect(typedTheme.light).toBeDefined();
      expect(typedTheme.dark).toBeDefined();
    });
  });
});
