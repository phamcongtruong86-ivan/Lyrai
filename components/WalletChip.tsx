import { motion } from 'motion/react';
import { useTheme } from './ThemeProvider';

interface WalletChipProps {
  credits: number;
  onClick?: () => void;
  className?: string;
}

export function WalletChip({ credits, onClick, className = '' }: WalletChipProps) {
  const { isDark } = useTheme();
  const isLowBalance = credits <= 2;

  return (
    <div className="relative inline-block">
      {/* Green Dot - Top Right */}
      <div 
        className={`absolute -top-0.5 -right-0.5 z-10 w-2.5 h-2.5 bg-green-400 rounded-full border-2 shadow-sm ${
          isDark ? 'border-[#0F1419]' : 'border-white'
        }`}
        style={{
          boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)'
        }}
      />
      
      {/* Wallet Button */}
      <motion.button
        onClick={onClick}
        className={`
          relative flex items-center gap-2 px-3 py-1.5 rounded-full 
          backdrop-blur-sm
          shadow-lg active:scale-95 transition-all
          hover:shadow-xl
          ${isLowBalance ? 'animate-pulse' : ''}
          ${isDark ? 'bg-slate-800/90' : 'bg-white/90'}
          ${className}
        `}
        style={{
          border: '1px solid rgba(255, 182, 39, 0.4)',
          boxShadow: isDark 
            ? '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 182, 39, 0.15)'
            : '0 4px 12px rgba(0, 0, 0, 0.1), 0 0 20px rgba(255, 182, 39, 0.15)'
        }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: isDark
            ? '0 6px 16px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 182, 39, 0.25)'
            : '0 6px 16px rgba(0, 0, 0, 0.15), 0 0 30px rgba(255, 182, 39, 0.25)'
        }}
      >
        {/* Lightning Icon */}
        <span className="text-amber-400 text-sm">⚡</span>
        
        {/* Credit Amount */}
        <motion.span 
          key={credits}
          initial={{ scale: 1.2 }}
          animate={{ scale: 1 }}
          className={`
            text-sm font-semibold
            ${isLowBalance ? 'text-red-400' : isDark ? 'text-slate-200' : 'text-slate-700'}
          `}
        >
          {credits}
        </motion.span>
      </motion.button>
    </div>
  );
}
