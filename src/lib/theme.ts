/**
 * Centralized Theme Configuration
 * 
 * All color tokens for light and dark modes are defined here.
 * To change colors, simply update the values below.
 */

export const theme = {
  light: {
    // Base colors
    background: '#ffffff',
    foreground: '#262626',
    
    // Surface colors (cards, containers)
    surface: '#ffffff',
    surfaceSecondary: '#f9fafb', // gray-50
    
    // Border colors
    border: '#e5e7eb', // gray-200
    borderLight: '#f3f4f6', // gray-100
    borderHover: '#d1d5db', // gray-300
    
    // Text colors
    textPrimary: '#111827', // gray-900
    textSecondary: '#4b5563', // gray-600
    textTertiary: '#6b7280', // gray-500
    textMuted: '#9ca3af', // gray-400
    
    // Interactive colors
    interactive: '#262626',
    interactiveHover: '#111827', // gray-900
    interactiveBg: '#f3f4f6', // gray-100
    interactiveBgHover: '#e5e7eb', // gray-200
    
    // Focus colors
    focus: '#737373', // neutral-500
    
    // Badge/Accent colors
    badgeBg: '#f3f4f6', // gray-100
    badgeText: '#4b5563', // gray-600
    badgeBorder: '#d1d5db', // gray-300
    
    // Navbar
    navbarBg: 'rgba(255, 255, 255, 0.7)',
    navbarBorder: '#f3f4f6', // gray-100
    navActive: '#262626',
    navActiveText: '#ffffff',
    
    // Footer
    footerText: '#6b7280', // gray-500
  },
  
  dark: {
    // Base colors - Rich dark with subtle warmth
    background: '#0f0f0f',
    foreground: '#e8e8e8',
    
    // Surface colors - Elevated cards with depth
    surface: '#1a1a1a',
    surfaceSecondary: 'rgba(26, 26, 26, 0.6)',
    
    // Border colors - Subtle but defined
    border: '#2d2d2d',
    borderLight: '#1f1f1f',
    borderHover: '#3a3a3a',
    
    // Text colors - High contrast, easy to read
    textPrimary: '#f0f0f0',
    textSecondary: '#c8c8c8',
    textTertiary: '#9a9a9a',
    textMuted: '#6e6e6e',
    
    // Interactive colors - Subtle highlights
    interactive: '#e8e8e8',
    interactiveHover: '#ffffff',
    interactiveBg: '#2a2a2a',
    interactiveBgHover: '#353535',
    
    // Focus colors - Visible but not harsh
    focus: '#888888',
    
    // Badge/Accent colors - Elevated appearance
    badgeBg: '#252525',
    badgeText: '#d0d0d0',
    badgeBorder: '#353535',
    
    // Navbar - Glass morphism effect
    navbarBg: 'rgba(15, 15, 15, 0.8)',
    navbarBorder: '#1f1f1f',
    navActive: '#2a2a2a',
    navActiveText: '#f0f0f0',
    
    // Footer
    footerText: '#9a9a9a',
  },
} as const;

export type Theme = typeof theme;

