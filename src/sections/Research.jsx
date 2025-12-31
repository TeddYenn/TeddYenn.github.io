import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink } from 'lucide-react';

const researchItems = [
    {
        id: 'shinyp',
        title: 'ShiNyP Platform',
        tags: ['R/Shiny', 'Genomics'],
        description: 'An interactive web platform for population genomics analysis. Allows users to visualize and analyze large-scale SNP data.',
        links: [
            { label: 'Publication', url: 'https://doi.org/10.1093/molbev/msaf117' },
            { label: 'User Manual', url: 'https://teddyenn.github.io/ShiNyP-guide' },
            { label: 'Live Demo', url: 'https://teddyhuang.shinyapps.io/ShiNyP_Demo/' }
        ]
    },
    {
        id: 'edamame',
        title: 'Selection Footprints in Edamame',
        tags: ['Genomic Insights', 'Breeding'],
        description: 'Identified key genomic regions associated with selection in Edamame, providing insights for future breeding strategies.',
        links: []
    },
    {
        id: 'gwas-rice',
        title: 'GWAS for Rice (TAMU)',
        tags: ['HPC', 'High-Density SNP'],
        description: 'Conducted Genome-Wide Association Studies on rice using high-density SNP data on High Performance Computing clusters.',
        links: []
    },
    {
        id: 'imputation',
        title: 'Phenotype Imputation',
        tags: ['Machine Learning', 'Frontiers in Plant Science'],
        description: 'Developed methods for phenotype imputation to improve prediction accuracy in plant breeding programs.',
        links: [
            { label: 'Publication', url: 'https://frontiersin.org/example' }
        ]
    }
];

const ResearchCard = ({ item, expandedId, toggleExpand }) => {
    const [hoverTimer, setHoverTimer] = React.useState(null);
    const [isHovered, setIsHovered] = React.useState(false);
    const isExpanded = expandedId === item.id;

    const handleMouseEnter = () => {
        if (isExpanded) return;
        setIsHovered(true);
        const timer = setTimeout(() => {
            if (!isExpanded) {
                toggleExpand(item.id);
            }
        }, 1000);
        setHoverTimer(timer);
    };

    const handleMouseLeave = () => {
        setIsHovered(false);
        if (hoverTimer) {
            clearTimeout(hoverTimer);
            setHoverTimer(null);
        }
    };

    // Clear timer if it expands
    React.useEffect(() => {
        if (isExpanded && hoverTimer) {
            clearTimeout(hoverTimer);
            setHoverTimer(null);
            setIsHovered(false);
        }
    }, [isExpanded, hoverTimer]);

    return (
        <motion.div
            className="bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border border-gray-100 dark:border-primary-bright/20 relative"
            initial={false}
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Auto-expand Progress Bar */}
            <AnimatePresence>
                {isHovered && !isExpanded && (
                    <motion.div
                        initial={{ width: 0 }}
                        animate={{ width: '100%' }}
                        exit={{ opacity: 0 }}
                        transition={{ duration: 1.2, ease: "linear" }}
                        className="absolute top-0 left-0 h-1 bg-primary/30 dark:bg-primary-bright/30 z-10"
                    />
                )}
            </AnimatePresence>

            <button
                onClick={() => toggleExpand(item.id)}
                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors text-left relative z-0"
            >
                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                    <span className="font-semibold text-lg text-gray-800 dark:text-gray-100">{item.title}</span>
                    <div className="flex gap-2">
                        {item.tags.map(tag => (
                            <span key={tag} className="text-xs px-2 py-1 bg-primary/10 dark:bg-transparent text-primary dark:text-primary-bright border border-transparent dark:border-primary-bright/50 rounded-full font-medium">
                                {tag}
                            </span>
                        ))}
                    </div>
                </div>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                >
                    <ChevronDown className="text-gray-400 dark:text-gray-300" />
                </motion.div>
            </button>

            <AnimatePresence>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3 }}
                    >
                        <div className="px-6 pb-6 pt-2 border-t border-gray-50 dark:border-gray-700">
                            <p className="text-gray-600 dark:text-gray-300 mb-4">{item.description}</p>
                            {item.links.length > 0 && (
                                <div className="flex flex-wrap gap-3">
                                    {item.links.map((link, idx) => (
                                        <a
                                            key={idx}
                                            href={link.url}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="inline-flex items-center gap-1 text-sm text-primary dark:text-primary-bright hover:text-primary-bright/80 hover:underline font-bold transition-colors"
                                        >
                                            {link.label} <ExternalLink size={14} />
                                        </a>
                                    ))}
                                </div>
                            )}
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Research = () => {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="research" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-primary dark:text-white mb-12 text-center">Research</h2>

                <div className="max-w-3xl mx-auto space-y-4">
                    {researchItems.map((item) => (
                        <ResearchCard
                            key={item.id}
                            item={item}
                            expandedId={expandedId}
                            toggleExpand={toggleExpand}
                        />
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Research;
