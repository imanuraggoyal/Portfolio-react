import { FiSun, FiMoon } from 'react-icons/fi';

export default function ThemeToggle({ theme, toggleTheme, className = '' }) {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={toggleTheme}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} mode`}
      className={`p-2.5 rounded-xl border transition-all duration-200 
        bg-bg-light-card border-border-light text-text-light hover:border-accent hover:text-accent shadow-sm
        dark:bg-bg-dark-card dark:border-border-dark dark:text-text-dark dark:hover:border-accent dark:hover:text-accent dark:shadow-none
        focus:outline-none focus:ring-2 focus:ring-accent/50 ${className}`}
    >
      {isDark ? (
        <FiSun className="w-5 h-5 text-amber-400 transition-transform duration-300 hover:rotate-45" />
      ) : (
        <FiMoon className="w-5 h-5 text-accent-dark transition-transform duration-300 hover:-rotate-12" />
      )}
    </button>
  );
}
