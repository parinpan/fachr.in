import { Home, Clock, PenTool, User } from 'lucide-react';
import { LucideIcon } from 'lucide-react';

export interface NavItem {
    path: string;
    icon: LucideIcon;
    name?: string;
}

/**
 * Navigation Items Configuration
 * Centralized navigation items for Navbar and CommandMenu
 */
export const NAV_ITEMS: Omit<NavItem, 'name'>[] = [
    { path: '/', icon: Home },
    { path: '/now', icon: Clock },
    { path: '/blog', icon: PenTool },
    { path: '/appearances', icon: User },
];

/**
 * Get Active State Helper
 * Determines if a nav item is active based on current pathname
 */
export function getNavItemActiveState(pathname: string, itemPath: string): boolean {
    return pathname === itemPath || (itemPath !== '/' && pathname.startsWith(itemPath));
}
