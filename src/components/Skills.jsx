import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FaJava,
  FaPython,
  FaJs,
  FaHtml5,
  FaAngular,
  FaAws,
  FaDocker,
  FaGitAlt,
  FaDatabase,
} from 'react-icons/fa';
import {
  SiSpringboot,
  SiPostgresql,
  SiRedis,
  SiKubernetes,
  SiJenkins,
  SiSelenium,
  SiSwagger,
} from 'react-icons/si';
import {
  FiCode,
  FiDatabase,
  FiServer,
  FiCloud,
  FiCheckCircle,
  FiLayers,
  FiShield,
  FiZap,
  FiTrendingUp,
  FiCpu,
  FiCheckSquare,
  FiGrid,
  FiGitPullRequest,
  FiRefreshCw,
  FiSearch,
  FiX,
  FiInfo,
  FiStar,
} from 'react-icons/fi';
import { skills } from '../data/portfolio';
import Reveal from './Reveal';

// Icon resolver for skills
function getSkillIcon(name) {
  const normalized = name.toLowerCase().trim();

  // Languages & Frontend
  if (normalized === 'java') return <FaJava className="w-5 h-5 text-red-500" />;
  if (normalized === 'javascript') return <FaJs className="w-5 h-5 text-amber-400" />;
  if (normalized === 'html') return <FaHtml5 className="w-5 h-5 text-orange-500" />;
  if (normalized === 'angular') return <FaAngular className="w-5 h-5 text-red-600" />;
  if (normalized === 'python') return <FaPython className="w-5 h-5 text-blue-400" />;

  // Databases
  if (normalized.includes('postgres')) return <SiPostgresql className="w-5 h-5 text-sky-400" />;
  if (normalized.includes('redis')) return <SiRedis className="w-5 h-5 text-red-500" />;
  if (normalized.includes('oracle')) return <FaDatabase className="w-5 h-5 text-rose-500" />;

  // Frameworks & Web
  if (normalized.includes('spring boot')) return <SiSpringboot className="w-5 h-5 text-emerald-400" />;
  if (normalized.includes('spring web-flux')) return <FiZap className="w-5 h-5 text-emerald-400" />;
  if (normalized.includes('rest')) return <FiServer className="w-5 h-5 text-indigo-400" />;
  if (normalized.includes('swagger') || normalized.includes('openapi')) return <SiSwagger className="w-5 h-5 text-lime-400" />;
  if (normalized.includes('oauth')) return <FiShield className="w-5 h-5 text-amber-400" />;

  // Cloud & DevOps
  if (normalized.includes('aws')) return <FaAws className="w-5 h-5 text-amber-500" />;
  if (normalized.includes('docker')) return <FaDocker className="w-5 h-5 text-sky-400" />;
  if (normalized.includes('kubernetes')) return <SiKubernetes className="w-5 h-5 text-blue-400" />;
  if (normalized.includes('jenkins')) return <SiJenkins className="w-5 h-5 text-red-400" />;
  if (normalized.includes('git')) return <FaGitAlt className="w-5 h-5 text-orange-600" />;

  // Testing
  if (normalized.includes('junit')) return <FiCheckCircle className="w-5 h-5 text-emerald-500" />;
  if (normalized.includes('mockito')) return <FiCheckSquare className="w-5 h-5 text-teal-400" />;
  if (normalized.includes('selenium')) return <SiSelenium className="w-5 h-5 text-green-500" />;

  // Architecture & Concepts
  if (normalized.includes('microservice')) return <FiGrid className="w-5 h-5 text-purple-400" />;
  if (normalized.includes('ci/cd')) return <FiGitPullRequest className="w-5 h-5 text-purple-400" />;
  if (normalized.includes('system design')) return <FiCpu className="w-5 h-5 text-cyan-400" />;
  if (normalized.includes('agile')) return <FiRefreshCw className="w-5 h-5 text-indigo-400" />;
  if (normalized.includes('security')) return <FiShield className="w-5 h-5 text-amber-400" />;
  if (normalized.includes('performance') || normalized.includes('optimization')) return <FiTrendingUp className="w-5 h-5 text-emerald-400" />;

  return <FiCode className="w-5 h-5 text-accent" />;
}

// Enterprise Skill Highlights & Descriptions for interactive popover
const skillInsights = {
  Java: 'Primary core language across 7+ years of enterprise backend engineering at IBM, Virtusa, and BCITS.',
  'Spring Boot': 'Core framework used to architect scalable cloud-native microservices and RESTful API platforms.',
  'Spring Web-Flux': 'Used for high-throughput reactive API streaming and compression, reducing latency by 70%.',
  PostgreSQL: 'Enterprise relational database optimization, schema design, and query performance tuning.',
  'AWS (EC2, ECS, S3)': 'Containerized service deployment, cloud infrastructure provisioning, and S3 storage automation.',
  Docker: 'Containerizing microservices and creating consistent production runtime environments.',
  'API Security': 'Integrated Spring Security & RBAC authorization across 30+ critical enterprise endpoints.',
};

