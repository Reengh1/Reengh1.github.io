'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import ReactMarkdown from 'react-markdown';
import { CardPageConfig } from '@/types/page';

const markdownComponents = {
    p: ({ children }: React.ComponentProps<'p'>) => <p className="mb-3 last:mb-0">{children}</p>,
    ul: ({ children }: React.ComponentProps<'ul'>) => <ul className="list-disc list-inside mb-3 space-y-1">{children}</ul>,
    ol: ({ children }: React.ComponentProps<'ol'>) => <ol className="list-decimal list-inside mb-3 space-y-1">{children}</ol>,
    li: ({ children }: React.ComponentProps<'li'>) => <li className="mb-1">{children}</li>,
    a: ({ ...props }) => (
        <a
            {...props}
            target="_blank"
            rel="noopener noreferrer"
            className="text-accent font-medium transition-all duration-200 rounded hover:bg-accent/10 hover:shadow-sm"
        />
    ),
    blockquote: ({ children }: React.ComponentProps<'blockquote'>) => (
        <blockquote className="border-l-4 border-accent/50 pl-4 italic my-4 text-neutral-600 dark:text-neutral-500">
            {children}
        </blockquote>
    ),
    strong: ({ children }: React.ComponentProps<'strong'>) => <strong className="font-semibold text-primary">{children}</strong>,
    em: ({ children }: React.ComponentProps<'em'>) => <em className="italic">{children}</em>,
    code: ({ children }: React.ComponentProps<'code'>) => (
        <code className="px-1.5 py-0.5 rounded bg-neutral-100 dark:bg-neutral-800 text-[0.95em]">{children}</code>
    ),
};

