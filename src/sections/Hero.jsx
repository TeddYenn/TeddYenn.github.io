import React from 'react';
import { Github, Linkedin, Mail, BookOpen, Fingerprint } from 'lucide-react';
import { motion } from 'framer-motion';
import headshot from '../assets/headshot.jpg';

const Hero = () => {
    return (
        <section id="about" className="min-h-screen flex items-center pt-20 pb-16">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row items-center gap-12">

                    {/* Left Side: Headshot */}
                    <motion.div
                        initial={{ opacity: 0, x: -50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6 }}
                        className="w-full md:w-1/3 flex justify-center"
                    >
                        <motion.div
                            whileHover={{ scale: 1.2 }}
                            transition={{ type: "spring", stiffness: 300, damping: 20 }}
                            className="relative w-64 h-64 md:w-80 md:h-80 rounded-2xl overflow-hidden shadow-xl border-4 border-white dark:border-primary-bright/30 cursor-pointer"
                        >
                            <img
                                src={headshot}
                                alt="Yen-Hsiang (Teddy) Huang"
                                className="w-full h-full object-cover"
                            />
                        </motion.div>
                    </motion.div>

                    {/* Right Side: Content */}
                    <motion.div
                        initial={{ opacity: 0, x: 50 }}
                        animate={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.6, delay: 0.2 }}
                        className="w-full md:w-2/3 text-center md:text-left"
                    >
                        <h1 className="text-4xl md:text-5xl font-bold text-primary dark:text-white mb-4">
                            Yen-Hsiang (Teddy) Huang
                        </h1>
                        <h2 className="text-xl md:text-2xl text-secondary dark:text-gray-300 font-medium mb-6">
                            MS Graduate from NCHU, Taiwan
                        </h2>

                        <p className="text-gray-600 dark:text-gray-400 text-lg leading-relaxed mb-8 max-w-2xl mx-auto md:mx-0">
                            Specializing in reusable computational pipelines and genomic data analysis.
                            Bridging the gap between complex biological data and actionable agricultural insights
                            through advanced statistical modeling and software development.
                        </p>

                        <div className="flex justify-center md:justify-start gap-6">
                            <SocialLink href="https://github.com/TeddYenn" icon={<Github size={24} />} label="GitHub" />
                            <SocialLink href="https://orcid.org/0009-0004-6353-0399" icon={<Fingerprint size={24} />} label="ORCID" />
                            <SocialLink href="https://scholar.google.com.tw/citations?user=lfm77r0AAAAJ&hl=en&oi=sra" icon={<BookOpen size={24} />} label="Scholar" />
                            <SocialLink href="https://www.linkedin.com/in/yen-hsiang-huang-03660b347/" icon={<Linkedin size={24} />} label="LinkedIn" />
                            <SocialLink href="mailto:teddyhuangyh@gmail.com" icon={<Mail size={24} />} label="Email" />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

const SocialLink = ({ href, icon, label }) => (
    <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className="text-secondary dark:text-gray-400 hover:text-primary dark:hover:text-primary-bright transition-colors p-2 hover:bg-gray-100 dark:hover:bg-gray-800 rounded-full"
        aria-label={label}
    >
        {icon}
    </a>
);

export default Hero;
