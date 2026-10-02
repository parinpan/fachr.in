'use client';

import { useState, useEffect, useCallback } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { useContent } from '@/hooks/useContent';
import type { ProjectItem } from '@/data/types';

export default function WorkList() {
  const siteConfig = useContent();
  const [selectedWork, setSelectedWork] = useState<ProjectItem | null>(null);

  const closeModal = useCallback(() => setSelectedWork(null), []);

  useEffect(() => {
    if (!selectedWork) return;
    document.body.style.overflow = 'hidden';
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') closeModal();
    };
    document.addEventListener('keydown', handleKeyDown);
    return () => {
      document.body.style.overflow = 'unset';
      document.removeEventListener('keydown', handleKeyDown);
    };
  }, [selectedWork, closeModal]);

  return (
    <section className="mb-12" aria-labelledby="projects-heading">
      <h3
        id="projects-heading"
        className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]"
      >
        {siteConfig.ui.workList.featuredProjects}
      </h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {siteConfig.works.map((work: ProjectItem, index: number) => (
          <div
            key={index}
            data-testid={`work-item-${index}`}
            className="group relative bg-[var(--color-surface)] rounded-2xl overflow-hidden border border-[var(--color-border-light)] shadow-sm hover:shadow-md transition-all cursor-pointer"
            onClick={() => setSelectedWork(work)}
          >
            <div className="aspect-video relative overflow-hidden">
              <Image
                src={work.image}
                alt={work.name}
                fill
                sizes="(min-width: 1024px) 33vw, (min-width: 768px) 50vw, 100vw"
                className="object-cover transition-transform duration-500 group-hover:scale-105"
              />
              <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
            </div>
            <div className="p-6">
              <h4 className="text-lg font-bold text-[var(--color-text-primary)] mb-2 group-hover:text-[var(--color-text-secondary)] transition-colors">
                {work.name}
              </h4>
              <p className="text-sm text-[var(--color-text-tertiary)] line-clamp-2">
                {work.description}
              </p>
            </div>
          </div>
        ))}
      </div>

      <AnimatePresence>
        {selectedWork && (
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
              aria-labelledby="project-modal-title"
            >
              <div className="w-full max-w-2xl max-h-[90vh] bg-[var(--color-surface)] rounded-2xl shadow-2xl overflow-hidden flex flex-col pointer-events-auto">
                <div className="relative h-48 sm:h-64 shrink-0">
                  <Image
                    src={selectedWork.image}
                    alt={selectedWork.name}
                    fill
                    sizes="(min-width: 640px) 672px, 100vw"
                    className="object-cover"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                  <div className="absolute bottom-0 left-0 p-6">
                    <h3 id="project-modal-title" className="text-xl font-bold text-white">
                      {selectedWork.name}
                    </h3>
                    <p className="text-sm mt-1 text-gray-100">
                      {siteConfig.ui.workList.partOfWork} {selectedWork.company}
                    </p>
                  </div>
                  <button
                    onClick={closeModal}
                    className="absolute top-4 right-4 p-3 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
                    aria-label={siteConfig.ui.workList.closeDetails}
                  >
                    <X size={20} />
                  </button>
                </div>

                <div className="p-6 overflow-y-auto" style={{ scrollbarWidth: 'thin' }}>
                  <div className="space-y-6">
                    <div>
                      <h4 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                        {siteConfig.ui.workList.labels.description}
                      </h4>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed">
                        {selectedWork.description}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                        {siteConfig.ui.workList.labels.role}
                      </h4>
                      <p className="text-[var(--color-text-secondary)] leading-relaxed">
                        {selectedWork.role}
                      </p>
                    </div>

                    <div>
                      <h4 className="text-sm font-bold text-[var(--color-text-muted)] uppercase tracking-wider mb-2">
                        {siteConfig.ui.workList.labels.stack}
                      </h4>
                      <div className="flex flex-wrap gap-2">
                        {selectedWork.stack ? (
                          selectedWork.stack.split(',').map((tech) => (
                            <span
                              key={tech}
                              className="px-3 py-1 bg-[var(--color-interactive-bg)] text-[var(--color-text-secondary)] text-sm rounded-full font-medium"
                            >
                              {tech.trim()}
                            </span>
                          ))
                        ) : (
                          <span className="px-3 py-1 bg-[var(--color-interactive-bg)] text-[var(--color-text-muted)] text-sm rounded-full">
                            Under construction
                          </span>
                        )}
                      </div>
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
