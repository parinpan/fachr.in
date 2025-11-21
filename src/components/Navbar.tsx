'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { cn } from '@/lib/utils';
import { Home, Clock, PenTool } from 'lucide-react';
import { useState, useEffect } from 'react';

export default function Navbar() {
    const pathname = usePathname();

    const navItems = [ // Renamed 'links' to 'navItems' to match the provided code
        { path: '/', name: 'Home', icon: Home }, // Changed 'href' to 'path' and 'label' to 'name'
        { path: '/now', name: 'Now', icon: Clock },
        { path: '/blog', name: 'Blog', icon: PenTool },
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
            <nav className="sticky top-0 z-40 w-full backdrop-blur-sm bg-white/70 border-b border-gray-100 mb-8 md:mb-12 rounded-2xl">
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
                                                ? "bg-[#262626] text-white shadow-md"
                                                : "text-gray-600 hover:bg-gray-100 hover:text-gray-900"
                                        )}
                                    >
                                        <Icon size={16} />
                                        <span className="hidden md:inline">{item.name}</span>
                                    </Link>
                                );
                            })}
                        </div>

                        <button
                            onClick={() => document.dispatchEvent(new KeyboardEvent('keydown', { key: 'k', metaKey: true }))}
                            className="p-2 text-gray-500 hover:text-gray-900 hover:bg-gray-100 rounded-full transition-colors ml-2"
                            aria-label="Open Command Menu"
                        >
                            <span className="sr-only">Open Command Menu</span>
                            <svg xmlns="http://www.w3.org/2000/svg" width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="lucide lucide-command"><path d="M15 6v12a3 3 0 1 0 3-3H6a3 3 0 1 0 3 3V6a3 3 0 1 0-3 3h12a3 3 0 1 0-3-3" /></svg>
                        </button>
                    </div>
                </div>
            </nav>
        </>
    );
}
