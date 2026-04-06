import React from 'react';
import { motion } from 'framer-motion';
import { Moon, Sun } from 'lucide-react';

export type DashboardTheme = 'light' | 'dark';

interface ThemeToggleProps {
  theme: DashboardTheme;
  onToggle: () => void;
}

export const ThemeToggle: React.FC<ThemeToggleProps> = ({ theme, onToggle }) => {
  const isDark = theme === 'dark';

  return (
    <button
      type="button"
      onClick={onToggle}
      aria-label={`Switch to ${isDark ? 'light' : 'dark'} theme`}
      className="group relative flex h-10 w-20 items-center rounded-full border border-stroke-medium bg-card/90 px-1.5 shadow-[0_16px_30px_-20px_rgba(0,0,0,0.45)] backdrop-blur-md transition-colors"
    >
      <motion.span
        initial={false}
        animate={{ x: isDark ? 38 : 0 }}
        transition={{ type: 'spring', stiffness: 420, damping: 26 }}
        className="absolute left-1.5 top-1.5 h-7 w-7 rounded-full bg-(--text-primary) shadow-[0_10px_20px_-12px_rgba(0,0,0,0.6)]"
      />

      <span className="relative z-10 flex w-full items-center justify-between px-0.5">
        <Sun
          size={14}
          strokeWidth={2}
          className={`transition-colors ${isDark ? 'text-(--text-tertiary)' : 'text-canvas'}`}
        />
        <Moon
          size={14}
          strokeWidth={2}
          className={`transition-colors ${isDark ? 'text-canvas' : 'text-(--text-tertiary)'}`}
        />
      </span>
    </button>
  );
};
