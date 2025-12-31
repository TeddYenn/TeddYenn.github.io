import React from 'react';
import { motion } from 'framer-motion';
import { Book, Monitor, Users } from 'lucide-react';

const teachingItems = [
    {
        title: 'Visual Statistics Apps',
        icon: <Monitor className="text-white" size={24} />,
        color: 'bg-orange-200',
        description: 'Interactive Python/Streamlit applications designed to demonstrate complex statistical concepts for students.',
        details: ['Probability Distributions', 'Hypothesis Testing', 'Regression Analysis']
    },
    {
        title: 'Workshops & Lectures',
        icon: <Users className="text-white" size={24} />,
        color: 'bg-slate-300',
        description: 'Invited talks and hands-on workshops at international universities and conferences.',
        details: ['Kasetsart University (Thailand)', 'PAG Conference (San Diego)', 'Genomic Data Analysis Workshop']
    }
];

const Teaching = () => {
    return (
        <section id="teaching" className="py-20 bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="flex items-center justify-center gap-3 mb-12">
                    <Book className="text-primary dark:text-white" size={32} />
                    <h2 className="text-3xl font-bold text-primary dark:text-white">Teaching & Outreach</h2>
                </div>

                <div className="grid md:grid-cols-2 gap-8 max-w-4xl mx-auto">
                    {teachingItems.map((item, idx) => (
                        <motion.div
                            key={idx}
                            initial={{ opacity: 0, y: 20 }}
                            whileInView={{ opacity: 1, y: 0 }}
                            viewport={{ once: true }}
                            transition={{ delay: idx * 0.2 }}
                            className="bg-white dark:bg-gray-800 rounded-2xl shadow-sm hover:shadow-md transition-shadow overflow-hidden group border border-transparent dark:border-primary-bright/10"
                        >
                            <div className={`h-2 ${item.color}`} />
                            <div className="p-8">
                                <div className={`w-12 h-12 ${item.color} rounded-xl flex items-center justify-center mb-6 shadow-lg group-hover:scale-110 transition-transform`}>
                                    {item.icon}
                                </div>

                                <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100 mb-3">{item.title}</h3>
                                <p className="text-gray-600 dark:text-gray-400 mb-6 leading-relaxed">
                                    {item.description}
                                </p>

                                <ul className="space-y-2">
                                    {item.details.map((detail, i) => (
                                        <li key={i} className="flex items-center gap-2 text-sm font-medium text-secondary dark:text-gray-300">
                                            <span className={`w-1.5 h-1.5 rounded-full ${item.color}`} />
                                            {detail}
                                        </li>
                                    ))}
                                </ul>
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default Teaching;