export default function CardPage({ config, embedded = false }: { config: CardPageConfig; embedded?: boolean }) {
    const isEducation = config.variant === 'education';
    const isExperience = config.variant === 'experience';
    const itemGroups = config.items.reduce<Array<{ title?: string; items: typeof config.items }>>((groups, item) => {
        const currentGroup = groups[groups.length - 1];
        if (!currentGroup || currentGroup.title !== item.section) {
            groups.push({ title: item.section, items: [item] });
        } else {
            currentGroup.items.push(item);
        }
        return groups;
    }, []);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.4 }}
        >
            {!isExperience && <div className={embedded ? "mb-6" : "mb-8"}>
                <h1 className={`${embedded ? "text-3xl" : "text-4xl"} font-serif font-bold text-primary mb-3 tracking-tight`}>{config.title}</h1>
                {config.description && (
                    <div className={`${embedded ? "text-base" : "text-lg"} text-neutral-600 dark:text-neutral-500 max-w-2xl leading-relaxed`}>
                        <ReactMarkdown components={markdownComponents}>
                            {config.description}
                        </ReactMarkdown>
                    </div>
                )}
            </div>}

            {isEducation ? (
                <div className="grid gap-7 sm:gap-8">
                {config.items.map((item, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.4, delay: 0.1 * index }}
                        className="py-1"
                    >
                        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-3">
                            {item.date && (
                                <span className="text-xs sm:text-sm text-neutral-500 font-medium whitespace-nowrap tabular-nums">
                                    {item.date}
                                </span>
                            )}
                            <span className="hidden sm:block w-px h-7 bg-neutral-400/80 dark:bg-neutral-600 flex-shrink-0" aria-hidden="true" />
                            <div className="flex flex-wrap items-center gap-x-3 gap-y-2 min-w-0">
                                <h3 className="text-base sm:text-lg font-semibold text-primary leading-tight">
                                    {item.title}
                                </h3>
                                {item.image && (
                                    <span className="inline-flex h-6 w-[145px] items-center justify-start flex-shrink-0">
                                        <Image
                                            src={item.image}
                                            alt={`${item.title} logo`}
                                            width={200}
                                            height={40}
                                            className="max-h-5 w-auto max-w-full object-contain object-left"
                                        />
                                    </span>
                                )}
                            </div>
                        </div>
                        {item.subtitle && (
                            <p className="mt-1.5 text-sm sm:text-base text-neutral-700 dark:text-neutral-500 leading-relaxed">
                                {item.subtitle}
                            </p>
                        )}
                    </motion.div>
                ))}
                </div>
            ) : (
                <div className="space-y-9">
                    {itemGroups.map((group, groupIndex) => (
                        <section key={`${group.title || 'items'}-${groupIndex}`} className="space-y-5">
                            {group.title && (
                                <h1 className="text-2xl sm:text-3xl font-serif font-bold text-primary tracking-tight">
                                    {group.title}
                                </h1>
                            )}
                            <div className={`grid ${embedded ? "gap-5" : "gap-6"}`}>
                                {group.items.map((item, itemIndex) => (
                                    <motion.div
                                        key={`${groupIndex}-${itemIndex}`}
                                        initial={{ opacity: 0, y: 20 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        transition={{ duration: 0.4, delay: 0.1 * (groupIndex + itemIndex) }}
                                        className={`bg-white/80 dark:bg-neutral-900 ${embedded ? "p-5" : "p-6"} rounded-2xl shadow-sm border border-neutral-200 dark:border-neutral-800 hover:shadow-lg hover:-translate-y-0.5 transition-all duration-200`}
                                    >
                                        <div className="flex flex-col sm:flex-row sm:justify-between sm:items-start gap-3 mb-3">
                                            <div className="min-w-0">
                                                <h3 className={`${embedded ? "text-lg" : "text-xl"} font-semibold text-primary leading-snug`}>{item.title}</h3>
                                                {item.image && (
                                                    <span className="mt-3 inline-flex h-7 w-[160px] items-center justify-start">
                                                        <Image
                                                            src={item.image}
                                                            alt={`${item.subtitle || item.title} logo`}
                                                            width={180}
                                                            height={40}
                                                            className="max-h-5 w-auto max-w-full object-contain object-left"
                                                        />
                                                    </span>
                                                )}
                                            </div>
                                            {item.date && (
                                                <span className="text-sm text-neutral-500 font-medium bg-neutral-100 dark:bg-neutral-800 px-3 py-1.5 rounded-full whitespace-nowrap self-start">
                                                    {item.date}
                                                </span>
                                            )}
                                        </div>
                                        {(item.subtitle || item.advisor) && (
                                            <p className={`${embedded ? "text-sm" : "text-base"} ${isExperience ? "text-primary font-semibold" : "text-accent font-medium"} mb-3`}>
                                                {item.subtitle}
                                                {item.subtitle && item.advisor && ' · '}
                                                {item.advisor && (
                                                    <>
                                                        Advisor: Prof.{' '}
                                                        {item.advisor_url ? (
                                                            <a
                                                                href={item.advisor_url}
                                                                target="_blank"
                                                                rel="noopener noreferrer"
                                                                className="text-accent hover:text-accent-dark transition-colors"
                                                            >
                                                                {item.advisor}
                                                            </a>
                                                        ) : item.advisor}
                                                    </>
                                                )}
                                            </p>
                                        )}
                                        {item.content && (
                                            <div className={`${embedded ? "text-sm" : "text-base"} text-neutral-600 dark:text-neutral-500 leading-relaxed`}>
                                                <ReactMarkdown components={markdownComponents}>
                                                    {item.content}
                                                </ReactMarkdown>
                                            </div>
                                        )}
                                        {!isExperience && item.tags && (
                                            <div className="flex flex-wrap gap-2 mt-4">
                                                {item.tags.map(tag => (
                                                    <span key={tag} className="text-xs text-neutral-500 bg-neutral-50 dark:bg-neutral-800/50 px-2 py-1 rounded border border-neutral-100 dark:border-neutral-800">
                                                        {tag}
                                                    </span>
                                                ))}
                                            </div>
                                        )}
                                    </motion.div>
                                ))}
                            </div>
                        </section>
                    ))}
                </div>
            )}
        </motion.div>
    );
}
