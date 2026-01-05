import React from 'react';
import { motion } from 'framer-motion';
import { Send, Mail, Linkedin } from 'lucide-react';

const Contact = () => {
    return (
        <section id="contact" className="py-20 bg-white dark:bg-gray-900 transition-colors duration-300">
            <div className="container mx-auto px-6">
                <div className="max-w-4xl mx-auto bg-primary/5 dark:bg-primary-bright/5 rounded-3xl p-8 md:p-12 border border-transparent dark:border-primary-bright/20">

                    <div className="text-center mb-12">
                        <h2 className="text-3xl font-bold text-primary dark:text-white mb-4">Get in Touch</h2>
                        <p className="text-gray-600 dark:text-gray-400">
                            Interested in collaboration or have a question about my research?
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-12">

                        {/* Contact Info */}
                        <div className="space-y-8">
                            <h3 className="text-xl font-bold text-gray-800 dark:text-gray-100">Contact Info</h3>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm text-primary dark:text-white">
                                    <Mail size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Email</p>
                                    <a href="mailto:teddyhuangyh@gmail.com" className="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-primary dark:hover:text-primary-bright transition-colors">
                                        teddyhuangyh@gmail.com
                                    </a>
                                </div>
                            </div>

                            <div className="flex items-center gap-4">
                                <div className="w-12 h-12 bg-white dark:bg-gray-700 rounded-full flex items-center justify-center shadow-sm text-primary dark:text-white">
                                    <Linkedin size={24} />
                                </div>
                                <div>
                                    <p className="text-sm text-gray-500 dark:text-gray-400 font-medium">Social</p>
                                    <a href="https://www.linkedin.com/in/yen-hsiang-huang-03660b347/" target="_blank" rel="noopener noreferrer" className="text-lg font-semibold text-gray-800 dark:text-gray-100 hover:text-primary dark:hover:text-primary-bright transition-colors">
                                        Connect on LinkedIn
                                    </a>
                                </div>
                            </div>
                        </div>

                        {/* Contact Form */}
                        <form
                            action="https://formspree.io/f/mgoegkbg"
                            method="POST"
                            className="space-y-4"
                        >
                            <div>
                                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Name</label>
                                <input
                                    type="text"
                                    id="name"
                                    name="name"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white dark:bg-gray-700 dark:text-white"
                                    placeholder="Your Name"
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Email</label>
                                <input
                                    type="email"
                                    id="email"
                                    name="email"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white dark:bg-gray-700 dark:text-white"
                                    placeholder="your@email.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="message" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-1">Message</label>
                                <textarea
                                    id="message"
                                    name="message"
                                    rows="3"
                                    required
                                    className="w-full px-4 py-3 rounded-lg border border-gray-200 dark:border-gray-600 focus:border-primary focus:ring-2 focus:ring-primary/20 outline-none transition-all bg-white dark:bg-gray-700 dark:text-white resize-none"
                                    placeholder="Enjoy leaving something here!"
                                ></textarea>
                            </div>

                            <button
                                type="submit"
                                className="w-full bg-primary dark:bg-primary-bright hover:bg-primary-dark dark:hover:bg-primary-bright/90 text-white dark:text-gray-900 font-bold py-3 px-6 rounded-lg flex items-center justify-center gap-2 transition-colors shadow-lg shadow-primary/30 dark:shadow-primary-bright/20"
                            >
                                Send Message <Send size={18} />
                            </button>
                        </form>

                    </div>
                </div>
            </div>
        </section>
    );
};

export default Contact;
