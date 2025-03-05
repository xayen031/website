'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import './Expertise.css';

// Component for showcasing academic and industry partners
// TODO: Test with 5-10 B2B users to validate design effectiveness and partner credibility
// TODO: Test with 5-10 Turkish-speaking B2B users to validate translation accuracy

// All partners in a single array for horizontal display - 7 logos with specific spacing requirements
const allPartners = [
    // Academic partners
    {
        id: 1,
        name: "University of Pennsylvania",
        logo: "/sources/images/UniversityofPennsylvania_FullLogo_RGB-4_0.png",
        category: "academic",
        spacing: "penn"
    },
    {
        id: 2,
        name: "London School of Economics",
        logo: "/sources/images/London_school_of_economics_logo_with_name.svg.png",
        category: "academic",
        spacing: "lse"
    },
    // Cambridge and Harvard need to be closer together (5px spacing)
    {
        id: 3,
        name: "University of Cambridge",
        logo: "/sources/images/cdnlogo.com_university-of-cambridge.png",
        category: "academic",
        spacing: "cambridge"
    },
    {
        id: 4,
        name: "Harvard University",
        logo: "/sources/images/Harvard-Logo.png",
        category: "academic",
        spacing: "harvard"
    },
    // Industry partners - standard spacing
    {
        id: 5,
        name: "Goldman Sachs",
        logo: "/sources/images/goldman.png",
        category: "industry",
        spacing: "standard"
    },
    {
        id: 6,
        name: "Kawasaki",
        logo: "/sources/images/kawasaki.png",
        category: "industry",
        spacing: "standard"
    },
    {
        id: 7,
        name: "JAXA",
        logo: "/sources/images/Jaxa_logo.svg.png",
        category: "industry",
        spacing: "standard"
    }
];

export default function Expertise() {
    const { language } = useLanguage();
    const t = translations[language];

    return (
        <section id="expertise" className="expertise">
            <div className="expertise__content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="expertise__header"
                >
                    <h2>{t.expertiseTitle}</h2>
                </motion.div>

                <div className="expertise__logos-row">
                    {allPartners.map((partner, index) => (
                        <motion.div
                            key={partner.id}
                            className={`expertise__logo-wrapper expertise__logo-wrapper--${partner.spacing}`}
                            initial={{ opacity: 0 }}
                            whileInView={{ opacity: 1 }}
                            transition={{ duration: 0.5, delay: 0.1 * index }}
                            viewport={{ once: true }}
                            whileHover={{
                                scale: 1.05,
                                transition: { duration: 0.2 }
                            }}
                        >
                            <Image
                                src={partner.logo}
                                alt={t.expertisePartnerAlt[partner.spacing.toLowerCase()] || partner.name}
                                className="expertise__logo"
                                width={150}
                                height={60}
                                priority
                            />
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
} 