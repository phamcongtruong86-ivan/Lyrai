import { motion } from 'motion/react';
import { X } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface FirstTimeMapTooltipProps {
  onDismiss: () => void;
  targetPosition?: { x: number; y: number };
}

export function FirstTimeMapTooltip({ onDismiss, targetPosition }: FirstTimeMapTooltipProps) {
  const { isDark } = useTheme();
  // Default position - center of screen, pointing down
  const defaultX = typeof window !== 'undefined' ? window.innerWidth / 2 : 0;
  const defaultY = typeof window !== 'undefined' ? window.innerHeight / 3 : 0;
  
  const x = targetPosition?.x ?? defaultX;
  const y = targetPosition?.y ?? defaultY;

  return (
    <>
      {/* Backdrop overlay */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/40 backdrop-blur-sm z-[100]"
        onClick={onDismiss}
      />

      {/* Tooltip */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9, y: -20 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        exit={{ opacity: 0, scale: 0.9, y: -20 }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        className="fixed z-[101]"
        style={{
          left: `${x}px`,
          top: `${y}px`,
          transform: 'translate(-50%, -100%)',
        }}
      >
        <div className="relative">
          {/* Tooltip content */}
          <div className={`backdrop-blur-xl border rounded-2xl shadow-2xl p-4 min-w-[280px] ${isDark ? 'bg-slate-900/95 border-slate-700/80' : 'bg-white/95 border-slate-200'}`}>
            {/* Header with close button */}
            <div className="flex items-start justify-between mb-3">
              <h4 className={`text-sm font-bold ${isDark ? 'text-white' : 'text-slate-900'}`}>
                Chú thích bản đồ 📍
              </h4>
              <button
                onClick={onDismiss}
                className={`transition-colors -mt-1 -mr-1 p-1 ${isDark ? 'text-slate-400 hover:text-white' : 'text-slate-400 hover:text-slate-700'}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            {/* Legend items */}
            <div className="space-y-2.5">
              {/* Saved places */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #FF6F4C, #FF8C42)',
                    boxShadow: '0 0 16px rgba(255, 111, 76, 0.6)'
                  }}
                />
                <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Cam = Đã lưu
                </span>
              </div>

              {/* Suggested places */}
              <div className="flex items-center gap-3">
                <div 
                  className="w-4 h-4 rounded-full bg-slate-500/60 border border-slate-400/40 flex-shrink-0"
                  style={{
                    boxShadow: '0 0 12px rgba(148, 163, 184, 0.4)'
                  }}
                />
                <span className={`text-sm font-medium ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                  Xám = Gợi ý mới
                </span>
              </div>
            </div>

            {/* Dismiss button */}
            <button
              onClick={onDismiss}
              className="w-full mt-4 py-2.5 bg-gradient-to-r from-[#FF6F4C] to-[#FF8C42] text-white text-sm font-semibold rounded-xl hover:shadow-lg hover:shadow-[#FF6F4C]/30 transition-all active:scale-95"
            >
              Đã hiểu ✓
            </button>
          </div>

          {/* Arrow pointing down to marker */}
          <div 
            className="absolute left-1/2 -translate-x-1/2 -bottom-3 w-0 h-0"
            style={{
              borderLeft: '12px solid transparent',
              borderRight: '12px solid transparent',
              borderTop: isDark ? '12px solid rgba(15, 23, 42, 0.95)' : '12px solid rgba(255, 255, 255, 0.95)',
              filter: 'drop-shadow(0 4px 6px rgba(0, 0, 0, 0.3))'
            }}
          />
        </div>
      </motion.div>

      {/* Pulse ring around target marker */}
      {targetPosition && (
        <motion.div
          className="fixed z-[99] pointer-events-none"
          style={{
            left: `${targetPosition.x}px`,
            top: `${targetPosition.y}px`,
            transform: 'translate(-50%, -50%)',
          }}
          animate={{
            scale: [1, 1.8, 1],
            opacity: [0.6, 0, 0.6],
          }}
          transition={{
            duration: 2,
            repeat: Infinity,
            ease: 'easeOut',
          }}
        >
          <div 
            className="w-16 h-16 rounded-full border-4 border-[#FF6F4C]"
            style={{
              boxShadow: '0 0 30px rgba(255, 111, 76, 0.8)'
            }}
          />
        </motion.div>
      )}
    </>
  );
}