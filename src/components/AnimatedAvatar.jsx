import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import {
  FiCode,
  FiTerminal,
  FiCpu,
  FiZap,
  FiServer,
  FiActivity,
  FiShield,
  FiLayers,
} from 'react-icons/fi';
import { FaJava, FaAws, FaDocker, FaPython } from 'react-icons/fa';
import { SiSpringboot, SiPostgresql, SiKubernetes } from 'react-icons/si';

const codeSnippets = [
  { line: '@SpringBootApplication', color: 'text-purple-400' },
  { line: 'public class EnterpriseApiApplication {', color: 'text-indigo-300' },
  { line: '  @Autowired', color: 'text-cyan-400' },
  { line: '  private EtaPredictionService etaService;', color: 'text-slate-300' },
  { line: '  ', color: 'text-slate-500' },
  { line: '  @PostMapping("/api/v1/stream-upload")', color: 'text-emerald-400' },
  { line: '  public Mono<ResponseEntity<StreamResult>> upload() {', color: 'text-sky-300' },
  { line: '    // 70% Latency Optimization via Compression', color: 'text-slate-500 italic' },
  { line: '    return etaService.predictAndStream(GBDT_MODEL);', color: 'text-amber-300' },
  { line: '  }', color: 'text-indigo-300' },
  { line: '}', color: 'text-indigo-300' },
];

