'use client';

import { useEffect, useRef, useState } from 'react';
import { motion, useAnimation, useInView } from 'framer-motion';
import { Chart, registerables } from 'chart.js';
import { ArrowUpIcon } from '@heroicons/react/24/solid';
import { useLanguage } from '../context/LanguageContext';
import translations from '../translations';
import './Results.css';

Chart.register(...registerables);

// Progress Bar Component for 40% Faster Tenders
const ProgressBar = ({ title, subtitle }) => {
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: true, threshold: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start({
                width: "60%",
                transition: { duration: 1.5, ease: "easeOut" }
            });
        }
    }, [inView, controls]);

    return (
        <motion.div
            className="results__progress-container"
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.5 }}
        >
            <div className="results__progress-labels">
                <div className="results__progress-before">
                    <span>Before</span>
                    <div className="results__progress-value">100%</div>
                </div>
                <div className="results__progress-after">
                    <span>With BidMaster AI</span>
                    <div className="results__progress-value results__progress-value--highlight">60%</div>
                </div>
            </div>

            <div className="results__progress-track">
                <motion.div
                    className="results__progress-fill"
                    initial={{ width: "0%" }}
                    animate={controls}
                />
            </div>

            <div className="results__progress-info">
                <div className="results__progress-saving">
                    <span className="results__progress-saving-value">40% Faster</span>
                    <span className="results__progress-saving-text">{subtitle}</span>
                </div>
            </div>
        </motion.div>
    );
};

// Bar Chart Component with horizontal orientation - fixed for "40% Faster Tenders"
const BarChart = ({ id, data, labels, colors, title, subtitle }) => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: true, threshold: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                pathLength: 1,
                transition: { duration: 1.5, ease: "easeInOut" }
            });
        }
    }, [inView, controls]);

    useEffect(() => {
        if (!inView || !canvasRef.current) return;

        // Destroy existing chart
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');

        // Create gradient for bars
        const barGradient = ctx.createLinearGradient(0, 0, 300, 0);
        barGradient.addColorStop(0, colors[0]);
        barGradient.addColorStop(1, colors[1]);

        // Create custom plugin to render BidMaster AI with gradient text above the bar
        const bidmasterLabelPlugin = {
            id: 'bidmasterLabel',
            afterDraw: (chart) => {
                const { ctx, scales, data } = chart;
                const yAxis = scales.y;
                const xAxis = scales.x;
                const bidmasterIndex = 1; // Index of BidMaster AI in labels array

                if (bidmasterIndex < labels.length) {
                    const y = yAxis.getPixelForValue(bidmasterIndex);
                    const barValue = data.datasets[0].data[bidmasterIndex];
                    const x = xAxis.getPixelForValue(barValue);

                    // Clear the area where the default label would be
                    ctx.save();
                    ctx.fillStyle = 'white';
                    ctx.fillRect(0, y - 35, 180, 50);
                    ctx.restore();

                    // Create gradient for text
                    const textGradient = ctx.createLinearGradient(0, 0, 150, 0);
                    textGradient.addColorStop(0, '#3B82F6');
                    textGradient.addColorStop(1, '#60A5FA');

                    // Add custom styled text with gradient above the bar
                    ctx.save();
                    ctx.font = 'bold 24px Geist, sans-serif';
                    ctx.fillStyle = textGradient;
                    ctx.textAlign = 'left';
                    ctx.textBaseline = 'bottom';
                    ctx.fillText('BidMaster AI', 10, y - 20); // Position well above the bar
                    ctx.restore();
                }
            }
        };

        // Create chart with horizontal bars and animation
        chartRef.current = new Chart(ctx, {
            type: 'bar',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: data,
                    backgroundColor: barGradient,
                    borderColor: '#3B82F6',
                    borderWidth: 2,
                    borderRadius: 6,
                    barThickness: 40,
                }]
            },
            options: {
                indexAxis: 'y', // Set to y-axis for horizontal bars
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return subtitle;
                            }
                        },
                        backgroundColor: '#1E293B',
                        padding: 10,
                        cornerRadius: 6,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    x: {
                        beginAtZero: true,
                        max: 100,
                        grid: {
                            display: false // Remove grid lines
                        },
                        ticks: {
                            callback: function (value) {
                                // Only show percentage values above 0
                                if (value === 0) return '';
                                return value + '%';
                            },
                            font: {
                                size: 12
                            }
                        }
                    },
                    y: {
                        grid: {
                            display: false // Remove grid lines
                        },
                        ticks: {
                            font: {
                                size: 16,
                                color: '#4B5563'
                            },
                            // Custom function to style labels
                            callback: function (value, index, values) {
                                // Only show "Manual" label, BidMaster AI will be custom rendered
                                if (index === 1) {
                                    return ''; // Hide default BidMaster AI label
                                }
                                if (index === 0) {
                                    return 'Manual'; // Ensure "Manual" is displayed correctly
                                }
                                return value;
                            }
                        }
                    }
                },
                layout: {
                    padding: {
                        top: 60, // Increased padding to accommodate the repositioned label
                        left: 10,
                        right: 10,
                        bottom: 10
                    }
                }
            },
            plugins: [bidmasterLabelPlugin]
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [inView, data, labels, colors, title, subtitle, controls]);

    return (
        <motion.div
            className="results__chart-container"
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={controls}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <canvas id={id} height="180" ref={canvasRef}></canvas>
        </motion.div>
    );
};

