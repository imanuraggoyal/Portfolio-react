import { useState, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  FiBriefcase,
  FiAward,
  FiCalendar,
  FiMapPin,
  FiCheck,
  FiBookOpen,
} from 'react-icons/fi';
import { experience, education, achievements } from '../data/portfolio';
import Reveal from './Reveal';

export default function Experience() {
  const [activeTab, setActiveTab] = useState('experience');
  const containerRef = useRef(null);

  // Scroll progress for drawing the vertical timeline line
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ['start 80%', 'end 70%'],
  });

  const scaleY = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001,
  });

  // Prepare normalized timeline items
  const experienceItems = experience.map((item) => ({
    id: item.id,
    title: item.role,
    subtitle: item.company,
    period: item.period,
    location: item.location,
    highlights: item.highlights,
    techStack: item.techStack,
    isCurrent: item.period.toLowerCase().includes('current'),
  }));

  const educationItems = [
    ...education.map((item, idx) => ({
      id: `edu-${idx}`,
      title: item.degree,
      subtitle: item.institution,
      field: item.fieldOfStudy,
      period: item.period,
      location: item.location,
      highlights: [
        `Graduated with ${item.grades} CGPA in ${item.fieldOfStudy}.`,
        'Focused on electrical and electronic fundamentals, computational logic, and algorithmic systems.',
      ],
      badge: `CGPA: ${item.grades}`,
    })),
    ...achievements.map((item, idx) => ({
      id: `achieve-${idx}`,
      title: item.title,
      subtitle: item.organization,
      period: item.year,
      location: 'Enterprise Recognition',
      highlights: [item.description],
      badge: 'Award / Certification',
    })),
  ];

  const currentItems = activeTab === 'experience' ? experienceItems : educationItems;

  return (
    <div className="space-y-12">
      {/* Experience / Education Tabs */}
      <Reveal direction="up" delay={0.1}>
        <div className="flex justify-center">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-bg-light-card dark:bg-bg-dark-card border border-border-light dark:border-border-dark shadow-sm">
            <button
              type="button"
              onClick={() => setActiveTab('experience')}
              className={`relative px-5 py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'experience'
                  ? 'text-white font-semibold'
                  : 'text-text-light-muted dark:text-text-dark-muted hover:text-text-light dark:hover:text-text-dark'
              }`}
            >
              {activeTab === 'experience' && (
                <motion.div
                  layoutId="activeTimelineTabPill"
                  className="absolute inset-0 bg-accent-gradient rounded-xl shadow-accent-glow"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  aria-hidden="true"
                />
              )}
              <FiBriefcase className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Work Experience</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveTab('education')}
              className={`relative px-5 py-2.5 text-xs sm:text-sm font-medium rounded-xl transition-colors duration-200 flex items-center gap-2 cursor-pointer ${
                activeTab === 'education'
                  ? 'text-white font-semibold'
                  : 'text-text-light-muted dark:text-text-dark-muted hover:text-text-light dark:hover:text-text-dark'
              }`}
            >
              {activeTab === 'education' && (
                <motion.div
                  layoutId="activeTimelineTabPill"
                  className="absolute inset-0 bg-accent-gradient rounded-xl shadow-accent-glow"
                  transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                  aria-hidden="true"
                />
              )}
              <FiBookOpen className="relative z-10 w-4 h-4" />
              <span className="relative z-10">Education & Awards</span>
            </button>
          </div>
        </div>
      </Reveal>

      {/* Vertical Timeline Container */}
      <div ref={containerRef} className="relative max-w-5xl mx-auto pt-6 pb-4">
        {/* Background Inactive Track Line */}
        {/* Desktop: Center (50%), Mobile: Left (24px) */}
        <div
          className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-border-light dark:border-border-dark"
          aria-hidden="true"
        />

        {/* Dynamic Animated Line that draws itself as you scroll */}
        <motion.div
          style={{ scaleY }}
          className="absolute top-0 bottom-0 left-6 md:left-1/2 md:-translate-x-1/2 w-0.5 bg-accent-gradient origin-top z-10"
          aria-hidden="true"
        />

        <AnimatePresence mode="wait">
          <motion.div
            key={activeTab}
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
            className="space-y-12 sm:space-y-16"
          >
            {currentItems.map((item, index) => {
              const isEven = index % 2 === 0;

              return (
                <div
                  key={item.id || index}
                  className="relative flex flex-col md:flex-row items-start md:items-center group"
                >
                  {/* Timeline Milestone Dot */}
                  {/* Desktop: Center node, Mobile: Left-aligned with vertical line */}
                  <div
                    className="absolute left-6 md:left-1/2 -translate-x-1/2 z-20 flex items-center justify-center"
                    style={{ top: '24px' }}
                  >
                    <div className="w-5 h-5 rounded-full border-4 border-bg-light dark:border-bg-dark bg-accent shadow-accent-glow group-hover:scale-125 transition-transform duration-300">
                      {item.isCurrent && (
                        <span className="absolute -inset-1 rounded-full bg-accent/40 animate-ping" />
                      )}
                    </div>
                  </div>

                  {/* Desktop Alternating Sides Layout */}
                  {/* Card Container */}
                  <div
                    className={`w-full pl-14 md:pl-0 md:w-1/2 ${
                      isEven
                        ? 'md:pr-12 md:text-right'
                        : 'md:pl-12 md:ml-auto md:text-left'
                    }`}
                  >
                    <motion.div
                      initial={{
                        opacity: 0,
                        x: isEven ? -40 : 40,
                      }}
                      whileInView={{ opacity: 1, x: 0 }}
                      viewport={{ once: true, margin: '-60px' }}
                      transition={{
                        duration: 0.6,
                        delay: 0.1,
                        ease: [0.22, 1, 0.36, 1],
                      }}
                      className="p-6 sm:p-7 rounded-3xl bg-bg-light-card dark:bg-bg-dark-card border border-border-light dark:border-border-dark shadow-sm hover:shadow-xl hover:border-accent/40 transition-all duration-300 relative group/card"
                    >
                      {/* Top Header Row */}
                      <div
                        className={`flex flex-wrap items-center gap-2 mb-3 ${
                          isEven ? 'md:justify-end' : 'md:justify-start'
                        }`}
                      >
                        <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-subtle text-accent border border-accent/20">
                          <FiCalendar className="w-3.5 h-3.5" />
                          <span>{item.period}</span>
                        </span>

                        {item.location && (
                          <span className="inline-flex items-center gap-1 text-xs text-text-light-muted dark:text-text-dark-muted font-medium">
                            <FiMapPin className="w-3.5 h-3.5" />
                            <span>{item.location}</span>
                          </span>
                        )}

                        {item.badge && (
                          <span className="px-2.5 py-0.5 rounded-full text-[11px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20">
                            {item.badge}
                          </span>
                        )}
                      </div>

                      {/* Role & Company */}
                      <h3 className="text-xl sm:text-2xl font-heading font-bold text-text-light dark:text-text-dark tracking-tight">
                        {item.title}
                      </h3>

                      <h4 className="text-sm sm:text-base font-heading font-semibold text-accent mt-0.5 mb-4">
                        {item.subtitle}
                        {item.field && (
                          <span className="text-text-light-muted dark:text-text-dark-muted font-normal">
                            {' '}
                            • {item.field}
                          </span>
                        )}
                      </h4>

                      {/* Bullet Highlights */}
                      <ul
                        className={`space-y-2.5 text-xs sm:text-sm text-text-light-muted dark:text-text-dark-muted leading-relaxed text-left ${
                          isEven ? 'md:text-right' : 'md:text-left'
                        }`}
                      >
                        {item.highlights.map((bullet, bIdx) => (
                          <li
                            key={bIdx}
                            className={`flex items-start gap-2.5 ${
                              isEven ? 'md:flex-row-reverse' : 'flex-row'
                            }`}
                          >
                            <span className="w-4 h-4 rounded-full bg-accent-subtle text-accent flex items-center justify-center shrink-0 mt-0.5">
                              <FiCheck className="w-2.5 h-2.5" />
                            </span>
                            <span className="flex-1">{bullet}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Chips if available */}
                      {item.techStack && item.techStack.length > 0 && (
                        <div
                          className={`mt-5 pt-4 border-t border-border-light dark:border-border-dark flex flex-wrap gap-1.5 ${
                            isEven ? 'md:justify-end' : 'md:justify-start'
                          }`}
                        >
                          {item.techStack.map((tech, tIdx) => (
                            <span
                              key={tIdx}
                              className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-bg-light-elevated dark:bg-bg-dark-elevated text-text-light dark:text-text-dark border border-border-light dark:border-border-dark"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      )}
                    </motion.div>
                  </div>
                </div>
              );
            })}
          </motion.div>
        </AnimatePresence>
      </div>
    </div>
  );
}
