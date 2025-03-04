'use client';

import { motion } from 'framer-motion';
import './Testimonials.css';

const testimonials = [
  {
    id: 1,
    quote: "It helped us complete our tenders 40% faster.",
    author: "Sarah Chen",
    role: "Procurement Manager",
    company: "TechBuild Solutions",
    image: "/avatars/sarah.jpg",
    stats: "40% Faster",
    statDescription: "Tender Completion"
  },
  {
    id: 2,
    quote: "An excellent tool to understand how to submit the most competitive bids!",
    author: "Michael Rodriguez",
    role: "Business Development Director",
    company: "Global Contractors Ltd",
    image: "/avatars/michael.jpg",
    stats: "28%",
    statDescription: "Win Rate Increase"
  },
  {
    id: 3,
    quote: "We can better analyze our competitors' bids.",
    author: "Emma Thompson",
    role: "Bid Manager",
    company: "Construction Partners",
    image: "/avatars/emma.jpg",
    stats: "3.2x",
    statDescription: "ROI Improvement"
  }
];

export default function Testimonials() {
  return (
    <section id="testimonials" className="testimonials">
      <div className="content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>What Our Clients Say</h2>
          <p>Join hundreds of companies transforming their bidding process</p>
        </motion.div>

        <div className="testimonials-grid">
          {testimonials.map((testimonial, index) => (
            <motion.div
              key={testimonial.id}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="testimonial-card"
            >
              <div className="video-preview">
                <div className="play-button">
                  <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M14.752 11.168l-3.197-2.132A1 1 0 0010 9.87v4.263a1 1 0 001.555.832l3.197-2.132a1 1 0 000-1.664z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                </div>
                <div className="testimonial-image">
                  <div className="image-placeholder" />
                </div>
              </div>

              <div className="testimonial-content">
                <blockquote>
                  {testimonial.quote}
                </blockquote>
                
                <div className="testimonial-author">
                  <div className="author-info">
                    <h4>{testimonial.author}</h4>
                    <p>{testimonial.role}</p>
                    <p className="company">{testimonial.company}</p>
                  </div>
                </div>

                <div className="testimonial-stats">
                  <div className="stat">
                    <span className="stat-value">{testimonial.stats}</span>
                    <span className="stat-label">{testimonial.statDescription}</span>
                  </div>
                </div>
              </div>

              <motion.div 
                className="testimonial-badge"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.5 }}
                viewport={{ once: true }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <span>Verified Client</span>
              </motion.div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.4 }}
          viewport={{ once: true }}
          className="testimonials-summary"
        >
          <div className="summary-stat">
            <span className="stat-number">500+</span>
            <span className="stat-label">Active Users</span>
          </div>
          <div className="summary-stat">
            <span className="stat-number">35%</span>
            <span className="stat-label">Average Win Rate</span>
          </div>
          <div className="summary-stat">
            <span className="stat-number">2.8x</span>
            <span className="stat-label">ROI</span>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 