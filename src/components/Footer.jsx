import React from 'react';
import { FiGithub, FiLinkedin, FiMail, FiPhone, FiArrowUp } from 'react-icons/fi';
import { profile } from '../data/portfolio';

export default function Footer() {
  const scrollToTop = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const initials = profile.name
    ? profile.name
        .split(' ')
        .map((n) => n[0])
        .join('')
        .slice(0, 2)
        .toUpperCase()
    : 'AG';

  return (
    <footer className="relative border-t border-border-light dark:border-border-dark bg-bg-light/60 dark:bg-bg-dark/80 backdrop-blur-md pt-16 pb-12 overflow-hidden">
      {/* Background radial gradient glow */}
      <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-[500px] h-[250px] bg-indigo-500/5 blur-[120px] pointer-events-none rounded-full" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 md:grid-cols-12 gap-10 pb-12 border-b border-border-light/60 dark:border-border-dark/60 items-center">
          {/* Brand & Monogram (5 cols) */}
          <div className="md:col-span-6 space-y-4">
            <div className="flex items-center gap-3">
              <span className="w-9 h-9 rounded-xl bg-accent-gradient flex items-center justify-center text-white font-heading font-bold text-sm shadow-accent-glow">
                {initials}
              </span>
              <span className="font-heading font-extrabold text-xl text-text-light dark:text-text-dark tracking-tight">
                {profile.name}
              </span>
            </div>

            <p className="text-sm text-text-light-muted dark:text-text-dark-muted max-w-md leading-relaxed">
              Senior Software Engineer architecting enterprise Java, Spring Boot microservices, high-throughput streaming APIs, and cloud-native solutions.
            </p>
          </div>

          {/* Quick Links & Social Icons (6 cols) */}
          <div className="md:col-span-6 flex flex-col sm:flex-row items-start sm:items-center justify-between md:justify-end gap-6">
            <div className="flex flex-wrap gap-4 text-xs font-semibold text-text-light-muted dark:text-text-dark-muted">
              <a href="#home" className="hover:text-accent transition-colors">Home</a>
              <a href="#about" className="hover:text-accent transition-colors">About</a>
              <a href="#services" className="hover:text-accent transition-colors">Services</a>
              <a href="#skills" className="hover:text-accent transition-colors">Skills</a>
              <a href="#experience" className="hover:text-accent transition-colors">Experience</a>
              <a href="#projects" className="hover:text-accent transition-colors">Projects</a>
              <a href="#contact" className="hover:text-accent transition-colors">Contact</a>
            </div>

            <div className="flex items-center gap-2">
              <a
                href={profile.socialLinks.github}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border-light dark:border-border-dark bg-bg-light-card dark:bg-bg-dark-card text-text-light-muted dark:text-text-dark-muted hover:text-accent hover:border-accent transition-all"
                aria-label="GitHub"
              >
                <FiGithub className="w-4 h-4" />
              </a>

              <a
                href={profile.socialLinks.linkedin}
                target="_blank"
                rel="noopener noreferrer"
                className="p-2.5 rounded-xl border border-border-light dark:border-border-dark bg-bg-light-card dark:bg-bg-dark-card text-text-light-muted dark:text-text-dark-muted hover:text-accent hover:border-accent transition-all"
                aria-label="LinkedIn"
              >
                <FiLinkedin className="w-4 h-4" />
              </a>

              <a
                href={profile.socialLinks.email}
                className="p-2.5 rounded-xl border border-border-light dark:border-border-dark bg-bg-light-card dark:bg-bg-dark-card text-text-light-muted dark:text-text-dark-muted hover:text-accent hover:border-accent transition-all"
                aria-label="Email"
              >
                <FiMail className="w-4 h-4" />
              </a>

              <a
                href={profile.socialLinks.phone}
                className="p-2.5 rounded-xl border border-border-light dark:border-border-dark bg-bg-light-card dark:bg-bg-dark-card text-text-light-muted dark:text-text-dark-muted hover:text-accent hover:border-accent transition-all"
                aria-label="Phone"
              >
                <FiPhone className="w-4 h-4" />
              </a>
            </div>
          </div>
        </div>

        {/* Bottom copyright & scroll-to-top button */}
        <div className="pt-8 flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-text-light-muted dark:text-text-dark-muted">
          <p>&copy; {new Date().getFullYear()} {profile.name}. All rights reserved.</p>

          <button
            type="button"
            onClick={scrollToTop}
            className="group flex items-center gap-2 px-3 py-1.5 rounded-xl border border-border-light dark:border-border-dark bg-bg-light-card dark:bg-bg-dark-card hover:border-accent text-text-light dark:text-text-dark transition-all cursor-pointer"
          >
            <span>Back to top</span>
            <FiArrowUp className="w-3.5 h-3.5 text-accent group-hover:-translate-y-0.5 transition-transform" />
          </button>
        </div>
      </div>
    </footer>
  );
}
