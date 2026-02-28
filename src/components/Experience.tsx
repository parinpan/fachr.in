'use client';

import Image from 'next/image';
import { useRef, useState, useEffect, useCallback } from 'react';
import { ChevronLeft, ChevronRight, MapPin, Calendar, X, FileText } from 'lucide-react';
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

  const closeModal = useCallback(() => setSelectedExp(null), []);

  useEffect(() => {
    if (!selectedExp) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedExp, closeModal]);

  return (
    <section className="mb-8" aria-labelledby="experience-heading">
      <div className="flex items-center justify-between mb-6">
        <h3 id="experience-heading" className="text-2xl font-bold text-[var(--color-text-primary)]">
          {siteConfig.ui.experience.title}
        </h3>
        {siteConfig.personal.resume && (
          <a
            href={siteConfig.personal.resume}
            target="_blank"
            rel="noopener noreferrer"
            className="flex items-center gap-1.5 px-3 py-2 min-h-[44px] text-sm font-medium text-[var(--color-text-secondary)] hover:text-[var(--color-interactive)] transition-colors"
            aria-label="View resume"
          >
            <FileText size={16} />
            <span className="hidden sm:inline">Resume</span>
          </a>
        )}
        <div className="flex gap-2">
          <button
            onClick={() => scroll('left', SCROLL_THRESHOLDS.EXPERIENCE_SCROLL_AMOUNT)}
            disabled={!canScrollLeft}
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={siteConfig.ui.experience.scrollLeft}
          >
            <ChevronLeft size={20} />
          </button>
          <button
            onClick={() => scroll('right', SCROLL_THRESHOLDS.EXPERIENCE_SCROLL_AMOUNT)}
            disabled={!canScrollRight}
            className="p-2.5 min-h-[44px] min-w-[44px] flex items-center justify-center rounded-lg bg-[var(--color-surface)] border border-[var(--color-border)] text-[var(--color-text-tertiary)] hover:text-[var(--color-text-primary)] hover:border-[var(--color-border-hover)] transition-all disabled:opacity-40 disabled:cursor-not-allowed"
            aria-label={siteConfig.ui.experience.scrollRight}
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
            className="group cursor-pointer flex-shrink-0 w-[85vw] md:w-[500px] lg:w-[550px] h-[360px] snap-start flex flex-col bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border-light)] shadow-sm hover:shadow-md transition-all relative"
          >
            {/* Header section */}
            <div className="p-6 pb-5 border-b border-[var(--color-border-light)] flex gap-4 items-center">
              {/* Company Logo in isolated white container for consistency */}
              <div className="relative w-16 h-16 rounded-xl bg-white border border-[var(--color-border-light)] flex-shrink-0 shadow-sm overflow-hidden flex items-center justify-center p-2.5">
                <div className="relative w-full h-full">
                  <Image
                    src={exp.image}
                    alt={exp.company}
                    fill
                    sizes="44px"
                    className="object-contain"
                  />
                </div>
              </div>
              <div className="flex-1 min-w-0">
                <h4 className="text-[17px] font-bold text-[var(--color-text-primary)] mb-1 leading-snug line-clamp-2 pr-4">
                  {exp.role}
                </h4>
                <div className="flex items-center gap-1.5 text-[var(--color-text-tertiary)] font-medium text-sm">
                  <span className="truncate">{exp.company}</span>
                </div>
              </div>
            </div>

            {/* Metadata badges */}
            <div className="px-6 py-3.5 bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-light)] flex flex-wrap items-center gap-4 text-[13px] font-semibold text-[var(--color-text-tertiary)]">
              <div className="flex items-center gap-1.5">
                <MapPin size={14} className="text-[var(--color-text-muted)]" />
                <span>{exp.location}</span>
              </div>
              <div className="flex flex-1 items-center gap-1.5 justify-end">
                <Calendar size={14} className="text-[var(--color-text-muted)]" />
                <span>{exp.period}</span>
              </div>
            </div>

            {/* Content section */}
            <div className="flex-1 relative overflow-hidden bg-[var(--color-surface)]">
              {/* Description text (no bullet markers in preview) */}
              <div className="px-6 pt-4 space-y-2">
                {exp.description.map((desc: string, i: number) => (
                  <p
                    key={i}
                    className="text-sm text-[var(--color-text-secondary)] leading-relaxed line-clamp-2"
                  >
                    {desc}
                  </p>
                ))}
              </div>

              {/* Translucent bottom area */}
              <div className="absolute inset-x-0 bottom-0 bg-[var(--color-overlay-solid)] backdrop-blur-xl flex flex-col pt-3 pb-5 px-5 z-10 rounded-b-2xl">
                <div className="flex-shrink-0 pb-3">
                  {exp.description.length > 0 && (
                    <span className="text-[13.5px] font-semibold text-[var(--color-text-primary)] group-hover:text-[var(--color-interactive)] group-hover:underline flex items-center gap-1 transition-colors">
                      View details <ChevronRight size={14} className="mt-0.5" />
                    </span>
                  )}
                </div>

                {/* Technologies section */}
                <div className="pt-3 border-t border-[var(--color-border)]/60">
                  <div className="flex flex-wrap items-center gap-2 w-full">
                    <p className="text-xs font-bold text-[var(--color-text-muted)] uppercase tracking-wider mr-1 flex-shrink-0">
                      {siteConfig.ui.experience.technologies}
                    </p>
                    {exp.techStack.slice(0, 3).map((tech: string) => (
                      <span
                        key={tech}
                        className="flex-shrink-0 px-3 py-1 bg-[var(--color-interactive-bg)] text-[var(--color-text-secondary)] text-xs rounded-full font-medium border border-[var(--color-border)]/50 shadow-sm"
                      >
                        {tech}
                      </span>
                    ))}
                    {exp.techStack.length > 3 && (
                      <span className="flex-shrink-0 px-3 py-1 bg-[var(--color-interactive-bg)] text-[var(--color-text-muted)] text-xs rounded-full font-medium border border-[var(--color-border)]/50 shadow-sm">
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
              onClick={closeModal}
            />
            <motion.div
              initial={{ opacity: 0, y: 20, scale: 0.95 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 20, scale: 0.95 }}
              transition={{ duration: 0.2 }}
              className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 pointer-events-none"
              role="dialog"
              aria-modal="true"
              aria-labelledby="experience-modal-title"
            >
              <div className="w-full max-w-2xl max-h-[90vh] bg-[var(--color-surface)] rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 flex flex-col pointer-events-auto">
                {/* Modal Header */}
                <div className="p-6 pb-5 border-b border-[var(--color-border-light)] flex gap-4 items-center relative">
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-3 text-[var(--color-text-muted)] hover:text-[var(--color-text-primary)] rounded-lg hover:bg-[var(--color-interactive-bg)] transition-colors"
                  >
                    <X size={20} />
                  </button>
                  <div className="relative w-16 h-16 rounded-xl bg-white border border-[var(--color-border-light)] flex-shrink-0 shadow-sm overflow-hidden flex items-center justify-center p-2.5">
                    <div className="relative w-full h-full">
                      <Image
                        src={selectedExp.image}
                        alt={selectedExp.company}
                        fill
                        sizes="44px"
                        className="object-contain"
                      />
                    </div>
                  </div>
                  <div className="flex-1 min-w-0 pr-8">
                    <h4
                      id="experience-modal-title"
                      className="text-[19px] font-bold text-[var(--color-text-primary)] mb-1 leading-snug"
                    >
                      {selectedExp.role}
                    </h4>
                    <div className="flex items-center gap-1.5 text-[var(--color-text-tertiary)] font-medium text-[15px]">
                      <span className="truncate">{selectedExp.company}</span>
                    </div>
                  </div>
                </div>

                {/* Modal Meta */}
                <div className="px-6 py-4 bg-[var(--color-surface-secondary)] border-b border-[var(--color-border-light)] flex flex-wrap items-center gap-6 text-[14px] font-semibold text-[var(--color-text-tertiary)]">
                  <div className="flex items-center gap-2">
                    <MapPin size={16} className="text-[var(--color-text-muted)]" />
                    <span>{selectedExp.location}</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Calendar size={16} className="text-[var(--color-text-muted)]" />
                    <span>{selectedExp.period}</span>
                  </div>
                </div>

                {/* Modal Content */}
                <div className="p-6 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                  <div className="mb-8">
                    <h4 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-3">
                      {siteConfig.ui.experience.accomplishments}
                    </h4>
                    <ul className="space-y-4">
                      {selectedExp.description.map((desc: string, i: number) => (
                        <li
                          key={i}
                          className="flex items-start gap-4 text-[var(--color-text-secondary)] text-[15.5px] leading-relaxed"
                        >
                          <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-text-primary)] mt-[10px]" />
                          <span className="flex-1">{desc}</span>
                        </li>
                      ))}
                    </ul>
                  </div>

                  <div>
                    <h4 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                      {siteConfig.ui.experience.technologies}
                    </h4>
                    <div className="flex flex-wrap gap-2">
                      {selectedExp.techStack.map((tech: string) => (
                        <span
                          key={tech}
                          className="px-3 py-1 bg-[var(--color-interactive-bg)] text-[var(--color-text-secondary)] text-sm rounded-full font-medium"
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
