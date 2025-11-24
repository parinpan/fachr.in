'use client';

import Image from 'next/image';
import { useContent } from '@/hooks/useContent';

export default function Hero() {
    const siteConfig = useContent();
    return (
        <div className="flex flex-col md:flex-row items-center md:items-start gap-8 mb-12">
            <div className="relative w-32 h-32 md:w-40 md:h-40 shrink-0">
                <Image
                    src={siteConfig.hero.image}
                    alt={siteConfig.hero.title}
                    fill
                    className="object-cover"
                    priority
                />
            </div>
            <div className="flex flex-col text-center md:text-left">
                <h1 className="text-3xl md:text-5xl font-bold mb-2 text-gray-900 dark:text-neutral-100">
                    {siteConfig.hero.title}
                </h1>
                <h2 className="text-xl md:text-2xl text-gray-600 dark:text-neutral-400 font-medium mb-6">
                    {siteConfig.hero.subtitle}
                </h2>
                <div className="flex flex-wrap justify-center md:justify-start gap-2 mb-6">
                    {siteConfig.hero.badges.map((badge: any, index: number) => (
                        <div key={index} className="flex items-center gap-2 px-2.5 py-1.5 rounded-full bg-gray-50 dark:bg-neutral-800 border border-gray-200 dark:border-neutral-700">
                            <Image
                                src={badge.icon}
                                alt=""
                                width={15}
                                height={15}
                                unoptimized={badge.icon.endsWith('.ico')}
                            />
                            {badge.text}
                        </div>
                    ))}
                </div>

            </div>
        </div>
    );
}

function Badge({ icon, text }: { icon: string; text: string }) {
    return (
        <span className="inline-flex items-center px-3 py-1 rounded-full bg-[#FAFAFA] dark:bg-neutral-800 text-sm font-medium text-gray-800 dark:text-neutral-200 border border-gray-300 dark:border-neutral-700 hover:bg-[#F5F5F5] dark:hover:bg-neutral-600 transition-colors cursor-default">
            <Image
                src={icon}
                alt=""
                width={16}
                height={16}
                className="mr-2"
                unoptimized={icon.endsWith('.ico')}
            />
            {text}
        </span>
    );
}