// Line Chart Component with exhilarating growth curve
const LineChart = ({ id, data, labels, colors, title, subtitle }) => {
    const chartRef = useRef(null);
    const canvasRef = useRef(null);
    const containerRef = useRef(null);
    const inView = useInView(containerRef, { once: true, threshold: 0.2 });
    const controls = useAnimation();

    useEffect(() => {
        if (inView) {
            controls.start({
                opacity: 1,
                pathLength: 1,
                transition: { duration: 1.5, ease: "easeInOut" }
            });
        }
    }, [inView, controls]);

    useEffect(() => {
        if (!inView || !canvasRef.current) return;

        // Destroy existing chart
        if (chartRef.current) {
            chartRef.current.destroy();
        }

        const ctx = canvasRef.current.getContext('2d');

        // Create chart with exhilarating growth curve
        chartRef.current = new Chart(ctx, {
            type: 'line',
            data: {
                labels: labels,
                datasets: [{
                    label: title,
                    data: data,
                    borderColor: '#3B82F6',
                    backgroundColor: '#93C5FD', // Lighter blue fill
                    fill: true,
                    tension: 0.5, // Increased tension for more curve
                    borderWidth: 3,
                    pointBackgroundColor: '#3B82F6',
                    pointRadius: 4,
                    pointHoverRadius: 6
                }]
            },
            options: {
                responsive: true,
                maintainAspectRatio: false,
                animation: {
                    duration: 1500,
                    easing: 'easeOutQuart'
                },
                plugins: {
                    legend: {
                        display: false
                    },
                    tooltip: {
                        callbacks: {
                            label: function (context) {
                                return subtitle;
                            }
                        },
                        backgroundColor: '#1E293B',
                        padding: 10,
                        cornerRadius: 6,
                        titleFont: {
                            size: 14,
                            weight: 'bold'
                        }
                    }
                },
                scales: {
                    y: {
                        beginAtZero: false,
                        min: 20,
                        max: 40,
                        grid: {
                            display: false // Remove grid lines
                        },
                        ticks: {
                            callback: function (value) {
                                // Bold the 35% value
                                if (value === 35) {
                                    return ['', { text: '35%', font: { weight: 'bold' } }];
                                }
                                return value + '%';
                            },
                            font: {
                                size: 12
                            }
                        }
                    },
                    x: {
                        grid: {
                            display: false // Remove grid lines
                        },
                        ticks: {
                            font: {
                                size: 12
                            }
                        }
                    }
                }
            }
        });

        return () => {
            if (chartRef.current) {
                chartRef.current.destroy();
            }
        };
    }, [inView, data, labels, colors, title, subtitle, controls]);

    return (
        <motion.div
            className="results__chart-container"
            ref={containerRef}
            initial={{ opacity: 0 }}
            animate={controls}
            whileHover={{ scale: 1.02 }}
            transition={{ duration: 0.3 }}
        >
            <canvas id={id} height="180" ref={canvasRef}></canvas>
        </motion.div>
    );
};

