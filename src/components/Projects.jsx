import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiExternalLink,
  FiGithub,
  FiLayers,
  FiX,
  FiLock,
  FiEye,
  FiCheckCircle,
  FiCode,
  FiCpu,
  FiTrendingUp,
  FiCloud,
  FiShield,
} from 'react-icons/fi';
import { projects } from '../data/portfolio';
import Reveal from './Reveal';

// High-resolution technical fallback images tailored by category
const categoryArtwork = {
  'AI & Backend Engineering':
    'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?auto=format&fit=crop&w=1000&q=80',
  'Performance Optimization':
    'https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=1000&q=80',
  'Cloud & Microservices':
    'https://images.unsplash.com/photo-1451187580459-43490279c0fa?auto=format&fit=crop&w=1000&q=80',
  'API Security':
    'https://images.unsplash.com/photo-1563986768609-322da13575f3?auto=format&fit=crop&w=1000&q=80',
};

// Check if a link is a real URL vs a placeholder
function isValidUrl(url) {
  if (!url || typeof url !== 'string') return false;
  if (url.startsWith('TODO')) return false;
  return url.startsWith('http://') || url.startsWith('https://') || url.startsWith('/');
}

// Icon helper by category
function getCategoryIcon(cat) {
  if (cat.includes('AI')) return <FiCpu className="w-3.5 h-3.5" />;
  if (cat.includes('Performance')) return <FiTrendingUp className="w-3.5 h-3.5" />;
  if (cat.includes('Cloud')) return <FiCloud className="w-3.5 h-3.5" />;
  if (cat.includes('Security')) return <FiShield className="w-3.5 h-3.5" />;
  return <FiCode className="w-3.5 h-3.5" />;
}

