'use client';

import * as React from 'react';
import { Command } from 'cmdk';
import { useRouter } from 'next/navigation';
import {
  Home,
  Info,
  Briefcase,
  FolderGit2,
  User,
  Mail,
  PenTool,
  Clock,
  Github,
  Linkedin,
  Twitter,
  Copy,
  Code,
  Search,
  Circle,
  FileText,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { handleNavigationAction } from '@/lib/command-helpers';

/** Icon map for command menu items - avoids `import *` which defeats tree-shaking */
const COMMAND_ICONS: Record<string, LucideIcon> = {
  Home,
  Info,
  Briefcase,
  FolderGit2,
  User,
  Mail,
  PenTool,
  Clock,
  Github,
  Linkedin,
  Twitter,
  Copy,
  Code,
  FileText,
};

const getIcon = (iconName: string): React.ReactElement => {
  const Icon = COMMAND_ICONS[iconName];
  return Icon ? <Icon className="w-4 h-4" /> : <Circle className="w-4 h-4" />;
};

interface CommandMenuProps {
  posts?: Array<{
    slug: string;
    title: string;
  }>;
}

export default function CommandMenu({ posts = [] }: CommandMenuProps) {
  const siteConfig = useContent();
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

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[9999] flex items-start pt-[15vh] sm:items-center sm:pt-0 justify-center p-4 px-2">
      <div
        className="absolute inset-0 bg-black/50 backdrop-blur-sm animate-in fade-in duration-200 z-0"
        onClick={() => setOpen(false)}
      />
      <div className="relative w-full max-w-[640px] bg-white dark:bg-neutral-800 rounded-xl shadow-2xl border border-gray-200 dark:border-neutral-700 overflow-hidden animate-in zoom-in-95 duration-200 z-10">
        <Command label={siteConfig.ui.commandMenu.open} className="w-full" loop>
          <div className="flex items-center border-b border-gray-100 dark:border-neutral-700 px-4">
            <Search className="w-5 h-5 text-gray-400 dark:text-neutral-500 mr-2" />
            <Command.Input
              placeholder={siteConfig.ui.commandMenu.placeholder}
              className="w-full h-14 outline-none focus:outline-none focus:ring-0 focus-visible:outline-none focus-visible:ring-0 border-none ring-0 text-lg text-gray-900 dark:text-neutral-100 placeholder:text-gray-400 dark:placeholder:text-neutral-500 bg-transparent shadow-none appearance-none"
            />
            <button
              type="button"
              className="text-xs font-medium text-gray-400 dark:text-neutral-500 border border-gray-200 dark:border-neutral-700 rounded px-3 py-2 min-h-[36px] cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
              onClick={() => setOpen(false)}
            >
              {siteConfig.ui.commandMenu.esc}
            </button>
          </div>

          <Command.List className="max-h-[300px] overflow-y-auto overflow-x-hidden p-2 scroll-py-2">
            <Command.Empty className="py-6 text-center text-sm text-gray-500 dark:text-neutral-400">
              {siteConfig.ui.commandMenu.noResults}
            </Command.Empty>

            <Command.Group
              heading={siteConfig.ui.commandMenu.headings.navigation}
              className="text-xs font-medium text-gray-400 dark:text-neutral-500 px-2 py-2 mb-2"
            >
              {siteConfig.commandMenu.navigation.map((item) => (
                <Command.Item
                  key={item.name}
                  onSelect={() => runCommand(() => handleNavigationAction(item, router, () => {}))}
                  className="flex items-center gap-3 px-3 py-3 text-sm text-gray-800 dark:text-neutral-200 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:hover:text-neutral-100 aria-selected:bg-gray-100 dark:aria-selected:bg-neutral-700 aria-selected:text-gray-900 dark:aria-selected:text-neutral-100 transition-colors"
                >
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="h-px bg-gray-100 dark:bg-neutral-700 my-3 mx-2" />

            {posts.length > 0 && (
              <>
                <Command.Group
                  heading={siteConfig.ui.commandMenu.headings.journal}
                  className="text-xs font-medium text-gray-400 dark:text-neutral-500 px-2 py-2 mb-2"
                >
                  {posts.map((post: { slug: string; title: string }) => (
                    <Command.Item
                      key={post.slug}
                      onSelect={() => runCommand(() => router.push(`/blog/${post.slug}`))}
                      className="flex items-center gap-3 px-3 py-3 text-sm text-gray-800 dark:text-neutral-200 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:hover:text-neutral-100 aria-selected:bg-gray-100 dark:aria-selected:bg-neutral-700 aria-selected:text-gray-900 dark:aria-selected:text-neutral-100 transition-colors"
                    >
                      <FileText className="w-4 h-4" />
                      <span>{post.title}</span>
                    </Command.Item>
                  ))}
                </Command.Group>
                <Command.Separator className="h-px bg-gray-100 dark:bg-neutral-700 my-3 mx-2" />
              </>
            )}

            <Command.Group
              heading={siteConfig.ui.commandMenu.headings.social}
              className="text-xs font-medium text-gray-400 dark:text-neutral-500 px-2 py-2 mb-2"
            >
              {siteConfig.commandMenu.social.map((item) => (
                <Command.Item
                  key={item.name}
                  onSelect={() => runCommand(() => window.open(item.url, '_blank'))}
                  className="flex items-center gap-3 px-3 py-3 text-sm text-gray-800 dark:text-neutral-200 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:hover:text-neutral-100 aria-selected:bg-gray-100 dark:aria-selected:bg-neutral-700 aria-selected:text-gray-900 dark:aria-selected:text-neutral-100 transition-colors"
                >
                  {getIcon(item.icon)}
                  <span>{item.name}</span>
                </Command.Item>
              ))}
            </Command.Group>

            <Command.Separator className="h-px bg-gray-100 dark:bg-neutral-700 my-3 mx-2" />

            <Command.Group
              heading={siteConfig.ui.commandMenu.headings.general}
              className="text-xs font-medium text-gray-400 dark:text-neutral-500 px-2 py-2 mb-2"
            >
              {siteConfig.commandMenu.general.map((item) => (
                <Command.Item
                  key={item.name}
                  onSelect={() =>
                    runCommand(() => {
                      if (item.action === 'copy_email') {
                        navigator.clipboard.writeText(siteConfig.personal.email);
                        alert('Email copied to clipboard!');
                      } else if (item.url) {
                        window.open(item.url, '_blank');
                      }
                    })
                  }
                  className="flex items-center gap-3 px-3 py-2.5 text-sm text-gray-800 dark:text-neutral-200 rounded-lg cursor-pointer hover:bg-gray-100 dark:hover:bg-neutral-700 hover:text-gray-900 dark:hover:text-neutral-100 aria-selected:bg-gray-100 dark:aria-selected:bg-neutral-700 aria-selected:text-gray-900 dark:aria-selected:text-neutral-100 transition-colors"
                >
                  {getIcon(item.icon)}
                  <span>
                    {item.action === 'copy_email'
                      ? siteConfig.ui.commandMenu.actions.copyEmail
                      : item.name === 'View Source Code'
                        ? siteConfig.ui.commandMenu.actions.sourceCode
                        : item.name}
                  </span>
                </Command.Item>
              ))}
            </Command.Group>
          </Command.List>
        </Command>
      </div>
    </div>
  );
}
