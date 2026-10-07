import { useState, useEffect, useRef } from 'react';
import { motion, useInView } from 'framer-motion';
import {
  FiMapPin,
  FiMail,
  FiBriefcase,
  FiDownload,
  FiCheckCircle,
  FiAward,
} from 'react-icons/fi';
import { profile, stats } from '../data/portfolio';
import Reveal from './Reveal';
import AnimatedAvatar from './AnimatedAvatar';

// Animated Counter component that triggers when scrolled into view
function StatCounter({ value, duration = 1.8 }) {
  const [count, setCount] = useState(0);
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: '-40px' });

  // Extract numeric part and any non-numeric symbol (e.g., "70%" -> 70, "%" or "7+" -> 7, "+")
  const numericMatch = String(value).match(/\d+/);
  const targetNumber = numericMatch ? parseInt(numericMatch[0], 10) : 0;
  const suffix = String(value).replace(/\d+/, '');

  useEffect(() => {
    if (!inView || targetNumber === 0) return;

    let startTime = null;
    let animationFrame;

    const step = (currentTime) => {
      if (!startTime) startTime = currentTime;
      const progress = Math.min((currentTime - startTime) / (duration * 1000), 1);
      // Cubic ease-out curve
      const easeOut = 1 - Math.pow(1 - progress, 3);
      setCount(Math.floor(easeOut * targetNumber));

      if (progress < 1) {
        animationFrame = requestAnimationFrame(step);
      } else {
        setCount(targetNumber);
      }
    };

    animationFrame = requestAnimationFrame(step);
    return () => cancelAnimationFrame(animationFrame);
  }, [inView, targetNumber, duration]);

  return (
    <span ref={ref} className="tabular-nums">
      {count}
      {suffix}
    </span>
  );
}

export default function About() {
  const quickFacts = [
    {
      icon: <FiMapPin className="w-4 h-4 text-accent" />,
      label: 'Location',
      value: profile.location,
    },
    {
      icon: <FiBriefcase className="w-4 h-4 text-accent" />,
      label: 'Experience',
      value: '7+ Years (Enterprise)',
    },
    {
      icon: <FiMail className="w-4 h-4 text-accent" />,
      label: 'Email',
      value: profile.email,
      href: `mailto:${profile.email}`,
    },
    {
      icon: <FiAward className="w-4 h-4 text-accent" />,
      label: 'Current Role',
      value: 'Sr. Software Engineer @ IBM',
    },
  ];

  return (
    <div className="space-y-16 lg:space-y-24">
      {/* Two Column Layout: Animated Graphic Avatar vs Summary & Facts */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
        {/* Left Column: Animated Developer Avatar Graphic (5 cols) */}
        <div className="lg:col-span-5 flex justify-center">
          <Reveal direction="left" className="w-full">
            <AnimatedAvatar />
          </Reveal>
        </div>

        {/* Right Column: Summary, Quick Facts & CV Button (7 cols) */}
        <div className="lg:col-span-7 space-y-6">
          <Reveal direction="up" delay={0.1}>
            <div className="space-y-4">
              <span className="inline-block px-3 py-1 text-xs font-semibold tracking-wider uppercase rounded-full bg-accent-subtle text-accent border border-accent/20">
                Professional Overview
              </span>

              <h3 className="text-2xl sm:text-3xl font-heading font-bold text-text-light dark:text-text-dark tracking-tight">
                Architecting Cloud-Native Microservices & High-Throughput APIs
              </h3>

              <p className="text-base sm:text-lg leading-relaxed text-text-light-muted dark:text-text-dark-muted font-normal">
                {profile.summary}
              </p>
            </div>
          </Reveal>

          {/* Quick Facts Grid */}
          <Reveal direction="up" delay={0.2}>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
              {quickFacts.map((fact, index) => (
                <div
                  key={index}
                  className="flex items-center gap-3.5 p-3.5 rounded-2xl bg-bg-light-card dark:bg-bg-dark-card border border-border-light dark:border-border-dark shadow-sm transition-all duration-200 hover:border-accent/40"
                >
                  <div className="w-9 h-9 rounded-xl bg-accent-subtle flex items-center justify-center shrink-0">
                    {fact.icon}
                  </div>
                  <div className="min-w-0 flex-1">
                    <p className="text-[11px] uppercase tracking-wider font-mono text-text-light-muted dark:text-text-dark-muted">
                      {fact.label}
                    </p>
                    {fact.href ? (
                      <a
                        href={fact.href}
                        className="text-xs sm:text-sm font-semibold text-text-light dark:text-text-dark hover:text-accent transition-colors truncate block"
                      >
                        {fact.value}
                      </a>
                    ) : (
                      <p className="text-xs sm:text-sm font-semibold text-text-light dark:text-text-dark truncate">
                        {fact.value}
                      </p>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </Reveal>

          {/* Download CV Action */}
          <Reveal direction="up" delay={0.3} className="pt-2">
            <div className="flex flex-wrap items-center gap-4">
              <a
                href={profile.resumeLink}
                download="Anurag_Goyal_Resume.pdf"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2.5 px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-accent-gradient hover:bg-accent-gradient-hover shadow-accent-glow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 cursor-pointer"
              >
                <FiDownload className="w-4 h-4" />
                <span>Download CV</span>
              </a>

              <div className="flex items-center gap-2 text-xs text-text-light-muted dark:text-text-dark-muted">
                <FiCheckCircle className="w-4 h-4 text-emerald-500 shrink-0" />
                <span>Verified credentials & enterprise history</span>
              </div>
            </div>
          </Reveal>
        </div>
      </div>

      {/* Row of Stat Counters (Sourced Strictly from stats in portfolio.js) */}
      <Reveal direction="up" delay={0.2}>
        <div className="pt-6 border-t border-border-light dark:border-border-dark">
          <div className="text-center mb-8">
            <h4 className="text-xs font-mono uppercase tracking-widest text-text-light-muted dark:text-text-dark-muted">
              Impact & Key Metrics
            </h4>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {stats.map((stat, idx) => (
              <motion.div
                key={idx}
                whileHover={{ y: -4 }}
                transition={{ duration: 0.2 }}
                className="p-5 sm:p-6 rounded-2xl bg-bg-light-card dark:bg-bg-dark-card border border-border-light dark:border-border-dark shadow-sm text-center flex flex-col justify-between group hover:border-accent/50 transition-colors"
              >
                <div>
                  <div className="text-3xl sm:text-4xl lg:text-5xl font-heading font-extrabold text-transparent bg-clip-text bg-accent-gradient tracking-tight">
                    <StatCounter value={stat.value} />
                  </div>
                  <h5 className="mt-2 text-sm sm:text-base font-heading font-bold text-text-light dark:text-text-dark">
                    {stat.label}
                  </h5>
                </div>
                <p className="mt-2 text-xs text-text-light-muted dark:text-text-dark-muted leading-relaxed">
                  {stat.description}
                </p>
              </motion.div>
            ))}
          </div>
        </div>
      </Reveal>
    </div>
  );
}
