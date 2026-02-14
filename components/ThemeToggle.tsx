import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';

interface ThemeToggleProps {
  className?: string;
  size?: 'sm' | 'md';
}

export function ThemeToggle({ className = '', size = 'md' }: ThemeToggleProps) {
  const { isDark, toggleTheme } = useTheme();

  const isSmall = size === 'sm';
  const trackW = isSmall ? 'w-12' : 'w-14';
  const trackH = isSmall ? 'h-6' : 'h-7';
  const thumbSize = isSmall ? 'w-5 h-5' : 'w-6 h-6';
  const translateX = isSmall ? 24 : 28;

  return (
    <button
      onClick={toggleTheme}
      className={`relative ${trackW} ${trackH} rounded-full transition-colors duration-300 focus:outline-none ${
        isDark
          ? 'bg-slate-700 border border-slate-600'
          : 'bg-amber-100 border border-amber-200'
      } ${className}`}
      aria-label={isDark ? 'Chuyển sang sáng' : 'Chuyển sang tối'}
    >
      {/* Track Icons */}
      <div className="absolute inset-0 flex items-center justify-between px-1.5">
        {/* Sun icon (left side, visible in light mode) */}
        <motion.span
          animate={{ opacity: isDark ? 0.3 : 1 }}
          className="text-amber-500"
          style={{ fontSize: isSmall ? '10px' : '12px' }}
        >
          ☀️
        </motion.span>
        {/* Moon icon (right side, visible in dark mode) */}
        <motion.span
          animate={{ opacity: isDark ? 1 : 0.3 }}
          className="text-blue-300"
          style={{ fontSize: isSmall ? '10px' : '12px' }}
        >
          🌙
        </motion.span>
      </div>

      {/* Thumb */}
      <motion.div
        className={`absolute top-0.5 left-0.5 ${thumbSize} rounded-full shadow-md flex items-center justify-center ${
          isDark
            ? 'bg-slate-900'
            : 'bg-white'
        }`}
        animate={{
          x: isDark ? translateX : 0,
        }}
        transition={{ type: 'spring', stiffness: 500, damping: 30 }}
        style={{
          boxShadow: isDark
            ? '0 2px 8px rgba(0,0,0,0.5)'
            : '0 2px 8px rgba(0,0,0,0.15)',
        }}
      >
        <motion.span
          key={isDark ? 'moon' : 'sun'}
          initial={{ scale: 0, rotate: -90 }}
          animate={{ scale: 1, rotate: 0 }}
          exit={{ scale: 0, rotate: 90 }}
          style={{ fontSize: isSmall ? '11px' : '13px' }}
        >
          {isDark ? '🌙' : '☀️'}
        </motion.span>
      </motion.div>
    </button>
  );
}
