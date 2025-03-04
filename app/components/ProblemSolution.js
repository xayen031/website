'use client';

import { motion } from 'framer-motion';
import './ProblemSolution.css';

const solutions = [
  {
    id: 'tracking',
    problem: 'Tracking tenders is very time-consuming',
    solution: 'AI-Powered Tender Tracking',
    description: 'Our AI automatically finds and filters the most relevant tenders for your business',
    icon: (
      <svg className="solution-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
      </svg>
    )
  },
  {
    id: 'competition',
    problem: 'Are you always one step behind your competitors?',
    solution: 'Smart Competitor Analysis',
    description: 'Get real-time insights into market trends and competitive positioning',
    icon: (
      <svg className="solution-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M13 7h8m0 0v8m0-8l-8 8-4-4-6 6" />
      </svg>
    )
  },
  {
    id: 'analysis',
    problem: 'Is it difficult to devise the best pricing strategy?',
    solution: 'Intelligent Pricing Engine',
    description: 'Our AI analyzes market data to help you set the most competitive bid prices',
    icon: (
      <svg className="solution-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor">
        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
      </svg>
    )
  }
];

export default function ProblemSolution() {
  return (
    <section id="problem-solution" className="problem-solution">
      <div className="content">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="section-header"
        >
          <h2>Transform Your Bidding Process</h2>
          <p>Advanced AI solutions for modern bidding challenges</p>
        </motion.div>

        <div className="solutions-grid">
          {solutions.map((item, index) => (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: index % 2 === 0 ? -20 : 20 }}
              whileInView={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: index * 0.2 }}
              viewport={{ once: true }}
              className="solution-card"
            >
              <div className="problem">
                <h3>Challenge</h3>
                <p>{item.problem}</p>
              </div>
              
              <motion.div 
                className="solution-arrow"
                initial={{ scale: 0 }}
                whileInView={{ scale: 1 }}
                transition={{ duration: 0.5, delay: index * 0.2 + 0.4 }}
                viewport={{ once: true }}
              >
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
                </svg>
              </motion.div>

              <div className="solution">
                <div className="solution-icon-wrapper">
                  {item.icon}
                </div>
                <h3>{item.solution}</h3>
                <p>{item.description}</p>
              </div>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0, scale: 0.9 }}
          whileInView={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.8 }}
          viewport={{ once: true }}
          className="workflow-visualization"
        >
          <div className="workflow-step">
            <div className="step-icon">1</div>
            <div className="step-content">
              <h4>Smart Analysis</h4>
              <div className="step-animation">
                <div className="analysis-icon" />
              </div>
            </div>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-step">
            <div className="step-icon">2</div>
            <div className="step-content">
              <h4>Market Insights</h4>
              <div className="step-animation">
                <div className="insights-icon" />
              </div>
            </div>
          </div>
          <div className="workflow-arrow">→</div>
          <div className="workflow-step">
            <div className="step-icon">3</div>
            <div className="step-content">
              <h4>Win More Bids</h4>
              <div className="step-animation">
                <div className="document-icon" />
              </div>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
} 