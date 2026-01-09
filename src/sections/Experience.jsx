import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, ChevronDown, Award, MapPin, GraduationCap, ExternalLink, Image as ImageIcon, Users, X } from 'lucide-react';

// Import assets
import tbia1 from '../assets/tbia-award/tbia-award-1.jpg';
import tbia2 from '../assets/tbia-award/tbia-award-2.jpg';
import tbia3 from '../assets/tbia-award/tbia-award-3.png';

import ciep1 from '../assets/ciep-visit/ciep-visit-1.jpg';
import ciep2 from '../assets/ciep-visit/ciep-visit-2.jpg';
import ciep3 from '../assets/ciep-visit/ciep-visit-3.jpg';
import ciep4 from '../assets/ciep-visit/ciep-visit-4.jpg';

import pag321 from '../assets/pag32/pag32-1.jpg';
import pag322 from '../assets/pag32/pag32-2.png';
import pag323 from '../assets/pag32/pag32-3.png';

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


const ActivityModal = ({ activity, onClose }) => {
    const [zoomedImage, setZoomedImage] = useState(null);
    if (!activity) return null;

    const getTagStyle = (type) => {
        if (type.includes('Award')) return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-transparent dark:text-yellow-400 dark:border-yellow-400/50';
        if (type.includes('Presentation')) return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-transparent dark:text-blue-400 dark:border-blue-400/50';
        if (type.includes('Program')) return 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-transparent dark:text-teal-400 dark:border-teal-400/50';
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-transparent dark:text-gray-300 dark:border-gray-500';
    };

    return (
        <AnimatePresence>
            <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
                onClick={onClose}
            >
                <motion.div
                    initial={{ scale: 0.9, opacity: 0 }}
                    animate={{ scale: 1, opacity: 1 }}
                    exit={{ scale: 0.9, opacity: 0 }}
                    className="bg-white dark:bg-gray-800 rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="sticky top-0 right-0 z-10 flex justify-end p-4 bg-white/80 dark:bg-gray-800/80 backdrop-blur-sm">
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors text-gray-500 dark:text-gray-400"
                        >
                            <X size={24} />
                        </button>
                    </div>

                    <div className="px-8 pb-8">
                        <div className="mb-6">
                            <div className="flex flex-wrap gap-2 mb-3">
                                <span className={`px-3 py-1 rounded-full text-xs font-semibold border ${getTagStyle(activity.type)}`}>
                                    {activity.type}
                                </span>
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                    <Calendar size={12} /> {activity.year}
                                </span>
                                {activity.location && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 flex items-center gap-1">
                                        <MapPin size={12} /> {activity.location}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 dark:text-white leading-tight mb-2">
                                <ItalicizeShiNyP text={activity.title} />
                            </h3>
                            {activity.category && (
                                <p className="text-primary dark:text-primary-bright font-medium">{activity.category}</p>
                            )}
                        </div>

                        <div className="prose prose-sm max-w-none text-gray-600 dark:text-gray-300 mb-6">
                            <p>
                                <ItalicizeShiNyP text={activity.details?.description || "No detailed description available."} />
                            </p>
                        </div>

                        {/* Links Section */}
                        {activity.details?.links && activity.details.links.length > 0 && (
                            <div className="flex flex-wrap gap-4 mb-8">
                                {activity.details.links.map((link, idx) => (
                                    <a
                                        key={idx}
                                        href={link.url}
                                        target="_blank"
                                        rel="noopener noreferrer"
                                        className="inline-flex items-center gap-1.5 text-sm font-medium text-primary dark:text-primary-bright hover:underline bg-primary/5 dark:bg-primary-bright/10 px-3 py-1.5 rounded-lg transition-colors"
                                    >
                                        <ExternalLink size={14} />
                                        <ItalicizeShiNyP text={link.label} />
                                    </a>
                                ))}
                            </div>
                        )}

                        {/* Images Section */}
                        {activity.details?.images && activity.details.images.length > 0 ? (
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide">Highlights</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activity.details.images.map((img, idx) => (
                                        <div
                                            key={idx}
                                            className="bg-gray-50 dark:bg-gray-700 rounded-lg border border-gray-100 dark:border-gray-600 p-2 overflow-hidden cursor-zoom-in"
                                            onClick={() => setZoomedImage(img)}
                                        >
                                            <div className="aspect-video bg-gray-200 dark:bg-gray-600 rounded flex items-center justify-center text-gray-400 dark:text-gray-500 overflow-hidden">
                                                {img ? (
                                                    <img src={img} alt={`Figure ${idx + 1}`} className="w-full h-full object-cover hover:scale-105 transition-transform duration-500" />
                                                ) : (
                                                    <ImageIcon size={32} />
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 bg-gray-50 dark:bg-gray-700/50 rounded-xl border border-dashed border-gray-200 dark:border-gray-600 text-center">
                                <ImageIcon size={24} className="mx-auto text-gray-300 mb-2" />
                                <p className="text-sm text-gray-400">No figures or images available for this activity.</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>

            {/* Zoomed Image Overlay */}
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
                            alt="Zoomed"
                            className="max-w-full max-h-full object-contain rounded-lg shadow-2xl"
                            onClick={(e) => e.stopPropagation()}
                        />
                    </motion.div>
                )}
            </AnimatePresence>
        </AnimatePresence>
    );
};

const experiences = [
    {
        id: 'master',
        type: 'education',
        period: '2023 - 2025',
        role: 'MS in Agronomy (Biostatistics Division)',
        institution: 'National Chung Hsing University (NCHU)',
        location: 'Taichung, Taiwan',

        details: {
            longDescription: 'Thesis focused on "ShiNyP: Platform for SNP Data Analysis and Visualization". Advised by Dr. Chung-Feng Kao. Gained strong foundation in reusable population genetics analysis pipeline and R package development.',
            achievements: [
                'GPA: 4.17/4.30; 36 credits of 17 courses',
                'Completed 3 research studies: ShiNyP platform, GWAS for rice, Selection footprints in edamame',
                'Attended 2 university visits: Tokyo University of Agriculture, Texas A&M University',
                'Received 3 travel grants, 4 scholarships, 5 academic awards, 2 hackathon awards'
            ],
            activities: [
                {
                    id: 'tbia-award',
                    title: 'Most Popular Award | 2nd TBIA Open Data Hackathon',
                    year: 'Aug 2025',
                    category: 'Bio-Databases Hackathon',
                    type: 'Award',
                    location: 'Taipei, Taiwan',
                    details: {
                        description: 'I led a team to develop a platform to support conservation engagement and provide open-data resources for leopard cat (Prionailurus bengalensis), an endangered species in Taiwan.',
                        images: [tbia1, tbia2, tbia3],
                        links: [
                            { label: 'Project Link', url: 'https://teddyhuang.shinyapps.io/Shihu/' },
                            { label: 'Event Page', url: 'https://2024testforme.my.canva.site/tbia2025-dataathon' },
                            { label: 'Event Outcomes', url: 'https://tbiadata.tw/zh-hant/news/detail/39' }
                        ]
                    }
                },
                {
                    id: 'tsc-award',
                    title: 'Competitive Award | 18th TSC Thesis Competition',
                    year: 'Aug 2025',
                    category: 'AI Thesis Competition',
                    type: 'Award',
                    location: 'Taipei, Taiwan',
                    details: {
                        description: 'I received the competitive award for my thesis "ShiNyP: Platform for SNP Data Analysis and Visualization".',
                        images: [],
                        links: [
                            { label: 'Event Page', url: 'https://www.facebook.com/TopcoAward' }
                        ]
                    }
                },
                {
                    id: 'ciep-visit',
                    title: 'CIEP Participant | Tokyo University of Agriculture',
                    year: 'Jul-Aug 2025',
                    category: 'Visiting Program',
                    type: 'Program',
                    location: 'Tokyo, Japan',
                    details: {
                        description: 'I visited Tokyo University of Agriculture to learn about the issues in sustainable agriculture. This year, the program was based at Okhotsk Campus, Tokyo University of Agriculture, Abashiri, Hokkaido. A total of 28 participants joined the program, including 16 Japanese students and 12 international students from 8 universities in 9 countries and regions.',
                        images: [ciep1, ciep2, ciep3, ciep4],
                        links: [
                            { label: 'Event Page', url: 'https://www.nodai.ac.jp/english/ip/international-students-summit/' }
                        ]
                    }
                },
                {
                    id: 'ch-biotech',
                    title: 'Gold Award | 6th CH Biotech Innovation Award',
                    year: 'Jul 2024',
                    category: 'Agri-Biotech Research Innovation Competition',
                    type: 'Award',
                    location: 'Taipei, Taiwan',
                    details: {
                        description: 'Recognized for the development of a novel algorithm for detecting genetic variants in polyploid crops. The project was selected as the top innovation among 50+ entries.',
                        images: [],
                        links: [
                            { label: 'Event Page', url: 'https://www.chbio.com/en/latest_news/july-15-2025-the-ch-biotech-innovation-award-showcases-taiwans-rd-strengths-and-more-importantly-creates-value-on-the-global-stage/' }
                        ]
                    }
                },
                {
                    id: 'tamu-visit',
                    title: 'Visiting Student | Texas A&M University',
                    year: 'Nov 2024 - Feb 2025',
                    category: 'Research Visiting Program',
                    type: 'Program',
                    location: 'College Station, USA',
                    details: {
                        description: 'I visited Texas A&M University to learn about the latest research in agronomy and biotechnology.',
                        images: [],
                        links: [
                            { label: 'Texas A&M University', url: 'https://www.tamu.edu/' }
                        ]
                    }
                },
                {
                    id: 'cssa-award',
                    title: 'Top 15 Finalist | Diversity Student Poster Contest, CSSA',
                    year: 'Nov 2024',
                    category: 'Poster Competition',
                    type: 'Award',
                    location: 'San Antonio, USA',
                    details: {
                        description: 'I received the top 15 finalist award for my poster presentation at the CSSA Diversity Student Poster Contest.',
                        images: [],
                        links: [
                            { label: 'Event Page', url: 'https://www.sciencesocieties.org/files/meetings/student-competition-descriptions.pdf' },
                            { label: 'Event Outcomes', url: 'https://www.sciencesocieties.org/publications/csa-news/2025/june/highlights-from-the-diversity-student-poster-competition' }
                        ]
                    }
                },
                {
                    id: 'spc6-award',
                    title: '2nd Place | 6th Science Paper Competition, NCHU',
                    year: 'Jun 2024',
                    category: 'Thesis Competition',
                    type: 'Award',
                    location: 'Taichung, Taiwan',
                    details: {
                        description: 'I received the top 2nd place award for my thesis presentation at the 6th Science Paper Competition.',
                        images: [],
                        links: [
                            { label: 'Event Page', url: 'https://sites.google.com/email.nchu.edu.tw/scientific-paper-competition/%E6%AD%B7%E5%B1%86%E8%8A%B1%E7%B5%AE-highlights/%E7%AC%AC%E5%85%AD%E5%B1%86-2023' }
                        ]
                    }
                },
                {
                    id: 'aodh-award',
                    title: 'Top 10 Finalist | 2023 Agriculture Open Data Hackathon, MOA, Taiwan',
                    year: 'Nov 2023',
                    category: 'Hackathon',
                    type: 'Award',
                    location: 'Taipei, Taiwan',
                    details: {
                        description: 'I received the top 10 finalist award for my hackathon presentation at the 2023 Agriculture Open Data Hackathon.',
                        images: [],
                        links: [
                            { label: 'Event Page', url: 'https://data.moa.gov.tw/HackathonA/Home.aspx?ID=1' }
                        ]
                    }
                },
                {
                    id: 'thai-visit',
                    title: 'Invited Speaker | Kasetsart University',
                    year: 'Nov 2023',
                    category: 'Visiting Student',
                    type: 'Presentation',
                    location: 'Bangkok, Thailand',
                    details: {
                        description: 'I visited Kasetsart University to give a talk on my research.',
                        images: [],
                        links: [
                            { label: 'Kasetsart University', url: 'https://www.ku.ac.th/en/community-home' }
                        ]
                    }
                },
            ]
        }
    },
    {
        id: 'tamu',
        type: 'work',
        period: 'Nov 2023 - Feb 2024',
        role: 'Visiting Scholar',
        institution: 'Texas A&M University (TAMU)',
        location: 'College Station, USA',

        details: {
            longDescription: 'Worked in a genomic editing lab (PI: Dr. Endang M. Septiningsih), focusing on identifying genetic markers associated with hypoxic germination tolerance in rice. Utilized high-performance computing clusters to process and analyze SNP data. During my visit, I also attended two conferences, departmental seminars, lab meetings, and university events.',
            achievements: [],
            activities: [
                {
                    id: 'pag32-conf',
                    title: 'The 32th Plant and Animal Genome Conference (PAG 32)',
                    year: 'Jan 2025',
                    category: 'International Conference',
                    type: 'Presentation',
                    location: 'San Diego, USA',
                    details: {
                        description: '',
                        images: [pag321, pag322, pag323],
                        links: [
                            { label: 'My Talk', url: 'https://plan.core-apps.com/pag32/event/4d484110adf7a8fd65f25ede0bea4d5f' },
                            { label: 'PAG Website', url: 'https://intlpag.org/' }
                        ]
                    }
                },
                {
                    id: 'asa2024-conf',
                    title: 'ASA, CSSA, SSSA International Annual Meeting 2024',
                    year: 'Nov 2024',
                    category: 'International Conference',
                    type: 'Presentation',
                    location: 'San Antonio, USA',
                    details: {
                        description: '',
                        images: [],
                        links: []
                    }
                }
            ]
        }
    },
    {
        id: 'undergrad',
        type: 'education',
        period: '2019 - 2023',
        role: 'BS in Agronomy',
        institution: 'National Chung Hsing University (NCHU)',
        location: 'Taichung, Taiwan',
        details: {
            longDescription: 'Comprehensive study of crop physiology, genetics, and breeding as well as agricultural statistics, data analysis, and visualization. Completed a research project on "A Multiple Phenotype Imputation for Core Collection in Taiwanese Edamames".',
            achievements: [
                'GPA: 3.93/4.30; 162 credits of 73 courses',
                'Conducted a government-funded grant project & it was recognized as the best research outcomes nationally (top 2-3% of applicant)',
                'Attended a university visit: Northwest A&F University',
                'Received 4 scholarships, 4 academic awards'
            ],
            activities: [
                {
                    id: 'rca-award',
                    title: 'Research Creation Award | College Student Research Project, NTSC, Taiwan',
                    year: 'Jul 2023',
                    category: 'Funded Research Project & Award',
                    type: 'Award',
                    location: 'Taipei, Taiwan',
                    details: {
                        description: '',
                        images: [],
                        links: []
                    }
                },
                {
                    id: 'ch4-biotech',
                    title: 'Bronze Award | 4th CH Biotech Innovation Award',
                    year: 'Jul 2023',
                    category: 'Agri-Biotech Research Innovation Competition',
                    type: 'Award',
                    location: 'Nantou, Taiwan',
                    details: {
                        description: 'Recognized for the development of a novel algorithm for detecting genetic variants in polyploid crops. The project was selected as the top innovation among 50+ entries.',
                        images: [],
                        links: [
                            { label: 'Innovation Award', url: 'https://example.com' }
                        ]
                    }
                },
                {
                    id: 'nwau-visit',
                    title: 'Visiting Student | Northwest A&F University',
                    year: 'Jun-Jul 2023',
                    category: 'Visiting Program',
                    type: 'Program',
                    location: 'Yangling, China',
                    details: {
                        description: 'I visited Northwest A&F University to learn about the latest research in agronomy and biotechnology.',
                        images: [],
                        links: [
                            { label: 'NWAU', url: 'https://www.nwafu.edu.cn/' }
                        ]
                    }
                },
                {
                    id: 'spc5-award',
                    title: '3rd Place | 5th Science Paper Competition, NCHU',
                    year: 'Jun 2023',
                    category: 'Thesis Competition',
                    type: 'Award',
                    location: 'Taichung, Taiwan',
                    details: {
                        description: 'I received the 3rd place award for my thesis presentation at the 5th Science Paper Competition.',
                        images: [],
                        links: [
                            { label: 'NCHU', url: 'https://www.nchu.edu.tw/' }
                        ]
                    }
                },
                {
                    id: 'poster-award',
                    title: 'Outstanding Poster | 2023 Taiwan Society of Agronomy Annual Meeting',
                    year: 'May 2023',
                    category: 'Poster Presentation',
                    type: 'Award',
                    location: 'Taichung, Taiwan',
                    details: {
                        description: '',
                        images: [],
                        links: []
                    }
                },
                {
                    id: 'spc4-award',
                    title: '2nd Place | 4th Science Paper Competition, NCHU',
                    year: 'Jun 2022',
                    category: 'Thesis Competition',
                    type: 'Award',
                    location: 'Taichung, Taiwan',
                    details: {
                        description: 'I received the 2nd place award for my thesis presentation at the 6th Science Paper Competition.',
                        images: [],
                        links: [
                            { label: 'NCHU', url: 'https://www.nchu.edu.tw/' }
                        ]
                    }
                },
            ]
        }
    }
];

const ActivityItem = ({ activity, onClick }) => {
    const getTagStyle = (type) => {
        if (type.includes('Award')) return 'bg-yellow-100 text-yellow-800 border-yellow-200 dark:bg-transparent dark:text-yellow-400 dark:border-yellow-400/50';
        if (type.includes('Presentation')) return 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-transparent dark:text-blue-400 dark:border-blue-400/50';
        if (type.includes('Program')) return 'bg-teal-100 text-teal-800 border-teal-200 dark:bg-transparent dark:text-teal-400 dark:border-teal-400/50';
        return 'bg-gray-100 text-gray-800 border-gray-200 dark:bg-transparent dark:text-gray-300 dark:border-gray-500';
    };

    return (
        <div
            onClick={onClick}
            className="bg-white dark:bg-gray-800 p-4 rounded-lg border border-gray-100 dark:border-gray-700 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
            <div className="flex justify-between items-start gap-4">
                <div className="flex-1">
                    <div className="flex flex-wrap items-center gap-x-3 gap-y-2 mb-2">
                        <h5 className="font-bold text-gray-800 dark:text-gray-100 text-sm md:text-base group-hover:text-primary dark:group-hover:text-primary-bright transition-colors">
                            <ItalicizeShiNyP text={activity.title} />
                        </h5>
                        <div className="flex flex-wrap gap-2">
                            <span className={`text-xs font-bold px-2 py-0.5 rounded border-2 ${getTagStyle(activity.type)}`}>
                                {activity.type}
                            </span>
                            <span className="text-xs text-gray-500 dark:text-gray-400 flex items-center bg-gray-50 dark:bg-gray-700 px-2 py-0.5 rounded border border-gray-100 dark:border-gray-600">
                                <Calendar size={10} className="mr-1" /> {activity.year}
                            </span>
                        </div>
                    </div>
                </div>
                <ExternalLink size={16} className="text-gray-300 dark:text-gray-600 group-hover:text-primary dark:group-hover:text-primary-bright transition-colors" />
            </div>
        </div>
    );
};

const ExperienceCard = ({ item, idx, expandedId, toggleExpand }) => {
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

    // Clear timer if it expands (either via click or auto)
    React.useEffect(() => {
        if (isExpanded && hoverTimer) {
            clearTimeout(hoverTimer);
            setHoverTimer(null);
            setIsHovered(false);
        }
    }, [isExpanded, hoverTimer]);

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ delay: idx * 0.1 }}
            className="relative"
            onMouseEnter={handleMouseEnter}
            onMouseLeave={handleMouseLeave}
        >
            {/* Timeline Dot */}
            <span className={`absolute -left-[41px] md:-left-[49px] top-6 w-5 h-5 rounded-full border-4 border-white dark:border-gray-900 ${item.type === 'work' ? 'bg-primary' : 'bg-secondary'} dark:bg-primary-bright`}></span>

            {/* Card */}
            <div
                className={`bg-white dark:bg-gray-800 rounded-xl border transition-all duration-300 overflow-hidden relative ${isExpanded ? 'border-primary dark:border-primary-bright shadow-md' : 'border-gray-100 dark:border-gray-700 hover:border-gray-300 dark:hover:border-gray-600 hover:shadow-sm'}`}
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

                {/* Header (Always Visible) */}
                <button
                    onClick={() => toggleExpand(item.id)}
                    className="w-full px-6 py-6 flex flex-col md:flex-row gap-4 text-left relative z-0"
                >
                    <div className="flex-1">
                        <div className="flex flex-wrap items-center gap-3 mb-2">
                            <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary/80 dark:text-primary-bright tracking-wide uppercase bg-primary/5 dark:bg-transparent border border-transparent dark:border-primary-bright/50 px-3 py-1 rounded-full">
                                <Calendar size={14} />
                                {item.period}
                            </span>
                            <span className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                {item.type === 'education' ? <GraduationCap size={14} /> : <Briefcase size={14} />}
                                {item.type}
                            </span>
                        </div>
                        <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-1">
                            <ItalicizeShiNyP text={item.role} />
                        </h3>
                        <div className="flex flex-wrap items-center gap-x-3 gap-y-1 text-secondary dark:text-gray-400 font-medium mb-2">
                            <span>{item.institution}</span>
                            <span className="text-gray-500 dark:text-gray-500 text-sm flex items-center gap-1">
                                <MapPin size={12} /> {item.location}
                            </span>
                        </div>
                    </div>

                    <div className="flex items-center justify-center md:justify-end">
                        <motion.div
                            animate={{ rotate: isExpanded ? 180 : 0 }}
                            transition={{ duration: 0.2 }}
                            className="p-2 rounded-full bg-gray-50 dark:bg-gray-700 text-gray-400 group-hover:text-primary dark:group-hover:text-primary-bright"
                        >
                            <ChevronDown size={20} />
                        </motion.div>
                    </div>
                </button>

                {/* Expanded Content */}
                <AnimatePresence>
                    {isExpanded && (
                        <motion.div
                            initial={{ height: 0, opacity: 0 }}
                            animate={{ height: 'auto', opacity: 1 }}
                            exit={{ height: 0, opacity: 0 }}
                            transition={{ duration: 0.3 }}
                        >
                            <div className="px-6 pb-8 border-t border-gray-50 dark:border-gray-700 bg-gray-50/50 dark:bg-gray-800/50">
                                <div className="pt-6 space-y-8">

                                    {/* Overview & Achievements */}
                                    <div>
                                        <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-3 border-b border-gray-200 dark:border-gray-700 pb-2">Overview</h4>
                                        <p className="text-gray-700 dark:text-gray-300 leading-relaxed mb-4">
                                            <ItalicizeShiNyP text={item.details.longDescription} />
                                        </p>
                                        {item.details.achievements.length > 0 && (
                                            <ul className="list-disc list-inside space-y-2 text-gray-700 dark:text-gray-300">
                                                {item.details.achievements.map((achievement, i) => (
                                                    <li key={i} className="pl-2">
                                                        <ItalicizeShiNyP text={achievement} />
                                                    </li>
                                                ))}
                                            </ul>
                                        )}
                                    </div>

                                    {/* Activities (Awards & Conferences) */}
                                    {item.details.activities && item.details.activities.length > 0 && (
                                        <div>
                                            <h4 className="text-sm font-bold text-gray-900 dark:text-white uppercase tracking-wide mb-4 flex items-center gap-2 border-b border-gray-200 dark:border-gray-700 pb-2">
                                                <Award size={18} className="text-secondary dark:text-gray-400" />
                                                Activities
                                            </h4>
                                            <div className="grid gap-4">
                                                {item.details.activities.map((activity) => (
                                                    <ActivityItem
                                                        key={activity.id}
                                                        activity={activity}
                                                        onClick={(e) => {
                                                            e.stopPropagation();
                                                            // We pass a function to setSelectedActivity in the parent
                                                            item.onActivityClick(activity);
                                                        }}
                                                    />
                                                ))}
                                            </div>
                                        </div>
                                    )}

                                </div>
                            </div>
                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </motion.div>
    );
};

const Experience = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="experience" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">Academic Timeline</h2>
                    <p className="text-gray-600 dark:text-gray-400 max-w-2xl mx-auto">
                        A timeline of my academic journey, education, and key achievements.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative border-l-2 border-gray-200 dark:border-gray-700 ml-3 md:ml-6 space-y-8 pl-8 md:pl-10 py-2">
                        {experiences.map((item, idx) => (
                            <ExperienceCard
                                key={item.id}
                                item={{ ...item, onActivityClick: setSelectedActivity }}
                                idx={idx}
                                expandedId={expandedId}
                                toggleExpand={toggleExpand}
                            />
                        ))}
                    </div>
                </div>
            </div>

            {/* Modal */}
            <ActivityModal
                activity={selectedActivity}
                onClose={() => setSelectedActivity(null)}
            />
        </section>
    );
};

export default Experience;
