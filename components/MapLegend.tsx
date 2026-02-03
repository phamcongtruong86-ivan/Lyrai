import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface MapLegendProps {
  defaultState?: 'collapsed' | 'expanded';
  position?: 'bottom-left' | 'bottom-right';
  variant?: 'mobile' | 'desktop'; // New: determines fixed vs absolute positioning
}

export function MapLegend({ 
  defaultState = 'collapsed',
  position = 'bottom-left',
  variant = 'mobile'
}: MapLegendProps) {
  const [isExpanded, setIsExpanded] = useState(defaultState === 'expanded');

  // Different positioning for mobile vs desktop
  const positioningType = variant === 'desktop' ? 'absolute' : 'fixed';
  
  const positionClasses = position === 'bottom-left' 
    ? 'bottom-20 left-4 lg:bottom-8 lg:left-8'
    : 'bottom-20 right-4 lg:bottom-8 lg:right-8';

  return (
    <motion.div
      className={`${positioningType} ${positionClasses} z-30`}
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: 0.5 }}
    >
      <motion.button
        onClick={() => setIsExpanded(!isExpanded)}
        className="backdrop-blur-xl bg-slate-900/80 border border-slate-700/50 rounded-2xl shadow-xl overflow-hidden transition-all"
        animate={{
          width: isExpanded ? '160px' : '56px',
        }}
        transition={{ type: 'spring', damping: 20, stiffness: 300 }}
        whileHover={{ scale: 1.02 }}
        whileTap={{ scale: 0.98 }}
      >
        <div className="p-3">
          <AnimatePresence mode="wait">
            {isExpanded ? (
              <motion.div
                key="expanded"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="space-y-2.5"
              >
                {/* Saved Places */}
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-3 h-3 rounded-full flex-shrink-0"
                    style={{
                      background: 'linear-gradient(135deg, #FF6F4C, #FF8C42)',
                      boxShadow: '0 0 12px rgba(255, 111, 76, 0.5)'
                    }}
                  />
                  <span className="text-xs text-slate-200 font-medium whitespace-nowrap">
                    Đã lưu
                  </span>
                </div>

                {/* Suggested Places */}
                <div className="flex items-center gap-2.5">
                  <div 
                    className="w-3 h-3 rounded-full bg-slate-500/60 border border-slate-400/40 flex-shrink-0"
                    style={{
                      boxShadow: '0 0 8px rgba(148, 163, 184, 0.3)'
                    }}
                  />
                  <span className="text-xs text-slate-200 font-medium whitespace-nowrap">
                    Gợi ý mới
                  </span>
                </div>

                {/* Collapse indicator */}
                <div className="flex justify-center pt-1">
                  <ChevronRight className="w-3 h-3 text-slate-500 rotate-180" />
                </div>
              </motion.div>
            ) : (
              <motion.div
                key="collapsed"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 0.2 }}
                className="flex items-center gap-2"
              >
                {/* Collapsed dots only */}
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #FF6F4C, #FF8C42)',
                    boxShadow: '0 0 8px rgba(255, 111, 76, 0.4)'
                  }}
                />
                <div 
                  className="w-3 h-3 rounded-full bg-slate-500/60 border border-slate-400/40 flex-shrink-0"
                  style={{
                    boxShadow: '0 0 6px rgba(148, 163, 184, 0.2)'
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </div>
      </motion.button>
    </motion.div>
  );
}