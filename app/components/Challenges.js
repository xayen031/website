'use client';

import { motion } from 'framer-motion';
import { ClockIcon, CurrencyDollarIcon, ArrowTrendingUpIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import './Challenges.css';

// Component for AI-powered bidding solutions
// TODO: Test with 5-10 B2B users to validate simplicity and benefit clarity

export default function Challenges() {
    const { language } = useLanguage();
    const t = translations[language];

    const scrollToSection = (sectionId) => {
        const element = document.getElementById(sectionId);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth' });
        }
    };

    return (
        <section id="challenges" className="challenges">
            <div className="challenges__content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="challenges__header"
                >
                    <h2>{t.challengesTitle}</h2>
                    <p>{t.challengesSubtitle}</p>
                </motion.div>

                <motion.div
                    className="challenges__trust"
                    initial={{ opacity: 0, y: 10 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.5, delay: 0.3 }}
                    viewport={{ once: true }}
                >
                    <div className="challenges__trust-badge" data-tooltip="Client Success Stories">
                        {t.challengesTrustedBy}
                    </div>
                </motion.div>

                <div className="challenges__grid">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true }}
                        className="challenges__card"
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.15)' }}
                    >
                        <div className="challenges__card-content">
                            <motion.div
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut"
                                }}
                            >
                                <ClockIcon className="challenges__card-icon" />
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                {t.challengesCardTitle1}
                            </motion.h3>
                            <motion.p
                                className="challenges__benefit"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                {t.challengesCardBenefit1}
                                <span>40% Faster</span>
                            </motion.p>
                            <motion.p
                                className="challenges__subtext"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                {t.challengesCardSubtext1}
                            </motion.p>
                            <motion.div
                                className="challenges__underline"
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{ width: "80%", opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="challenges__card"
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.15)' }}
                    >
                        <div className="challenges__card-content">
                            <motion.div
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut",
                                    delay: 0.3
                                }}
                            >
                                <ArrowTrendingUpIcon className="challenges__card-icon" />
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                {t.challengesCardTitle2}
                            </motion.h3>
                            <motion.p
                                className="challenges__benefit"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                {t.challengesCardBenefit2}
                            </motion.p>
                            <motion.p
                                className="challenges__subtext"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                {t.challengesCardSubtext2}
                            </motion.p>
                            <motion.div
                                className="challenges__underline"
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{ width: "80%", opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                            />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.4 }}
                        viewport={{ once: true }}
                        className="challenges__card"
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.15)' }}
                    >
                        <div className="challenges__card-content">
                            <motion.div
                                animate={{ scale: [1, 1.02, 1] }}
                                transition={{
                                    repeat: Infinity,
                                    duration: 2,
                                    ease: "easeInOut",
                                    delay: 0.6
                                }}
                            >
                                <CurrencyDollarIcon className="challenges__card-icon" />
                            </motion.div>
                            <motion.h3
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.2 }}
                                viewport={{ once: true }}
                            >
                                {t.challengesCardTitle3}
                            </motion.h3>
                            <motion.p
                                className="challenges__benefit"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.3 }}
                                viewport={{ once: true }}
                            >
                                {t.challengesCardBenefit3} <span>(3.2x ROI)</span>
                            </motion.p>
                            <motion.p
                                className="challenges__subtext"
                                initial={{ opacity: 0 }}
                                whileInView={{ opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.4 }}
                                viewport={{ once: true }}
                            >
                                {t.challengesCardSubtext3}
                            </motion.p>
                            <motion.div
                                className="challenges__underline"
                                initial={{ width: 0, opacity: 0 }}
                                whileInView={{ width: "80%", opacity: 1 }}
                                transition={{ duration: 0.5, delay: 0.5 }}
                                viewport={{ once: true }}
                            />
                        </div>
                    </motion.div>
                </div>

                <motion.div
                    className="challenges__cta-container"
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    viewport={{ once: true }}
                >
                    <motion.button
                        className="challenges__cta-button"
                        onClick={() => scrollToSection('contact')}
                        whileHover={{ scale: 1.05 }}
                        whileTap={{ scale: 0.95 }}
                        transition={{ duration: 0.2 }}
                    >
                        {t.challengesCta}
                    </motion.button>
                </motion.div>
            </div>
        </section>
    );
} 