import Link from 'next/link';
import { ArrowLeft, Terminal } from 'lucide-react';
import { siteConfig } from '@/data/content';

export default function NotFound() {
  return (
    <div className="relative min-h-screen w-full flex flex-col items-center justify-center bg-[var(--color-bg)] text-[var(--color-text-primary)] px-4 overflow-hidden">
      {/* Radial Gradient */}
      <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-violet-900/20 via-transparent to-transparent" />

      <div className="relative z-10 w-full max-w-2xl text-center space-y-8">
        {/* Terminal Icon */}
        <div className="flex justify-center">
          <div className="p-4 bg-violet-950/50 dark:bg-violet-950/50 backdrop-blur-sm rounded-2xl border border-violet-500/30">
            <Terminal size={48} className="text-violet-400" />
          </div>
        </div>

        {/* 404 Title */}
        <div className="space-y-2">
          <h1 className="text-9xl font-black text-transparent bg-clip-text bg-gradient-to-b from-violet-600 via-violet-400 to-violet-300 dark:from-white dark:via-violet-200 dark:to-violet-500">
            404
          </h1>
          <h2 className="text-3xl font-bold text-violet-700 dark:text-violet-200">
            {siteConfig.ui.notFound.subtitle}
          </h2>
        </div>

        {/* Error Message */}
        <div className="bg-violet-100/50 dark:bg-violet-950/30 backdrop-blur-md rounded-lg border border-violet-300/50 dark:border-violet-500/30 p-6">
          <p className="text-lg text-violet-800 dark:text-violet-100 font-mono">
            {siteConfig.ui.notFound.description}
          </p>
        </div>

        {/* Back Button */}
        <div className="pt-4">
          <Link
            href="/"
            className="group inline-flex items-center gap-3 px-8 py-4 bg-gradient-to-r from-violet-600 to-purple-600 hover:from-violet-500 hover:to-purple-500 text-white rounded-lg font-semibold text-base transition-all hover:scale-105 active:scale-95 shadow-lg shadow-violet-500/50"
          >
            <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
            <span>{siteConfig.ui.notFound.buttonText}</span>
          </Link>
        </div>

        {/* Terminal Hint */}
        <div className="pt-8">
          <p className="text-sm text-violet-400/60 font-mono">
            <span className="text-violet-400">$</span> {siteConfig.ui.notFound.backButton}
          </p>
        </div>
      </div>
    </div>
  );
}