export default function Projects() {
  const [selectedCategory, setSelectedCategory] = useState('All');
  const [activeProject, setActiveProject] = useState(null);

  // Extract distinct categories
  const categories = ['All', ...new Set(projects.map((p) => p.category))];

  // Filter projects by category
  const filteredProjects =
    selectedCategory === 'All'
      ? projects
      : projects.filter((p) => p.category === selectedCategory);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (activeProject) {
      document.body.style.overflow = 'hidden';
      const handleKeyDown = (e) => {
        if (e.key === 'Escape') setActiveProject(null);
      };
      window.addEventListener('keydown', handleKeyDown);
      return () => {
        document.body.style.overflow = '';
        window.removeEventListener('keydown', handleKeyDown);
      };
    } else {
      document.body.style.overflow = '';
    }
  }, [activeProject]);

  return (
    <div className="space-y-12">
      {/* Category Filter Buttons */}
      <Reveal direction="up" delay={0.1}>
        <div className="flex items-center justify-start sm:justify-center overflow-x-auto pb-2 scrollbar-none gap-2">
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-bg-light-card dark:bg-bg-dark-card border border-border-light dark:border-border-dark shadow-sm">
            {categories.map((category) => {
              const isSelected = selectedCategory === category;
              return (
                <button
                  key={category}
                  type="button"
                  onClick={() => setSelectedCategory(category)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-colors duration-200 cursor-pointer ${
                    isSelected
                      ? 'text-white font-semibold'
                      : 'text-text-light-muted dark:text-text-dark-muted hover:text-text-light dark:hover:text-text-dark'
                  }`}
                  aria-selected={isSelected}
                  role="tab"
                >
                  {isSelected && (
                    <motion.div
                      layoutId="activeProjectCategoryPill"
                      className="absolute inset-0 bg-accent-gradient rounded-xl shadow-accent-glow"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{category}</span>
                </button>
              );
            })}
          </div>
        </div>
      </Reveal>

      {/* Projects Grid with Animated Layout Transitions */}
      <motion.div
        layout
        className="grid grid-cols-1 md:grid-cols-2 gap-8"
      >
        <AnimatePresence>
          {filteredProjects.map((project) => {
            const hasLive = isValidUrl(project.liveLink);
            const hasGithub = isValidUrl(project.githubLink);
            const imageUrl = isValidUrl(project.image)
              ? project.image
              : categoryArtwork[project.category] || categoryArtwork['Cloud & Microservices'];

            return (
              <motion.div
                key={project.id}
                layout
                initial={{ opacity: 0, scale: 0.94 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0, scale: 0.94 }}
                transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
                whileHover={{ y: -6 }}
                onClick={() => setActiveProject(project)}
                className="group relative rounded-3xl overflow-hidden bg-bg-light-card dark:bg-bg-dark-card border border-border-light dark:border-border-dark shadow-sm hover:shadow-2xl hover:border-accent/40 transition-all duration-300 flex flex-col justify-between cursor-pointer"
              >
                <div>
                  {/* Card Image Banner & Hover Overlay */}
                  <div className="relative aspect-[16/9] w-full overflow-hidden bg-slate-900">
                    <img
                      src={imageUrl}
                      alt={project.title}
                      loading="lazy"
                      className="w-full h-full object-cover object-center filter contrast-[105%] group-hover:scale-105 transition-transform duration-700"
                    />

                    {/* Dark gradient vignette */}
                    <div className="absolute inset-0 bg-gradient-to-t from-bg-dark-card via-bg-dark-card/40 to-transparent opacity-80" />

                    {/* Category Pill Tag */}
                    <div className="absolute top-4 left-4 z-10">
                      <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[11px] font-semibold bg-bg-dark/80 backdrop-blur-md text-accent border border-accent/30 shadow-md">
                        {getCategoryIcon(project.category)}
                        <span>{project.category}</span>
                      </span>
                    </div>

                    {/* Hover Lift Overlay with Quick Action */}
                    <div className="absolute inset-0 bg-accent-dark/40 dark:bg-accent-dark/60 backdrop-blur-[2px] opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
                      <span className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-white text-slate-900 font-semibold text-xs shadow-lg transform translate-y-2 group-hover:translate-y-0 transition-transform duration-300">
                        <FiEye className="w-4 h-4 text-accent" />
                        <span>View Project Details</span>
                      </span>
                    </div>
                  </div>

                  {/* Card Content */}
                  <div className="p-6 sm:p-7">
                    <h3 className="font-heading font-bold text-xl sm:text-2xl text-text-light dark:text-text-dark group-hover:text-accent transition-colors tracking-tight line-clamp-2">
                      {project.title}
                    </h3>

                    <p className="mt-3 text-sm text-text-light-muted dark:text-text-dark-muted leading-relaxed line-clamp-3">
                      {project.description}
                    </p>

                    {/* Tech Stack Chips */}
                    <div className="mt-5 flex flex-wrap gap-1.5">
                      {project.techStack.slice(0, 4).map((tech, idx) => (
                        <span
                          key={idx}
                          className="px-2.5 py-1 rounded-lg text-[11px] font-medium bg-bg-light-elevated dark:bg-bg-dark-elevated text-text-light dark:text-text-dark border border-border-light dark:border-border-dark"
                        >
                          {tech}
                        </span>
                      ))}
                      {project.techStack.length > 4 && (
                        <span className="px-2 py-1 rounded-lg text-[11px] font-medium bg-accent-subtle text-accent border border-accent/20">
                          +{project.techStack.length - 4} more
                        </span>
                      )}
                    </div>
                  </div>
                </div>

                {/* Card Footer: Action Links */}
                <div
                  className="px-6 sm:px-7 py-4 border-t border-border-light/60 dark:border-border-dark/60 flex items-center justify-between text-xs"
                  onClick={(e) => e.stopPropagation()}
                >
                  <button
                    type="button"
                    onClick={() => setActiveProject(project)}
                    className="font-semibold text-accent hover:underline flex items-center gap-1 cursor-pointer"
                  >
                    <span>Full Overview</span>
                    <FiLayers className="w-3.5 h-3.5" />
                  </button>

                  <div className="flex items-center gap-2">
                    {/* GitHub Link */}
                    {hasGithub ? (
                      <a
                        href={project.githubLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg border border-border-light dark:border-border-dark text-text-light-muted dark:text-text-dark-muted hover:text-accent hover:border-accent transition-colors"
                        aria-label="GitHub Repository"
                      >
                        <FiGithub className="w-4 h-4" />
                      </a>
                    ) : (
                      <span
                        title="Enterprise internal codebase (proprietary)"
                        className="p-2 rounded-lg border border-dashed border-border-light dark:border-border-dark text-text-light-muted/50 dark:text-text-dark-muted/50 cursor-not-allowed flex items-center gap-1 text-[10px]"
                      >
                        <FiLock className="w-3.5 h-3.5" />
                        <span className="hidden sm:inline">Enterprise Code</span>
                      </span>
                    )}

                    {/* Live Link */}
                    {hasLive ? (
                      <a
                        href={project.liveLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="p-2 rounded-lg bg-accent-gradient text-white shadow-sm hover:shadow-accent-glow transition-all"
                        aria-label="Live Demo"
                      >
                        <FiExternalLink className="w-4 h-4" />
                      </a>
                    ) : (
                      <span
                        title="Production service integrated inside enterprise infrastructure"
                        className="px-2 py-1 rounded-lg text-[10px] font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20"
                      >
                        Production System
                      </span>
                    )}
                  </div>
                </div>
              </motion.div>
            );
          })}
        </AnimatePresence>
      </motion.div>

      {/* Animated Modal with Full Project Details */}
      <AnimatePresence>
        {activeProject && (
          <div
            className="fixed inset-0 z-[100] flex items-center justify-center p-4 sm:p-6 overflow-y-auto"
            role="dialog"
            aria-modal="true"
          >
            {/* Modal Backdrop */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.25 }}
              onClick={() => setActiveProject(null)}
              className="fixed inset-0 bg-black/75 backdrop-blur-md -z-10"
              aria-hidden="true"
            />

            {/* Modal Container */}
            <motion.div
              initial={{ opacity: 0, scale: 0.92, y: 24 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.92, y: 24 }}
              transition={{ type: 'spring', damping: 26, stiffness: 280 }}
              className="relative w-full max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl bg-bg-light dark:bg-bg-dark border border-border-light dark:border-border-dark shadow-2xl p-6 sm:p-8"
              onClick={(e) => e.stopPropagation()}
            >
              {/* Close Button */}
              <button
                type="button"
                onClick={() => setActiveProject(null)}
                className="absolute top-5 right-5 p-2 rounded-xl text-text-light-muted dark:text-text-dark-muted hover:text-accent hover:bg-bg-light-elevated dark:hover:bg-bg-dark-card border border-transparent hover:border-border-light dark:hover:border-border-dark transition-all cursor-pointer z-10"
                aria-label="Close project modal"
              >
                <FiX className="w-5 h-5" />
              </button>

              {/* Header Badges */}
              <div className="flex flex-wrap items-center gap-2 mb-3">
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-accent-subtle text-accent border border-accent/30">
                  {getCategoryIcon(activeProject.category)}
                  <span>{activeProject.category}</span>
                </span>
                <span className="px-2.5 py-1 rounded-full text-xs font-semibold bg-emerald-500/10 text-emerald-500 border border-emerald-500/20 flex items-center gap-1">
                  <FiCheckCircle className="w-3.5 h-3.5" />
                  <span>Production Impact</span>
                </span>
              </div>

              {/* Modal Title */}
              <h3 className="font-heading font-extrabold text-2xl sm:text-3xl text-text-light dark:text-text-dark tracking-tight pr-8">
                {activeProject.title}
              </h3>

              {/* Modal Image Preview */}
              <div className="mt-5 rounded-2xl overflow-hidden aspect-[16/9] w-full border border-border-light dark:border-border-dark relative">
                <img
                  src={
                    isValidUrl(activeProject.image)
                      ? activeProject.image
                      : categoryArtwork[activeProject.category] || categoryArtwork['Cloud & Microservices']
                  }
                  alt={activeProject.title}
                  className="w-full h-full object-cover"
                />
              </div>

              {/* Deep Architecture Description */}
              <div className="mt-6 space-y-4">
                <h4 className="text-xs uppercase font-mono tracking-widest text-text-light-muted dark:text-text-dark-muted">
                  Technical Architecture & Execution
                </h4>
                <p className="text-sm sm:text-base leading-relaxed text-text-light dark:text-text-dark font-normal">
                  {activeProject.description}
                </p>
              </div>

              {/* Tech Stack Matrix */}
              <div className="mt-6 space-y-3">
                <h4 className="text-xs uppercase font-mono tracking-widest text-text-light-muted dark:text-text-dark-muted">
                  Technologies Deployed
                </h4>
                <div className="flex flex-wrap gap-2">
                  {activeProject.techStack.map((tech, idx) => (
                    <span
                      key={idx}
                      className="px-3 py-1.5 rounded-xl text-xs font-semibold bg-bg-light-elevated dark:bg-bg-dark-elevated text-text-light dark:text-text-dark border border-border-light dark:border-border-dark"
                    >
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Enterprise Link Handling Notice */}
              <div className="mt-6 p-4 rounded-2xl bg-bg-light-card dark:bg-bg-dark-card border border-border-light dark:border-border-dark">
                <div className="flex items-start gap-3">
                  <FiLock className="w-4 h-4 text-accent shrink-0 mt-0.5" />
                  <div className="text-xs text-text-light-muted dark:text-text-dark-muted leading-relaxed">
                    <strong className="text-text-light dark:text-text-dark block">
                      Enterprise Production Notice
                    </strong>
                    This system was architected and delivered as part of production enterprise microservices suites. Due to NDA and enterprise security policies, proprietary source code remains private to internal client infrastructure.
                  </div>
                </div>
              </div>

              {/* Modal Actions */}
              <div className="mt-7 pt-5 border-t border-border-light dark:border-border-dark flex flex-wrap items-center justify-between gap-3">
                <div className="flex items-center gap-3">
                  {isValidUrl(activeProject.liveLink) && (
                    <a
                      href={activeProject.liveLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold text-white bg-accent-gradient hover:bg-accent-gradient-hover shadow-accent-glow"
                    >
                      <span>Live Service</span>
                      <FiExternalLink className="w-3.5 h-3.5" />
                    </a>
                  )}

                  {isValidUrl(activeProject.githubLink) && (
                    <a
                      href={activeProject.githubLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl text-xs font-semibold border border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-accent"
                    >
                      <FiGithub className="w-3.5 h-3.5" />
                      <span>Source Repository</span>
                    </a>
                  )}
                </div>

                <button
                  type="button"
                  onClick={() => setActiveProject(null)}
                  className="px-5 py-2.5 rounded-xl text-xs font-semibold bg-bg-light-elevated dark:bg-bg-dark-elevated text-text-light dark:text-text-dark border border-border-light dark:border-border-dark hover:border-accent transition-colors ml-auto cursor-pointer"
                >
                  Close
                </button>
              </div>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
