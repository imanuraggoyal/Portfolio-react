import { motion } from 'framer-motion';
import {
  FiGrid,
  FiCode,
  FiZap,
  FiShield,
  FiCloud,
  FiArrowRight,
  FiCheckCircle,
} from 'react-icons/fi';
import { services } from '../data/portfolio';
import Reveal from './Reveal';

// Dynamic icon resolver for services
function getServiceIcon(title) {
  const normalized = title.toLowerCase();
  if (normalized.includes('microservice')) return <FiGrid className="w-6 h-6 text-accent" />;
  if (normalized.includes('full-stack') || normalized.includes('web')) return <FiCode className="w-6 h-6 text-blue-400" />;
  if (normalized.includes('performance') || normalized.includes('latency')) return <FiZap className="w-6 h-6 text-amber-400" />;
  if (normalized.includes('security') || normalized.includes('rbac')) return <FiShield className="w-6 h-6 text-emerald-400" />;
  if (normalized.includes('devops') || normalized.includes('cloud')) return <FiCloud className="w-6 h-6 text-sky-400" />;
  return <FiCheckCircle className="w-6 h-6 text-accent" />;
}

export default function Services() {
  // If the data array is empty, render nothing
  if (!services || services.length === 0) {
    return null;
  }

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
      {services.map((service, index) => {
        const itemNumber = String(index + 1).padStart(2, '0');

        return (
          <Reveal key={index} direction="up" delay={index * 0.1}>
            <motion.div
              whileHover={{ y: -6 }}
              transition={{ duration: 0.25 }}
              className="h-full p-7 rounded-3xl bg-bg-light-card dark:bg-bg-dark-card border border-border-light dark:border-border-dark shadow-sm hover:shadow-2xl hover:border-accent/40 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden"
            >
              {/* Subtle Ambient Hover Glow */}
              <div
                className="absolute -top-16 -right-16 w-32 h-32 rounded-full bg-accent/10 dark:bg-accent/15 blur-2xl group-hover:scale-150 transition-transform duration-500 pointer-events-none"
                aria-hidden="true"
              />

              <div>
                {/* Header: Icon & Step Number */}
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 rounded-2xl bg-accent-subtle flex items-center justify-center shadow-inner group-hover:scale-110 transition-transform duration-300">
                    {getServiceIcon(service.title)}
                  </div>
                  <span className="font-heading font-extrabold text-2xl text-text-light-muted/30 dark:text-text-dark-muted/30 group-hover:text-accent/40 transition-colors">
                    {itemNumber}
                  </span>
                </div>

                {/* Service Title */}
                <h3 className="font-heading font-bold text-xl text-text-light dark:text-text-dark group-hover:text-accent transition-colors tracking-tight">
                  {service.title}
                </h3>

                {/* Service Description */}
                <p className="mt-3 text-sm text-text-light-muted dark:text-text-dark-muted leading-relaxed">
                  {service.description}
                </p>
              </div>

              {/* Card Footer: Enterprise Tag */}
              <div className="mt-6 pt-4 border-t border-border-light/60 dark:border-border-dark/60 flex items-center justify-between text-xs text-text-light-muted dark:text-text-dark-muted">
                <span className="font-mono text-[11px] tracking-wider uppercase">
                  Production Proven
                </span>
                <FiArrowRight className="w-4 h-4 text-accent opacity-0 group-hover:opacity-100 group-hover:translate-x-1 transition-all duration-200" />
              </div>
            </motion.div>
          </Reveal>
        );
      })}
    </div>
  );
}
