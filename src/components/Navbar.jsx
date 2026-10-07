import { useState, useEffect } from 'react';
import { motion, AnimatePresence, useScroll, useSpring } from 'framer-motion';
import {
  FiMenu,
  FiX,
  FiFileText,
  FiHome,
  FiUser,
  FiGrid,
  FiCode,
  FiBriefcase,
  FiLayers,
  FiMail,
} from 'react-icons/fi';
import { profile } from '../data/portfolio';
import ThemeToggle from './ThemeToggle';

export default function Navbar({ theme, toggleTheme }) {
  const [isScrolled, setIsScrolled] = useState(false);
  const [activeSection, setActiveSection] = useState('home');
  const [hoveredNav, setHoveredNav] = useState(null);
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  // Top scroll-progress bar
  const { scrollYProgress } = useScroll();
  const scaleX = useSpring(scrollYProgress, {
    stiffness: 120,
    damping: 28,
    restDelta: 0.001,
  });

  const navLinks = [
    { name: 'Home', href: '#home', id: 'home', icon: FiHome, emoji: '🏠' },
    { name: 'About', href: '#about', id: 'about', icon: FiUser, emoji: '👤' },
    { name: 'Services', href: '#services', id: 'services', icon: FiGrid, emoji: '⚙️' },
    { name: 'Skills', href: '#skills', id: 'skills', icon: FiCode, emoji: '⚡' },
    { name: 'Experience', href: '#experience', id: 'experience', icon: FiBriefcase, emoji: '💼' },
    { name: 'Projects', href: '#projects', id: 'projects', icon: FiLayers, emoji: '🚀' },
    { name: 'Contact', href: '#contact', id: 'contact', icon: FiMail, emoji: '📬' },
  ];

  // Scroll listener for sticky header styling & scroll-spy
  useEffect(() => {
    const handleScroll = () => {
      // Shrink state on scroll > 40px
      setIsScrolled(window.scrollY > 40);

      // Scroll-spy calculation
      const scrollPosition = window.scrollY + 140; // navbar offset
      const windowHeight = window.innerHeight;
      const documentHeight = document.documentElement.scrollHeight;

      // Bottom of page activation (for contact section)
      if (window.scrollY + windowHeight >= documentHeight - 50) {
        setActiveSection('contact');
        return;
      }

      for (let i = navLinks.length - 1; i >= 0; i--) {
        const sectionId = navLinks[i].id;
        const element = document.getElementById(sectionId);
        if (element) {
          const top = element.offsetTop;
          if (scrollPosition >= top) {
            setActiveSection(sectionId);
            return;
          }
        }
      }
    };

    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll(); // Initial check
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scrolling when mobile drawer is open
  useEffect(() => {
    if (isMobileMenuOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isMobileMenuOpen]);

  // Smooth scroll handler
  const handleNavClick = (e, href) => {
    e.preventDefault();
    const targetId = href.replace('#', '');
    const element = document.getElementById(targetId);

    if (element) {
      const navOffset = 80;
      const elementPosition = element.getBoundingClientRect().top;
      const offsetPosition = elementPosition + window.pageYOffset - navOffset;

      window.scrollTo({
        top: offsetPosition >= 0 ? offsetPosition : 0,
        behavior: 'smooth',
      });

      setActiveSection(targetId);
      setIsMobileMenuOpen(false);
    }
  };

  // Monogram initials
  const initials = profile.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'AG';

  return (
    <>
      {/* Scroll-Progress Indicator */}
      <motion.div
        style={{ scaleX }}
        className="fixed top-0 left-0 right-0 h-[3px] bg-accent-gradient origin-left z-[60]"
        aria-hidden="true"
      />

      {/* Main Fixed Header Container with Smooth Shrink Morphing */}
      <header
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          isScrolled
            ? 'py-2.5 backdrop-blur-xl bg-bg-dark/80 border-b border-white/10 shadow-2xl shadow-indigo-950/20'
            : 'py-5 bg-transparent border-b border-transparent'
        }`}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex items-center justify-between">
          {/* Logo / Brand Name */}
          <a
            href="#home"
            onClick={(e) => handleNavClick(e, '#home')}
            className="group flex items-center gap-2.5 cursor-pointer select-none"
            aria-label={`${profile.name} Portfolio Home`}
          >
            <span
              className={`rounded-xl bg-accent-gradient flex items-center justify-center text-white font-heading font-bold shadow-accent-glow transition-all duration-300 group-hover:scale-105 ${
                isScrolled ? 'w-8 h-8 text-xs' : 'w-9 h-9 text-sm'
              }`}
            >
              {initials}
            </span>
            <div className="flex flex-col">
              <span
                className={`font-heading font-bold tracking-tight text-text-light dark:text-text-dark group-hover:text-accent transition-all ${
                  isScrolled ? 'text-base' : 'text-lg'
                }`}
              >
                {profile.name}
              </span>
              {!isScrolled && (
                <span className="text-[10px] uppercase font-mono tracking-widest text-text-light-muted dark:text-text-dark-muted hidden sm:block">
                  Full-Stack Engineer
                </span>
              )}
            </div>
          </a>

          {/* Desktop Navigation Dock: Condenses into Mini Floating Dock with Icons on Scroll */}
          <nav
            className={`hidden md:flex items-center gap-1 transition-all duration-300 ${
              isScrolled
                ? 'p-1 rounded-full bg-slate-900/90 border border-white/15 shadow-xl shadow-black/40 backdrop-blur-xl scale-95'
                : 'p-1.5 rounded-full bg-bg-light-elevated/70 dark:bg-bg-dark-card/70 border border-border-light/80 dark:border-border-dark/80 backdrop-blur-md'
            }`}
          >
            {navLinks.map((link) => {
              const Icon = link.icon;
              const isActive = activeSection === link.id;
              const isHovered = hoveredNav === link.id;
              // Show text if not scrolled OR if item is hovered or active
              const showText = !isScrolled || isHovered || isActive;

              return (
                <a
                  key={link.id}
                  href={link.href}
                  onClick={(e) => handleNavClick(e, link.href)}
                  onMouseEnter={() => setHoveredNav(link.id)}
                  onMouseLeave={() => setHoveredNav(null)}
                  className={`relative flex items-center gap-1.5 rounded-full transition-all duration-200 cursor-pointer ${
                    isScrolled
                      ? showText
                        ? 'px-3.5 py-1.5 text-xs font-semibold'
                        : 'px-2.5 py-1.5 text-sm'
                      : 'px-4 py-1.5 text-xs font-medium'
                  } ${
                    isActive
                      ? 'text-white font-semibold'
                      : 'text-text-light-muted dark:text-text-dark-muted hover:text-text-light dark:hover:text-text-dark'
                  }`}
                  aria-label={link.name}
                >
                  {isActive && (
                    <motion.span
                      layoutId="activeNavPill"
                      className="absolute inset-0 bg-accent-gradient rounded-full shadow-accent-glow"
                      transition={{
                        type: 'spring',
                        stiffness: 380,
                        damping: 30,
                      }}
                      aria-hidden="true"
                    />
                  )}

                  {/* Icon / Emoji */}
                  <span className={`relative z-10 transition-transform ${isActive ? 'scale-110' : ''}`}>
                    <Icon className="w-4 h-4" />
                  </span>

                  {/* Text Label: Animates width / opacity when expanding/collapsing */}
                  <AnimatePresence initial={false}>
                    {showText && (
                      <motion.span
                        initial={{ opacity: 0, width: 0 }}
                        animate={{ opacity: 1, width: 'auto' }}
                        exit={{ opacity: 0, width: 0 }}
                        transition={{ duration: 0.2 }}
                        className="relative z-10 whitespace-nowrap overflow-hidden"
                      >
                        {link.name}
                      </motion.span>
                    )}
                  </AnimatePresence>
                </a>
              );
            })}
          </nav>

          {/* Right Actions: Resume Button & Theme Toggle */}
          <div className="hidden md:flex items-center gap-3">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            <a
              href={profile.resumeLink}
              download="Anurag_Goyal_Resume.pdf"
              target="_blank"
              rel="noopener noreferrer"
              className={`inline-flex items-center gap-2 text-xs font-semibold rounded-xl text-white bg-accent-gradient hover:bg-accent-gradient-hover shadow-accent-glow transition-all duration-200 hover:-translate-y-0.5 active:translate-y-0 ${
                isScrolled ? 'px-3.5 py-1.5' : 'px-4 py-2'
              }`}
            >
              <FiFileText className="w-3.5 h-3.5" />
              <span>Resume</span>
            </a>
          </div>

          {/* Mobile Actions: Theme Toggle & Hamburger */}
          <div className="flex md:hidden items-center gap-2">
            <ThemeToggle theme={theme} toggleTheme={toggleTheme} />

            <button
              type="button"
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
              className="p-2.5 rounded-xl border border-border-light dark:border-border-dark bg-bg-light-card dark:bg-bg-dark-card text-text-light dark:text-text-dark hover:text-accent focus:outline-none focus:ring-2 focus:ring-accent/50 transition-colors"
              aria-label={isMobileMenuOpen ? 'Close navigation menu' : 'Open navigation menu'}
              aria-expanded={isMobileMenuOpen}
            >
              {isMobileMenuOpen ? (
                <FiX className="w-5 h-5 text-accent" />
              ) : (
                <FiMenu className="w-5 h-5" />
              )}
            </button>
          </div>
        </div>
      </header>

      {/* Mobile Animated Slide-in Drawer */}
      <AnimatePresence>
        {isMobileMenuOpen && (
          <>
            {/* Backdrop overlay */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ duration: 0.2 }}
              onClick={() => setIsMobileMenuOpen(false)}
              className="fixed inset-0 bg-black/60 backdrop-blur-sm z-50 md:hidden"
              aria-hidden="true"
            />

            {/* Slide-in Drawer */}
            <motion.div
              initial={{ x: '100%' }}
              animate={{ x: 0 }}
              exit={{ x: '100%' }}
              transition={{ type: 'spring', damping: 25, stiffness: 220 }}
              className="fixed top-0 right-0 bottom-0 w-72 max-w-[85vw] z-50 md:hidden bg-bg-light dark:bg-bg-dark border-l border-border-light dark:border-border-dark p-6 flex flex-col justify-between shadow-2xl"
              role="dialog"
              aria-modal="true"
              aria-label="Mobile Navigation"
            >
              <div>
                {/* Drawer Header */}
                <div className="flex items-center justify-between pb-6 border-b border-border-light dark:border-border-dark">
                  <div className="flex items-center gap-2.5">
                    <span className="w-8 h-8 rounded-lg bg-accent-gradient flex items-center justify-center text-white font-heading font-bold text-xs shadow-accent-glow">
                      {initials}
                    </span>
                    <span className="font-heading font-bold text-base text-text-light dark:text-text-dark">
                      {profile.name}
                    </span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setIsMobileMenuOpen(false)}
                    className="p-2 rounded-lg text-text-light-muted dark:text-text-dark-muted hover:text-accent focus:outline-none"
                    aria-label="Close menu"
                  >
                    <FiX className="w-5 h-5" />
                  </button>
                </div>

                {/* Drawer Nav Links with Icons */}
                <nav className="mt-6 flex flex-col gap-1.5">
                  {navLinks.map((link) => {
                    const Icon = link.icon;
                    const isActive = activeSection === link.id;
                    return (
                      <a
                        key={link.id}
                        href={link.href}
                        onClick={(e) => handleNavClick(e, link.href)}
                        className={`flex items-center justify-between px-4 py-3 rounded-xl text-sm font-medium transition-all ${
                          isActive
                            ? 'bg-accent-subtle text-accent font-semibold border border-accent/20'
                            : 'text-text-light-muted dark:text-text-dark-muted hover:bg-bg-light-elevated dark:hover:bg-bg-dark-card hover:text-text-light dark:hover:text-text-dark'
                        }`}
                      >
                        <div className="flex items-center gap-3">
                          <Icon className="w-4 h-4 text-accent" />
                          <span>{link.name}</span>
                        </div>
                        {isActive && (
                          <span className="w-1.5 h-1.5 rounded-full bg-accent animate-pulse" />
                        )}
                      </a>
                    );
                  })}
                </nav>
              </div>

              {/* Drawer Footer Actions */}
              <div className="pt-6 border-t border-border-light dark:border-border-dark flex flex-col gap-3">
                <a
                  href={profile.resumeLink}
                  download="Anurag_Goyal_Resume.pdf"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full flex items-center justify-center gap-2 px-4 py-3 text-xs font-semibold rounded-xl text-white bg-accent-gradient shadow-accent-glow"
                >
                  <FiFileText className="w-4 h-4" />
                  <span>Download Resume</span>
                </a>

                <p className="text-[11px] text-center text-text-light-muted dark:text-text-dark-muted">
                  {profile.location} • {profile.email}
                </p>
              </div>
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </>
  );
}
