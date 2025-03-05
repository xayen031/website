'use client';

import { motion } from 'framer-motion';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import './LanguageSwitch.css';

export default function LanguageSwitch() {
    const { language, toggleLanguage } = useLanguage();

    return (
        <motion.div
            className="language-switch"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
        >
            <span className="language-switch__indicator">
                {translations[language].languageIndicator}
            </span>
            <motion.button
                className="language-switch__button"
                onClick={toggleLanguage}
                whileHover={{ scale: 1.05 }}
                transition={{ duration: 0.2 }}
            >
                {translations[language].languageSwitch}
            </motion.button>
        </motion.div>
    );
} 