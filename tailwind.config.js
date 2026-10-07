/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        accent: {
          light: '#38bdf8',      // sky-400
          DEFAULT: '#6366f1',    // indigo-500
          hover: '#4f46e5',      // indigo-600
          dark: '#4338ca',       // indigo-700
          purple: '#a855f7',     // purple-500
          cyan: '#06b6d4',       // cyan-500
          subtle: 'rgba(99, 102, 241, 0.12)',
        },
        bg: {
          dark: '#030712',       // Deepest dark space background
          'dark-card': 'rgba(15, 23, 42, 0.75)',
          'dark-elevated': '#0f172a',
          light: '#f8fafc',
          'light-card': 'rgba(255, 255, 255, 0.85)',
          'light-elevated': '#ffffff',
        },
        text: {
          dark: '#f8fafc',
          'dark-muted': '#94a3b8',
          light: '#0f172a',
          'light-muted': '#64748b',
        },
        border: {
          dark: '#1e293b',
          'dark-subtle': '#334155',
          light: '#e2e8f0',
        },
      },
      fontFamily: {
        sans: ['"Inter"', 'system-ui', '-apple-system', 'sans-serif'],
        heading: ['"Outfit"', 'system-ui', '-apple-system', 'sans-serif'],
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'accent-gradient': 'linear-gradient(135deg, #6366f1 0%, #a855f7 50%, #06b6d4 100%)',
        'accent-gradient-hover': 'linear-gradient(135deg, #4f46e5 0%, #9333ea 50%, #0891b2 100%)',
        'glass-gradient': 'linear-gradient(135deg, rgba(255, 255, 255, 0.05) 0%, rgba(255, 255, 255, 0.01) 100%)',
      },
      boxShadow: {
        'accent-glow': '0 0 30px -5px rgba(99, 102, 241, 0.4)',
        'cyan-glow': '0 0 30px -5px rgba(6, 182, 212, 0.4)',
        'purple-glow': '0 0 30px -5px rgba(168, 85, 247, 0.4)',
      },
      animation: {
        'pulse-slow': 'pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'float': 'float 6s ease-in-out infinite',
        'gradient-shift': 'gradientShift 8s ease infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-12px)' },
        },
        gradientShift: {
          '0%, 100%': { 'background-size': '200% 200%', 'background-position': 'left center' },
          '50%': { 'background-size': '200% 200%', 'background-position': 'right center' },
        },
      },
    },
  },
  plugins: [],
};

