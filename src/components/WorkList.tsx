'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { useContent } from '@/hooks/useContent';
import { siteConfig } from '@/data/content';
import type { ProjectItem } from '@/data/types';

type WorkItem = typeof siteConfig.works[0];

export default function WorkList() {
    const siteConfigContent = useContent();
    const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

    return (
        <section className="mb-12" aria-labelledby="projects-heading">
            <h3 id="projects-heading" className="text-2xl font-bold mb-6 text-gray-900 dark:text-neutral-100">{siteConfig.ui.workList.featuredProjects}</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteConfigContent.works.map((work: ProjectItem, index: number) => (
                    <div
                        key={index}
                        data-testid={`work-item-${index}`}
                        className="group relative bg-white dark:bg-neutral-800 rounded-2xl overflow-hidden border border-gray-100 dark:border-neutral-700 shadow-sm hover:shadow-md transition-all cursor-pointer"
                        onClick={() => setSelectedWork(work)}
                    >
                        <div className="aspect-video relative overflow-hidden">
                            <Image
                                src={work.image}
                                alt={work.name}
                                fill
                                className="object-cover transition-transform duration-500 group-hover:scale-105"
                            />
                            <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300" />
                        </div>
                        <div className="p-6">
                            <h4 className="text-lg font-bold text-gray-900 dark:text-neutral-100 mb-2 group-hover:text-gray-600 dark:group-hover:text-neutral-300 transition-colors">
                                {work.name}
                            </h4>
                            <p className="text-sm text-gray-600 dark:text-neutral-400 line-clamp-2">
                                {work.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>

            {selectedWork && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
                    <div
                        className="absolute inset-0 bg-black/60 backdrop-blur-sm animate-in fade-in duration-200"
                        onClick={() => setSelectedWork(null)}
                    />
                    <div className="relative w-full max-w-2xl bg-white dark:bg-neutral-800 rounded-2xl shadow-2xl overflow-hidden animate-in zoom-in-95 duration-200 max-h-[90vh] flex flex-col">
                        <div className="relative h-48 sm:h-64 shrink-0">
                            <Image
                                src={selectedWork.image}
                                alt={selectedWork.name}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                            <div className="absolute bottom-0 left-0 p-6">
                                <h3 id="project-modal-title" className="text-xl font-bold text-gray-900 dark:text-neutral-100 text-white">{selectedWork.name}</h3>
                                <p className="text-sm mt-1 text-gray-100">{siteConfig.ui.workList.partOfWork} {selectedWork.company}</p>
                            </div>
                            <button
                                onClick={() => setSelectedWork(null)}
                                className="absolute top-4 right-4 p-2 bg-black/20 hover:bg-black/40 text-white rounded-full backdrop-blur-md transition-colors"
                                aria-label={siteConfig.ui.workList.closeDetails}
                            >
                                <X size={20} />
                            </button>
                        </div>

                        <div className="p-6 overflow-y-auto">
                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider mb-2">{siteConfig.ui.workList.labels.project}</h4>
                                    <p className="text-gray-900 dark:text-neutral-100 font-medium">{selectedWork.name}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider mb-2">{siteConfig.ui.workList.labels.description}</h4>
                                    <p className="text-gray-600 dark:text-neutral-300 leading-relaxed">
                                        {selectedWork.description}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider mb-2">{siteConfig.ui.workList.labels.role}</h4>
                                    <p className="text-gray-600 dark:text-neutral-300 leading-relaxed">
                                        {selectedWork.role}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-400 dark:text-neutral-500 uppercase tracking-wider mb-2">{siteConfig.ui.workList.labels.stack}</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedWork.stack ? (
                                            selectedWork.stack.split(',').map((tech) => (
                                                <span key={tech} className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 text-gray-800 dark:text-neutral-200 text-sm rounded-full font-medium">
                                                    {tech.trim()}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="px-3 py-1 bg-gray-100 dark:bg-neutral-700 text-gray-500 dark:text-neutral-400 text-sm rounded-full">
                                                Under construction
                                            </span>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </section>
    );
}
