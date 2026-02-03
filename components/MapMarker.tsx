import { motion } from 'motion/react';
import { Coffee, UtensilsCrossed, Wine, MapPin, Bookmark } from 'lucide-react';
import type { Place } from '../data/mockPlaces';

interface MapMarkerProps {
  place: Place;
  isHovered: boolean;
  isSelected: boolean;
  onClick: () => void;
  onMouseEnter: () => void;
  onMouseLeave: () => void;
  position: { top: string; left: string };
}

export function MapMarker({
  place,
  isHovered,
  isSelected,
  onClick,
  onMouseEnter,
  onMouseLeave,
  position,
}: MapMarkerProps) {
  // Icon based on type
  const getIcon = () => {
    if (place.type === 'cafe') return '☕';
    if (place.type === 'restaurant') return '🍜';
    if (place.type === 'bar') return '🍷';
    return '📍';
  };

  // Icon size based on saved state
  const iconSize = place.isSaved ? '24px' : '20px';

  return (
    <motion.button
      onClick={onClick}
      onMouseEnter={onMouseEnter}
      onMouseLeave={onMouseLeave}
      className="absolute transform -translate-x-1/2 -translate-y-1/2 hidden lg:block"
      style={position}
      initial={{ scale: 0, opacity: 0 }}
      animate={{ 
        scale: isSelected ? 1.15 : 1, 
        opacity: 1 
      }}
      transition={{ type: 'spring', damping: 20, stiffness: 300 }}
      whileHover={{ scale: isSelected ? 1.2 : 1.05 }}
    >
      {/* A. SAVED PIN - Coral with Glow & Pulse (56x56px) */}
      {place.isSaved && (
        <div className="relative" style={{ zIndex: 999 }}>
          {/* Main Circle with Pulse */}
          <motion.div
            className="relative rounded-full flex items-center justify-center"
            style={{
              width: '56px',
              height: '56px',
              background: 'radial-gradient(circle, rgba(255, 111, 76, 0.95) 0%, rgba(255, 140, 66, 0.85) 100%)',
              border: '2px solid rgba(255, 182, 39, 0.6)',
              boxShadow: isSelected 
                ? '0 6px 20px rgba(255, 111, 76, 0.5), 0 0 20px rgba(255, 111, 76, 0.4), inset 0 0 8px rgba(255, 182, 39, 0.3)'
                : '0 6px 20px rgba(255, 111, 76, 0.5), 0 0 20px rgba(255, 111, 76, 0.4), inset 0 0 8px rgba(255, 182, 39, 0.3)',
            }}
            // Pulse animation - first 4 seconds (2 iterations x 2s each)
            animate={{
              scale: [1.0, 1.08, 1.0],
              boxShadow: [
                '0 6px 20px rgba(255, 111, 76, 0.5), 0 0 20px rgba(255, 111, 76, 0.4), inset 0 0 8px rgba(255, 182, 39, 0.3)',
                '0 6px 20px rgba(255, 111, 76, 0.5), 0 0 20px rgba(255, 111, 76, 0.7), inset 0 0 8px rgba(255, 182, 39, 0.3)',
                '0 6px 20px rgba(255, 111, 76, 0.5), 0 0 20px rgba(255, 111, 76, 0.4), inset 0 0 8px rgba(255, 182, 39, 0.3)',
              ]
            }}
            transition={{
              duration: 2,
              repeat: 1, // 2 iterations total (0 = 1 time, 1 = 2 times)
              ease: 'easeInOut'
            }}
          >
            {/* Icon */}
            <span 
              className="text-white filter drop-shadow-md"
              style={{ fontSize: iconSize }}
            >
              {getIcon()}
            </span>

            {/* Bookmark Badge - Top Right (SAVED ONLY) */}
            <motion.div
              className="absolute flex items-center justify-center rounded-full"
              style={{
                top: '-8px',
                right: '-8px',
                width: '32px',
                height: '32px',
                background: '#FF6F4C',
                border: '3px solid #1A2332',
                boxShadow: '0 4px 16px rgba(255, 111, 76, 0.6), 0 0 8px rgba(255, 111, 76, 0.4)'
              }}
              initial={{ scale: 0, rotate: -10 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 15 }}
            >
              <Bookmark className="w-4 h-4 text-white fill-current" />
            </motion.div>
          </motion.div>

          {/* Selected State: Anchor Arrow */}
          {isSelected && (
            <motion.div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-1"
              initial={{ opacity: 0, y: -5 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Triangle Arrow pointing down */}
              <div 
                className="w-0 h-0"
                style={{
                  borderLeft: '6px solid transparent',
                  borderRight: '6px solid transparent',
                  borderTop: '8px solid rgba(255, 182, 39, 0.9)',
                  filter: 'drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))'
                }}
              />
            </motion.div>
          )}
        </div>
      )}

      {/* B. GHOST PIN - Semi-transparent White (48x48px) - NO BADGE */}
      {!place.isSaved && (
        <div className="relative" style={{ zIndex: 998 }}>
          {/* Main Circle */}
          <motion.div
            className="relative rounded-full flex items-center justify-center"
            style={{
              width: '48px',
              height: '48px',
              background: 'rgba(255, 255, 255, 0.25)',
              border: '2px solid rgba(255, 255, 255, 0.4)',
              opacity: 0.7,
              boxShadow: isSelected 
                ? '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(255, 255, 255, 0.2)' 
                : '0 4px 12px rgba(0, 0, 0, 0.3)',
            }}
            animate={isSelected ? {
              boxShadow: [
                '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(255, 255, 255, 0.2)',
                '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 5px rgba(255, 255, 255, 0.15)',
                '0 4px 12px rgba(0, 0, 0, 0.3), 0 0 0 3px rgba(255, 255, 255, 0.2)',
              ]
            } : {}}
            transition={isSelected ? {
              duration: 1.5,
              repeat: Infinity,
              ease: 'easeInOut'
            } : {}}
          >
            {/* Icon */}
            <span 
              className="filter drop-shadow-md opacity-90"
              style={{ fontSize: iconSize }}
            >
              {getIcon()}
            </span>
          </motion.div>

          {/* Selected State: Anchor Arrow */}
          {isSelected && (
            <motion.div
              className="absolute top-full left-1/2 -translate-x-1/2 mt-1"
              initial={{ opacity: 0, y: -3 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.3 }}
            >
              {/* Triangle Arrow pointing down */}
              <div 
                className="w-0 h-0"
                style={{
                  borderLeft: '5px solid transparent',
                  borderRight: '5px solid transparent',
                  borderTop: '7px solid rgba(255, 255, 255, 0.7)',
                  filter: 'drop-shadow(0 1px 2px rgba(0, 0, 0, 0.3))'
                }}
              />
            </motion.div>
          )}
        </div>
      )}
    </motion.button>
  );
}