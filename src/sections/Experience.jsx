import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Briefcase, Calendar, ChevronDown, Award, MapPin, GraduationCap, ExternalLink, Image as ImageIcon, Users, X } from 'lucide-react';

const ActivityModal = ({ activity, onClose }) => {
    if (!activity) return null;

    const getTagStyle = (type) => {
        if (type.includes('Award')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        if (type.includes('Oral')) return 'bg-blue-100 text-blue-800 border-blue-200';
        if (type.includes('Poster')) return 'bg-teal-100 text-teal-800 border-teal-200';
        return 'bg-gray-100 text-gray-800 border-gray-200';
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
                    className="bg-white rounded-2xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto"
                    onClick={(e) => e.stopPropagation()}
                >
                    <div className="sticky top-0 right-0 z-10 flex justify-end p-4 bg-white/80 backdrop-blur-sm">
                        <button
                            onClick={onClose}
                            className="p-2 rounded-full hover:bg-gray-100 transition-colors text-gray-500"
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
                                <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                                    <Calendar size={12} /> {activity.year}
                                </span>
                                {activity.location && (
                                    <span className="px-3 py-1 rounded-full text-xs font-medium bg-gray-100 text-gray-600 flex items-center gap-1">
                                        <MapPin size={12} /> {activity.location}
                                    </span>
                                )}
                            </div>
                            <h3 className="text-2xl font-bold text-gray-900 leading-tight mb-2">
                                {activity.title}
                            </h3>
                            {activity.category && (
                                <p className="text-primary font-medium">{activity.category}</p>
                            )}
                        </div>

                        <div className="prose prose-sm max-w-none text-gray-600 mb-8">
                            <p>{activity.details?.description || "No detailed description available."}</p>
                        </div>

                        {/* Images Section */}
                        {activity.details?.images && activity.details.images.length > 0 ? (
                            <div className="space-y-4">
                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide">Figures & Highlights</h4>
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                    {activity.details.images.map((img, idx) => (
                                        <div key={idx} className="bg-gray-50 rounded-lg border border-gray-100 p-2">
                                            <div className="aspect-video bg-gray-200 rounded flex items-center justify-center text-gray-400">
                                                <ImageIcon size={32} />
                                            </div>
                                            {/* <p className="text-xs text-center mt-2 text-gray-500">Figure {idx + 1}</p> */}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        ) : (
                            <div className="p-6 bg-gray-50 rounded-xl border border-dashed border-gray-200 text-center">
                                <ImageIcon size={24} className="mx-auto text-gray-300 mb-2" />
                                <p className="text-sm text-gray-400">No figures or images available for this activity.</p>
                            </div>
                        )}
                    </div>
                </motion.div>
            </motion.div>
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
            longDescription: 'Thesis focused on "ShiNyP: Platform for SNP Data Analysis and Visualization". Gained strong foundation in reusable population genetics analysis pipeline and R package development.',
            achievements: [
                'GPA: 4.17/4.30; 36 credits of 17 courses',
                '3 research studies: ShiNyP platform, GWAS for rice, Selection footprints in edamame',
                '2 university visits: Tokyo University of Agriculture, Texas A&M University',
                '3 travel grants; 4 scholarships; 5 academic awards'
            ],
            activities: [
                {
                    id: 'ch-biotech',
                    title: 'Gold Award | 6th CH Biotech Innovation Award',
                    year: '2021',
                    category: 'Research Innovation',
                    type: 'Award',
                    location: 'Taipei, Taiwan',
                    details: {
                        description: 'Recognized for the development of a novel algorithm for detecting genetic variants in polyploid crops. The project was selected as the top innovation among 50+ entries.',
                        images: []
                    }
                },
                {
                    id: 'poster-award',
                    title: 'Best Poster Presentation',
                    year: '2020',
                    category: 'Annual Agronomy Conference',
                    type: 'Award',
                    location: 'Tainan, Taiwan',
                    details: {
                        description: 'Awarded for the best visual presentation and defense of research findings at the national conference.',
                        images: []
                    }
                }
            ]
        }
    },
    {
        id: 'tamu',
        type: 'work',
        period: 'Nov 2023 - Feb 2024',
        role: 'Visiting Scholar',
        institution: 'Texas A&M University (TAMU)',
        location: 'College Station, TX, USA',

        details: {
            longDescription: 'Worked in the Rice Genomics Lab, focusing on identifying genetic markers associated with drought tolerance. Utilized high-performance computing clusters to process terabytes of sequencing data.',
            achievements: [
                'Identified 5 novel QTLs associated with drought resistance in rice.',
                'Optimized GATK-based variant calling workflows for polyploid species.',
                'Co-authored 2 peer-reviewed papers in high-impact journals.'
            ],
            activities: [
                {
                    id: 'tsc-award',
                    title: 'TSC Thesis Award',
                    year: '2022',
                    category: 'AI Application',
                    type: 'Award',
                    location: 'Taiwan',
                    details: {
                        description: 'Awarded for the innovative application of deep learning models in predicting rice yield from satellite imagery. The research demonstrated a 15% improvement in prediction accuracy compared to traditional methods.',
                        images: []
                    }
                },
                {
                    id: 'asa-conf',
                    title: 'ASA, CSSA, SSSA International Annual Meeting 2022',
                    year: '2022',
                    type: 'Poster Presentation',
                    location: 'Baltimore, MD, USA',
                    details: {
                        description: 'Presented research on "Genomic Prediction in Polyploid Crops" to an international audience of agronomists and geneticists.',
                        images: []
                    }
                },
                {
                    id: 'tamu-conf',
                    title: 'TAMU Crop Science Conference 2023',
                    year: '2023',
                    type: 'Oral Presentation',
                    location: 'College Station, TX, USA',
                    details: {
                        description: 'Delivered an oral presentation on the findings from the drought tolerance study in rice.',
                        images: []
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
            longDescription: 'Comprehensive study of crop physiology, genetics, and breeding. Completed capstone project on "Effect of Nitrogen Fertilizer on Rice Yield".',
            achievements: [
                'GPA: 3.93/4.30',
                'Conducted a research project on "".'
            ],
            activities: []
        }
    }
];

const ActivityItem = ({ activity, onClick }) => {
    const getTagStyle = (type) => {
        if (type.includes('Award')) return 'bg-yellow-100 text-yellow-800 border-yellow-200';
        if (type.includes('Oral')) return 'bg-blue-100 text-blue-800 border-blue-200';
        if (type.includes('Poster')) return 'bg-teal-100 text-teal-800 border-teal-200';
        return 'bg-gray-100 text-gray-800 border-gray-200';
    };

    return (
        <div
            onClick={onClick}
            className="bg-white p-4 rounded-lg border border-gray-100 shadow-sm hover:shadow-md transition-all cursor-pointer group"
        >
            <div className="flex justify-between items-start gap-4">
                <div>
                    <h5 className="font-bold text-gray-800 text-sm md:text-base group-hover:text-primary transition-colors">
                        {activity.title}
                    </h5>
                    <div className="flex flex-wrap gap-2 mt-2">
                        <span className={`text-xs font-medium px-2 py-0.5 rounded border ${getTagStyle(activity.type)}`}>
                            {activity.type}
                        </span>
                        <span className="text-xs text-gray-500 flex items-center bg-gray-50 px-2 py-0.5 rounded border border-gray-100">
                            <Calendar size={10} className="mr-1" /> {activity.year}
                        </span>
                    </div>
                </div>
                <ExternalLink size={16} className="text-gray-300 group-hover:text-primary transition-colors" />
            </div>
        </div>
    );
};

const Experience = () => {
    const [expandedId, setExpandedId] = useState(null);
    const [selectedActivity, setSelectedActivity] = useState(null);

    const toggleExpand = (id) => {
        setExpandedId(expandedId === id ? null : id);
    };

    return (
        <section id="experience" className="py-20 bg-white">
            <div className="container mx-auto px-6">
                <div className="text-center mb-16">
                    <h2 className="text-3xl font-bold text-primary mb-4">Academic Timeline</h2>
                    <p className="text-gray-600 max-w-2xl mx-auto">
                        A timeline of my academic journey, education, and key achievements.
                    </p>
                </div>

                <div className="max-w-4xl mx-auto">
                    <div className="relative border-l-2 border-gray-200 ml-3 md:ml-6 space-y-8 pl-8 md:pl-10 py-2">
                        {experiences.map((item, idx) => (
                            <motion.div
                                key={item.id}
                                initial={{ opacity: 0, y: 20 }}
                                whileInView={{ opacity: 1, y: 0 }}
                                viewport={{ once: true }}
                                transition={{ delay: idx * 0.1 }}
                                className="relative"
                            >
                                {/* Timeline Dot */}
                                <span className={`absolute -left-[41px] md:-left-[49px] top-6 w-5 h-5 rounded-full border-4 border-white ${item.type === 'work' ? 'bg-primary' : 'bg-secondary'}`}></span>

                                {/* Card */}
                                <div
                                    className={`bg-white rounded-xl border transition-all duration-300 overflow-hidden ${expandedId === item.id ? 'border-primary shadow-md' : 'border-gray-100 hover:border-gray-300 hover:shadow-sm'}`}
                                >
                                    {/* Header (Always Visible) */}
                                    <button
                                        onClick={() => toggleExpand(item.id)}
                                        className="w-full px-6 py-6 flex flex-col md:flex-row gap-4 text-left"
                                    >
                                        <div className="flex-1">
                                            <div className="flex flex-wrap items-center gap-3 mb-2">
                                                <span className="inline-flex items-center gap-1.5 text-sm font-bold text-primary/80 tracking-wide uppercase bg-primary/5 px-3 py-1 rounded-full">
                                                    <Calendar size={14} />
                                                    {item.period}
                                                </span>
                                                <span className="text-xs font-medium text-gray-400 uppercase tracking-wider flex items-center gap-1">
                                                    {item.type === 'education' ? <GraduationCap size={14} /> : <Briefcase size={14} />}
                                                    {item.type}
                                                </span>
                                            </div>
                                            <h3 className="text-xl font-bold text-gray-800 mb-1">{item.role}</h3>
                                            <div className="flex items-center gap-2 text-secondary font-medium mb-2">
                                                <span>{item.institution}</span>
                                                <span className="text-gray-300">•</span>
                                                <span className="text-gray-500 text-sm flex items-center gap-1">
                                                    <MapPin size={12} /> {item.location}
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex items-center justify-center md:justify-end">
                                            <motion.div
                                                animate={{ rotate: expandedId === item.id ? 180 : 0 }}
                                                transition={{ duration: 0.2 }}
                                                className="p-2 rounded-full bg-gray-50 text-gray-400 group-hover:text-primary"
                                            >
                                                <ChevronDown size={20} />
                                            </motion.div>
                                        </div>
                                    </button>

                                    {/* Expanded Content */}
                                    <AnimatePresence>
                                        {expandedId === item.id && (
                                            <motion.div
                                                initial={{ height: 0, opacity: 0 }}
                                                animate={{ height: 'auto', opacity: 1 }}
                                                exit={{ height: 0, opacity: 0 }}
                                                transition={{ duration: 0.3 }}
                                            >
                                                <div className="px-6 pb-8 border-t border-gray-50 bg-gray-50/50">
                                                    <div className="pt-6 space-y-8">

                                                        {/* Overview & Achievements */}
                                                        <div>
                                                            <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-3 border-b border-gray-200 pb-2">Overview</h4>
                                                            <p className="text-gray-700 leading-relaxed mb-4">
                                                                {item.details.longDescription}
                                                            </p>
                                                            {item.details.achievements.length > 0 && (
                                                                <ul className="list-disc list-inside space-y-2 text-gray-700">
                                                                    {item.details.achievements.map((achievement, i) => (
                                                                        <li key={i} className="pl-2">{achievement}</li>
                                                                    ))}
                                                                </ul>
                                                            )}
                                                        </div>

                                                        {/* Activities (Awards & Conferences) */}
                                                        {item.details.activities && item.details.activities.length > 0 && (
                                                            <div>
                                                                <h4 className="text-sm font-bold text-gray-900 uppercase tracking-wide mb-4 flex items-center gap-2 border-b border-gray-200 pb-2">
                                                                    <Award size={18} className="text-secondary" />
                                                                    Activities
                                                                </h4>
                                                                <div className="grid gap-4">
                                                                    {item.details.activities.map((activity) => (
                                                                        <ActivityItem
                                                                            key={activity.id}
                                                                            activity={activity}
                                                                            onClick={() => setSelectedActivity(activity)}
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
