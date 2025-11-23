'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Clock, PenTool, User } from 'lucide-react';
import { useState, useEffect } from 'react';
import ThemeToggle from './ThemeToggle';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [
        { path: '/', name: 'Home', icon: Home },
        { path: '/now', name: 'Now', icon: Clock },
        { path: '/blog', name: 'Blog', icon: PenTool },
        { path: '/appearances', name: 'Appearances', icon: User },
    ];

    const [isCommandOpen, setIsCommandOpen] = useState(false);

    useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setIsCommandOpen((open) => !open);
            }
        };
        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    return (
        <>
            <nav className="sticky top-0 z-40 w-full backdrop-blur-sm bg-[var(--color-navbar-bg)] border-b border-[var(--color-navbar-border)] mb-8 md:mb-12 rounded-2xl">
                <div className="max-w-screen-xl mx-auto px-4">
                    <div className="flex items-center justify-between h-16">
                        <div className="flex-1 flex justify-center md:justify-start gap-1 md:gap-2">
                            {navItems.map((item) => { // Changed 'links' to 'navItems' and 'link' to 'item'
                                const Icon = item.icon;
                                const isActive = pathname === item.path || (item.path !== '/' && pathname.startsWith(item.path)); // Adjusted isActive logic for sub-paths
                                return (
                                    <Link
                                        key={item.path}
                                        href={item.path}
                                        className={cn(
                                            "flex items-center gap-2 px-4 py-2 rounded-full text-sm font-medium transition-all duration-200",
                                            isActive
                                                ? "bg-[var(--color-nav-active)] text-[var(--color-nav-active-text)] shadow-md"
                                                : "text-[var(--color-text-secondary)] hover:bg-[var(--color-interactive-bg)] hover:text-[var(--color-text-primary)]"
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
                                onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                                className="p-2 text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:bg-[var(--color-interactive-bg)] rounded-full transition-colors"
                                aria-label="Open Command Menu"
                            >
                                <span className="sr-only">Open Command Menu</span>
                                <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-command"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" /></svg>
                            </button>
                        </div>
                    </div>
                </div>
            </nav>
        </>
    );
}
