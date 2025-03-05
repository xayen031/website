'use client';

import { useState } from 'react';
import { motion } from 'framer-motion';
import { EnvelopeIcon, CalendarIcon, BuildingOfficeIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import './ContactSection.css';

// Component for contact section with Calendly integration and enhanced form
// TODO: Test with 5-10 B2B users to validate usability and conversion rate
// TODO: Implement backend API endpoint for form submission
// TODO: Test with 5-10 Turkish-speaking B2B users to validate translation accuracy

export default function ContactSection() {
    const { language } = useLanguage();
    const t = translations[language];

    const [formData, setFormData] = useState({
        email: '',
        company: ''
    });
    const [isSubmitted, setIsSubmitted] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [errors, setErrors] = useState({
        email: '',
        company: ''
    });

    const validateEmail = (email) => {
        const re = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        return re.test(String(email).toLowerCase());
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData(prev => ({
            ...prev,
            [name]: value
        }));

        // Clear error when user types
        if (errors[name]) {
            setErrors(prev => ({
                ...prev,
                [name]: ''
            }));
        }
    };

    const validateForm = () => {
        const newErrors = {
            email: '',
            company: ''
        };
        let isValid = true;

        // Validate email
        if (!formData.email) {
            newErrors.email = t.emailRequired;
            isValid = false;
        } else if (!validateEmail(formData.email)) {
            newErrors.email = t.emailInvalid;
            isValid = false;
        }

        // Validate company
        if (!formData.company) {
            newErrors.company = t.companyRequired;
            isValid = false;
        }

        setErrors(newErrors);
        return isValid;
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        if (!validateForm()) {
            return;
        }

        setIsSubmitting(true);

        try {
            // Call the actual API endpoint with language information
            const response = await fetch('/api/submit', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept-Language': language // Send the current language
                },
                body: JSON.stringify({
                    ...formData,
                    language // Include language in the form data
                }),
            });

            const result = await response.json();

            if (!response.ok) {
                throw new Error(result.message || 'Something went wrong');
            }

            setIsSubmitted(true);
            setFormData({ email: '', company: '' });
        } catch (error) {
            console.error('Error submitting form:', error);
            setErrors(prev => ({
                ...prev,
                general: error.message || t.generalError
            }));
        } finally {
            setIsSubmitting(false);
        }
    };

    return (
        <>
            <section id="contact" className="contact-section">
                <div className="contact-section__content">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.5 }}
                        viewport={{ once: true }}
                        className="contact-section__header"
                    >
                        <h2>{t.contactTitle}</h2>
                        <p>{t.contactSubtitle}</p>
                    </motion.div>

                    <div className="contact-section__columns">
                        {/* Left Column - Email Form (50% width) */}
                        <motion.div
                            initial={{ opacity: 0, x: -30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="contact-section__column contact-section__column--left"
                        >
                            <div className="contact-section__form-card">
                                {isSubmitted ? (
                                    <div className="contact-section__success">
                                        <div className="contact-section__success-icon">
                                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                                <path d="M22 11.08V12a10 10 0 11-5.93-9.14" strokeLinecap="round" strokeLinejoin="round" />
                                                <path d="M22 4L12 14.01l-3-3" strokeLinecap="round" strokeLinejoin="round" />
                                            </svg>
                                        </div>
                                        <h3>{t.successTitle}</h3>
                                        <p>{t.successMessage}</p>
                                    </div>
                                ) : (
                                    <form className="contact-section__email-form" onSubmit={handleSubmit}>
                                        <div className="contact-section__form-group">
                                            <label className="contact-section__label">{t.emailLabel}</label>
                                            <div className="contact-section__input-wrapper">
                                                <EnvelopeIcon className="contact-section__input-icon" />
                                                <input
                                                    type="email"
                                                    name="email"
                                                    placeholder={t.emailPlaceholder}
                                                    value={formData.email}
                                                    onChange={handleChange}
                                                    className={`contact-section__input ${errors.email ? 'contact-section__input--error' : ''}`}
                                                    aria-label="Email address"
                                                />
                                            </div>
                                            {errors.email && <div className="contact-section__form-error">{errors.email}</div>}
                                        </div>

                                        <div className="contact-section__form-group">
                                            <label className="contact-section__label">{t.companyLabel}</label>
                                            <div className="contact-section__input-wrapper">
                                                <BuildingOfficeIcon className="contact-section__input-icon" />
                                                <input
                                                    type="text"
                                                    name="company"
                                                    placeholder={t.companyPlaceholder}
                                                    value={formData.company}
                                                    onChange={handleChange}
                                                    className={`contact-section__input ${errors.company ? 'contact-section__input--error' : ''}`}
                                                    aria-label="Company name"
                                                />
                                            </div>
                                            {errors.company && <div className="contact-section__form-error">{errors.company}</div>}
                                        </div>

                                        {errors.general && <div className="contact-section__form-error contact-section__form-error--general">{errors.general}</div>}

                                        <motion.button
                                            type="submit"
                                            className="contact-section__submit-button"
                                            whileHover={{ scale: 1.05 }}
                                            transition={{ duration: 0.2 }}
                                            disabled={isSubmitting}
                                        >
                                            {isSubmitting ? t.submittingButton : t.submitButton}
                                        </motion.button>

                                        <div className="contact-section__privacy">
                                            <strong>{t.privacyText}</strong>
                                        </div>
                                    </form>
                                )}
                            </div>
                        </motion.div>

                        {/* Right Column - Calendly Embed (50% width) */}
                        <motion.div
                            initial={{ opacity: 0, x: 30 }}
                            whileInView={{ opacity: 1, x: 0 }}
                            transition={{ duration: 0.5 }}
                            viewport={{ once: true }}
                            className="contact-section__column contact-section__column--right"
                        >
                            <div className="contact-section__calendly-container">
                                <div className="contact-section__calendly-header">
                                    <CalendarIcon className="contact-section__calendly-icon" />
                                    <span>{t.selectTimeLabel}</span>
                                </div>
                                <div className="contact-section__calendly">
                                    <iframe
                                        src={`https://calendly.com/hakanenesaksu36/30min?hide_gdpr_banner=1&background_color=f9fafb&primary_color=28a745&hide_landing_page_details=1&${language === 'tr' ? 'locale=tr' : ''}`}
                                        width="100%"
                                        height="400px"
                                        frameBorder="0"
                                        scrolling="no"
                                        title={t.calendarTitle}
                                        className="contact-section__iframe"
                                        sandbox="allow-same-origin allow-scripts allow-popups allow-forms"
                                    ></iframe>
                                </div>
                            </div>
                        </motion.div>
                    </div>
                </div>
            </section>

            <footer className="footer">
                <div className="footer__content">
                    <p className="footer__copyright"><strong>{t.copyright}</strong> | <a href="/privacy">{t.privacyPolicy}</a> | <a href="/terms">{t.termsOfUse}</a></p>
                    <p className="footer__powered-by">{t.poweredBy}</p>
                </div>
            </footer>
        </>
    );
} 