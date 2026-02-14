import { useState } from 'react';
import { Navigation, Star, Search, Sparkles, MapPin, MessageCircle, Heart, Bookmark, Coffee, UtensilsCrossed, Wine } from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { PlaceDetailsSheet } from './PlaceDetailsSheet';
import { SmartBottomSheet } from './SmartBottomSheet';
import { MapMarker } from './MapMarker';
import { getAllPlaces, type Place } from '../data/mockPlaces';
import { WalletChip } from './WalletChip';
import { MiniWalletSheet } from './MiniWalletSheet';
import { MapLegend } from './MapLegend';
import { FirstTimeMapTooltip } from './FirstTimeMapTooltip';
import { useTheme } from './ThemeProvider';

const vibeChips = [
  { id: 'cafe', icon: '☕', label: 'Cafe', type: 'chip' as const },
  { id: 'work', icon: '💼', label: 'Làm việc', type: 'chip' as const },
  { id: 'restaurant', icon: '🍜', label: 'Nhà hàng', type: 'chip' as const },
  { id: 'brunch', icon: '🥐', label: 'Brunch', type: 'chip' as const },
];

interface MapViewProps {
  credits: number;
  setCredits: (credits: number) => void;
}

export function MapView({ credits, setCredits }: MapViewProps) {
  const { isDark } = useTheme();
  const [selectedLocation, setSelectedLocation] = useState<Place | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [isSmartSheetOpen, setIsSmartSheetOpen] = useState(false);
  const [sheetTrigger, setSheetTrigger] = useState<'chip' | 'search'>('chip');
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchArea, setShowSearchArea] = useState(false);
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const [wasSmartSheetOpen, setWasSmartSheetOpen] = useState(false); // NEW: Track if smart sheet was open before details
  const [isWalletSheetOpen, setIsWalletSheetOpen] = useState(false);
  
  // Map legend tooltip state
  const [showFirstTimeTooltip, setShowFirstTimeTooltip] = useState(() => {
    if (typeof window === 'undefined') return false;
    return !localStorage.getItem('lyrai_map_legend_seen');
  });

  const handleDismissTooltip = () => {
    setShowFirstTimeTooltip(false);
    if (typeof window !== 'undefined') {
      localStorage.setItem('lyrai_map_legend_seen', 'true');
    }
  };

  const handleLocationClick = (location: Place) => {
    setSelectedLocation(location);
    setIsDetailsOpen(true);
    // NEW: Remember if smart sheet was open, then close it temporarily
    setWasSmartSheetOpen(isSmartSheetOpen);
    setIsSmartSheetOpen(false);
  };

  const handleChipClick = () => {
    setSheetTrigger('chip');
    setIsSmartSheetOpen(true);
  };

  const handleSearchClick = () => {
    setSheetTrigger('search');
    setIsSmartSheetOpen(true);
  };

  const handleUnlock = () => {
    if (credits > 0) {
      setCredits(credits - 1);
    }
  };

  const handleSave = () => {
    console.log('Location saved');
  };

  // NEW: Handler for closing details sheet
  const handleCloseDetails = () => {
    setIsDetailsOpen(false);
    // Reopen smart sheet if it was open before
    if (wasSmartSheetOpen) {
      setIsSmartSheetOpen(true);
      setWasSmartSheetOpen(false); // Reset tracker
    }
  };

  return (
    <div className={`relative w-full h-full overflow-hidden flex ${isDark ? 'bg-[#0F172A]' : 'bg-slate-100'}`}>
      {/* MAP CANVAS (Full Width) */}
      <div className="flex-1 relative">
        {/* Map Background */}
        <div className={`absolute inset-0 ${isDark ? 'bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]' : 'bg-gradient-to-br from-slate-100 via-slate-200 to-slate-100'}`}>
          {/* Grid pattern */}
          <div 
            className={`absolute inset-0 ${isDark ? 'opacity-5' : 'opacity-10'}`}
            style={{
              backgroundImage: isDark 
                ? `linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)`
                : `linear-gradient(rgba(148,163,184,0.3) 1px, transparent 1px), linear-gradient(90deg, rgba(148,163,184,0.3) 1px, transparent 1px)`,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Simulated roads */}
          <svg className={`absolute inset-0 w-full h-full ${isDark ? 'opacity-10' : 'opacity-15'}`}>
            <line x1="20%" y1="0" x2="20%" y2="100%" stroke={isDark ? '#64748B' : '#94A3B8'} strokeWidth="2" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke={isDark ? '#94A3B8' : '#CBD5E1'} strokeWidth="3" />
            <line x1="80%" y1="0" x2="80%" y2="100%" stroke={isDark ? '#64748B' : '#94A3B8'} strokeWidth="2" />
            <line x1="0" y1="30%" x2="100%" y2="30%" stroke={isDark ? '#64748B' : '#94A3B8'} strokeWidth="2" />
            <line x1="0" y1="60%" x2="100%" y2="60%" stroke={isDark ? '#94A3B8' : '#CBD5E1'} strokeWidth="3" />
          </svg>

          {/* Water area */}
          <div className={`absolute bottom-0 left-0 w-1/3 h-1/4 rounded-tl-full ${isDark ? 'bg-gradient-to-tr from-blue-950/30 to-cyan-900/20 opacity-40' : 'bg-gradient-to-tr from-blue-200/40 to-cyan-100/30 opacity-60'}`} />
        </div>

        {/* DESKTOP: Floating Search Panel (Left Side) */}
        <div className="hidden lg:block absolute top-6 left-6 z-20 w-96">
          <div className={`backdrop-blur-2xl border rounded-3xl p-6 shadow-2xl space-y-4 ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/80 border-slate-200'}`}>
            {/* Search Input */}
            <div className={`relative backdrop-blur-xl border rounded-2xl p-4 shadow-lg ${isDark ? 'bg-white/10 border-white/20' : 'bg-slate-100 border-slate-200'}`}>
              <div className="flex items-center gap-3">
                <Search className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-slate-400'}`} />
                <input
                  type="text"
                  placeholder="Tìm món ăn, địa điểm..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  onFocus={handleSearchClick}
                  className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-gray-500' : 'text-slate-900 placeholder-slate-400'}`}
                />
              </div>
            </div>

            {/* Vibe Chips */}
            <div className="space-y-2">
              <p className={`text-xs font-semibold ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>Khám phá nhanh</p>
              <div className="flex flex-wrap gap-2">
                {vibeChips.map((chip) => (
                  <button
                    key={chip.id}
                    onClick={handleChipClick}
                    className={`flex items-center gap-2 px-4 py-2 backdrop-blur-xl border rounded-full text-sm whitespace-nowrap transition-all ${isDark ? 'bg-white/5 hover:bg-[#FF6F4C]/20 border-white/10 hover:border-[#FF6F4C]/30 text-white' : 'bg-slate-50 hover:bg-[#FF6F4C]/10 border-slate-200 hover:border-[#FF6F4C]/30 text-slate-700'}`}
                  >
                    <span>{chip.icon}</span>
                    {chip.label}
                  </button>
                ))}
              </div>
            </div>

            {/* Desktop Location List Preview */}
            <div className="space-y-2 max-h-[400px] overflow-y-auto scrollbar-hide">
              {getAllPlaces().slice(0, 5).map((location) => (
                <button
                  key={location.id}
                  onClick={() => handleLocationClick(location)}
                  onMouseEnter={() => setHoveredPinId(location.id)}
                  onMouseLeave={() => setHoveredPinId(null)}
                  className={`w-full backdrop-blur-xl border rounded-2xl p-3 transition-all text-left group ${isDark ? 'bg-white/5 hover:bg-white/10 border-white/10' : 'bg-white hover:bg-slate-50 border-slate-200'}`}
                >
                  <div className="flex gap-3">
                    <div className="relative w-16 h-16 rounded-xl overflow-hidden flex-shrink-0">
                      <img src={location.images[0]} alt={location.name} className="w-full h-full object-cover" />
                      {location.isSaved && (
                        <div className="absolute top-1 right-1 w-5 h-5 rounded-full flex items-center justify-center" style={{
                          background: 'linear-gradient(135deg, #FF6F4C, #FF8C42)',
                          boxShadow: '0 0 8px rgba(255, 111, 76, 0.6)'
                        }}>
                          <MapPin className="w-3 h-3 text-white fill-current" />
                        </div>
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <h4 className={`font-semibold text-sm mb-1 truncate group-hover:text-[#7C3AED] transition-colors ${isDark ? 'text-white' : 'text-slate-900'}`}>
                        {location.name}
                      </h4>
                      <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-gray-400' : 'text-slate-500'}`}>
                        <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                        <span className={`${isDark ? 'text-white' : 'text-slate-900'}`}>{location.rating}</span>
                        <span>•</span>
                        <span>{location.distance}</span>
                      </div>
                    </div>
                  </div>
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* MOBILE: Floating Search Bar */}
        <div className="lg:hidden absolute top-4 left-4 right-4 z-20">
          <div className={`relative backdrop-blur-xl border rounded-2xl p-4 shadow-2xl ${isDark ? 'bg-white/10 border-white/20' : 'bg-white/80 border-slate-200'}`}>
            <div className="flex items-center gap-3">
              <Search className={`w-5 h-5 ${isDark ? 'text-gray-400' : 'text-slate-400'}`} />
              <input
                type="text"
                placeholder="Tìm món ăn, địa điểm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                onFocus={handleSearchClick}
                className={`flex-1 bg-transparent outline-none text-sm ${isDark ? 'text-white placeholder-gray-500' : 'text-slate-900 placeholder-slate-400'}`}
              />
            </div>
          </div>

          {/* Vibe Chips */}
          <div className="flex gap-2 mt-3 overflow-x-auto scrollbar-hide">
            {vibeChips.map((chip) => (
              <button
                key={chip.id}
                onClick={handleChipClick}
                className={`flex items-center gap-2 px-3 py-2 backdrop-blur-xl border rounded-full text-sm whitespace-nowrap ${isDark ? 'bg-white/10 border-white/20 text-white' : 'bg-white/80 border-slate-200 text-slate-700'}`}
              >
                <span>{chip.icon}</span>
                {chip.label}
              </button>
            ))}
          </div>
        </div>

        {/* Map Pins - Two States */}
        {/* SAFE ZONE STRATEGY: Avoid bottom 120px (bottom nav ~100px + safety margin) */}
        {/* Keep pins in middle-to-top area for visibility */}
        <div className="absolute inset-0 z-10">
          {getAllPlaces().map((location, index) => {
            // BALANCED POSITIONS: Middle and upper-middle area (avoid bottom ~15%)
            const positions = [
              { top: '30%', left: '25%' },   // Mid-left
              { top: '35%', left: '70%' },   // Mid-right
              { top: '50%', left: '45%' },   // Center (safe from bottom nav)
              { top: '40%', left: '65%' },   // Mid-right-center
              { top: '45%', left: '28%' },   // Mid-left-center
            ];
            const position = positions[index] || { top: '50%', left: '50%' };
            const isHovered = hoveredPinId === location.id;

            // Get emoji icon based on type
            const getEmojiIcon = () => {
              if (location.type === 'cafe') return '☕';
              if (location.type === 'restaurant') return '🍜';
              if (location.type === 'bar') return '🍷';
              return '📍';
            };

            return (
              <motion.button
                key={location.id}
                onClick={() => handleLocationClick(location)}
                onMouseEnter={() => setHoveredPinId(location.id)}
                onMouseLeave={() => setHoveredPinId(null)}
                className="absolute transform -translate-x-1/2 -translate-y-1/2 group"
                style={position}
                whileHover={{ scale: 1.1 }}
              >
                {/* LAYER 1: Saved Pins (Coral Solid Drop Shape with Bookmark Badge) */}
                {location.isSaved && (
                  <div className="relative z-20">
                    <div className="w-12 h-12 rounded-full rounded-bl-none transform rotate-45 shadow-xl" style={{
                      background: 'linear-gradient(135deg, #FF6F4C 0%, #FF8C42 100%)',
                      boxShadow: '0 8px 24px rgba(255, 111, 76, 0.6), 0 0 40px rgba(255, 111, 76, 0.4)'
                    }}>
                      <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                        <span className="text-xl">{getEmojiIcon()}</span>
                      </div>

                      {/* Bookmark Badge - Top Right (SAVED ONLY) */}
                      <motion.div
                        className="absolute flex items-center justify-center rounded-full"
                        style={{
                          top: '-12px',
                          right: '-12px',
                          width: '32px',
                          height: '32px',
                          background: '#FF6F4C',
                          border: '3px solid #1A2332',
                          boxShadow: '0 4px 16px rgba(255, 111, 76, 0.6), 0 0 8px rgba(255, 111, 76, 0.4)',
                          transform: 'rotate(-45deg)' // Counter-rotate to keep badge upright
                        }}
                        initial={{ scale: 0, rotate: -55 }}
                        animate={{ scale: 1, rotate: -45 }}
                        transition={{ delay: 0.3, type: 'spring', stiffness: 400, damping: 15 }}
                      >
                        <Bookmark className="w-4 h-4 text-white fill-current" />
                      </motion.div>
                    </div>
                  </div>
                )}

                {/* LAYER 2: Ghost Pins (Outlined with Emoji - WITH PULSE ANIMATION) */}
                {!location.isSaved && (
                  <div className="relative z-10">
                    <div className={`w-12 h-12 backdrop-blur-md border-2 rounded-full rounded-bl-none transform rotate-45 shadow-lg transition-all ${
                      isHovered 
                        ? 'bg-white/25 border-white/40' 
                        : 'bg-white/10 border-[#94A3B8]'
                    }`}>
                      <div className="absolute inset-0 flex items-center justify-center -rotate-45">
                        <span className="text-xl opacity-90">{getEmojiIcon()}</span>
                      </div>
                    </div>
                    {/* PULSE ANIMATION for ghost pins - attract user to unlock */}
                    <motion.div
                      className="absolute top-0 left-0 w-12 h-12 border-2 border-[#94A3B8] rounded-full rounded-bl-none transform rotate-45"
                      animate={{
                        scale: [1, 1.4, 1],
                        opacity: [0.6, 0, 0.6]
                      }}
                      transition={{
                        duration: 2.5,
                        repeat: Infinity,
                        ease: "easeOut"
                      }}
                    />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>

        {/* "Search This Area" Button */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: showSearchArea ? 0 : 100, opacity: showSearchArea ? 1 : 0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <button
            onClick={() => setShowSearchArea(false)}
            className="px-6 py-3 bg-gradient-to-r from-[#FF6F4C] to-[#FF8C42] hover:from-[#FF5733] hover:to-[#FF6F4C] text-white rounded-full font-semibold shadow-xl shadow-[#FF6F4C]/50 flex items-center gap-2 transition-all"
          >
            Tìm khu vực này
            <Sparkles className="w-5 h-5" />
          </button>
        </motion.div>

        {/* My Location Button */}
        <button
          onClick={() => setShowSearchArea(!showSearchArea)}
          className={`absolute bottom-[120px] right-8 z-20 backdrop-blur-xl border p-4 rounded-full transition-all shadow-lg lg:bottom-8 ${isDark ? 'bg-white/10 hover:bg-white/20 border-white/20' : 'bg-white/80 hover:bg-white border-slate-200'}`}
        >
          <Navigation className={`w-6 h-6 ${isDark ? 'text-white' : 'text-slate-700'}`} />
        </button>
      </div>

      {/* MOBILE: Smart Bottom Sheet */}
      <SmartBottomSheet
        isOpen={isSmartSheetOpen}
        onClose={() => setIsSmartSheetOpen(false)}
        trigger={sheetTrigger}
        locations={getAllPlaces()}
        onLocationClick={handleLocationClick}
      />

      {/* Place Details Sheet */}
      {selectedLocation && (
        <PlaceDetailsSheet
          place={selectedLocation}
          isOpen={isDetailsOpen}
          onClose={handleCloseDetails} // NEW: Use new handler
          onSave={handleSave}
          credits={credits}
          onUnlock={handleUnlock}
          isSaved={selectedLocation.isSaved} // Pass saved state
        />
      )}

      {/* Floating WalletChip - Top Right (Mobile & Desktop) with Safe Area */}
      <div 
        style={{ top: 'max(16px, env(safe-area-inset-top, 0px))' }}
        className="fixed right-4 lg:top-6 lg:right-6 z-50"
      >
        <WalletChip 
          credits={credits} 
          onClick={() => setIsWalletSheetOpen(true)}
        />
      </div>

      {/* Mini Wallet Sheet */}
      <MiniWalletSheet
        isOpen={isWalletSheetOpen}
        onClose={() => setIsWalletSheetOpen(false)}
        credits={credits}
        freeCredits={3}
        paidCredits={credits - 3}
        onTopUp={() => {
          setIsWalletSheetOpen(false);
        }}
      />

      {/* Map Legend */}
      <MapLegend />

      {/* First Time Map Tooltip */}
      <AnimatePresence>
        {showFirstTimeTooltip && (
          <FirstTimeMapTooltip
            onDismiss={handleDismissTooltip}
          />
        )}
      </AnimatePresence>
    </div>
  );
}