export default function Skills() {
  const [activeTab, setActiveTab] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedSkill, setSelectedSkill] = useState(null);

  const categories = [
    { id: 'all', label: 'All Stack', icon: <FiGrid className="w-4 h-4" /> },
    { id: 'programmingLanguages', label: 'Languages', icon: <FiCode className="w-4 h-4" /> },
    { id: 'frameworksAndWeb', label: 'Backend & APIs', icon: <FiServer className="w-4 h-4" /> },
    { id: 'databases', label: 'Databases', icon: <FiDatabase className="w-4 h-4" /> },
    { id: 'cloudAndDevOps', label: 'Cloud & DevOps', icon: <FiCloud className="w-4 h-4" /> },
    { id: 'testingTools', label: 'Testing Tools', icon: <FiCheckCircle className="w-4 h-4" /> },
    { id: 'architecture', label: 'Architecture', icon: <FiLayers className="w-4 h-4" /> },
  ];

  // Filter skills based on tab and search query
  const filteredCategoryEntries = Object.entries(skills)
    .filter(([key]) => activeTab === 'all' || key === activeTab)
    .map(([key, category]) => {
      if (!searchQuery.trim()) return [key, category];

      const matchingSkills = category.skills.filter((skill) =>
        skill.toLowerCase().includes(searchQuery.toLowerCase().trim())
      );
      return [key, { ...category, skills: matchingSkills }];
    })
    .filter(([_, category]) => category.skills.length > 0);

  return (
    <div className="space-y-10">
      {/* Top Interactive Bar: Category Tabs & Instant Search */}
      <Reveal direction="up" delay={0.1}>
        <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
          {/* Category Tabs */}
          <div className="flex items-center gap-1.5 p-1.5 rounded-2xl bg-bg-light-card dark:bg-bg-dark-card border border-border-light dark:border-border-dark shadow-sm overflow-x-auto scrollbar-none">
            {categories.map((cat) => {
              const isActive = activeTab === cat.id;
              return (
                <button
                  key={cat.id}
                  onClick={() => setActiveTab(cat.id)}
                  className={`relative px-4 py-2 text-xs sm:text-sm font-medium rounded-xl whitespace-nowrap transition-colors duration-200 flex items-center gap-2 cursor-pointer ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-text-light-muted dark:text-text-dark-muted hover:text-text-light dark:hover:text-text-dark'
                  }`}
                  role="tab"
                  aria-selected={isActive}
                >
                  {isActive && (
                    <motion.div
                      layoutId="activeSkillTabPill"
                      className="absolute inset-0 bg-accent-gradient rounded-xl shadow-accent-glow"
                      transition={{ type: 'spring', stiffness: 400, damping: 30 }}
                      aria-hidden="true"
                    />
                  )}
                  <span className="relative z-10">{cat.icon}</span>
                  <span className="relative z-10">{cat.label}</span>
                </button>
              );
            })}
          </div>

          {/* Real-time Search Field */}
          <div className="relative min-w-[240px] sm:min-w-[280px]">
            <FiSearch className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-text-light-muted dark:text-text-dark-muted" />
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              placeholder="Search skill (e.g. Java, AWS, Spring)..."
              className="w-full pl-10 pr-9 py-2.5 text-xs sm:text-sm rounded-2xl bg-bg-light-card dark:bg-bg-dark-card border border-border-light dark:border-border-dark text-text-light dark:text-text-dark focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-text-light-muted/50"
            />
            {searchQuery && (
              <button
                type="button"
                onClick={() => setSearchQuery('')}
                className="absolute right-3 top-1/2 -translate-y-1/2 p-1 rounded-full hover:bg-border-light dark:hover:bg-border-dark text-text-light-muted dark:text-text-dark-muted"
              >
                <FiX className="w-3.5 h-3.5" />
              </button>
            )}
          </div>
        </div>
      </Reveal>

      {/* Dynamic Masonry-Style Responsive Cards Grid */}
      <AnimatePresence mode="wait">
        <motion.div
          key={`${activeTab}-${searchQuery}`}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: -16 }}
          transition={{ duration: 0.35, ease: [0.22, 1, 0.36, 1] }}
          className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-start"
        >
          {filteredCategoryEntries.map(([key, category]) => {
            const skillCount = category.skills.length;
            // Larger categories with 5+ items span wider columns on medium+ screens for dynamic grid visual balance
            const isWideCard = skillCount >= 6;

            return (
              <motion.div
                key={key}
                layout
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                transition={{ duration: 0.3 }}
                className={`p-6 sm:p-7 rounded-3xl bg-bg-light-card dark:bg-bg-dark-card border border-border-light dark:border-border-dark shadow-sm hover:shadow-xl hover:border-indigo-500/40 transition-all duration-300 flex flex-col justify-between group/card ${
                  isWideCard ? 'md:col-span-2 lg:col-span-2' : 'col-span-1'
                }`}
              >
                <div>
                  {/* Category Header */}
                  <div className="flex items-center justify-between pb-4 border-b border-border-light/70 dark:border-border-dark/70 mb-5">
                    <div className="flex items-center gap-3">
                      <span className="w-8 h-8 rounded-xl bg-accent-subtle text-accent flex items-center justify-center font-heading font-extrabold text-xs shadow-inner">
                        {skillCount}
                      </span>
                      <h3 className="font-heading font-bold text-base sm:text-lg text-text-light dark:text-text-dark">
                        {category.title}
                      </h3>
                    </div>
                    <span className="text-[10px] uppercase font-mono tracking-widest text-text-light-muted dark:text-text-dark-muted px-2.5 py-1 rounded-full bg-bg-light-elevated dark:bg-bg-dark-elevated border border-border-light dark:border-border-dark">
                      {isWideCard ? 'Core Suite' : 'Specialization'}
                    </span>
                  </div>

                  {/* Skill Interactive Badges Grid */}
                  <div className="flex flex-wrap gap-2.5 sm:gap-3">
                    {category.skills.map((skill, sIdx) => {
                      const hasInsight = !!skillInsights[skill];
                      const isSelected = selectedSkill === skill;

                      return (
                        <motion.div
                          key={sIdx}
                          whileHover={{ scale: 1.05, y: -4 }}
                          whileTap={{ scale: 0.96 }}
                          onClick={() => setSelectedSkill(isSelected ? null : skill)}
                          className={`group relative flex items-center gap-2.5 px-4 py-2.5 rounded-2xl text-xs font-semibold
                            transition-all duration-200 cursor-pointer select-none border ${
                              isSelected
                                ? 'bg-indigo-500/20 border-indigo-500 text-indigo-300 shadow-[0_0_20px_rgba(99,102,241,0.35)]'
                                : 'bg-bg-light-elevated/80 dark:bg-bg-dark-elevated/80 border-border-light dark:border-border-dark text-text-light dark:text-text-dark hover:border-indigo-500/50 hover:shadow-accent-glow hover:text-accent'
                            }`}
                        >
                          <span className="transition-transform duration-200 group-hover:scale-110 shrink-0">
                            {getSkillIcon(skill)}
                          </span>
                          <span className="truncate">{skill}</span>

                          {hasInsight && (
                            <span className="w-1.5 h-1.5 rounded-full bg-cyan-400 animate-pulse shrink-0" title="Click for enterprise insight" />
                          )}
                        </motion.div>
                      );
                    })}
                  </div>
                </div>

                {/* Bottom Card Footer */}
                <div className="mt-6 pt-3 border-t border-border-light/40 dark:border-border-dark/40 flex items-center justify-between text-[11px] text-text-light-muted dark:text-text-dark-muted">
                  <span className="flex items-center gap-1.5 font-mono">
                    <FiStar className="w-3 h-3 text-amber-400" />
                    <span>Production Hardened</span>
                  </span>
                  <span className="w-1.5 h-1.5 rounded-full bg-indigo-500/70" />
                </div>
              </motion.div>
            );
          })}
        </motion.div>
      </AnimatePresence>

      {/* Interactive Skill Popover / Insight Banner */}
      <AnimatePresence>
        {selectedSkill && skillInsights[selectedSkill] && (
          <motion.div
            initial={{ opacity: 0, y: 14, scale: 0.98 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 14, scale: 0.98 }}
            transition={{ type: 'spring', damping: 25, stiffness: 300 }}
            className="p-5 rounded-2xl bg-indigo-500/10 border border-indigo-500/30 backdrop-blur-md flex items-start justify-between gap-4 relative shadow-lg"
          >
            <div className="flex items-start gap-3">
              <div className="w-9 h-9 rounded-xl bg-indigo-500/20 text-indigo-400 flex items-center justify-center shrink-0 mt-0.5">
                <FiInfo className="w-5 h-5" />
              </div>
              <div>
                <h4 className="font-heading font-bold text-sm text-text-light dark:text-text-dark flex items-center gap-2">
                  <span>{selectedSkill}</span>
                  <span className="text-[10px] uppercase font-mono px-2 py-0.5 rounded-full bg-indigo-500/20 text-indigo-300">
                    Enterprise Record
                  </span>
                </h4>
                <p className="mt-1 text-xs text-text-light-muted dark:text-text-dark-muted leading-relaxed">
                  {skillInsights[selectedSkill]}
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => setSelectedSkill(null)}
              className="p-1.5 rounded-lg hover:bg-indigo-500/20 text-text-light-muted dark:text-text-dark-muted hover:text-accent transition-colors shrink-0"
              aria-label="Close insight"
            >
              <FiX className="w-4 h-4" />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
