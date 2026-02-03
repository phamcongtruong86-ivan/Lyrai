import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence, PanInfo } from 'motion/react';
import { X, Star, ChevronUp } from 'lucide-react';
import type { Place } from '../data/mockPlaces';

interface SmartBottomSheetProps {
  isOpen: boolean;
  onClose: () => void;
  trigger: 'chip' | 'search'; // Determines State A or State B
  locations: Place[];
  onLocationClick: (location: Place) => void;
}

export function SmartBottomSheet({
  isOpen,
  onClose,
  trigger,
  locations,
  onLocationClick,
}: SmartBottomSheetProps) {
  const [activeCardIndex, setActiveCardIndex] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);

  // Auto-scroll carousel on active card change
  useEffect(() => {
    if (carouselRef.current && trigger === 'chip') {
      const cardWidth = window.innerWidth * 0.85 + 16; // 85% + gap
      carouselRef.current.scrollTo({
        left: activeCardIndex * cardWidth,
        behavior: 'smooth'
      });
    }
  }, [activeCardIndex, trigger]);

  const handleScroll = () => {
    if (carouselRef.current && trigger === 'chip') {
      const scrollLeft = carouselRef.current.scrollLeft;
      const cardWidth = window.innerWidth * 0.85 + 16;
      const newIndex = Math.round(scrollLeft / cardWidth);
      if (newIndex !== activeCardIndex && newIndex < locations.length) {
        setActiveCardIndex(newIndex);
      }
    }
  };

  const handleDragEnd = (event: any, info: PanInfo) => {
    const offset = info.offset.y;
    
    // Only allow closing on drag down
    if (offset > 100) {
      onClose();
    }
  };

  const getSheetY = () => {
    if (trigger === 'chip') {
      return 'calc(100% - 520px)'; // Carousel mode
    } else {
      // Search mode: Tăng gap lên 110px để tránh overlap
      // safe-area + 110px = đủ chỗ cho wallet (60px) + gap (50px)
      return 'calc(env(safe-area-inset-top, 0px) + 110px)';
    }
  };

  if (!isOpen) return null;

  // LOGIC: 
  // - LOW state (chip trigger) → Horizontal Carousel
  // - MID/HIGH state (after swipe up) → Vertical List
  const shouldShowCarousel = trigger === 'chip';
  const shouldShowList = trigger === 'search';

  // STATE A: Smart Chip Trigger - Horizontal Carousel (Browsing Mode)
  const renderCarouselView = () => (
    <div className="h-full flex flex-col">
      {/* Drag Handle */}
      <div className="flex items-center justify-center py-3 shrink-0">
        <div className="w-12 h-1.5 bg-gray-500 rounded-full" />
      </div>

      {/* Horizontal Carousel */}
      <div
        ref={carouselRef}
        onScroll={handleScroll}
        className="flex gap-4 overflow-x-auto px-4 pb-28 snap-x snap-mandatory scrollbar-hide"
        style={{ touchAction: 'pan-x' }} // CRITICAL: Only allow horizontal touch scrolling
      >
        {locations.slice(0, 10).map((location, index) => (
          <motion.div
            key={location.id}
            onClick={() => onLocationClick(location)}
            onTouchStart={(e) => e.stopPropagation()} // CRITICAL: Prevent touch events from bubbling to drag handle
            onTouchMove={(e) => e.stopPropagation()}
            onTouchEnd={(e) => e.stopPropagation()}
            className={`min-w-[85vw] snap-center backdrop-blur-xl bg-white/10 border rounded-3xl overflow-hidden transition-all cursor-pointer ${
              index === activeCardIndex
                ? 'border-[#FF6F4C] shadow-2xl shadow-[#FF6F4C]/50'
                : 'border-white/20'
            }`}
          >
            {/* Large Cover Photo */}
            <div className="relative h-48 overflow-hidden">
              <img
                src={location.images?.[0] || 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800'}
                alt={location.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent" />
              
              {/* Rating Badge */}
              <div className="absolute top-3 right-3 flex items-center gap-1 px-3 py-1.5 backdrop-blur-xl bg-black/50 rounded-full">
                <Star className="w-4 h-4 fill-yellow-400 text-yellow-400" />
                <span className="text-white font-bold text-sm">{location.rating}</span>
              </div>
            </div>

            {/* Info */}
            <div className="p-4">
              <h3 className="text-lg font-bold text-white mb-1">{location.name}</h3>
              <p className="text-sm text-gray-400 mb-3">{location.category} • {location.distance}</p>
              
              {/* Tags */}
              <div className="flex gap-2 overflow-x-auto scrollbar-hide">
                {(location.vibes || []).slice(0, 3).map((tag, idx) => (
                  <span
                    key={idx}
                    className="px-3 py-1 bg-[#FF6F4C]/15 text-[#FF8C42] text-xs rounded-full whitespace-nowrap border border-[#FF6F4C]/30 font-semibold"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </motion.div>
        ))}
      </div>

      {/* Pagination Dots */}
      <div className="flex justify-center gap-1.5 pb-4">
        {locations.slice(0, 10).map((_, index) => (
          <button
            key={index}
            onClick={() => setActiveCardIndex(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === activeCardIndex
                ? 'bg-[#FF6F4C] w-6 shadow-[0_0_8px_rgba(255,111,76,0.6)]'
                : 'bg-white/30'
            }`}
          />
        ))}
      </div>
    </div>
  );

  // STATE B: Text Search Trigger - Vertical List (Searching Mode)
  const renderListView = () => (
    <div className="h-full flex flex-col">
      {/* Sticky Header - Drag Handle nhô lên trên */}
      <div 
        className="sticky top-0 z-30 flex items-center justify-between px-4 pt-3 pb-3 shrink-0 border-b border-white/10 backdrop-blur-2xl bg-[#0F172A]/95"
      >
        {/* Result Counter */}
        <div className="flex items-center gap-2">
          <span className="text-[#FF6F4C] font-bold">🎯</span>
          <p className="text-white font-bold text-sm">
            {locations.length} kết quả
          </p>
        </div>
        
        {/* Drag Handle (Center) - Nhô lên TRÊN header */}
        <div className="absolute left-1/2 -translate-x-1/2 -top-2">
          <div className="w-12 h-1 bg-white/30 rounded-full" />
        </div>
        
        {/* Empty space for balance (Close button is fixed at screen level) */}
        <div className="w-8" />
      </div>

      {/* Vertical Scrollable List */}
      <div className="flex-1 overflow-y-auto overscroll-contain">
        <div className="px-4 pt-4 pb-32 space-y-3">
          {locations.slice(0, 20).map((location) => (
            <motion.button
              key={location.id}
              onClick={() => onLocationClick(location)}
              className="w-full backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 rounded-2xl p-4 transition-all text-left"
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
            >
              <div className="flex gap-3">
                {/* Thumbnail */}
                <div className="relative w-20 h-20 rounded-xl overflow-hidden flex-shrink-0">
                  <img
                    src={location.images?.[0] || 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800'}
                    alt={location.name}
                    className="w-full h-full object-cover"
                  />
                </div>

                {/* Info */}
                <div className="flex-1 min-w-0">
                  <h4 className="font-bold text-white mb-1 truncate">{location.name}</h4>
                  
                  {/* Rating & Distance */}
                  <div className="flex items-center gap-2 text-xs text-gray-400 mb-2">
                    <div className="flex items-center gap-1">
                      <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                      <span className="text-white font-semibold">{location.rating}</span>
                    </div>
                    <span>•</span>
                    <span>{location.reviewCount} reviews</span>
                    <span>•</span>
                    <span>{location.distance}</span>
                  </div>

                  {/* Tags */}
                  <div className="flex gap-1.5 overflow-x-auto scrollbar-hide">
                    {(location.vibes || []).slice(0, 3).map((tag, idx) => (
                      <span
                        key={idx}
                        className="px-2 py-0.5 bg-[#FF6F4C]/20 text-[#FF8C42] text-xs rounded-full whitespace-nowrap border border-[#FF6F4C]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                </div>
              </div>
            </motion.button>
          ))}
        </div>
      </div>
    </div>
  );

  return (
    <>
      {/* Backdrop */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40 lg:hidden"
        onClick={onClose}
      />

      {/* Bottom Sheet */}
      <motion.div
        initial={{ y: '100%' }}
        animate={{ y: getSheetY() }}
        exit={{ y: '100%' }}
        drag={trigger === 'chip' ? false : 'y'} // Disable drag in carousel mode
        dragConstraints={{ top: 0, bottom: 0 }}
        dragElastic={0.1}
        dragMomentum={false}
        onDragEnd={handleDragEnd}
        transition={{ type: 'spring', damping: 40, stiffness: 400, mass: 0.5 }}
        style={{
          maxHeight: trigger === 'search' 
            ? 'calc(100dvh - env(safe-area-inset-top, 0px) - 110px)' // Dynamic viewport height
            : undefined
        }}
        className="fixed inset-x-0 bottom-0 h-screen z-50 pointer-events-none lg:hidden"
      >
        <div className="h-full flex flex-col pointer-events-auto backdrop-blur-2xl bg-[#0F172A]/95 border-t border-white/10 rounded-t-3xl shadow-2xl">
          {/* Render based on trigger type */}
          {shouldShowCarousel && renderCarouselView()}
          {shouldShowList && renderListView()}
        </div>
      </motion.div>

      {/* Close Button - Fixed at screen level (outside sheet) */}
      {isOpen && (
        <motion.button
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          onClick={onClose}
          style={{ 
            top: trigger === 'search' 
              ? 'calc(env(safe-area-inset-top, 0px) + 118px)' // Search mode: safe-area + 118px (adjusted for better positioning)
              : 'calc(100vh - 512px)' // Carousel mode: near sheet top
          }}
          className="fixed right-4 z-[60] backdrop-blur-xl bg-white/10 hover:bg-white/20 p-2 rounded-full transition-all lg:hidden"
        >
          <X className="w-5 h-5 text-white" />
        </motion.button>
      )}
    </>
  );
}