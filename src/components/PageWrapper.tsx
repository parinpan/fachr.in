import { ReactNode } from 'react';
import { siteConfig } from '@/data/content';
import Navbar from './Navbar';


export default function PageWrapper({ children }: { children: ReactNode }) {
    return (
        <main id="main-content" className="min-h-screen bg-gray-50 md:py-8 px-0 md:px-4 sm:px-6 lg:px-8 flex flex-col items-center text-sm md:text-base" role="main">
            <div className="w-full md:w-[80%] bg-white rounded-none md:rounded-3xl shadow-none md:shadow-xl overflow-hidden">
                <div className="p-6 md:p-12">
                    <Navbar />
                    <div className="animate-in fade-in slide-in-from-bottom-4 duration-500">
                        {children}
                    </div>
                </div>
            </div>
            <footer className="text-center text-gray-500 text-sm mt-12 pb-6" role="contentinfo">
                <p>{siteConfig.footer.copyrightText}</p>
            </footer>
        </main>
    );
}
