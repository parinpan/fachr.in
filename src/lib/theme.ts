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
    // Base colors (soft black/grey)
    background: '#1a1a1a', // neutral-900
    foreground: '#e5e5e5', // neutral-200
    
    // Surface colors (cards, containers)
    surface: '#262626', // neutral-800
    surfaceSecondary: 'rgba(38, 38, 38, 0.5)', // neutral-800/50
    
    // Border colors
    border: '#404040', // neutral-700
    borderLight: '#262626', // neutral-800
    borderHover: '#525252', // neutral-600
    
    // Text colors
    textPrimary: '#f5f5f5', // neutral-100
    textSecondary: '#d4d4d4', // neutral-300
    textTertiary: '#a3a3a3', // neutral-400
    textMuted: '#737373', // neutral-500
    
    // Interactive colors
    interactive: '#f5f5f5', // neutral-100
    interactiveHover: '#ffffff', // neutral-50
    interactiveBg: '#404040', // neutral-700
    interactiveBgHover: '#525252', // neutral-600
    
    // Focus colors
    focus: '#a3a3a3', // neutral-400
    
    // Badge/Accent colors
    badgeBg: '#404040', // neutral-700
    badgeText: '#d4d4d4', // neutral-300
    badgeBorder: '#525252', // neutral-600
    
    // Navbar
    navbarBg: 'rgba(26, 26, 26, 0.7)', // neutral-900/70
    navbarBorder: '#262626', // neutral-800
    navActive: '#f5f5f5', // neutral-100
    navActiveText: '#171717', // neutral-900
    
    // Footer
    footerText: '#a3a3a3', // neutral-400
  },
} as const;

export type Theme = typeof theme;

