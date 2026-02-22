import { ReactNode } from 'react';
import { siteConfig } from '@/data/content';
import Navbar from './Navbar';

export default function PageWrapper({ children }: { children: ReactNode }) {
  return (
    <main
      id="main-content"
      className="min-h-screen bg-[var(--color-surface-secondary)] md:py-8 px-4 sm:px-6 lg:px-8 flex flex-col items-center text-base"
      role="main"
    >
      <div className="w-full md:w-[80%] bg-[var(--color-surface)] rounded-none md:rounded-3xl shadow-none md:shadow-xl overflow-hidden">
        <div className="p-6 sm:p-8 md:p-12">
          <Navbar />
          <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">{children}</div>
        </div>
      </div>
      <footer
        className="text-center text-[var(--color-footer-text)] text-sm mt-12 pb-6"
        role="contentinfo"
      >
        <p>{siteConfig.footer.copyrightText}</p>
      </footer>
    </main>
  );
}
