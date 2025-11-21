'use client';

import { useState } from 'react';
import { Building2, MapPin, Calendar } from 'lucide-react';
import { siteConfig } from '@/data/content';

export default function Experience() {
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    return (
        <section className="mb-12" aria-labelledby="experience-heading">
            <h3 id="experience-heading" className="text-2xl font-bold mb-8 text-gray-900">Professional Experience</h3>

            <div className="space-y-6">
                {siteConfig.experience.map((exp, index) => (
                    <div
                        key={index}
                        onMouseEnter={() => setHoveredIndex(index)}
                        className="group relative p-6 bg-white border border-gray-200 rounded-xl shadow-sm hover:shadow-md hover:border-gray-300 transition-all duration-200"
                    >
                        <div className="mb-4 pb-4 border-b border-gray-100">
                            <h4 className="text-xl font-bold text-gray-900 mb-1 group-hover:text-gray-700 transition-colors">{exp.role}</h4>
                            <div className="flex items-center gap-2 text-gray-800 font-semibold text-base mb-3">
                                <Building2 size={16} />
                                <span>{exp.company}</span>
                            </div>

                            <div className="flex flex-wrap gap-4 text-sm text-gray-600">
                                <div className="flex items-center gap-1.5">
                                    <MapPin size={14} className="text-gray-400" />
                                    <span>{exp.location}</span>
                                </div>
                                <div className="flex items-center gap-1.5">
                                    <Calendar size={14} className="text-gray-400" />
                                    <span>{exp.period}</span>
                                </div>
                            </div>
                        </div>

                        <ul className="space-y-2 mb-5">
                            {exp.description.map((desc, i) => (
                                <li key={i} className="text-gray-700 text-sm leading-relaxed flex items-start">
                                    <span className="text-gray-400 mr-2 mt-1 flex-shrink-0">•</span>
                                    <span>{desc}</span>
                                </li>
                            ))}
                        </ul>

                        <div>
                            <p className="text-xs font-semibold text-gray-500 uppercase tracking-wide mb-2">
                                Technologies
                            </p>
                            <div className="flex flex-wrap gap-1.5">
                                {exp.techStack.map((tech) => (
                                    <span
                                        key={tech}
                                        className="px-2.5 py-1 text-xs font-medium bg-gray-100 text-gray-800 rounded border border-gray-200 group-hover:bg-gray-50 transition-colors"
                                    >
                                        {tech}
                                    </span>
                                ))}
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </section>
    );
}
