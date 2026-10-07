import React from 'react';
import { useTheme } from './hooks/useTheme';
import CustomCursor from './components/CustomCursor';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import About from './components/About';
import Skills from './components/Skills';
import Experience from './components/Experience';
import Projects from './components/Projects';
import Services from './components/Services';
import Contact from './components/Contact';
import Footer from './components/Footer';
import Section from './components/Section';
import { services } from './data/portfolio';

export default function App() {
  const { theme, toggleTheme } = useTheme();

  return (
    <div className="min-h-screen bg-bg-light dark:bg-bg-dark text-text-light dark:text-text-dark transition-colors duration-300 relative selection:bg-indigo-500/30">
      {/* Custom Trailing Spring Cursor */}
      <CustomCursor />

      {/* Floating Glassmorphic Navbar */}
      <Navbar theme={theme} toggleTheme={toggleTheme} />

      {/* Main Page Content */}
      <main className="relative z-10 pt-16">
        {/* 1. Hero Section */}
        <Hero />

        {/* 2. About Section */}
        <Section
          id="about"
          title="About Me"
          subtitle="Engineering philosophy, enterprise history, and impact metrics"
          badge="Background"
        >
          <About />
        </Section>

        {/* 3. Services Section */}
        {services && services.length > 0 && (
          <Section
            id="services"
            title="Services & Capabilities"
            subtitle="Specialized enterprise engineering capabilities delivered with cloud-native precision"
            badge="Offerings"
          >
            <Services />
          </Section>
        )}

        {/* 4. Skills Section */}
        <Section
          id="skills"
          title="Technical Skills"
          subtitle="Enterprise technology stack spanning backend services, cloud platforms, databases, and frontend"
          badge="Expertise"
        >
          <Skills />
        </Section>

        {/* 5. Experience Section */}
        <Section
          id="experience"
          title="Work Experience"
          subtitle="Career trajectory delivering high-performance enterprise applications & microservices"
          badge="Career"
        >
          <Experience />
        </Section>

        {/* 6. Projects Section */}
        <Section
          id="projects"
          title="Featured Projects"
          subtitle="Key systems, AI prediction services, streaming optimizations, and microservices modernizations"
          badge="Portfolio"
        >
          <Projects />
        </Section>

        {/* 7. Contact Section */}
        <Contact />
      </main>

      {/* Footer */}
      <Footer />
    </div>
  );
}
