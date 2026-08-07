'use client';

import { motion } from 'framer-motion';
import ReactMarkdown from 'react-markdown';
import { useMessages } from '@/lib/i18n/useMessages';

export interface NewsItem {
    date: string;
    content: string;
}

interface NewsProps {
    items: NewsItem[];
    title?: string;
}

export default function News({ items, title }: NewsProps) {
    const messages = useMessages();
    const resolvedTitle = title || messages.home.news;

    return (
        <motion.section
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.5 }}
        >
            <h2 className="text-3xl font-serif font-bold text-primary mb-5 tracking-tight">{resolvedTitle}</h2>
            <div className="space-y-4">
                {items.map((item, index) => (
                    <div key={index} className="flex items-start gap-4">
                        <span className="text-sm text-neutral-500 mt-0.5 w-20 flex-shrink-0 tabular-nums">{item.date}</span>
                        <div className="text-base text-neutral-700 leading-relaxed">
                            <ReactMarkdown
                                components={{
                                    p: ({ children }) => <p>{children}</p>,
                                    a: ({ ...props }) => (
                                        <a
                                            {...props}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="font-medium text-accent hover:text-accent-dark transition-colors"
                                        />
                                    ),
                                }}
                            >
                                {item.content}
                            </ReactMarkdown>
                        </div>
                    </div>
                ))}
            </div>
        </motion.section>
    );
}
