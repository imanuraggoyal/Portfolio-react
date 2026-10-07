import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import {
  FiMail,
  FiPhone,
  FiMapPin,
  FiCopy,
  FiCheck,
  FiSend,
  FiGithub,
  FiLinkedin,
  FiArrowUpRight,
} from 'react-icons/fi';
import { profile } from '../data/portfolio';

export default function Contact() {
  const [copiedField, setCopiedField] = useState(null);
  const [formState, setFormState] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);

  const handleCopy = (text, fieldName) => {
    navigator.clipboard.writeText(text);
    setCopiedField(fieldName);
    setTimeout(() => setCopiedField(null), 2500);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const accessKey =
      import.meta.env.VITE_WEB3FORMS_ACCESS_KEY ||
      profile.web3formsAccessKey ||
      'a14f7263-14c6-443b-a7b6-cbb42069b24c';

    try {
      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          access_key: accessKey,
          name: formState.name,
          email: formState.email,
          subject: formState.subject || `Portfolio Inquiry from ${formState.name}`,
          message: formState.message,
        }),
      });

      const data = await response.json();
      if (data.success) {
        setSubmitted(true);
        setFormState({ name: '', email: '', subject: '', message: '' });
        setTimeout(() => setSubmitted(false), 5000);
      } else {
        alert(data.message || 'Form submission failed. Please try again.');
      }
    } catch (err) {
      console.error('Web3Forms submission error:', err);
      alert('Failed to submit form. Please check your network connection.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const contactItems = [
    {
      id: 'email',
      icon: FiMail,
      label: 'Email Address',
      value: profile.email,
      href: profile.socialLinks.email,
    },
    {
      id: 'phone',
      icon: FiPhone,
      label: 'Phone Number',
      value: profile.phone,
      href: profile.socialLinks.phone,
    },
    {
      id: 'location',
      icon: FiMapPin,
      label: 'Location',
      value: profile.location,
      href: '#',
    },
  ];

  return (
    <section id="contact" className="relative py-24 sm:py-32 overflow-hidden">
      {/* Background glow orb */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-gradient-to-tr from-indigo-600/15 via-purple-600/10 to-cyan-500/10 blur-[130px] rounded-full pointer-events-none" />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center max-w-3xl mx-auto mb-16">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-accent-subtle border border-accent/20 text-accent text-xs font-mono tracking-wider uppercase mb-4"
          >
            <span>Get In Touch</span>
          </motion.div>

          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="font-heading font-extrabold text-3xl sm:text-4xl lg:text-5xl tracking-tight text-text-light dark:text-text-dark"
          >
            Let’s Build Something <span className="text-gradient">Extraordinary</span>
          </motion.h2>

          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, delay: 0.2 }}
            className="mt-4 text-base sm:text-lg text-text-light-muted dark:text-text-dark-muted"
          >
            Whether you have an upcoming project, enterprise inquiry, or simply want to connect, feel free to drop a message or reach out directly.
          </motion.p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Direct Contact Info & Socials */}
          <motion.div
            initial={{ opacity: 0, x: -30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="lg:col-span-5 space-y-6"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 space-y-6 relative overflow-hidden">
              <div className="absolute top-0 right-0 w-32 h-32 bg-indigo-500/10 rounded-full blur-2xl pointer-events-none" />

              <h3 className="font-heading font-bold text-xl text-text-light dark:text-text-dark">
                Contact Details
              </h3>

              <div className="space-y-4">
                {contactItems.map((item) => {
                  const Icon = item.icon;
                  const isCopied = copiedField === item.id;

                  return (
                    <div
                      key={item.id}
                      className="group p-4 rounded-xl bg-bg-light-elevated/50 dark:bg-bg-dark/50 border border-border-light dark:border-border-dark/60 hover:border-indigo-500/40 transition-all duration-300 flex items-center justify-between gap-4"
                    >
                      <div className="flex items-center gap-3.5 min-w-0">
                        <div className="w-10 h-10 rounded-xl bg-accent-subtle flex items-center justify-center text-accent shrink-0 group-hover:scale-110 transition-transform">
                          <Icon className="w-5 h-5" />
                        </div>
                        <div className="min-w-0">
                          <p className="text-[11px] uppercase font-mono tracking-wider text-text-light-muted dark:text-text-dark-muted">
                            {item.label}
                          </p>
                          <a
                            href={item.href}
                            className="font-medium text-sm text-text-light dark:text-text-dark hover:text-accent transition-colors truncate block"
                          >
                            {item.value}
                          </a>
                        </div>
                      </div>

                      {item.id !== 'location' && (
                        <button
                          type="button"
                          onClick={() => handleCopy(item.value, item.id)}
                          className="p-2 rounded-lg hover:bg-indigo-500/10 text-text-light-muted dark:text-text-dark-muted hover:text-accent transition-colors shrink-0"
                          title={`Copy ${item.label}`}
                          aria-label={`Copy ${item.label}`}
                        >
                          {isCopied ? (
                            <FiCheck className="w-4 h-4 text-emerald-400" />
                          ) : (
                            <FiCopy className="w-4 h-4" />
                          )}
                        </button>
                      )}
                    </div>
                  );
                })}
              </div>

              {/* Social Connect */}
              <div className="pt-4 border-t border-border-light dark:border-border-dark/60">
                <p className="text-xs uppercase font-mono tracking-wider text-text-light-muted dark:text-text-dark-muted mb-3">
                  Connect on Platforms
                </p>
                <div className="flex flex-wrap gap-3">
                  <a
                    href={profile.socialLinks.github}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-light-elevated dark:bg-bg-dark/80 border border-border-light dark:border-border-dark hover:border-indigo-500/40 text-text-light dark:text-text-dark hover:text-accent text-xs font-semibold transition-all group"
                  >
                    <FiGithub className="w-4 h-4" />
                    <span>GitHub</span>
                    <FiArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>

                  <a
                    href={profile.socialLinks.linkedin}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 px-4 py-2.5 rounded-xl bg-bg-light-elevated dark:bg-bg-dark/80 border border-border-light dark:border-border-dark hover:border-indigo-500/40 text-text-light dark:text-text-dark hover:text-accent text-xs font-semibold transition-all group"
                  >
                    <FiLinkedin className="w-4 h-4" />
                    <span>LinkedIn</span>
                    <FiArrowUpRight className="w-3.5 h-3.5 opacity-60 group-hover:opacity-100 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all" />
                  </a>
                </div>
              </div>
            </div>
          </motion.div>

          {/* Right Column: Interactive Form */}
          <motion.div
            initial={{ opacity: 0, x: 30 }}
            whileInView={{ opacity: 1, x: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-7"
          >
            <div className="glass-card rounded-2xl p-6 sm:p-8 relative">
              <h3 className="font-heading font-bold text-xl text-text-light dark:text-text-dark mb-6">
                Send a Direct Message
              </h3>

              <form onSubmit={handleSubmit} className="space-y-4">
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                  <div>
                    <label className="block text-xs font-medium text-text-light-muted dark:text-text-dark-muted mb-1.5">
                      Your Name
                    </label>
                    <input
                      type="text"
                      required
                      value={formState.name}
                      onChange={(e) =>
                        setFormState({ ...formState, name: e.target.value })
                      }
                      placeholder="Anurag Goyal"
                      className="w-full px-4 py-3 rounded-xl bg-bg-light-elevated/70 dark:bg-bg-dark/70 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-text-light-muted/50 dark:placeholder:text-text-dark-muted/40"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-text-light-muted dark:text-text-dark-muted mb-1.5">
                      Your Email
                    </label>
                    <input
                      type="email"
                      required
                      value={formState.email}
                      onChange={(e) =>
                        setFormState({ ...formState, email: e.target.value })
                      }
                      placeholder="name@example.com"
                      className="w-full px-4 py-3 rounded-xl bg-bg-light-elevated/70 dark:bg-bg-dark/70 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-text-light-muted/50 dark:placeholder:text-text-dark-muted/40"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-light-muted dark:text-text-dark-muted mb-1.5">
                    Subject
                  </label>
                  <input
                    type="text"
                    required
                    value={formState.subject}
                    onChange={(e) =>
                      setFormState({ ...formState, subject: e.target.value })
                    }
                    placeholder="Project Inquiry / Enterprise Role"
                    className="w-full px-4 py-3 rounded-xl bg-bg-light-elevated/70 dark:bg-bg-dark/70 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-text-light-muted/50 dark:placeholder:text-text-dark-muted/40"
                  />
                </div>

                <div>
                  <label className="block text-xs font-medium text-text-light-muted dark:text-text-dark-muted mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows="5"
                    required
                    value={formState.message}
                    onChange={(e) =>
                      setFormState({ ...formState, message: e.target.value })
                    }
                    placeholder="Tell me about your project goals or how I can help..."
                    className="w-full px-4 py-3 rounded-xl bg-bg-light-elevated/70 dark:bg-bg-dark/70 border border-border-light dark:border-border-dark text-text-light dark:text-text-dark text-sm focus:outline-none focus:border-indigo-500 focus:ring-1 focus:ring-indigo-500 transition-all placeholder:text-text-light-muted/50 dark:placeholder:text-text-dark-muted/40 resize-none"
                  />
                </div>

                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-3.5 px-6 rounded-xl bg-accent-gradient hover:bg-accent-gradient-hover text-white text-sm font-semibold shadow-accent-glow flex items-center justify-center gap-2 transition-all duration-300 hover:-translate-y-0.5 active:translate-y-0 disabled:opacity-70"
                >
                  {isSubmitting ? (
                    <span>Sending Message...</span>
                  ) : (
                    <>
                      <FiSend className="w-4 h-4" />
                      <span>Send Message</span>
                    </>
                  )}
                </button>

                <AnimatePresence>
                  {submitted && (
                    <motion.div
                      initial={{ opacity: 0, y: 10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="p-3 rounded-xl bg-emerald-500/10 border border-emerald-500/30 text-emerald-400 text-xs text-center font-medium"
                    >
                      Thank you! Your message has been sent successfully.
                    </motion.div>
                  )}
                </AnimatePresence>
              </form>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
