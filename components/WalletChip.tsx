import { motion } from 'motion/react';

interface WalletChipProps {
  credits: number;
  onClick?: () => void;
  className?: string;
}

export function WalletChip({ credits, onClick, className = '' }: WalletChipProps) {
  const isLowBalance = credits <= 2;

  return (
    <div className="relative inline-block">
      {/* Green Dot - Top Right */}
      <div 
        className="absolute -top-0.5 -right-0.5 z-10 w-2.5 h-2.5 bg-green-400 rounded-full border-2 border-[#0F1419] shadow-sm"
        style={{
          boxShadow: '0 0 8px rgba(74, 222, 128, 0.6)'
        }}
      />
      
      {/* Wallet Button */}
      <motion.button
        onClick={onClick}
        className={`
          relative flex items-center gap-2 px-3 py-1.5 rounded-full 
          bg-slate-800/90 backdrop-blur-sm
          shadow-lg active:scale-95 transition-all
          hover:shadow-xl
          ${isLowBalance ? 'animate-pulse' : ''}
          ${className}
        `}
        style={{
          border: '1px solid rgba(255, 182, 39, 0.4)',
          boxShadow: '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 20px rgba(255, 182, 39, 0.15)'
        }}
        whileTap={{ scale: 0.95 }}
        whileHover={{ 
          scale: 1.05,
          boxShadow: '0 6px 16px rgba(0, 0, 0, 0.4), 0 0 30px rgba(255, 182, 39, 0.25)'
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
            ${isLowBalance ? 'text-red-400' : 'text-slate-200'}
          `}
        >
          {credits}
        </motion.span>
      </motion.button>
    </div>
  );
}