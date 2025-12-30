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

const Research = () => {
    const [expandedId, setExpandedId] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="research" className="py-20 bg-gray-50">
            <div className="container mx-auto px-6">
                <h2 className="text-3xl font-bold text-primary mb-12 text-center">Research</h2>

                <div className="max-w-3xl mx-auto space-y-4">
                    {researchItems.map((item) => (
                        <motion.div
                            key={item.id}
                            className="bg-white rounded-xl shadow-sm overflow-hidden border border-gray-100"
                            initial={false}
                        >
                            <button
                                onClick={() => toggleExpand(item.id)}
                                className="w-full px-6 py-4 flex items-center justify-between hover:bg-gray-50 transition-colors text-left"
                            >
                                <div className="flex flex-col md:flex-row md:items-center gap-2 md:gap-4">
                                    <span className="font-semibold text-lg text-gray-800">{item.title}</span>
                                    <div className="flex gap-2">
                                        {item.tags.map(tag => (
                                            <span key={tag} className="text-xs px-2 py-1 bg-primary/10 text-primary rounded-full font-medium">
                                                {tag}
                                            </span>
                                        ))}
                                    </div>
                                </div>
                                <motion.div
                                    animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                                    transition={{ duration: 0.2 }}
                                >
                                    <ChevronDown className="text-gray-400" />
                                </motion.div>
                            </button>

                            <AnimatePresence>
                                {expandedId === item.id && (
                                    <motion.div
                                        initial={{ height: 0, opacity: 0 }}
                                        animate={{ height: 'auto', opacity: 1 }}
                                        exit={{ height: 0, opacity: 0 }}
                                        transition={{ duration: 0.3 }}
                                    >
                                        <div className="px-6 pb-6 pt-2 border-t border-gray-50">
                                            <p className="text-gray-600 mb-4">{item.description}</p>
                                            {item.links.length > 0 && (
                                                <div className="flex flex-wrap gap-3">
                                                    {item.links.map((link, idx) => (
                                                        <a
                                                            key={idx}
                                                            href={link.url}
                                                            target="_blank"
                                                            rel="noopener noreferrer"
                                                            className="inline-flex items-center gap-1 text-sm text-primary hover:underline font-medium"
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
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Research;
