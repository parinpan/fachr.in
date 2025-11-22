'use client';

import { useState } from 'react';
import { Building2, MapPin, Calendar, ChevronDown, ChevronUp } from 'lucide-react';
import { siteConfig } from '@/data/content';

export default function Experience() {
    const [expandedItems, setExpandedItems] = useState<Set<number>>(new Set([0])); // First item expanded by default
    const [hoveredIndex, setHoveredIndex] = useState<number | null>(null);

    const toggleExpanded = (index: number) => {
        const newExpanded = new Set(expandedItems);
        if (newExpanded.has(index)) {
            newExpanded.delete(index);
        } else {
            newExpanded.add(index);
        }
        setExpandedItems(newExpanded);
    };

    const isExpanded = (index: number) => expandedItems.has(index);

    return (
        <section className="mb-12" aria-labelledby="experience-heading">
            <h3 id="experience-heading" className="text-2xl font-bold mb-6 text-[var(--color-text-primary)]">
                Professional Experience
            </h3>

            <div className="relative">
                <div className="space-y-6">
                    {siteConfig.experience.map((exp, index) => {
                        const expanded = isExpanded(index);

                        return (
                            <div
                                key={index}
                                className="relative"
                                onMouseEnter={() => setHoveredIndex(index)}
                                onMouseLeave={() => setHoveredIndex(null)}
                            >
                                {/* Content card */}
                                <div className={`
                                    relative
                                    bg-[var(--color-surface)] 
                                    border border-[var(--color-border)] 
                                    rounded-2xl 
                                    transition-all duration-300
                                    ${hoveredIndex === index
                                        ? 'shadow-lg border-[var(--color-border-hover)]'
                                        : 'shadow-sm'
                                    }
                                `}>
                                    {/* Header section */}
                                    <div className="p-6 pb-4 border-b border-[var(--color-border-light)]">
                                        <div className="flex items-start justify-between gap-4 mb-3">
                                            <div className="flex-1">
                                                <h4 className="text-xl font-bold text-[var(--color-text-primary)] mb-2 leading-tight">
                                                    {exp.role}
                                                </h4>
                                                <div className="flex items-center gap-2 text-[var(--color-text-secondary)] font-semibold mb-3">
                                                    <Building2 size={18} className="text-[var(--color-text-tertiary)]" />
                                                    <span>{exp.company}</span>
                                                </div>
                                            </div>
                                            <button
                                                onClick={() => toggleExpanded(index)}
                                                className={`
                                                    flex-shrink-0 p-2 rounded-lg transition-all
                                                    text-[var(--color-text-tertiary)] 
                                                    hover:text-[var(--color-text-primary)]
                                                    hover:bg-[var(--color-interactive-bg)]
                                                `}
                                                aria-label={expanded ? 'Collapse' : 'Expand'}
                                            >
                                                {expanded ? (
                                                    <ChevronUp size={20} />
                                                ) : (
                                                    <ChevronDown size={20} />
                                                )}
                                            </button>
                                        </div>

                                        {/* Metadata badges */}
                                        <div className="flex flex-wrap items-center gap-3 text-sm">
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-interactive-bg)] text-[var(--color-text-secondary)]">
                                                <MapPin size={14} className="text-[var(--color-text-tertiary)]" />
                                                <span>{exp.location}</span>
                                            </div>
                                            <div className="flex items-center gap-1.5 px-3 py-1.5 rounded-lg bg-[var(--color-interactive-bg)] text-[var(--color-text-secondary)]">
                                                <Calendar size={14} className="text-[var(--color-text-tertiary)]" />
                                                <span>{exp.period}</span>
                                            </div>
                                        </div>
                                    </div>

                                    {/* Expandable content */}
                                    {expanded && (
                                        <div className="p-6 pt-5 animate-in fade-in slide-in-from-top-2 duration-300">
                                            {/* Description list with improved typography */}
                                            <ul className="space-y-3.5 mb-6">
                                                {exp.description.map((desc, i) => (
                                                    <li
                                                        key={i}
                                                        className="flex items-start gap-3 text-[var(--color-text-secondary)] text-[15px] leading-relaxed"
                                                    >
                                                        <span className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-[var(--color-interactive)] mt-2" />
                                                        <span className="flex-1">{desc}</span>
                                                    </li>
                                                ))}
                                            </ul>

                                            {/* Technologies section */}
                                            <div className="pt-4 border-t border-[var(--color-border-light)]">
                                                <p className="text-xs font-semibold text-[var(--color-text-tertiary)] uppercase tracking-wider mb-3">
                                                    Technologies
                                                </p>
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.techStack.map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-3 py-1.5 text-xs font-medium bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] rounded-lg border border-[var(--color-badge-border)] transition-colors hover:bg-[var(--color-interactive-bg-hover)]"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                </div>
                                            </div>
                                        </div>
                                    )}

                                    {/* Collapsed preview */}
                                    {!expanded && (
                                        <div className="p-6 pt-5">
                                            <p className="text-[var(--color-text-secondary)] text-sm leading-relaxed line-clamp-2">
                                                {exp.description[0]}
                                            </p>
                                            <div className="mt-4 pt-4 border-t border-[var(--color-border-light)]">
                                                <div className="flex flex-wrap gap-2">
                                                    {exp.techStack.slice(0, 4).map((tech) => (
                                                        <span
                                                            key={tech}
                                                            className="px-2.5 py-1 text-xs font-medium bg-[var(--color-badge-bg)] text-[var(--color-badge-text)] rounded-md"
                                                        >
                                                            {tech}
                                                        </span>
                                                    ))}
                                                    {exp.techStack.length > 4 && (
                                                        <span className="px-2.5 py-1 text-xs font-medium text-[var(--color-text-tertiary)]">
                                                            +{exp.techStack.length - 4} more
                                                        </span>
                                                    )}
                                                </div>
                                            </div>
                                        </div>
                                    )}
                                </div>
                            </div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
}
