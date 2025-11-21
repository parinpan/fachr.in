'use client';

import { useState } from 'react';
import Image from 'next/image';
import { X } from 'lucide-react';
import { siteConfig } from '@/data/content';

type WorkItem = typeof siteConfig.works[0];

export default function WorkList() {
    const [selectedWork, setSelectedWork] = useState<WorkItem | null>(null);

    return (
        <section className="mb-12" aria-labelledby="projects-heading">
            <h3 id="projects-heading" className="text-2xl font-bold mb-6 text-gray-900">Featured Projects</h3>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {siteConfig.works.map((work, index) => (
                    <div
                        key={work.name}
                        onClick={() => setSelectedWork(work)}
                        className="group cursor-pointer bg-white border border-gray-200 rounded-xl overflow-hidden shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
                    >
                        <div className="relative h-48 w-full overflow-hidden">
                            <Image
                                src={work.image}
                                alt={work.name}
                                fill
                                className="object-cover group-hover:scale-105 transition-transform duration-300"
                            />
                        </div>
                        <div className="p-4">
                            <div className="flex flex-wrap gap-2 mb-2">
                                <span className="px-2 py-1 bg-gray-100 text-xs font-medium text-gray-600 rounded-md">
                                    {work.company}
                                </span>
                            </div>
                            <h4 className="font-semibold text-lg text-gray-900 group-hover:text-gray-700 transition-colors">
                                {work.name}
                            </h4>
                        </div>
                    </div>
                ))}
            </div>

            {selectedWork && (
                <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6" role="dialog" aria-modal="true" aria-labelledby="project-modal-title">
                    <div
                        onClick={() => setSelectedWork(null)}
                        className="absolute inset-0 bg-black/70 backdrop-blur-sm"
                    />
                    <div
                        className="relative w-full max-w-2xl bg-white rounded-2xl shadow-2xl overflow-hidden max-h-[90vh] flex flex-col"
                    >
                        <div className="flex items-center justify-between p-4 border-b border-gray-100">
                            <div>
                                <h3 id="project-modal-title" className="text-xl font-bold text-gray-900">{selectedWork.name}</h3>
                                <p className="text-sm text-gray-500 mt-1">Part of my work at {selectedWork.company}</p>
                            </div>
                            <button
                                onClick={() => setSelectedWork(null)}
                                aria-label="Close project details"
                                className="p-2 hover:bg-gray-100 rounded-full transition-colors"
                            >
                                <X size={20} className="text-gray-500" />
                            </button>
                        </div>

                        <div className="overflow-y-auto p-6">
                            <div className="relative w-full mb-6">
                                <Image
                                    src={selectedWork.image}
                                    alt={selectedWork.name}
                                    width={800}
                                    height={400}
                                    className="w-full h-auto rounded-lg"
                                />
                            </div>

                            <div className="space-y-6">
                                <div>
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Project</h4>
                                    <p className="text-gray-900 font-medium">{selectedWork.name}</p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Description</h4>
                                    <p className="text-gray-700 leading-relaxed">
                                        {selectedWork.description || 'Under construction'}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">My Role</h4>
                                    <p className="text-gray-700 leading-relaxed">
                                        {selectedWork.role || 'Under construction'}
                                    </p>
                                </div>

                                <div>
                                    <h4 className="text-sm font-bold text-gray-400 uppercase tracking-wider mb-2">Tech Stack</h4>
                                    <div className="flex flex-wrap gap-2">
                                        {selectedWork.stack ? (
                                            selectedWork.stack.split(',').map((tech) => (
                                                <span key={tech} className="px-3 py-1 bg-gray-100 text-gray-800 text-sm rounded-full font-medium">
                                                    {tech.trim()}
                                                </span>
                                            ))
                                        ) : (
                                            <span className="px-3 py-1 bg-gray-100 text-gray-500 text-sm rounded-full">
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