// Text-only ROI Component with icon
const ROIText = ({ value, description }) => {
    return (
        <div className="results__text-container">
            <motion.div
                initial={{ scale: 0.8, opacity: 0 }}
                whileInView={{ scale: 1, opacity: 1 }}
                transition={{ duration: 0.8, type: "spring" }}
                viewport={{ once: true }}
                className="results__roi-value"
            >
                <svg className="results__roi-icon" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M12 1V23" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    <path d="M17 5H9.5C8.57174 5 7.6815 5.36875 7.02513 6.02513C6.36875 6.6815 6 7.57174 6 8.5C6 9.42826 6.36875 10.3185 7.02513 10.9749C7.6815 11.6313 8.57174 12 9.5 12H14.5C15.4283 12 16.3185 12.3687 16.9749 13.0251C17.6313 13.6815 18 14.5717 18 15.5C18 16.4283 17.6313 17.3185 16.9749 17.9749C16.3185 18.6313 15.4283 19 14.5 19H6" stroke="#3B82F6" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                </svg>
                {value}
            </motion.div>
            <p className="results__roi-description">{description}</p>
        </div>
    );
};

export default function Results() {
    const [isMounted, setIsMounted] = useState(false);
    const { language } = useLanguage();
    const t = translations[language];

    useEffect(() => {
        setIsMounted(true);
    }, []);

    // Updated data for charts with steeper growth curve for line chart
    const barData = {
        labels: ['Manual', 'BidMaster AI'],
        data: [100, 60],
        colors: ['#3B82F6', '#60A5FA'],
        title: t.resultsMetricLabel1,
        subtitle: t.resultsMetric1
    };

    const lineData = {
        labels: ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun'],
        data: [25, 26, 27, 29, 32, 35], // Adjusted for steeper growth at the end
        colors: ['#3B82F6', '#60A5FA'],
        title: t.resultsMetricLabel2,
        subtitle: t.resultsMetric2
    };

    return (
        <section id="results" className="results">
            <div className="results__content">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8 }}
                    viewport={{ once: true }}
                    className="results__header"
                >
                    <h2 className="results__title" style={{ color: '#3B82F6' }}>{t.resultsTitle}</h2>
                    <p>{t.resultsDescription}</p>
                </motion.div>

                <div className="results__grid">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.1 }}
                        viewport={{ once: true }}
                        className="results__chart-wrapper"
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)' }}
                    >
                        <h3>{t.resultsMetric1}</h3>
                        {isMounted ? (
                            <ProgressBar
                                title={barData.title}
                                subtitle={barData.subtitle}
                            />
                        ) : (
                            <div className="results__chart-loading">
                                <div className="results__chart-loading-spinner"></div>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        viewport={{ once: true }}
                        className="results__chart-wrapper"
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)' }}
                    >
                        <h3>{t.resultsMetric2}</h3>
                        {isMounted ? (
                            <LineChart
                                id="lineChart"
                                data={lineData.data}
                                labels={lineData.labels}
                                colors={lineData.colors}
                                title={lineData.title}
                                subtitle={lineData.subtitle}
                            />
                        ) : (
                            <div className="results__chart-loading">
                                <div className="results__chart-loading-spinner"></div>
                            </div>
                        )}
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.3 }}
                        viewport={{ once: true }}
                        className="results__chart-wrapper results__chart-wrapper--text"
                        whileHover={{ y: -5, boxShadow: '0 10px 30px rgba(59, 130, 246, 0.2)' }}
                    >
                        <h3>{t.resultsMetricLabel3}</h3>
                        <ROIText
                            value={t.resultsMetric3}
                            description={t.resultsMetricDescription3}
                        />
                    </motion.div>
                </div>
            </div>
        </section>
    );
} 