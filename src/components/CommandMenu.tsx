'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import * as Icons from 'lucide-react';
import { siteConfig } from '@/data/content';

const getIcon = (iconName: string) => {
    const Icon = (Icons as any)[iconName];
    return Icon ? <Icon className="w-4 h-4" /> : <Icons.Circle className="w-4 h-4" />;
};

interface CommandMenuProps {
    posts?: Array<{
        slug: string;
        title: string;
    }>;
}

export default function CommandMenu({ posts = [] }: CommandMenuProps) {
    const [open, setOpen] = React.useState(false);
    const router = useRouter();

    React.useEffect(() => {
        const down = (e: KeyboardEvent) => {
            if (e.key === 'k' && (e.metaKey || e.ctrlKey)) {
                e.preventDefault();
                setOpen((open) => !open);
            }
            if (e.key === 'Escape') {
                setOpen(false);
            }
        };

        document.addEventListener('keydown', down);
        return () => document.removeEventListener('keydown', down);
    }, []);

    const runCommand = React.useCallback((command: () => void) => {
        setOpen(false);
        command();
    }, []);

    const handleNavigation = (item: any) => {
        if (item.path) {
            runCommand(() => router.push(item.path));
        } else if (item.id) {
            runCommand(() => {
                // If we're not on home page, go there first
                if (window.location.pathname !== '/') {
                    router.push('/');
                    // Wait for navigation then scroll
                    setTimeout(() => {
                        const el = document.getElementById(item.id);
                        if (el) el.scrollIntoView({ behavior: 'smooth' });
                    }, 500);
                } else {
                    const el = document.getElementById(item.id);
                    if (el) el.scrollIntoView({ behavior: 'smooth' });
                }
            });
        }
    };

    if (!open) return null;

    return (
        <div className="fixed inset-0 z-[9999] flex items-center justify-center p-4 px-2">
            <div
                className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 z-0"
                onClick={() => setOpen(false)}
            />
            <div className="relative w-full max-w-[640px] bg-white rounded-xl shadow-2xl border border-gray-200 overflow-hidden animate-in zoom-in-95 duration-200 z-10">
                <Command
                    label="Global Command Menu"
                    className="w-full"
                    loop
                >
                    {/* ... (Command.Input remains the same) */}
                    <div className="flex items-center border-b border-gray-100 px-4">
                        <Icons.Search className="w-5 h-5 text-gray-400 mr-2" />
                        <Command.Input
                            placeholder="Type a command or search..."
                            className="w-full h-14 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none ring-0 text-lg text-gray-900 placeholder:text-gray-400 bg-transparent shadow-none appearance-none"
                            style={{ boxShadow: 'none', outline: 'none' }}
                        />
                        <div
                            className="text-xs font-medium text-gray-400 border border-gray-200 rounded px-2 py-1 cursor-pointer hover:bg-gray-100"
                            onClick={() => setOpen(false)}
                        >
                            ESC
                        </div>
                    </div>

                    <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 scroll-py-2">
                        <Command.Empty className="py-6 text-center text-sm text-gray-500">
                            No results found.
                        </Command.Empty>

                        <Command.Group heading="Navigation" className="text-xs font-medium text-gray-400 px-2 py-2 mb-2">
                            {siteConfig.commandMenu.navigation.map((item) => (
                                <Command.Item
                                    key={item.name}
                                    onSelect={() => handleNavigation(item)}
                                    className="flex items-center gap-3 px-3 py-3 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-900 aria-selected:bg-gray-100 aria-selected:text-gray-900 transition-colors"
                                >
                                    {getIcon(item.icon)}
                                    <span>{item.name}</span>
                                </Command.Item>
                            ))}
                        </Command.Group>

                        <Command.Separator className="h-px bg-gray-100 my-3 mx-2" />

                        {posts.length > 0 && (
                            <>
                                <Command.Group heading="Journal" className="text-xs font-medium text-gray-400 px-2 py-2 mb-2">
                                    {posts.map((post) => (
                                        <Command.Item
                                            key={post.slug}
                                            onSelect={() => runCommand(() => router.push(`/blog/${post.slug}`))}
                                            className="flex items-center gap-3 px-3 py-3 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-900 aria-selected:bg-gray-100 aria-selected:text-gray-900 transition-colors"
                                        >
                                            <Icons.FileText className="w-4 h-4" />
                                            <span>{post.title}</span>
                                        </Command.Item>
                                    ))}
                                </Command.Group>
                                <Command.Separator className="h-px bg-gray-100 my-3 mx-2" />
                            </>
                        )}

                        <Command.Group heading="Social" className="text-xs font-medium text-gray-400 px-2 py-2 mb-2">
                            {/* ... (social items remain the same) */}
                            {siteConfig.commandMenu.social.map((item) => (
                                <Command.Item
                                    key={item.name}
                                    onSelect={() => runCommand(() => window.open(item.url, '_blank'))}
                                    className="flex items-center gap-3 px-3 py-3 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-900 aria-selected:bg-gray-100 aria-selected:text-gray-900 transition-colors"
                                >
                                    {getIcon(item.icon)}
                                    <span>{item.name}</span>
                                </Command.Item>
                            ))}
                        </Command.Group>

                        <Command.Separator className="h-px bg-gray-100 my-3 mx-2" />

                        <Command.Group heading="General" className="text-xs font-medium text-gray-400 px-2 py-2 mb-2">
                            {/* ... (general items remain the same) */}
                            {siteConfig.commandMenu.general.map((item) => (
                                <Command.Item
                                    key={item.name}
                                    onSelect={() => runCommand(() => {
                                        if (item.action === 'copy_email') {
                                            navigator.clipboard.writeText(siteConfig.personal.email);
                                            alert('Email copied to clipboard!');
                                        } else if (item.url) {
                                            window.open(item.url, '_blank');
                                        }
                                    })}
                                    className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-700 rounded-lg cursor-pointer hover:bg-gray-100 hover:text-gray-900 aria-selected:bg-gray-100 aria-selected:text-gray-900 transition-colors"
                                >
                                    {getIcon(item.icon)}
                                    <span>{item.name}</span>
                                </Command.Item>
                            ))}
                        </Command.Group>
                    </Command.List>
                </Command>
            </div>
        </div>
    );
}
