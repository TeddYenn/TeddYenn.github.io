import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronDown, ExternalLink, Lightbulb, FileText, Image as ImageIcon, X, Maximize2, Github, Clock } from 'lucide-react';

const ItalicizeShiNyP = ({ text }) => {
    if (!text) return null;
    const parts = text.split(/(ShiNyP)/);
    return (
        <>
            {parts.map((part, i) =>
                part === 'ShiNyP' ? <i key={i} className="italic">{part}</i> : part
            )}
        </>
    );
};

const RenderAuthors = ({ authors }) => {
    if (!authors) return null;

    const parts = authors.split(/(<u>|<\/u>)/);
    let isUnderlined = false;

    return (
        <div className="mb-4 flex flex-wrap items-center gap-x-2 text-sm text-gray-500 dark:text-gray-400 italic">
            <span className="not-italic font-semibold text-gray-400 dark:text-gray-500 uppercase text-[10px] tracking-wider shrink-0">Authors:</span>
            <span>
                {parts.map((part, i) => {
                    if (part === '<u>') {
                        isUnderlined = true;
                        return null;
                    }
                    if (part === '</u>') {
                        isUnderlined = false;
                        return null;
                    }
                    return isUnderlined ? (
                        <u key={i} className="decoration-primary/40 underline-offset-2 font-medium text-gray-700 dark:text-gray-200">
                            {part}
                        </u>
                    ) : part;
                })}
            </span>
        </div>
    );
};

const getTimelineIcon = (label) => {
    const l = label.toLowerCase();
    if (l.includes('start')) return <circle cx="12" cy="12" r="6" fill="currentColor" />;
    if (l.includes('submit')) return <path d="M12 19V5M5 12l7-7 7 7" />;
    if (l.includes('publish') || l.includes('finish')) return (
        <>
            <circle cx="12" cy="12" r="10" />
            <path d="m9 12 2 2 4-4" />
        </>
    );
    if (l.includes('retract')) return (
        <>
            <line x1="18" y1="6" x2="6" y2="18" />
            <line x1="6" y1="6" x2="18" y2="18" />
        </>
    );
    if (l.includes('progress')) return <path d="M12 6v6l4 2" />;
    return <circle cx="12" cy="12" r="10" />;
};

