import { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiArrowRight,
  FiMail,
  FiPhone,
  FiGithub,
  FiLinkedin,
  FiArrowDown,
  FiCode,
} from 'react-icons/fi';
import { profile } from '../data/portfolio';
import AnimatedAvatar from './AnimatedAvatar';

export default function Hero() {
  const roles = [
    profile.role,
    'Senior Java & Spring Specialist',
    'Cloud Microservices Architect',
    'Distributed Systems Engineer',
  ];

  // Typewriter effect state
  const [roleIndex, setRoleIndex] = useState(0);
  const [displayedText, setDisplayedText] = useState('');
  const [isDeleting, setIsDeleting] = useState(false);

  useEffect(() => {
    const currentRole = roles[roleIndex];
    const typingSpeed = isDeleting ? 45 : 90;

    const timer = setTimeout(() => {
      if (!isDeleting) {
        setDisplayedText(currentRole.substring(0, displayedText.length + 1));
        if (displayedText.length + 1 === currentRole.length) {
          // Pause at full word before deleting
          setTimeout(() => setIsDeleting(true), 2000);
        }
      } else {
        setDisplayedText(currentRole.substring(0, displayedText.length - 1));
        if (displayedText.length === 0) {
          setIsDeleting(false);
          setRoleIndex((prev) => (prev + 1) % roles.length);
        }
      }
    }, typingSpeed);

    return () => clearTimeout(timer);
  }, [displayedText, isDeleting, roleIndex]);

  // Smooth scroll helper
  const scrollToSection = (e, sectionId) => {
    e.preventDefault();
    const element = document.getElementById(sectionId);
    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition >= 0 ? offsetPosition : 0,
        behavior: 'smooth',
      });
    }
  };

  // Staggered motion container variants
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.12,
        delayChildren: 0.1,
      },
    },
  };

  const itemVariants = {
    hidden: { opacity: 0, y: 24 },
    visible: {
      opacity: 1,
      y: 0,
      transition: { duration: 0.6, ease: [0.22, 1, 0.36, 1] },
    },
  };

  return (
    <section
      id="home"
      className="relative min-h-[calc(100vh-4rem)] flex items-center justify-center overflow-hidden pt-8 pb-16 md:py-24"
    >
      {/* 1. Animated Ambient Gradient/Blurred Orbs */}
      <div className="absolute inset-0 pointer-events-none overflow-hidden" aria-hidden="true">
        {/* Orb 1: Cyan Accent */}
        <motion.div
          animate={{
            x: [0, 40, 0],
            y: [0, -30, 0],
            scale: [1, 1.15, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 10,
            ease: 'easeInOut',
          }}
          className="absolute -top-24 -left-20 w-80 h-80 sm:w-96 sm:h-96 rounded-full bg-accent/20 dark:bg-accent/15 blur-3xl"
        />

        {/* Orb 2: Deep Blue */}
        <motion.div
          animate={{
            x: [0, -50, 0],
            y: [0, 40, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{
            repeat: Infinity,
            duration: 12,
            ease: 'easeInOut',
          }}
          className="absolute top-1/3 -right-24 w-80 h-80 sm:w-[28rem] sm:h-[28rem] rounded-full bg-blue-600/15 dark:bg-blue-500/10 blur-3xl"
        />

        {/* Orb 3: Indigo Center Glow */}
        <motion.div
          animate={{
            scale: [1, 1.1, 1],
            opacity: [0.3, 0.5, 0.3],
          }}
          transition={{
            repeat: Infinity,
            duration: 8,
            ease: 'easeInOut',
          }}
          className="absolute bottom-10 left-1/3 w-64 h-64 sm:w-80 sm:h-80 rounded-full bg-indigo-500/15 dark:bg-indigo-500/10 blur-3xl"
        />

        {/* Subtle geometric dot pattern */}
        <div className="absolute inset-0 opacity-[0.03] dark:opacity-[0.05] bg-[radial-gradient(#06b6d4_1px,transparent_1px)] [background-size:24px_24px]" />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full z-10">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
          {/* Left Column: Text & CTAs (7 cols) */}
          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="lg:col-span-7 flex flex-col items-center lg:items-start text-center lg:text-left"
          >
            {/* Greeting Badge */}
            <motion.div variants={itemVariants} className="mb-4">
              <span className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full text-xs sm:text-sm font-semibold tracking-wide uppercase bg-accent-subtle text-accent border border-accent/25 backdrop-blur-sm">
                <span className="w-2 h-2 rounded-full bg-accent animate-pulse" />
                <span>Available for Full-Stack Opportunities</span>
              </span>
            </motion.div>

            {/* Name */}
            <motion.h1
              variants={itemVariants}
              className="text-4xl sm:text-6xl xl:text-7xl font-heading font-extrabold tracking-tight text-text-light dark:text-text-dark leading-[1.1]"
            >
              Hi, I'm{' '}
              <span className="text-transparent bg-clip-text bg-accent-gradient">
                {profile.name}
              </span>
            </motion.h1>

            {/* Cycling Role Headline with Typewriter Cursor */}
            <motion.div
              variants={itemVariants}
              className="mt-3 sm:mt-4 h-10 sm:h-12 flex items-center"
            >
              <h2 className="text-xl sm:text-2xl md:text-3xl font-heading font-bold text-text-light dark:text-text-dark">
                <span className="text-text-light-muted dark:text-text-dark-muted font-normal">
                  I specialize as a{' '}
                </span>
                <span className="text-accent underline decoration-accent/40 underline-offset-4">
                  {displayedText}
                </span>
                <span className="inline-block w-[3px] h-6 sm:h-7 ml-1 bg-accent animate-pulse align-middle" />
              </h2>
            </motion.div>

            {/* Tagline */}
            <motion.p
              variants={itemVariants}
              className="mt-4 sm:mt-6 text-base sm:text-lg text-text-light-muted dark:text-text-dark-muted max-w-2xl leading-relaxed"
            >
              {profile.tagline}
            </motion.p>

            {/* Action Buttons */}
            <motion.div
              variants={itemVariants}
              className="mt-8 flex flex-wrap items-center justify-center lg:justify-start gap-4 w-full sm:w-auto"
            >
              <a
                href="#projects"
                onClick={(e) => scrollToSection(e, 'projects')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-white bg-accent-gradient hover:bg-accent-gradient-hover shadow-accent-glow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 group cursor-pointer"
              >
                <span>View Projects</span>
                <FiArrowRight className="w-4 h-4 transition-transform duration-200 group-hover:translate-x-1" />
              </a>

              <a
                href="#contact"
                onClick={(e) => scrollToSection(e, 'contact')}
                className="inline-flex items-center justify-center gap-2 px-6 py-3.5 text-sm font-semibold rounded-xl text-text-light dark:text-text-dark bg-bg-light-card dark:bg-bg-dark-card border border-border-light dark:border-border-dark hover:border-accent dark:hover:border-accent hover:text-accent dark:hover:text-accent transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 shadow-sm cursor-pointer"
              >
                <span>Contact Me</span>
              </a>
            </motion.div>

            {/* Social Icons Bar */}
            <motion.div
              variants={itemVariants}
              className="mt-8 pt-6 border-t border-border-light dark:border-border-dark flex items-center gap-3"
            >
              <span className="text-xs uppercase font-mono tracking-widest text-text-light-muted dark:text-text-dark-muted mr-2">
                Connect:
              </span>

              {profile.socialLinks?.github && (
                <a
                  href={profile.socialLinks.github}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-border-light dark:border-border-dark bg-bg-light-card dark:bg-bg-dark-card text-text-light-muted dark:text-text-dark-muted hover:text-accent hover:border-accent transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  aria-label="GitHub Profile"
                >
                  <FiGithub className="w-4 h-4" />
                </a>
              )}

              {profile.socialLinks?.linkedin && (
                <a
                  href={profile.socialLinks.linkedin}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="p-2.5 rounded-xl border border-border-light dark:border-border-dark bg-bg-light-card dark:bg-bg-dark-card text-text-light-muted dark:text-text-dark-muted hover:text-accent hover:border-accent transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  aria-label="LinkedIn Profile"
                >
                  <FiLinkedin className="w-4 h-4" />
                </a>
              )}

              {profile.socialLinks?.email && (
                <a
                  href={profile.socialLinks.email}
                  className="p-2.5 rounded-xl border border-border-light dark:border-border-dark bg-bg-light-card dark:bg-bg-dark-card text-text-light-muted dark:text-text-dark-muted hover:text-accent hover:border-accent transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  aria-label="Send Email"
                >
                  <FiMail className="w-4 h-4" />
                </a>
              )}

              {profile.socialLinks?.phone && (
                <a
                  href={profile.socialLinks.phone}
                  className="p-2.5 rounded-xl border border-border-light dark:border-border-dark bg-bg-light-card dark:bg-bg-dark-card text-text-light-muted dark:text-text-dark-muted hover:text-accent hover:border-accent transition-all duration-200 hover:-translate-y-0.5 shadow-sm"
                  aria-label="Call Phone"
                >
                  <FiPhone className="w-4 h-4" />
                </a>
              )}
            </motion.div>
          </motion.div>

          {/* Right Column: Animated Developer Graphic Avatar (5 cols) */}
          <div className="lg:col-span-5 flex justify-center lg:justify-end">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.8, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
              className="w-full flex justify-center"
            >
              <AnimatedAvatar />
            </motion.div>
          </div>
        </div>

        {/* 4. Bouncing Scroll-Down Indicator */}
        <div className="mt-14 sm:mt-16 flex justify-center">
          <motion.a
            href="#about"
            onClick={(e) => scrollToSection(e, 'about')}
            animate={{ y: [0, 8, 0] }}
            transition={{
              repeat: Infinity,
              duration: 2,
              ease: 'easeInOut',
            }}
            className="flex flex-col items-center gap-2 text-text-light-muted dark:text-text-dark-muted hover:text-accent dark:hover:text-accent transition-colors group cursor-pointer"
            aria-label="Scroll down to About section"
          >
            <span className="text-[11px] uppercase font-mono tracking-widest font-medium group-hover:text-accent">
              Scroll Down
            </span>
            <div className="w-7 h-11 rounded-full border-2 border-border-light dark:border-border-dark group-hover:border-accent flex justify-center p-1.5 transition-colors">
              <motion.div
                animate={{ y: [0, 14, 0] }}
                transition={{
                  repeat: Infinity,
                  duration: 1.8,
                  ease: 'easeInOut',
                }}
                className="w-1.5 h-2 rounded-full bg-accent"
              />
            </div>
          </motion.a>
        </div>
      </div>
    </section>
  );
}
