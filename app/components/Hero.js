'use client';

import { motion } from 'framer-motion';
import { useEffect, useState } from 'react';
import './Hero.css';

export default function Hero() {
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

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

  const scrollToSection = (sectionId) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <section className="hero">
      <div 
        className="hero-background"
        style={{
          background: `radial-gradient(circle at ${mousePosition.x}% ${mousePosition.y}%, rgba(37, 99, 235, 0.1) 0%, rgba(15, 23, 42, 0) 50%)`
        }}
      />
      <div className="particles">
        {[...Array(20)].map((_, i) => (
          <div
            key={i}
            className="particle"
            style={{
              '--delay': `${Math.random() * 10}s`,
              '--position': `${Math.random() * 100}%`,
            }}
          />
        ))}
      </div>
      <div className="hero-content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="hero-text"
        >
          <motion.h1 
            className="company-name"
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.2 }}
          >
            BidMaster AI
          </motion.h1>
          <motion.p 
            className="slogan"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.7, delay: 0.4 }}
          >
            İhale Süreçlerinizi Yapay Zeka ile Dönüştürün
          </motion.p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="section-buttons"
        >
          <button
            onClick={() => scrollToSection('problem-solution')}
            className="section-button"
          >
            Çözümlerimiz
          </button>
          <button
            onClick={() => scrollToSection('testimonials')}
            className="section-button"
          >
            Referanslarımız
          </button>
          <button
            onClick={() => scrollToSection('contact-cta')}
            className="section-button"
          >
            İletişime Geçin
          </button>
        </motion.div>
      </div>
    </section>
  );
} 