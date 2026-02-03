import { useEffect, useState, useRef } from 'react';
import { X, Star, Sparkles, Heart, Lock, CheckCircle, Navigation, Shield, ExternalLink } from 'lucide-react';
import { motion, useAnimation } from 'motion/react';
import type { Place } from '../data/mockPlaces';
import { WalletChip } from './WalletChip';
import { MiniWalletSheet } from './MiniWalletSheet';

interface PlaceDetailsSheetProps {
  place: Place;
  isOpen: boolean;
  onClose: () => void;
  onSave?: (place: Place) => void;
  credits?: number;
  onUnlock?: (place: Place) => void;
  isSaved?: boolean; // NEW: Track if place is already saved
  autoUnlock?: boolean; // NEW: Auto-unlock for scan results
  isCarouselMode?: boolean; // NEW: For carousel navigation mode
  onSwipeLeft?: () => void; // NEW: Swipe left callback
  onSwipeRight?: () => void; // NEW: Swipe right callback
}

export function PlaceDetailsSheet({ place, isOpen, onClose, onSave, credits, onUnlock, isSaved, autoUnlock, isCarouselMode, onSwipeLeft, onSwipeRight }: PlaceDetailsSheetProps) {
  // CRITICAL: Saved places OR auto-unlocked places are ALWAYS unlocked by default
  const [isUnlocked, setIsUnlocked] = useState(isSaved || autoUnlock || false);
  const [showFooter, setShowFooter] = useState(true);
  const [isWalletSheetOpen, setIsWalletSheetOpen] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const lastScrollY = useRef(0);
  const footerControls = useAnimation();
  
  // Custom touch handlers for swipe
  const [isSwiping, setIsSwiping] = useState(false);
  const touchStartX = useRef(0);
  const touchStartY = useRef(0);
  const containerRef = useRef<HTMLDivElement>(null);
  
  // Trackpad swipe support (wheel events) - NO MOUSE DRAG
  const wheelDeltaX = useRef(0);
  const wheelTimeoutRef = useRef<NodeJS.Timeout>();

  // DEBUG: Log states
  console.log('PlaceDetailsSheet:', { 
    placeName: place.name,
    isSaved, 
    autoUnlock,
    isUnlocked,
    shouldShowSaveButton: !isSaved && isUnlocked,
    isCarouselMode
  });

  // Update unlocked state when place changes
  useEffect(() => {
    setIsUnlocked(isSaved || autoUnlock || false);
  }, [isSaved, autoUnlock, place.id]);

  useEffect(() => {
    const handleScroll = () => {
      if (!scrollRef.current) return;

      const currentScrollY = scrollRef.current.scrollTop;
      const scrollDirection = currentScrollY > lastScrollY.current ? 'down' : 'up';

      if (currentScrollY > 50) {
        if (scrollDirection === 'down' && showFooter) {
          setShowFooter(false);
          footerControls.start({ y: '100%', opacity: 0 });
        } else if (scrollDirection === 'up' && !showFooter) {
          setShowFooter(true);
          footerControls.start({ y: 0, opacity: 1 });
        }
      } else {
        if (!showFooter) {
          setShowFooter(true);
          footerControls.start({ y: 0, opacity: 1 });
        }
      }

      lastScrollY.current = currentScrollY;
    };

    const scrollElement = scrollRef.current;
    if (scrollElement) {
      scrollElement.addEventListener('scroll', handleScroll, { passive: true });
    }

    return () => {
      if (scrollElement) {
        scrollElement.removeEventListener('scroll', handleScroll);
      }
    };
  }, [showFooter, footerControls]);

  const handleSave = () => {
    onSave?.(place);
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: place.name,
        text: `Check out ${place.name} - ${place.vibes.join(', ')}`,
        url: window.location.href,
      }).catch(() => {});
    } else {
      navigator.clipboard.writeText(window.location.href);
    }
  };

  const handleUnlock = () => {
    if (credits > 0) {
      setIsUnlocked(true);
      onUnlock?.(place);
    } else {
      setIsWalletSheetOpen(true);
    }
  };

  // Custom touch handlers for carousel swipe
  const handleTouchStart = (e: React.TouchEvent) => {
    console.log('🟢 Touch Start');
    if (!isCarouselMode) return;
    
    touchStartX.current = e.touches[0].clientX;
    touchStartY.current = e.touches[0].clientY;
    setIsSwiping(false);
  };

  const handleTouchMove = (e: React.TouchEvent) => {
    if (!isCarouselMode || touchStartX.current === 0) return;

    const currentX = e.touches[0].clientX;
    const currentY = e.touches[0].clientY;
    const deltaX = Math.abs(currentX - touchStartX.current);
    const deltaY = Math.abs(currentY - touchStartY.current);

    console.log('🟡 Touch Move', { deltaX, deltaY });

    // CRITICAL: Only intercept if CLEARLY horizontal
    if (deltaX > deltaY && deltaX > 30) { // Increased threshold to 30px
      console.log('🎯 HORIZONTAL SWIPE!');
      setIsSwiping(true);
      e.preventDefault(); // Block scroll
      
      // Visual feedback: translate container
      if (containerRef.current) {
        const offset = currentX - touchStartX.current;
        containerRef.current.style.transform = `translateX(${offset * 0.5}px)`; // 0.5 = resistance
      }
    }
  };

  const handleTouchEnd = (e: React.TouchEvent) => {
    console.log('🔴 Touch End', { isSwiping });
    
    // Reset visual
    if (containerRef.current) {
      containerRef.current.style.transform = '';
      containerRef.current.style.transition = 'transform 0.3s ease';
      setTimeout(() => {
        if (containerRef.current) {
          containerRef.current.style.transition = '';
        }
      }, 300);
    }

    if (!isCarouselMode || !isSwiping) {
      touchStartX.current = 0;
      touchStartY.current = 0;
      setIsSwiping(false);
      return;
    }

    const deltaX = e.changedTouches[0].clientX - touchStartX.current;
    console.log('📏 Final deltaX:', deltaX);

    if (Math.abs(deltaX) > 80) {
      if (deltaX > 0) {
        console.log('➡️ SWIPE RIGHT - Previous');
        onSwipeRight?.();
      } else {
        console.log('⬅️ SWIPE LEFT - Next');
        onSwipeLeft?.();
      }
    }

    touchStartX.current = 0;
    touchStartY.current = 0;
    setIsSwiping(false);
  };

  // Trackpad swipe handlers (wheel events)
  const handleWheel = (e: React.WheelEvent) => {
    console.log('🎡 WHEEL EVENT:', { deltaX: e.deltaX, deltaY: e.deltaY, isCarouselMode });
    
    if (!isCarouselMode) return;

    // CRITICAL: Only intercept HORIZONTAL scrolls
    if (Math.abs(e.deltaX) > Math.abs(e.deltaY)) {
      console.log('🎯 HORIZONTAL WHEEL DETECTED!');
      e.preventDefault(); // Block default behavior
      
      // Accumulate deltaX
      wheelDeltaX.current += e.deltaX;

      // Clear previous timeout
      if (wheelTimeoutRef.current) {
        clearTimeout(wheelTimeoutRef.current);
      }

      // Set new timeout to reset deltaX after 100ms
      wheelTimeoutRef.current = setTimeout(() => {
        const deltaX = wheelDeltaX.current;
        console.log('📏 Final deltaX:', deltaX);

        if (Math.abs(deltaX) > 80) {
          if (deltaX > 0) {
            console.log('⬅️ SWIPE LEFT - Next');
            onSwipeLeft?.();
          } else {
            console.log('➡️ SWIPE RIGHT - Previous');
            onSwipeRight?.();
          }
        }

        wheelDeltaX.current = 0;
      }, 100);
    }
  };

  if (!isOpen) return null;

  // Use images from place data (with safety checks)
  const coverImage = place.images?.[0] || 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800';
  const thumbnailImages = place.images?.slice(1, 4) || [];

  // AI Insights from place data (with safety checks)
  const aiInsights = {
    pros: place.pros || [],
    cons: place.cons || []
  };

  return (
    <>
      {/* Backdrop - Don't render in carousel mode */}
      {!isCarouselMode && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm z-40"
          onClick={onClose}
        />
      )}

      {/* Bottom Sheet - Desktop centered modal, Mobile bottom sheet */}
      <motion.div
        initial={{ y: '100%', opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        exit={{ y: '100%', opacity: 0 }}
        transition={{ type: 'spring', damping: 30, stiffness: 300 }}
        className={`fixed inset-x-0 bottom-0 z-50 lg:inset-0 lg:flex lg:items-center lg:justify-center pointer-events-none ${
          isCarouselMode ? 'inset-0' : ''
        }`}
        style={{
          paddingBottom: isCarouselMode ? '0' : 'env(safe-area-inset-bottom)'
        }}
      >
        {/* Container with custom touch handlers - BỎ Motion drag */}
        <div 
          ref={containerRef}
          className={`pointer-events-auto bg-[#0F172A] lg:bg-[#0F172A]/95 lg:backdrop-blur-xl rounded-t-3xl lg:rounded-3xl shadow-2xl overflow-hidden lg:max-w-2xl lg:w-full lg:max-h-[90vh] flex flex-col border-t lg:border border-white/10 relative ${
            isCarouselMode ? 'h-full rounded-none' : 'h-[85dvh]'
          }`}
          onTouchStart={handleTouchStart}
          onTouchMove={handleTouchMove}
          onTouchEnd={handleTouchEnd}
          onWheel={handleWheel}
          style={{
            willChange: (isSwiping) ? 'transform' : 'auto',
            cursor: isCarouselMode ? (isSwiping ? 'grabbing' : 'grab') : 'auto'
          }}
        >
          {/* Header */}
          <div className="relative shrink-0">
            <button
              onClick={onClose}
              onTouchStart={(e) => e.stopPropagation()}  // ← PREVENT SWIPE TRIGGER
              className="absolute top-4 right-4 z-10 backdrop-blur-xl bg-black/50 hover:bg-black/70 p-2 rounded-full transition-colors"
            >
              <X className="w-5 h-5 text-white" />
            </button>
          </div>

          {/* Scrollable Content */}
          <div 
            className="flex-1 overflow-y-auto" 
            ref={scrollRef}
            style={{
              overscrollBehavior: 'contain',
              touchAction: 'pan-y' // Only allow vertical scroll
            }}
          >
            {/* COMMON HEADER - Cover Image */}
            <div className="relative aspect-[4/3] overflow-hidden">
              <img
                src={coverImage}
                alt={place.name}
                className="w-full h-full object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-[#0F172A] via-transparent to-transparent" />
            </div>

            {/* Basic Info */}
            <div className="px-6 py-4 space-y-3">
              {/* Tên quán */}
              <div className="flex items-center gap-3">
                <h2 className="text-2xl font-bold text-white flex-1">{place.name}</h2>
              </div>
              
              {/* Rating - ReviewCount - Category - Saved Icon */}
              <div className="flex items-center gap-2 flex-wrap">
                <div className="flex items-center gap-1 text-yellow-400">
                  <Star className="w-4 h-4 fill-current" />
                  <span className="text-white font-semibold">{place.rating}</span>
                </div>
                <span className="text-gray-500">•</span>
                <span className="text-sm text-gray-400">{place.reviewCount} đánh giá</span>
                <span className="text-gray-500">•</span>
                {/* Category - NỔI BẬT */}
                <span className="px-3 py-1 rounded-full text-sm font-semibold bg-[#2DD4BF]/20 text-[#2DD4BF] border border-[#2DD4BF]/30">
                  {place.category}
                </span>
                {/* Saved Icon */}
                {isSaved && (
                  <div className="w-8 h-8 rounded-full flex items-center justify-center ml-auto" style={{
                    background: 'linear-gradient(135deg, #FF6F4C, #FF8C42)',
                    boxShadow: '0 4px 12px rgba(255, 111, 76, 0.4)'
                  }}>
                    <Heart className="w-4 h-4 text-white fill-current" />
                  </div>
                )}
              </div>
              
              {/* Địa chỉ */}
              <p className="text-gray-400 text-sm">{place.address}</p>
              
              {/* Trạng thái và Chỉ đường - 2 nút song song */}
              <div className="flex items-center gap-3">
                <div className={`flex items-center gap-2 px-3 py-1.5 rounded-full flex-shrink-0 ${
                  place.isOpen 
                    ? 'bg-green-500/20 text-green-400 border border-green-500/30' 
                    : 'bg-red-500/20 text-red-400 border border-red-500/30'
                }`}>
                  <span className="font-medium text-sm">{place.isOpen ? '● Đang mở cửa' : '● Đã đóng cửa'}</span>
                </div>
                
                <button className="flex items-center gap-2 px-3 py-1.5 rounded-full flex-shrink-0 bg-blue-500/20 text-blue-400 border border-blue-500/30 hover:bg-blue-500/30 transition-colors">
                  <Navigation className="w-4 h-4" />
                  <span className="font-medium text-sm">Chỉ đường</span>
                </button>
              </div>
              
              {/* Giờ mở cửa */}
              <div className="text-gray-400 text-sm">
                {place.hours}
              </div>
              
              {/* Ngày nghỉ */}
              {place.closedDays && (
                <div className="text-gray-400 text-sm">
                  Nghỉ: {place.closedDays}
                </div>
              )}
              
              {/* Giá trung bình */}
              <div className="flex items-center gap-2 text-sm">
                <span className="text-gray-400">Giá trung bình:</span>
                <span className="text-[#FF8C42] font-semibold text-base">
                  {place.priceRange}
                  {place.priceRangeAmount && (
                    <span className="ml-2 text-sm">({place.priceRangeAmount}đ)</span>
                  )}
                </span>
              </div>
            </div>

            {/* STATE A: LOCKED VIEW */}
            {!isUnlocked && (
              <>
                {/* Gallery Section - Locked with Blur */}
                <div className="px-6 py-4">
                  <h3 className="text-lg font-bold text-white mb-3">Thư viện ảnh</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {thumbnailImages.map((img, index) => (
                      <div key={index} className="relative aspect-[4/3] rounded-xl overflow-hidden">
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover"
                          style={{ filter: 'blur(20px)' }}
                        />
                        {/* Frosted Glass Overlay */}
                        <div className="absolute inset-0 backdrop-blur-xl bg-white/10 flex items-center justify-center">
                          <Lock className="w-8 h-8 text-white/60" />
                        </div>
                      </div>
                    ))}
                  </div>
                </div>

                {/* AI Insight Section - Locked (The Teaser) */}
                <div className={`px-6 py-4 ${isCarouselMode ? 'pb-[220px]' : 'pb-32'}`}>
                  <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-3xl p-8 overflow-hidden min-h-[300px]">
                    {/* Heavily Blurred Content Background */}
                    <div className="absolute inset-0 p-8" style={{ filter: 'blur(12px)' }}>
                      <div className="space-y-3">
                        <div className="h-5 bg-green-500/30 rounded w-3/4"></div>
                        <div className="h-4 bg-white/20 rounded w-full"></div>
                        <div className="h-4 bg-white/20 rounded w-2/3"></div>
                        <div className="h-5 bg-red-500/30 rounded w-3/4 mt-6"></div>
                        <div className="h-4 bg-white/20 rounded w-5/6"></div>
                        <div className="h-4 bg-white/20 rounded w-full"></div>
                      </div>
                    </div>

                    {/* Large Lock Icon Overlay */}
                    <div className="absolute top-8 right-8">
                      <div className="w-16 h-16 bg-white/10 backdrop-blur-md rounded-full flex items-center justify-center">
                        <Lock className="w-8 h-8 text-white/60" />
                      </div>
                    </div>

                    {/* Unlock CTA */}
                    <div className="relative z-10 flex flex-col items-center justify-center py-16">
                      <Sparkles className="w-14 h-14 text-yellow-400 mb-6 animate-pulse" />
                      
                      {/* Prominent Gradient Button (Violet to Gold) */}
                      <button
                        onClick={handleUnlock}
                        disabled={credits <= 0}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF5733] to-[#FF1F8F] text-white transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#FF6F4C]/50 font-semibold hover:shadow-[#FF6F4C]/70 hover:-translate-y-0.5 disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:translate-y-0"
                        style={{
                          boxShadow: '0 8px 32px rgba(255, 87, 51, 0.5), 0 0 60px rgba(255, 87, 51, 0.3)'
                        }}
                      >
                        <Sparkles className="w-6 h-6" />
                        Unlock AI Insight (-1 ⚡)
                      </button>
                      
                      {/* Micro-copy */}
                      <p className="text-sm text-gray-400 text-center mt-4">
                        Summarized from {place.reviewCount}+ reviews
                      </p>
                      <p className="text-xs text-gray-500 text-center max-w-xs">
                        Auto-refund if analysis fails
                      </p>
                      
                      {credits === 0 && (
                        <p className="text-sm text-red-400 mt-3">Bạn đã hết credit ⚡</p>
                      )}
                    </div>
                  </div>
                </div>
              </>
            )}

            {/* STATE B: UNLOCKED VIEW (The Value) */}
            {isUnlocked && (
              <>
                {/* Gallery Section - Unlocked */}
                <div className="px-6 py-4">
                  <h3 className="text-lg font-bold text-white mb-3">Thư viện ảnh</h3>
                  <div className="grid grid-cols-2 gap-2">
                    {thumbnailImages.map((img, index) => (
                      <motion.div
                        key={index}
                        initial={{ opacity: 0, scale: 0.9 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ delay: index * 0.1 }}
                        className="relative aspect-[4/3] rounded-xl overflow-hidden"
                      >
                        <img
                          src={img}
                          alt={`Gallery ${index + 1}`}
                          className="w-full h-full object-cover hover:scale-110 transition-transform duration-300"
                        />
                      </motion.div>
                    ))}
                  </div>
                </div>

                {/* AI Insight Section - Unlocked */}
                <div className={`px-6 py-4 ${isCarouselMode ? 'pb-[220px]' : 'pb-32'}`}>
                  {/* AI Tags (Cyan Teal Pills) */}
                  {place.aiTags && place.aiTags.length > 0 && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      className="flex gap-2 flex-wrap mb-6"
                    >
                      {place.aiTags.map((tag, index) => (
                        <span
                          key={index}
                          className="px-4 py-2 bg-[#2DD4BF]/20 text-[#2DD4BF] text-sm font-semibold rounded-full border border-[#2DD4BF]/30"
                        >
                          #{tag}
                        </span>
                      ))}
                    </motion.div>
                  )}

                  <h3 className="text-lg font-bold text-white mb-4 flex items-center gap-2">
                    <Sparkles className="w-5 h-5 text-yellow-400" />
                    AI Vibe Check
                  </h3>

                  {/* Insight Table: Two-Column Layout */}
                  <div className="grid md:grid-cols-2 gap-4">
                    {/* Left Col: AI Highlight (Teal) */}
                    <motion.div
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="backdrop-blur-xl bg-teal-950/30 border border-teal-500/30 rounded-2xl p-5"
                    >
                      <h4 className="text-lg font-bold text-teal-400 mb-4 flex items-center gap-2">
                        <Sparkles className="w-5 h-5" />
                        AI Highlight
                      </h4>
                      <ul className="space-y-2">
                        {aiInsights.pros.map((pro, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: -10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-start gap-2 text-sm"
                          >
                            <CheckCircle className="w-4 h-4 text-teal-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{pro}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>

                    {/* Right Col: AI Warning (Orange) */}
                    <motion.div
                      initial={{ opacity: 0, x: 20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 }}
                      className="backdrop-blur-xl bg-orange-950/30 border border-orange-500/30 rounded-2xl p-5"
                    >
                      <h4 className="text-lg font-bold text-orange-400 mb-4 flex items-center gap-2">
                        <Shield className="w-5 h-5" />
                        AI Warning
                      </h4>
                      <ul className="space-y-2">
                        {aiInsights.cons.map((con, index) => (
                          <motion.li
                            key={index}
                            initial={{ opacity: 0, x: 10 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: 0.3 + index * 0.1 }}
                            className="flex items-start gap-2 text-sm"
                          >
                            <Shield className="w-4 h-4 text-orange-400 flex-shrink-0 mt-0.5" />
                            <span className="text-gray-300">{con}</span>
                          </motion.li>
                        ))}
                      </ul>
                    </motion.div>
                  </div>

                  {/* AI Attribution */}
                  <p className="text-xs text-gray-500 mt-4 text-center">
                    ✨ AI phân tích từ {place.reviewCount}+ đánh giá
                  </p>

                  {/* Save Button at Bottom - Only for new places */}
                  {!isSaved && (
                    <motion.div
                      initial={{ opacity: 0, y: 20 }}
                      animate={{ opacity: 1, y: 0 }}
                      transition={{ delay: 0.5 }}
                      className="mt-8 pb-8"
                    >
                      <button
                        onClick={handleSave}
                        className="w-full py-4 rounded-2xl bg-gradient-to-r from-[#FF6F4C] to-[#FF8C42] hover:from-[#FF5733] hover:to-[#FF6F4C] text-white transition-all flex items-center justify-center gap-3 shadow-lg shadow-[#FF6F4C]/50 font-semibold hover:-translate-y-0.5"
                        style={{
                          boxShadow: '0 8px 24px rgba(255, 111, 76, 0.4), 0 0 40px rgba(255, 111, 76, 0.2)'
                        }}
                      >
                        <Heart className="w-5 h-5" />
                        <span>Lưu địa điểm này</span>
                      </button>
                    </motion.div>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      </motion.div>

      {/* Mini Wallet Sheet */}
      <MiniWalletSheet
        isOpen={isWalletSheetOpen}
        onClose={() => setIsWalletSheetOpen(false)}
        credits={credits}
      />
    </>
  );
}