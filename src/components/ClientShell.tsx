'use client';

import dynamic from 'next/dynamic';

const CommandMenu = dynamic(() => import('@/components/CommandMenu'), { ssr: false });
const BackToTop = dynamic(() => import('@/components/BackToTop'), { ssr: false });

interface ClientShellProps {
  posts: { slug: string; title: string }[];
}

export default function ClientShell({ posts }: ClientShellProps) {
  return (
    <>
      <CommandMenu posts={posts} />
      <BackToTop />
    </>
  );
}
