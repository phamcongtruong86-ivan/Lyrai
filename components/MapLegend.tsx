import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight } from 'lucide-react';
import { useTheme } from './ThemeProvider';

interface MapLegendProps {
  defaultState?: 'collapsed' | 'expanded';
  position?: 'bottom-left' | 'bottom-right';
  variant?: 'mobile' | 'desktop';
}

export function MapLegend({ 
  defaultState = 'collapsed',
  position = 'bottom-left',
  variant = 'mobile'
}: MapLegendProps) {
  const [isExpanded, setIsExpanded] = useState(defaultState === 'expanded');
  const { isDark } = useTheme();

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
        className={`backdrop-blur-xl border rounded-2xl shadow-xl overflow-hidden transition-all ${isDark ? 'bg-slate-900/80 border-slate-700/50' : 'bg-white/80 border-slate-200'}`}
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
                  <span className={`text-xs font-medium whitespace-nowrap ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    &#272;&#227; l&#432;u
                  </span>
                </div>

                {/* Suggested Places */}
                <div className="flex items-center gap-2.5">
                  <div 
                    className={`w-3 h-3 rounded-full flex-shrink-0 ${isDark ? 'bg-slate-500/60 border border-slate-400/40' : 'bg-slate-300 border border-slate-400/40'}`}
                    style={{
                      boxShadow: '0 0 8px rgba(148, 163, 184, 0.3)'
                    }}
                  />
                  <span className={`text-xs font-medium whitespace-nowrap ${isDark ? 'text-slate-200' : 'text-slate-700'}`}>
                    G&#7907;i &#253; m&#7899;i
                  </span>
                </div>

                {/* Collapse indicator */}
                <div className="flex justify-center pt-1">
                  <ChevronRight className={`w-3 h-3 rotate-180 ${isDark ? 'text-slate-500' : 'text-slate-400'}`} />
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
                <div 
                  className="w-3 h-3 rounded-full flex-shrink-0"
                  style={{
                    background: 'linear-gradient(135deg, #FF6F4C, #FF8C42)',
                    boxShadow: '0 0 8px rgba(255, 111, 76, 0.4)'
                  }}
                />
                <div 
                  className={`w-3 h-3 rounded-full flex-shrink-0 ${isDark ? 'bg-slate-500/60 border border-slate-400/40' : 'bg-slate-300 border border-slate-400/40'}`}
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
