'use client';

import { createContext, useState, useContext, useEffect } from 'react';

// Create a context for language management
const LanguageContext = createContext();

// Custom hook to use the language context
export const useLanguage = () => {
    const context = useContext(LanguageContext);
    if (!context) {
        throw new Error('useLanguage must be used within a LanguageProvider');
    }
    return context;
};

// Provider component to wrap the application
export function LanguageProvider({ children }) {
    // Initialize language state with 'en' (English) as default
    const [language, setLanguage] = useState('en');

    // Toggle between English and Turkish
    const toggleLanguage = () => {
        setLanguage(prevLang => (prevLang === 'en' ? 'tr' : 'en'));
    };

    // Update HTML lang attribute when language changes
    useEffect(() => {
        document.documentElement.lang = language;
    }, [language]);

    // Provide language state and toggle function to children
    return (
        <LanguageContext.Provider value={{ language, toggleLanguage }}>
            {children}
        </LanguageContext.Provider>
    );
}

export default LanguageContext; 