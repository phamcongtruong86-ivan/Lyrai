import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  MessageCircle,
  Map, 
  Bookmark, 
  Sparkles, 
  Search,
  Navigation,
  Star,
  MapPin as MapPinIcon,
  Heart
} from 'lucide-react';
import { getAllPlaces, type Place } from '../data/mockPlaces';
import { MapMarker } from './MapMarker';
import { PlaceDetailsSheet } from './PlaceDetailsSheet';
import { MapLegend } from './MapLegend';
import { FirstTimeMapTooltip } from './FirstTimeMapTooltip';
import logoImage from 'figma:asset/d10dac4378c8030eb921c82fde9252a169ca91a1.png';

interface DesktopMapViewProps {
  userAvatar: string;
  onNavigate: (tab: 'home' | 'map' | 'saved') => void;
  currentTab: string;
  credits?: number;
  setCredits?: (credits: number) => void;
}

const vibeChips = [
  { id: 'cafe', icon: '☕', label: 'Cafe' },
  { id: 'work', icon: '💼', label: 'Làm việc' },
  { id: 'restaurant', icon: '🍜', label: 'Nhà hàng' },
  { id: 'brunch', icon: '🥐', label: 'Brunch' },
];

export function DesktopMapView({ 
  userAvatar, 
  onNavigate, 
  currentTab,
  credits = 50,
  setCredits
}: DesktopMapViewProps) {
  const [selectedLocation, setSelectedLocation] = useState<Place | null>(null);
  const [isDetailsOpen, setIsDetailsOpen] = useState(false);
  const [hoveredPinId, setHoveredPinId] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showSearchArea, setShowSearchArea] = useState(false);
  
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

  const allPlaces = getAllPlaces();

  const handleLocationClick = (location: Place) => {
    setSelectedLocation(location);
    setIsDetailsOpen(true);
  };

  const handleUnlock = () => {
    if (credits > 0 && setCredits) {
      setCredits(credits - 1);
    }
  };

  const handleSave = () => {
    console.log('Location saved');
  };

  // Pin positions - More markers for desktop (10 places)
  const pinPositions = [
    { top: '25%', left: '35%' },   // Saved place 1
    { top: '40%', left: '60%' },   // Saved place 2
    { top: '55%', left: '45%' },   // Saved place 3
    { top: '35%', left: '75%' },   // Saved place 4
    { top: '50%', left: '30%' },   // Saved place 5
    { top: '30%', left: '50%' },   // Ghost place 1
    { top: '45%', left: '70%' },   // Ghost place 2
    { top: '60%', left: '35%' },   // Ghost place 3
    { top: '38%', left: '42%' },   // Ghost place 4
    { top: '52%', left: '65%' },   // Ghost place 5
  ];

  return (
    <div className="flex h-screen bg-[#0f172a] overflow-hidden">
      {/* SIDEBAR (340px) - Redesigned as per ảnh 3 */}
      <motion.div
        initial={{ x: -20, opacity: 0 }}
        animate={{ x: 0, opacity: 1 }}
        className="w-[340px] bg-[#1e293b]/90 backdrop-blur-xl border-r border-white/5 flex flex-col relative z-20"
      >
        {/* Header Section */}
        <div className="p-6 space-y-4">
          {/* Logo Text */}
          <div>
            <h1 className="text-2xl font-bold text-white">Lyrai</h1>
            <p className="text-sm text-gray-400">AI Location Assistant</p>
          </div>

          {/* Search Bar */}
          <div className="relative backdrop-blur-xl bg-white/5 border border-white/10 rounded-2xl p-3.5">
            <div className="flex items-center gap-3">
              <Search className="w-5 h-5 text-gray-400 flex-shrink-0" />
              <input
                type="text"
                placeholder="Tìm món ăn, địa điểm..."
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="flex-1 bg-transparent text-white placeholder-gray-500 outline-none text-sm"
              />
            </div>
          </div>

          {/* Smart Chips */}
          <div className="space-y-2">
            <p className="text-xs text-gray-400 font-semibold px-1">Khám phá nhanh</p>
            <div className="flex flex-wrap gap-2">
              {vibeChips.map((chip) => (
                <button
                  key={chip.id}
                  className="flex items-center gap-2 px-3 py-2 backdrop-blur-xl bg-white/5 hover:bg-[#FF6F4C]/20 border border-white/10 hover:border-[#FF6F4C]/30 rounded-full text-sm text-white whitespace-nowrap transition-all"
                >
                  <span>{chip.icon}</span>
                  {chip.label}
                </button>
              ))}
            </div>
          </div>
        </div>

        {/* Place Cards List (Scrollable) */}
        <div className="flex-1 overflow-y-auto scrollbar-hide px-6 pb-6 space-y-3">
          <p className="text-xs text-gray-400 font-semibold mb-2">Địa điểm gần bạn</p>
          
          {allPlaces.slice(0, 8).map((location) => (
            <button
              key={location.id}
              onClick={() => handleLocationClick(location)}
              onMouseEnter={() => setHoveredPinId(location.id)}
              onMouseLeave={() => setHoveredPinId(null)}
              className="w-full backdrop-blur-xl bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#8B5CF6]/30 rounded-2xl p-3 transition-all text-left group relative"
            >
              {/* Heart Badge - Top Right Corner of Card */}
              {location.isSaved && (
                <div className="absolute -top-2 -right-2 w-6 h-6 rounded-full flex items-center justify-center shadow-lg border-2 border-[#0F172A] z-10" style={{
                  background: 'linear-gradient(135deg, #FF6F4C, #FF8C42)',
                  boxShadow: '0 0 8px rgba(255, 111, 76, 0.6)'
                }}>
                  <Heart className="w-3.5 h-3.5 text-white fill-current" />
                </div>
              )}
              
              <div className="flex gap-3">
                <div className="relative w-14 h-14 rounded-xl overflow-hidden flex-shrink-0">
                  <img src={location.images[0]} alt={location.name} className="w-full h-full object-cover" />
                </div>
                <div className="flex-1 min-w-0">
                  <h4 className="font-semibold text-white text-sm mb-1 truncate group-hover:text-[#FF8C42] transition-colors">
                    {location.name}
                  </h4>
                  <div className="flex items-center gap-2 text-xs text-gray-400">
                    <Star className="w-3 h-3 fill-yellow-400 text-yellow-400" />
                    <span className="text-white font-medium">{location.rating}</span>
                    <span>•</span>
                    <span>{location.distance}</span>
                  </div>
                </div>
              </div>
            </button>
          ))}
        </div>
      </motion.div>

      {/* MAP SECTION (Flex-1) */}
      <div className="flex-1 relative">
        {/* Dark Map Background */}
        <div className="absolute inset-0 bg-gradient-to-br from-[#0F172A] via-[#1E293B] to-[#0F172A]">
          {/* Grid pattern */}
          <div 
            className="absolute inset-0 opacity-5"
            style={{
              backgroundImage: `
                linear-gradient(rgba(124,58,237,0.3) 1px, transparent 1px),
                linear-gradient(90deg, rgba(124,58,237,0.3) 1px, transparent 1px)
              `,
              backgroundSize: '50px 50px',
            }}
          />
          
          {/* Simulated roads */}
          <svg className="absolute inset-0 w-full h-full opacity-10">
            <line x1="20%" y1="0" x2="20%" y2="100%" stroke="#64748B" strokeWidth="2" />
            <line x1="50%" y1="0" x2="50%" y2="100%" stroke="#94A3B8" strokeWidth="3" />
            <line x1="80%" y1="0" x2="80%" y2="100%" stroke="#64748B" strokeWidth="2" />
            <line x1="0" y1="30%" x2="100%" y2="30%" stroke="#64748B" strokeWidth="2" />
            <line x1="0" y1="60%" x2="100%" y2="60%" stroke="#94A3B8" strokeWidth="3" />
          </svg>

          {/* Water area */}
          <div className="absolute bottom-0 left-0 w-1/3 h-1/4 bg-gradient-to-tr from-blue-950/30 to-cyan-900/20 rounded-tl-full opacity-40" />
        </div>

        {/* PILL MARKERS (Desktop Only) */}
        <div className="absolute inset-0 z-10">
          {allPlaces.slice(0, 10).map((location, index) => (
            <MapMarker
              key={location.id}
              place={location}
              isHovered={hoveredPinId === location.id}
              isSelected={selectedLocation?.id === location.id}
              onClick={() => handleLocationClick(location)}
              onMouseEnter={() => setHoveredPinId(location.id)}
              onMouseLeave={() => setHoveredPinId(null)}
              position={pinPositions[index] || { top: '50%', left: '50%' }}
            />
          ))}
        </div>

        {/* "Tìm khu vực này" Button - Floating at Bottom Center */}
        <motion.div
          initial={{ y: 100, opacity: 0 }}
          animate={{ y: showSearchArea ? 0 : 100, opacity: showSearchArea ? 1 : 0 }}
          className="absolute bottom-8 left-1/2 -translate-x-1/2 z-20"
        >
          <button
            onClick={() => setShowSearchArea(false)}
            className="px-6 py-3 bg-gradient-to-r from-[#FF6F4C] to-[#FF8C42] hover:from-[#FF5733] hover:to-[#FF6F4C] text-white rounded-full font-semibold shadow-xl shadow-[#FF6F4C]/50 flex items-center gap-2 transition-all"
          >
            <MapPinIcon className="w-5 h-5" />
            Tìm khu vực này
          </button>
        </motion.div>

        {/* My Location Button - Bottom Right */}
        <button
          onClick={() => setShowSearchArea(!showSearchArea)}
          className="absolute bottom-8 right-8 z-20 backdrop-blur-xl bg-white/10 hover:bg-white/20 border border-white/20 p-4 rounded-full transition-all shadow-lg"
        >
          <Navigation className="w-6 h-6 text-white" />
        </button>

        {/* Map Legend - Bottom Left of Map Area */}
        <MapLegend variant="desktop" />
      </div>

      {/* Place Details Sheet */}
      {selectedLocation && (
        <PlaceDetailsSheet
          place={selectedLocation}
          isOpen={isDetailsOpen}
          onClose={() => setIsDetailsOpen(false)}
          onSave={handleSave}
          credits={credits}
          onUnlock={handleUnlock}
          isSaved={selectedLocation.isSaved}
        />
      )}

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