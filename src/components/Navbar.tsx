'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Command } from 'lucide-react';
import { cn } from '@/lib/utils';
import { useContent } from '@/hooks/useContent';
import ThemeToggle from './ThemeToggle';
import { NAV_ITEMS, getNavItemActiveState } from '@/lib/navigation';
import type { CommandMenuItem } from '@/data/types';

export default function Navbar() {
  const pathname = usePathname();
  const siteConfig = useContent();

  const navItems = NAV_ITEMS.map((item) => ({
    ...item,
    name:
      siteConfig.commandMenu.navigation.find((n: CommandMenuItem) => n.path === item.path)?.name ||
      item.path,
  }));

  return (
    <nav className="sticky top-0 z-40 w-full backdrop-blur-sm bg-[var(--color-navbar-bg)] border-b border-[var(--color-navbar-border)] mb-8 md:mb-12 rounded-2xl">
      <div className="max-w-screen-xl mx-auto px-4">
        <div className="flex items-center justify-between h-16">
          <div className="flex-1 flex justify-center md:justify-start gap-1 md:gap-2">
            {navItems.map((item) => {
              const Icon = item.icon;
              const isActive = getNavItemActiveState(pathname, item.path);
              return (
                <Link
                  key={item.path}
                  href={item.path}
                  className={cn(
                    'flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200',
                    isActive
                      ? 'bg-[var(--color-nav-active)] text-[var(--color-nav-active-text)] shadow-md'
                      : 'text-[var(--color-text-secondary)] hover:bg-[var(--color-interactive-bg)] hover:text-[var(--color-text-primary)]'
                  )}
                >
                  <Icon size={16} />
                  <span className="hidden md:inline">{item.name}</span>
                </Link>
              );
            })}
          </div>

          <div className="flex items-center gap-1 md:gap-2">
            <ThemeToggle />
            <button
              onClick={() =>
                document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))
              }
              className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-interactive-bg)] rounded-full transition-colors"
              aria-label={siteConfig.ui.commandMenu.open}
            >
              <Command size={20} />
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
