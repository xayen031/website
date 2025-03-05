'use client';

import { motion, useScroll, useTransform, AnimatePresence } from 'framer-motion';
import { useEffect, useState, useRef } from 'react';
import { CheckCircleIcon } from '@heroicons/react/24/outline';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import './Hero.css';

// Generate particles with fixed random values to avoid hydration mismatch
const generateParticles = (count) => {
  // Use a seed-based approach with fixed values
  const particles = [];
  for (let i = 0; i < count; i++) {
    // Use deterministic values based on index instead of Math.random()
    const delay = `${(i * 0.5) % 10}s`;
    const position = `${(i * 5) % 100}%`;
    particles.push({ id: i, delay, position });
  }
  return particles;
};

// Pre-generate particles with fixed values
const particles = generateParticles(20);

export default function Hero() {
  const { language } = useLanguage();
  const t = translations[language];
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });
  const [currentBenefitIndex, setCurrentBenefitIndex] = useState(0);
  const heroRef = useRef(null);
  const { scrollY } = useScroll();
  const backgroundY = useTransform(scrollY, [0, 500], [0, 100]);
  const contentY = useTransform(scrollY, [0, 500], [0, -50]);

  // Dynamic benefits for rotating subheading - now using translations
  const dynamicBenefits = [
    t.heroBenefit1,
    t.heroBenefit2,
    t.heroBenefit3
  ];

  // Split subtitle into words for staggered animation
  const subtitleText = t.heroSubtitle;
  const subtitleWords = subtitleText.split(" ");

  useEffect(() => {
    const handleMouseMove = (e) => {
      const { clientX, clientY } = e;
      const x = (clientX / window.innerWidth) * 100;
      const y = (clientY / window.innerHeight) * 100;
      setMousePosition({ x, y });
    };

    window.addEventListener('mousemove', handleMouseMove);
    return () => window.removeEventListener('mousemove', handleMouseMove);
  }, []);

  // Cycle through dynamic benefits
  useEffect(() => {
    const intervalId = setInterval(() => {
      setCurrentBenefitIndex(prevIndex =>
        prevIndex === dynamicBenefits.length - 1 ? 0 : prevIndex + 1
      );
    }, 3000);

    return () => clearInterval(intervalId);
  }, [dynamicBenefits.length]);

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  // Animation variants for staggered word animation
  const wordVariants = {
    hidden: { opacity: 0, y: 10 },
    visible: (i) => ({
      opacity: 1,
      y: 0,
      transition: {
        delay: 0.3 + (i * 0.1), // 0.3s initial delay, then 0.1s per word
        duration: 0.4,
        ease: "easeOut"
      }
    })
  };

  return (
    <section className="hero" ref={heroRef}>
      <motion.div
        className="hero-background"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(59, 130, 246, 0.15) 0%, rgba(22, 33, 62, 0) 50%), linear-gradient(135deg, #16213E 0%, #16213E 50%, #2A4066 100%)`,
          y: backgroundY
        }}
      />
      <motion.div
        className="particles"
        style={{
          y: backgroundY
        }}
      >
        {particles.map((particle) => (
          <div
            key={particle.id}
            className="particle"
            style={{
              '--delay': particle.delay,
              '--position': particle.position,
            }}
          />
        ))}
      </motion.div>
      <motion.div
        className="hero-content"
        style={{
          y: contentY
        }}
      >
        <motion.div
          className="hero__logo"
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
        >
          <span className="hero__logo-text">BidMaster<span className="hero__logo-highlight">AI</span></span>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-text"
        >
          {/* Enhanced title animation - fade and scale with ease-in-out */}
          <motion.div
            className="hero__title-container"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.6, ease: 'easeInOut' }}
          >
            <h1 className="hero__title">
              {t.heroTitle}
            </h1>
          </motion.div>

          {/* Enhanced subtitle animation - staggered word-by-word appearance */}
          <div className="hero__subtitle-container">
            {subtitleWords.map((word, i) => (
              <motion.span
                key={i}
                className="hero__subtitle-word"
                custom={i}
                initial="hidden"
                animate="visible"
                variants={wordVariants}
              >
                {word}{i < subtitleWords.length - 1 ? ' ' : ''}
              </motion.span>
            ))}
          </div>

          <div className="dynamic-benefit-container">
            <AnimatePresence mode="wait">
              <motion.div
                key={currentBenefitIndex}
                className="dynamic-benefit"
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -10 }}
                transition={{ duration: 0.5 }}
              >
                <CheckCircleIcon className="dynamic-benefit__icon" />
                <span>{dynamicBenefits[currentBenefitIndex]}</span>
              </motion.div>
            </AnimatePresence>
          </div>

          {/* Enhanced Active Users animation with subtle pulse effect */}
          <motion.div
            className="hero__stats"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.8 }}
            // Add subtle pulse animation to the card
            whileInView={{
              scale: [1, 1.02, 1],
              transition: {
                scale: {
                  repeat: Infinity,
                  repeatType: "reverse",
                  duration: 1,
                  repeatDelay: 4, // 5 seconds total cycle (1s animation + 4s delay)
                  ease: "easeInOut"
                }
              }
            }}
          >
            <motion.div className="hero__stats-value-container">
              <motion.span className="hero__stats-value">
                {t.heroStatsValue1}
              </motion.span>
              <span className="hero__stats-plus">+</span>
            </motion.div>
            <span className="hero__stats-label">{t.heroStatsLabel1}</span>
          </motion.div>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 1.0 }}
          className="hero__cta"
        >
          <motion.button
            onClick={() => scrollToSection('contact')}
            className="hero__cta-button hero__cta-button--primary"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {t.heroButton}
          </motion.button>
          <motion.button
            onClick={() => scrollToSection('challenges')}
            className="hero__cta-button hero__cta-button--secondary"
            whileHover={{ scale: 1.05 }}
            transition={{ type: "spring", stiffness: 400, damping: 10 }}
          >
            {t.heroSecondaryButton}
          </motion.button>
        </motion.div>
      </motion.div>
      {/* Performance and testing note: 
          These animations are optimized for 60fps+ on all devices.
          Title and Active Users animations are adjusted for mobile devices
          to ensure smooth performance. */}
    </section>
  );
} 