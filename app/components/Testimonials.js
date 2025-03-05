'use client';

import { motion } from 'framer-motion';
import Image from 'next/image';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import './Testimonials.css';

export default function Testimonials() {
  const { language } = useLanguage();
  const t = translations[language];

  const testimonials = [
    {
      id: 1,
      quote: t.testimonialText1,
      author: t.testimonialAuthor1,
      role: t.testimonialRole1,
      company: "TechBuild Solutions",
      image: "/images/avatars/sarah.jpg",
      stats: "40% Faster",
      statDescription: "Tender Completion"
    },
    {
      id: 2,
      quote: t.testimonialText2,
      author: t.testimonialAuthor2,
      role: t.testimonialRole2,
      company: "Global Contractors Ltd",
      image: "/images/avatars/michael.jpg",
      stats: "35%",
      statDescription: "Win Rate Boost"
    },
    {
      id: 3,
      quote: t.testimonialText3,
      author: t.testimonialAuthor3,
      role: t.testimonialRole3,
      company: "Construction Partners",
      image: "/images/avatars/emma.jpg",
      stats: "2.2x",
      statDescription: "ROI Growth"
    }
  ];

  return (
    <section id="testimonials" className="testimonials">
      <div className="testimonials__content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="testimonials__header"
        >
          <h2>{t.testimonialsTitle}</h2>
          <p>{t.testimonialsSubtitle}</p>
        </motion.div>

        <div className="testimonials__grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="testimonials__card"
              whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)' }}
            >
              <div className="testimonials__image">
                {testimonial.image ? (
                  <Image
                    src={testimonial.image}
                    alt={`Photo of ${testimonial.author}`}
                    width={80}
                    height={80}
                    className="testimonials__avatar"
                    priority
                  />
                ) : (
                  <div className="testimonials__image-placeholder" aria-label={`Photo of ${testimonial.author}`}>
                    {testimonial.author.charAt(0)}
                  </div>
                )}
              </div>

              <div className="testimonials__content">
                <blockquote className="testimonials__quote">
                  "{testimonial.quote}"
                </blockquote>

                <div className="testimonials__author">
                  <div className="testimonials__author-info">
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.role}</p>
                    <p className="testimonials__company">{testimonial.company}</p>
                  </div>
                </div>

                <div className="testimonials__stats">
                  <div className="testimonials__stat">
                    <span className="testimonials__stat-value">{testimonial.stats}</span>
                    <span className="testimonials__stat-label">{testimonial.statDescription}</span>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
} 