export default function AnimatedAvatar({ size = 'large' }) {
  const [activeLine, setActiveLine] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActiveLine((prev) => (prev + 1) % codeSnippets.length);
    }, 1800);
    return () => clearInterval(interval);
  }, []);

  const floatingBadges = [
    {
      icon: FaJava,
      label: 'Java 17+',
      color: 'text-red-400',
      bgColor: 'bg-red-500/10 border-red-500/30',
      position: '-top-4 -left-4 sm:-top-6 sm:-left-6',
      animateY: [0, -10, 0],
      duration: 4,
    },
    {
      icon: SiSpringboot,
      label: 'Spring Boot 3',
      color: 'text-emerald-400',
      bgColor: 'bg-emerald-500/10 border-emerald-500/30',
      position: '-top-4 -right-4 sm:-top-5 sm:-right-6',
      animateY: [0, 10, 0],
      duration: 4.5,
    },
    {
      icon: FaAws,
      label: 'AWS Cloud',
      color: 'text-amber-400',
      bgColor: 'bg-amber-500/10 border-amber-500/30',
      position: '-bottom-4 -right-4 sm:-bottom-6 sm:-right-6',
      animateY: [0, -8, 0],
      duration: 5,
    },
    {
      icon: SiPostgresql,
      label: 'PostgreSQL',
      color: 'text-sky-400',
      bgColor: 'bg-sky-500/10 border-sky-500/30',
      position: '-bottom-4 -left-4 sm:-bottom-6 sm:-left-6',
      animateY: [0, 8, 0],
      duration: 4.2,
    },
  ];

  return (
    <div className="relative w-full aspect-square max-w-[340px] sm:max-w-[420px] mx-auto flex items-center justify-center p-4">
      {/* 1. Outer Radial Pulse Orbs */}
      <motion.div
        animate={{ scale: [1, 1.15, 1], opacity: [0.3, 0.6, 0.3] }}
        transition={{ repeat: Infinity, duration: 6, ease: 'easeInOut' }}
        className="absolute inset-0 bg-gradient-to-tr from-indigo-600/30 via-purple-600/20 to-cyan-500/30 rounded-full blur-3xl pointer-events-none"
      />

      {/* 2. Rotating Tech Ring Orbit */}
      <motion.div
        animate={{ rotate: 360 }}
        transition={{ repeat: Infinity, duration: 25, ease: 'linear' }}
        className="absolute inset-2 rounded-full border border-dashed border-indigo-500/30 pointer-events-none"
      />

      <motion.div
        animate={{ rotate: -360 }}
        transition={{ repeat: Infinity, duration: 35, ease: 'linear' }}
        className="absolute inset-8 rounded-full border border-dotted border-cyan-500/30 pointer-events-none"
      />

      {/* 3. Central Interactive Developer Terminal Card */}
      <motion.div
        whileHover={{ scale: 1.02, rotateY: 4, rotateX: -4 }}
        transition={{ type: 'spring', stiffness: 300, damping: 20 }}
        className="relative w-full h-full rounded-3xl p-1 bg-gradient-to-b from-indigo-500/40 via-purple-500/20 to-cyan-500/40 shadow-[0_0_50px_rgba(99,102,241,0.25)] flex flex-col justify-between overflow-hidden"
      >
        <div className="relative w-full h-full rounded-[1.4rem] bg-slate-950/90 backdrop-blur-xl border border-white/10 p-5 flex flex-col justify-between overflow-hidden">
          {/* Top Terminal Bar */}
          <div className="flex items-center justify-between pb-3 border-b border-white/10">
            <div className="flex items-center gap-2">
              <span className="w-3 h-3 rounded-full bg-rose-500/80" />
              <span className="w-3 h-3 rounded-full bg-amber-500/80" />
              <span className="w-3 h-3 rounded-full bg-emerald-500/80" />
              <div className="ml-2 flex items-center gap-1.5 text-[11px] font-mono text-slate-400">
                <FiTerminal className="w-3.5 h-3.5 text-cyan-400" />
                <span>anurag-goyal-core.java</span>
              </div>
            </div>

            <div className="flex items-center gap-1.5 px-2 py-0.5 rounded-full bg-emerald-500/10 text-emerald-400 text-[10px] font-mono border border-emerald-500/20">
              <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span>ACTIVE</span>
            </div>
          </div>

          {/* Central Live Code Window */}
          <div className="my-4 font-mono text-[11px] sm:text-xs leading-relaxed space-y-1 overflow-hidden select-none">
            {codeSnippets.map((snippet, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0.4 }}
                animate={{
                  opacity: idx <= activeLine ? 1 : 0.35,
                  x: idx === activeLine ? 4 : 0,
                }}
                transition={{ duration: 0.3 }}
                className={`flex items-center gap-2 ${snippet.color}`}
              >
                <span className="w-4 text-[10px] text-slate-600 shrink-0 text-right">
                  {idx + 1}
                </span>
                <span className="truncate">{snippet.line}</span>
                {idx === activeLine && (
                  <span className="w-1.5 h-3.5 bg-cyan-400 animate-pulse shrink-0" />
                )}
              </motion.div>
            ))}
          </div>

          {/* Bottom Metric Status Bar */}
          <div className="pt-3 border-t border-white/10 flex items-center justify-between text-[11px] font-mono">
            <div className="flex items-center gap-1.5 text-cyan-400">
              <FiZap className="w-3.5 h-3.5" />
              <span>-70% Latency</span>
            </div>
            <div className="flex items-center gap-1.5 text-purple-400">
              <FiShield className="w-3.5 h-3.5" />
              <span>30+ APIs Secured</span>
            </div>
          </div>
        </div>
      </motion.div>

      {/* 4. Floating Tech Badges */}
      {floatingBadges.map((badge, idx) => {
        const Icon = badge.icon;
        return (
          <motion.div
            key={idx}
            animate={{ y: badge.animateY }}
            transition={{
              repeat: Infinity,
              duration: badge.duration,
              ease: 'easeInOut',
            }}
            className={`absolute ${badge.position} px-3 py-1.5 rounded-2xl ${badge.bgColor} backdrop-blur-md border shadow-xl flex items-center gap-2 z-20 pointer-events-none`}
          >
            <Icon className={`w-4 h-4 ${badge.color}`} />
            <span className="text-xs font-heading font-bold text-text-light dark:text-text-dark whitespace-nowrap">
              {badge.label}
            </span>
          </motion.div>
        );
      })}
    </div>
  );
}
