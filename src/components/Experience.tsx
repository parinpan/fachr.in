'use client';

import Image from 'next/image';
import { useRef, useState, useEffect } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '@/hooks/useContent';
import { useScroll } from '@/hooks/useScroll';
import { SCROLL_THRESHOLDS } from '@/lib/constants';
import type { ExperienceItem } from '@/data/types';

export default function Experience() {
  const siteConfig = useContent();
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const { canScrollLeft, canScrollRight, scroll, checkScroll } = useScroll(scrollContainerRef);
  const [selectedExp, setSelectedExp] = useState<ExperienceItem | null>(null);

  useEffect(() => {
    if (selectedExp) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [selectedExp]);

  return (
    <section className="mb-8" aria-labelledby="experience-heading">
      <div className="flex items-center justify-between mb-6">
        <h3 id="experience-heading" className="text-2xl font-bold text-[var(--color-text-primary)]">
          {siteConfig.ui.experience.title}
        </h3>
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left', SCROLL_THRESHOLDS.EXPERIENCE_SCROLL_AMOUNT)}
            disabled={!canScrollLeft}
            className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:border-gray-300 dark:hover:border-neutral-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={siteConfig.ui.appearanceList?.scrollLeft || 'Scroll left'}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right', SCROLL_THRESHOLDS.EXPERIENCE_SCROLL_AMOUNT)}
            disabled={!canScrollRight}
            className="p-2 rounded-lg bg-white dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700 text-gray-600 dark:text-neutral-400 hover:text-gray-900 dark:hover:text-neutral-100 hover:border-gray-300 dark:hover:border-neutral-600 transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={siteConfig.ui.appearanceList?.scrollRight || 'Scroll right'}
          >
            <ChevronRight size={20} />
          </button>
        </div>
      </div>

      <div
        ref={scrollContainerRef}
        className="flex gap-6 overflow-x-auto scroll-smooth pb-4 snap-x snap-mandatory scrollbar-hide"
        onScroll={checkScroll}
      >
        {siteConfig.experience.map((exp: ExperienceItem, index: number) => (
          <div
            key={index}
            onClick={() => setSelectedExp(exp)}
            className="group cursor-pointer flex-shrink-0 w-[85vw] md:w-[500px] lg:w-[550px] h-[360px] snap-start flex flex-col bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all relative"
          >
            {/* Header section */}
            <div className="p-6 pb-5 border-b border-gray-100 dark:border-neutral-800 flex gap-4 items-center">
              {/* Company Logo in isolated white container for consistency */}
              <div className="relative w-16 h-16 rounded-xl bg-white border border-gray-100 dark:border-neutral-700 flex-shrink-0 shadow-sm overflow-hidden flex items-center justify-center p-2.5">
                <div className="relative w-full h-full">
                  <Image src={exp.image} alt={exp.company} fill className="object-contain" />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[17px] font-bold text-gray-900 dark:text-neutral-100 mb-1 leading-snug line-clamp-2 pr-4">
                  {exp.role}
                </h4>
                <div className="flex items-center gap-1.5 text-gray-600 dark:text-neutral-400 font-medium text-sm">
                  <span className="truncate">{exp.company}</span>
                </div>
              </div>
            </div>

            {/* Metadata badges */}
            <div className="px-6 py-3.5 bg-gray-50/80 dark:bg-neutral-900/40 border-b border-gray-100 dark:border-neutral-800 flex flex-wrap items-center gap-4 text-[13px] font-semibold text-gray-600 dark:text-neutral-400">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-gray-400 dark:text-neutral-500" />
                <span>{exp.location}</span>
              </div>
              <div className="flex flex-1 items-center gap-1.5 justify-end">
                <Calendar size={14} className="text-gray-400 dark:text-neutral-500" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Content section */}
            <div className="flex-1 relative overflow-hidden bg-white dark:bg-neutral-800">
              {/* Full height background text container */}
              <div className="p-5 h-full">
                <ul className="space-y-3">
                  {exp.description.map((desc: string, i: number) => (
                    <li
                      key={i}
                      className="flex items-start gap-3.5 text-gray-700 dark:text-neutral-300 text-[14.5px] leading-[1.6]"
                    >
                      <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-neutral-800 dark:bg-neutral-300 mt-[8px]" />
                      <span className="flex-1">{desc}</span>
                    </li>
                  ))}
                </ul>
              </div>

              {/* Translucent bottom area overlaid on text */}
              <div className="absolute inset-x-0 bottom-0 bg-white/80 dark:bg-neutral-800/60 backdrop-blur-xl flex flex-col pt-3 pb-5 px-5 z-10 rounded-b-2xl">
                {/* Gradient seam */}
                <div className="absolute top-0 left-0 right-0 h-10 -translate-y-full bg-gradient-to-t from-white/80 dark:from-neutral-800/70 to-transparent pointer-events-none" />

                <div className="flex-shrink-0 pb-3">
                  {exp.description.length > 0 && (
                    <span className="text-[13.5px] font-semibold text-neutral-800 dark:text-neutral-200 group-hover:text-black dark:group-hover:text-white group-hover:underline flex items-center gap-1 transition-colors">
                      View details <ChevronRight size={14} className="mt-0.5" />
                    </span>
                  )}
                </div>

                {/* Technologies section */}
                <div className="pt-3 border-t border-gray-200/60 dark:border-neutral-700/60">
                  <div className="flex flex-wrap items-center gap-2 w-full">
                    <p className="text-[11px] font-bold text-gray-500 dark:text-neutral-500 uppercase tracking-wider mr-1 flex-shrink-0">
                      {siteConfig.ui.experience.technologies}
                    </p>
                    {exp.techStack.slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="flex-shrink-0 px-3 py-1 bg-gray-100/90 dark:bg-neutral-700/80 text-gray-800 dark:text-neutral-200 text-[11px] rounded-full font-medium border border-gray-200/50 dark:border-neutral-600/30 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.techStack.length > 3 && (
                      <span className="flex-shrink-0 px-3 py-1 bg-gray-100/90 dark:bg-neutral-700/80 text-gray-500 dark:text-neutral-400 text-[11px] rounded-full font-medium border border-gray-200/50 dark:border-neutral-600/30 shadow-sm">
                        +{exp.techStack.length - 3}
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedExp && (
          <>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 z-[100] bg-black/60 backdrop-blur-sm"
              onClick={() => setSelectedExp(null)}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
            >
              <div className="w-full max-w-2xl max-h-[90vh] bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col pointer-events-auto">
                {/* Modal Header */}
                <div className="p-6 pb-5 border-b border-gray-100 dark:border-neutral-800 flex gap-4 items-center relative">
                  <button
                    onClick={() => setSelectedExp(null)}
                    className="absolute top-5 right-5 p-2 text-gray-500 hover:text-gray-900 dark:text-neutral-400 dark:hover:text-neutral-100 rounded-lg hover:bg-gray-100 dark:hover:bg-neutral-700 transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <div className="relative w-16 h-16 rounded-xl bg-white border border-gray-100 dark:border-neutral-700 flex-shrink-0 shadow-sm overflow-hidden flex items-center justify-center p-2.5">
                    <div className="relative w-full h-full">
                      <Image
                        src={selectedExp.image}
                        alt={selectedExp.company}
                        fill
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pr-8">
                    <h4 className="text-[19px] font-bold text-gray-900 dark:text-neutral-100 mb-1 leading-snug">
                      {selectedExp.role}
                    </h4>
                    <div className="flex items-center gap-1.5 text-gray-600 dark:text-neutral-400 font-medium text-[15px]">
                      <span className="truncate">{selectedExp.company}</span>
                    </div>
                  </div>
                </div>

                {/* Modal Meta */}
                <div className="px-6 py-4 bg-gray-50/80 dark:bg-neutral-900/40 border-b border-gray-100 dark:border-neutral-800 flex flex-wrap items-center gap-6 text-[14px] font-semibold text-gray-600 dark:text-neutral-400">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-gray-400 dark:text-neutral-500" />
                    <span>{selectedExp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-gray-400 dark:text-neutral-500" />
                    <span>{selectedExp.period}</span>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                  <ul className="space-y-4 mb-8">
                    {selectedExp.description.map((desc: string, i: number) => (
                      <li
                        key={i}
                        className="flex items-start gap-4 text-gray-800 dark:text-neutral-200 text-[15.5px] leading-relaxed"
                      >
                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-neutral-800 dark:bg-neutral-300 mt-[10px]" />
                        <span className="flex-1">{desc}</span>
                      </li>
                    ))}
                  </ul>

                  <div>
                    <h4 className="text-sm font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider mb-2">
                      {siteConfig.ui.experience.technologies}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExp.techStack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-neutral-200 text-sm rounded-full font-medium"
                        >
                          {tech}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </section>
  );
}
