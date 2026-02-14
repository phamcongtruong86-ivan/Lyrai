import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { PlaceDetailsSheet } from './PlaceDetailsSheet';
import type { Place } from '../data/mockPlaces';
import { useTheme } from './ThemeProvider';

interface NearbyCarouselProps {
  places: Place[];
  onClose: () => void;
  onSave: (place: Place) => void;
  credits?: number;
}

export function NearbyCarousel({ places, onClose, onSave, credits }: NearbyCarouselProps) {
  const { isDark } = useTheme();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showGlow, setShowGlow] = useState(false);

  const currentPlace = places[currentIndex];

  // Trigger glow effect when index changes
  useEffect(() => {
    setShowGlow(true);
    const timer = setTimeout(() => setShowGlow(false), 800);
    return () => clearTimeout(timer);
  }, [currentIndex]);

  const goToPrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const goToNext = () => {
    if (currentIndex < places.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const goToPlace = (index: number) => {
    setCurrentIndex(index);
  };

  return (
    <>
      {/* Custom Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
        onClick={onClose}
      />

      {/* Border Glow Effect - Cam viền */}
      <AnimatePresence>
        {showGlow && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.4 }}
            className="fixed inset-0 pointer-events-none z-[60]"
            style={{
              border: '3px solid rgba(255, 111, 76, 0.6)',
              boxShadow: `
                inset 0 0 60px rgba(255, 111, 76, 0.3),
                0 0 60px rgba(255, 111, 76, 0.4)
              `,
            }}
          />
        )}
      </AnimatePresence>

      {/* Place Details Sheet with Swipe */}
      <PlaceDetailsSheet
        place={currentPlace}
        isOpen={true}
        onClose={onClose}
        onSave={() => onSave(currentPlace)}
        credits={credits || 3}
        isSaved={currentPlace.isSaved}
        autoUnlock={false}
        isCarouselMode={true}
        onSwipeLeft={goToNext}
        onSwipeRight={goToPrevious}
      />

      {/* Navigation Controls - SIMPLIFIED */}
      <div className="fixed bottom-20 md:bottom-8 left-0 right-0 z-[70] pointer-events-none">
        <div className="max-w-md mx-auto px-4">
          {/* Navigation Container */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="p-2 md:p-3 pointer-events-auto shadow-2xl rounded-[2rem]"
            style={{
              background: isDark ? 'rgba(15, 23, 42, 0.98)' : 'rgba(255, 255, 255, 0.98)',
              backdropFilter: 'blur(20px)',
              border: isDark ? '1px solid rgba(255, 255, 255, 0.1)' : '1px solid rgba(0, 0, 0, 0.08)',
            }}
          >
            {/* Header - Counter only */}
            <div className="flex items-center justify-center mb-2">
              <p className={`text-xs ${isDark ? 'text-slate-400' : 'text-slate-500'}`}>
                <span className="text-primary font-semibold text-base">{currentIndex + 1}</span>
                <span className="text-slate-500 mx-1">/</span>
                <span className={isDark ? 'text-slate-300 text-sm' : 'text-slate-700 text-sm'}>{places.length}</span>
                <span className={`ml-1.5 ${isDark ? 'text-slate-500' : 'text-slate-400'}`}>quán</span>
              </p>
            </div>

            {/* Navigation Arrows + Dots */}
            <div className="flex items-center justify-between gap-2">
              {/* Previous Button */}
              <button
                onClick={goToPrevious}
                disabled={currentIndex === 0}
                className={`w-11 h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0 ${
                  isDark 
                    ? 'bg-slate-800/80 border-slate-700/50 hover:bg-slate-700' 
                    : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <ChevronLeft className={`w-6 h-6 md:w-7 md:h-7 ${isDark ? 'text-white' : 'text-slate-700'}`} />
              </button>

              {/* Pagination Dots */}
              <div className="flex items-center justify-center gap-1.5 flex-1 overflow-x-auto hide-scrollbar">
                {places.map((place, index) => (
                  <button
                    key={place.id}
                    onClick={() => goToPlace(index)}
                    className={`transition-all shrink-0 ${
                      index === currentIndex
                        ? 'w-8 md:w-10 h-2.5 bg-primary rounded-full shadow-lg shadow-primary/50'
                        : `w-2.5 h-2.5 rounded-full ${isDark ? 'bg-slate-600 hover:bg-slate-500' : 'bg-slate-300 hover:bg-slate-400'}`
                    }`}
                    aria-label={`Go to place ${index + 1}`}
                  />
                ))}
              </div>

              {/* Next Button */}
              <button
                onClick={goToNext}
                disabled={currentIndex === places.length - 1}
                className={`w-11 h-11 md:w-12 md:h-12 rounded-full border flex items-center justify-center disabled:opacity-30 disabled:cursor-not-allowed transition-all shrink-0 ${
                  isDark 
                    ? 'bg-slate-800/80 border-slate-700/50 hover:bg-slate-700' 
                    : 'bg-slate-100 border-slate-200 hover:bg-slate-200'
                }`}
              >
                <ChevronRight className={`w-6 h-6 md:w-7 md:h-7 ${isDark ? 'text-white' : 'text-slate-700'}`} />
              </button>
            </div>

            {/* Swipe Hint - Only on first item */}
            {currentIndex === 0 && (
              <motion.p
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="text-center text-xs text-slate-500 mt-2"
              >
                👆 Vuốt ngang để xem quán khác
              </motion.p>
            )}
          </motion.div>
        </div>
      </div>
    </>
  );
}