const TimelineContent = ({ event, isLast, idx }) => {
    const getColor = (label) => {
        if (event.color) return event.color;
        const l = label.toLowerCase();
        if (l.includes('start')) return 'bg-blue-400';
        if (l.includes('submit')) return 'bg-orange-400';
        if (l.includes('publish') || l.includes('finish')) return 'bg-emerald-400';
        if (l.includes('retract')) return 'bg-rose-400';
        return 'bg-primary';
    };

    const colorClass = getColor(event.label);
    const borderClass = colorClass.replace('bg-', 'border-');
    const colorName = colorClass.replace('bg-', '');

    return (
        <div className="flex-1 relative group flex flex-col items-center min-w-[100px] md:min-w-0">
            {/* Connection Track (Desktop) */}
            {!isLast && (
                <div className="absolute top-[14px] left-1/2 w-full h-[1px] bg-gray-200 dark:bg-gray-700 hidden md:block" />
            )}

            {/* Animated Connector (Desktop) */}
            {!isLast && (
                <motion.div
                    initial={{ scaleX: 0 }}
                    animate={{ scaleX: 1 }}
                    transition={{ duration: 0.8, delay: idx * 0.15, ease: "easeInOut" }}
                    className={`absolute top-[14px] left-1/2 w-full h-[1.5px] origin-left bg-gradient-to-r from-${colorName} to-transparent opacity-60 dark:opacity-80 hidden md:block`}
                    style={{
                        background: `linear-gradient(to right, var(--tw-gradient-from), transparent)`
                    }}
                />
            )}

            {/* The Node Marker */}
            <motion.div
                initial={{ scale: 0, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                transition={{ type: 'spring', stiffness: 260, damping: 20, delay: idx * 0.1 }}
                className="relative z-10 mb-4"
            >
                {/* Subtle outer glow */}
                <div className={`absolute inset-[-4px] rounded-full blur-[8px] opacity-0 group-hover:opacity-40 transition-opacity duration-300 ${colorClass}`} />

                {/* Icon Container */}
                <div className={`w-8 h-8 rounded-full bg-white dark:bg-gray-800 border-2 ${borderClass} flex items-center justify-center shadow-sm relative transition-all duration-300 group-hover:scale-110 group-hover:shadow-md`}>
                    <svg
                        width="15"
                        height="15"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        className="text-gray-600 dark:text-gray-300"
                    >
                        {getTimelineIcon(event.label)}
                    </svg>
                </div>
            </motion.div>

            {/* Label & Date */}
            <div className="text-center">
                <span className="block text-[9px] font-bold text-gray-400 dark:text-gray-500 uppercase tracking-[0.15em] mb-1.5 transition-colors group-hover:text-gray-600 dark:group-hover:text-gray-300">
                    {event.label}
                </span>
                <div className="inline-flex px-2 py-0.5 rounded-md bg-gray-50/50 dark:bg-gray-700/30 border border-gray-100 dark:border-gray-700 transition-colors group-hover:border-gray-200 dark:group-hover:border-gray-600">
                    <span className="text-[10px] font-mono font-semibold text-gray-600 dark:text-gray-400">
                        {event.date}
                    </span>
                </div>
            </div>
        </div>
    );
};

const Timeline = ({ events }) => {
    if (!events || events.length === 0) return null;

    return (
        <div className="mt-1">
            <h4 className="text-sm border-b border-gray-200 dark:border-gray-700 pb-2 mb-8 font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                <Clock size={16} className="text-purple-500 dark:text-purple-400" />
                Roadmap
            </h4>

            {/* Center the entire structure */}
            <div className="flex justify-center w-full px-2">
                <div className="flex flex-wrap md:flex-nowrap justify-center items-start gap-y-10 md:gap-x-0 w-full max-w-3xl">
                    {events.map((event, idx) => (
                        <TimelineContent
                            key={idx}
                            event={event}
                            idx={idx}
                            isLast={idx === events.length - 1}
                        />
                    ))}
                </div>
            </div>
        </div>
    );
};

import shinyp_1 from '../assets/research/shinyp/shinyp_1.jpg';
import shinyp_2 from '../assets/research/shinyp/shinyp_2.jpg';
import vs_1 from '../assets/research/vs/vs_1.jpg';
import mi_1 from '../assets/research/mi/mi_1.png';
import mi_2 from '../assets/research/mi/mi_2.png';
import mi_3 from '../assets/research/mi/mi_3.png';
import mi_4 from '../assets/research/mi/mi_4.png';

const researchItems = [
    {
        id: 'shinyp',
        title: 'ShiNyP Platform',
        tags: ['R/Shiny', 'Population Genetics', 'SNP Analysis & Visualization'],
        authors: '<u>Yen-Hsiang Huang</u>, Ling-Yu Chen, Endang M. Septiningsih, Pei-Hsiu Kao, Chung-Feng Kao',
        timeline: [
            { label: 'Start', date: '2024-07' },
            { label: 'Submit', date: '2024-11' },
            { label: 'Publish', date: '2025-05' }
        ],
        description: 'ShiNyP offers an integrated, user-friendly platform for efficient and reproducible genome-wide SNP analysis, lowering the technical barrier for population genomics research.',
        summary: 'Current SNP analysis pipelines are fragmented and require command-line skills, making them inaccessible to many researchers. ShiNyP addresses this gap by integrating all major SNP-based population genetics analysis modules into a single, user-friendly R/Shiny platform, covering the entire workflow with automated visualizations and AI-generated reports.',
        keyFindings: [
            'Input: Genome-wide biallelic SNP in Variant Call Format (VCF) file.',
            'Analysis: Data QC, population genetics analysis, core collection, and more.',
            'Output: Publication-ready figures, tables, R objects, and free AI-driven report.'
        ],
        figures: [
            { url: shinyp_1, caption: 'Overview of the ShiNyP platform functionality for genome-wide SNP data analysis.' },
            { url: shinyp_2, caption: 'Graphical outputs generated by the ShiNyP platform using the HGDP dataset. A Phylogenetic NJ tree of 929 individuals, with 354 core samples highlighted in red lines. B Multi‐track Circos plot showing chromosome-level genetic diversity. C–D DAPC scatter plots colored by inferred genetic cluster (C) and by sampling region (D). E Scree plot showing the percentage of variance explained by each principal component. F Manhattan plot depicting selection signatures. G Quantile–quantile (QQ) plot from selection scans. H Interactive Manhattan plot displays SNP overlapping the SIM1, with detailed annotations showed dynamically upon cursor hover. I Schematic representation of the AI‑report system workflow.' }
        ],
        links: [
            { label: 'Full Paper', url: 'https://doi.org/10.1093/molbev/msaf117', type: 'paper' },
            { label: 'User Manual', url: 'https://teddyenn.github.io/ShiNyP-guide', type: 'doc' },
            { label: 'Live Demo', url: 'https://teddyhuang.shinyapps.io/ShiNyP_Demo/', type: 'demo' },
            { label: 'GitHub Repo', url: 'https://github.com/teddyenn/ShiNyP', type: 'github repo' }
        ]
    },
    {
        id: 'gwas-rice',
        title: 'GWAS of Anaerobic Germination',
        tags: ['Rice', 'Hypoxia Tolerance', 'GWAS'],
        authors: '<u>Yen-Hsiang Huang</u>, Endang M. Septiningsih',
        timeline: [
            { label: 'Start', date: '2024-11' },
            { label: 'Finish', date: '2025-02' }
        ],
        description: 'This study identifies key loci and candidate genes associated with anaerobic germination in rice, providing a genomic foundation for functional validation and breeding of flood-tolerant varieties.',
        summary: 'Anaerobic germination is a key trait for direct-seeded rice under flooding and hypoxic conditions. In this study, we conducted a genome-wide association study (GWAS using 3K Rice Genome data) to identify genetic loci associated with seed germination under anaerobic stress. By integrating high-density SNP data, robust GWAS models, and post-GWAS analyses, we uncovered candidate genomic regions and genes relevant to hypoxia tolerance.',
        keyFindings: [
            'A high-quality GWAS dataset was constructed, comprising 327 rice accessions and ~1.9 million SNPs after stringent quality control.',
            'Phenotypic analysis showed that 14-day measurements were more reliable than 7-day measurements, supporting their use as primary traits for GWAS.',
            'LD decay was relatively slow, with r² declining to ~0.25 at ~100 kb, justifying the extension of candidate regions during fine mapping.',
            'Model comparisons indicated that BLINK was stable across different PC numbers, while 5 PCs provided optimal control of population structure based on scree and QQ plots.',
            'Candidate gene analysis highlighted genes involved in translation, energy metabolism, stress response, and transport, many of which show hypoxia-induced expression.'
        ],
        figures: [],
        links: []
    },
    {
        id: 'edamame',
        title: 'Selection Footprints in Edamame',
        tags: ['Vegetable Soybean', 'Population Genetics', 'Breeding', 'Selection Footprints'],
        authors: '<u>Yen-Hsiang Huang</u>, Chung-Feng Kao',
        timeline: [
            { label: 'Start', date: '2022-07' },
            { label: 'Finish', date: '2024-03' },
            { label: 'Retract', date: '2024-05' }
        ],
        description: 'This study identified reduced genetic diversity and significant differentiation in vegetable soybeans, revealed key selective regions, and highlighted two candidate genes for targeted breeding.',
        summary: 'Vegetable soybean (edamame) is an important East Asian crop with distinct traits from grain soybeans, shaped by long-term selection, but the underlying genomic changes are not well understood. Our core collection-based pipeline unveils distinctive selection patterns between vegetable and grain soybeans, identifying selection footprints and favorable alleles in vegetable soybeans, and guiding genomic insights for enhanced breeding strategies.',
        keyFindings: [
            'A highly representative soybean core collection was established, capturing 100% genetic diversity and >98% allelic coverage from only 10.2% of the total germplasm, while preserving the original population structure.',
            'Vegetable and grain soybeans are genetically distinct, with vegetable soybeans forming a clearly separated group characterized by lower genetic diversity, higher differentiation, slower LD decay, and signatures of stronger domestication and selection.',
            'Genome-wide population structure resolved into five groups using 78k high-quality SNPs, revealing close genetic affinity between Taiwanese and Japanese vegetable soybeans and high heterogeneity among grain soybeans.',
            'Strong selection signatures underlying vegetable soybean improvement were identified, including 67 genomic regions and key candidate genes related to seed and pod development, many overlapping known GWAS QTLs.',
            'Favorable alleles explain yield-related trait differentiation, as the accumulation of selected alleles shows a strong positive correlation with 100-seed weight in both core and non-core accessions, validating the core collection as an efficient breeding and genetic discovery platform.'
        ],
        figures: [
            { url: vs_1, caption: 'A novel pipeline using core collection framework for selection footprints in vegetable soybeans. The soybean germplasm comprising 2,618 Taiwanese soybean accessions, underwent phenotypic evaluation and Axiom® SoyaSNP180K chip array genotyping. Data quality control was implemented to address missing phenotypic data through multiple imputation (MI), while poor-quality samples and markers were filtered out in single nucleotide polymorphism (SNP) datasets. Core collections (CC) were established for both grain and vegetable soybeans, from the entire collections (EC) of grain and vegetable, respectively, with phenotypic and genotypic datasets. Data analyses were conducted to evaluate population structure, genetic diversity and differentiation. Furthermore, genome-wide scans were performed to pinpoint loci indicative of selection footprints in vegetable soybeans. The validation step involved examining gene function, QTL mapping (GWAS QTLs data), and phenotypic trait to validate the identified loci, genes, and genomic regions. Prospective applications of this methodology hold promise for advancing vegetable soybean breeding and enhancement strategies through targeted selection. (DAPC, discriminant analysis of principal components; UPGMA, unweighted pair group method with arithmetic mean; LD, linkage disequilibrium; AMOVA, analysis of molecular variance; QTL, quantitative trait locus.)' }
        ],
        links: [
            { label: 'Full Article', url: 'https://teddyenn.github.io/population_genomics-edamame/', type: 'paper' }
        ]
    },
    {
        id: 'imputation',
        title: 'Phenotype Imputation',
        tags: ['Vegetable Soybean', 'Germplasm', 'Multiple Imputation', 'Core Collection'],
        authors: '<u>Yen-Hsiang Huang</u>, Hsin-Mei Ku, Chong-An Wang, Ling-Yu Chen, Shan-Syue He, Shu Chen, Po-Chun Liao, Pin-Yuan Juan, Chung-Feng Kao',
        timeline: [
            { label: 'Start', date: '2022-01' },
            { label: 'Submit', date: '2022-05' },
            { label: 'Publish', date: '2022-09' }
        ],
        description: 'This study demonstrated that phenotypic missing data can bias genetic distance estimation and core collection construction, and showed that multiple imputation enables a more accurate, compact, and representative vegetable soybean core collection for breeding and germplasm utilization.',
        summary: 'Taiwanese vegetable soybean (edamame) germplasm harbors rich phenotypic diversity but is hindered by widespread missing trait data arising from field and environmental constraints. These missing values distort genetic distance estimates, obscure population structure, and reduce the efficiency of core collection construction. By integrating multiple phenotype imputation with clustering and advanced M-strategy core selection, this study establishes a robust analytical framework that reconstructs true phenotypic variation, clarifies population structure, and enables the development of a highly representative yet minimal core collection. The resulting core collection enhances germplasm management efficiency and provides a reliable foundation for phenotypic and molecular breeding applications.',
        keyFindings: [
            'A robust phenotypic multiple imputation framework was established, preserving trait covariance structure and uncertainty while achieving convergence (R̂ < 1.1), effectively reconstructing missing phenotypes without altering overall data structure.',
            'Weighted k-means clustering of 46 phenotypic traits resolved Taiwanese vegetable soybean germplasm into seven well-defined clusters, explaining 77.8% of total phenotypic variation and revealing clear population structure.',
            'A highly representative core collection (CC) of only 36 accessions (18% of the total germplasm) was constructed, maintaining 100% qualitative trait coverage and >98% coincidence rate while preserving original diversity, richness, and evenness.',
            'Compared with cores built from incomplete data, the imputation-based core collection was more compact yet equally representative, demonstrating that missing phenotypes inflate core size and reduce selection precision.',
            'Phenotypic missing values were shown to systematically underestimate genetic distance, masking unique accessions and biasing core selection; multiple imputation restored true inter-accession differentiation.',
            'The imputation-based core collection provides an efficient platform for downstream genetic analysis, SNP-based population studies, and trait-focused breeding, substantially improving germplasm utilization and breeding efficiency in Taiwanese vegetable soybean.'
        ],
        figures: [
            { url: mi_1, caption: 'Schematic representation of establishing a core collection (CC) from the entire collection (EC).' },
            { url: mi_2, caption: 'The flowchart of meta multiple imputation (MI)-based core collection framework.' },
            { url: mi_3, caption: 'Cluster analysis of Taiwanese edamame accessions.⊕: 31 selected accessions of the core collection. The clustering result of the ECimpu was presented with seven clusters, all accessions of the CC were evenly distributed in each group.' },
            { url: mi_4, caption: 'Distribution of genetic distance in seven different clusters for 200 accessions in the entire collection. The genetic distance of accession KG0001 and KG0054 was high based on complete phenotypes (ECimpu), while it was pretty low based on observed phenotypes (ECraw). Both of them were included in the CC, suggesting that they have some unique characteristics covered by incomplete data.' },
        ],
        links: [
            { label: 'Full Paper', url: 'https://doi.org/10.3389/fpls.2022.948349', type: 'paper' }
        ]
    }
];

const ResearchCard = ({ item, expandedId, toggleExpand, onImageClick }) => {
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
        }, 1200);
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

    const getLinkIcon = (type) => {
        switch (type) {
            case 'paper': return <FileText size={14} />;
            case 'demo': return <ExternalLink size={14} />;
            case 'github repo': return <Github size={14} />;
            default: return <ExternalLink size={14} />;
        }
    };

    return (
        <motion.div
            className={`bg-white dark:bg-gray-800 rounded-xl shadow-sm overflow-hidden border transition-all duration-300 relative ${isExpanded ? 'border-primary dark:border-primary-bright ring-1 ring-primary/10 dark:ring-primary-bright/10' : 'border-gray-100 dark:border-primary-bright/20 hover:border-primary/30 dark:hover:border-primary-bright/30'}`}
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
                className="w-full px-6 py-5 flex items-center justify-between hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors text-left relative z-0"
            >
                <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 flex-1">
                    <div className="flex flex-col gap-2">
                        <span className="font-bold text-xl text-gray-800 dark:text-gray-100">
                            <ItalicizeShiNyP text={item.title} />
                        </span>

                        {/* Tags */}
                        <div className="flex flex-wrap gap-2">
                            {item.tags.map(tag => (
                                <span key={tag} className="text-xs px-2.5 py-1 bg-primary/5 dark:bg-transparent text-primary dark:text-primary-bright border border-primary/20 dark:border-primary-bright/40 rounded-full font-medium">
                                    <ItalicizeShiNyP text={tag} />
                                </span>
                            ))}
                        </div>
                    </div>

                    {/* Figure Thumbnails Preview */}
                    {item.figures && item.figures.length > 0 && (
                        <div className="flex gap-2 shrink-0 md:mr-4">
                            {item.figures.slice(0, 3).map((fig, idx) => (
                                <div key={idx} className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-md overflow-hidden border border-gray-200 dark:border-gray-600 bg-gray-100 dark:bg-gray-700">
                                    <img
                                        src={fig.url}
                                        alt={`Thumbnail ${idx}`}
                                        className="w-full h-full object-cover opacity-80 hover:opacity-100 transition-opacity"
                                    />
                                </div>
                            ))}
                            {item.figures.length > 3 && (
                                <div className="h-12 w-12 sm:h-14 sm:w-14 md:h-16 md:w-16 rounded-md border border-gray-200 dark:border-gray-600 bg-gray-50 dark:bg-gray-800 flex items-center justify-center text-xs text-gray-400 font-medium">
                                    +{item.figures.length - 3}
                                </div>
                            )}
                        </div>
                    )}
                </div>
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.2 }}
                    className="ml-4 text-gray-400 dark:text-gray-300 shrink-0"
                >
                    <ChevronDown size={20} />
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
                        <div className="px-6 pb-8 pt-2 border-t border-gray-100 dark:border-gray-700 bg-gray-50/30 dark:bg-gray-800/30">
                            <div className="flex flex-col gap-8">
                                {/* Summary Section */}
                                <div className="prose prose-sm dark:prose-invert max-w-none">
                                    <RenderAuthors authors={item.authors} />

                                    <h4 className="text-sm border-b border-gray-200 dark:border-gray-700 pb-2 mb-3 font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                        <FileText size={16} className="text-primary dark:text-primary-bright" />
                                        Overview
                                    </h4>
                                    <p className="text-gray-600 dark:text-gray-300 leading-relaxed">
                                        <ItalicizeShiNyP text={item.summary || item.description} />
                                    </p>
                                </div>

                                {/* Key Findings Section */}
                                {item.keyFindings && item.keyFindings.length > 0 && (
                                    <div>
                                        <h4 className="text-sm border-b border-gray-200 dark:border-gray-700 pb-2 mb-3 font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                            <Lightbulb size={16} className="text-yellow-500 dark:text-yellow-400" />
                                            Key Messages
                                        </h4>
                                        <ul className="space-y-2">
                                            {item.keyFindings.map((finding, idx) => (
                                                <li key={idx} className="flex items-start gap-3 text-sm text-gray-600 dark:text-gray-300">
                                                    <span className="mt-1.5 w-1.5 h-1.5 rounded-full bg-primary dark:bg-primary-bright shrink-0" />
                                                    <span className="leading-relaxed">
                                                        <ItalicizeShiNyP text={finding} />
                                                    </span>
                                                </li>
                                            ))}
                                        </ul>
                                    </div>
                                )}

                                {/* Figures Section */}
                                {item.figures && item.figures.length > 0 && (
                                    <div>
                                        <h4 className="text-sm border-b border-gray-200 dark:border-gray-700 pb-2 mb-4 font-bold text-gray-900 dark:text-gray-100 flex items-center gap-2">
                                            <ImageIcon size={16} className="text-blue-500 dark:text-blue-400" />
                                            Figures
                                        </h4>
                                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                                            {item.figures.map((fig, idx) => (
                                                <div key={idx} className="group">
                                                    <div
                                                        className="aspect-video bg-gray-100 dark:bg-gray-700 rounded-lg overflow-hidden border border-gray-200 dark:border-gray-600 cursor-zoom-in relative"
                                                        onClick={(e) => { e.stopPropagation(); onImageClick(fig.url); }}
                                                    >
                                                        <img
                                                            src={fig.url}
                                                            alt={fig.caption}
                                                            className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-105"
                                                        />
                                                        <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors flex items-center justify-center opacity-0 group-hover:opacity-100">
                                                            <Maximize2 className="text-white drop-shadow-md" size={24} />
                                                        </div>
                                                    </div>
                                                    <p className="mt-2 text-xs text-gray-500 dark:text-gray-400 leading-tight">
                                                        <span className="font-semibold text-gray-700 dark:text-gray-300">Fig {idx + 1}. </span>
                                                        <ItalicizeShiNyP text={fig.caption} />
                                                    </p>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Resources / Links Section */}
                                {item.links && item.links.length > 0 && (
                                    <div className="pt-2">
                                        <div className="flex flex-wrap gap-3">
                                            {item.links.map((link, idx) => (
                                                <a
                                                    key={idx}
                                                    href={link.url}
                                                    target="_blank"
                                                    rel="noopener noreferrer"
                                                    className="inline-flex items-center gap-1.5 text-sm px-4 py-2 rounded-lg bg-white dark:bg-gray-700 border border-gray-200 dark:border-gray-600 text-gray-700 dark:text-gray-200 hover:border-primary dark:hover:border-primary-bright hover:text-primary dark:hover:text-primary-bright transition-all shadow-sm hover:shadow-md font-medium"
                                                >
                                                    {getLinkIcon(link.type)}
                                                    <ItalicizeShiNyP text={link.label} />
                                                </a>
                                            ))}
                                        </div>
                                    </div>
                                )}

                                {/* Timeline Section */}
                                <Timeline events={item.timeline} />
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </motion.div>
    );
};

const Research = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [zoomedImage, setZoomedImage] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="research" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="text-center mb-12">
                    <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">Research</h2>
                    {/* <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        Highlights of my academic research and projects, featuring key findings and developed tools.
                    </p> */}
                </div>

                <div className="max-w-4xl mx-auto space-y-6">
                    {researchItems.map((item) => (
                        <ResearchCard
                            key={item.id}
                            item={item}
                            expandedId={expandedId}
                            toggleExpand={toggleExpand}
                            onImageClick={setZoomedImage}
                        />
                    ))}
                </div>
            </div>

            {/* Image Zoom Overlay */}
            <AnimatePresence>
                {zoomedImage && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[60] flex items-center justify-center bg-black/90 p-4 md:p-10 cursor-zoom-out"
                        onClick={() => setZoomedImage(null)}
                    >
                        <motion.button
                            className="absolute top-6 right-6 p-2 rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
                            onClick={() => setZoomedImage(null)}
                        >
                            <X size={24} />
                        </motion.button>
                        <motion.img
                            initial={{ scale: 0.9 }}
                            animate={{ scale: 1 }}
                            exit={{ scale: 0.9 }}
                            src={zoomedImage}
                            alt="Zoomed Research Figure"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </section>
    );
};

export default Research;

