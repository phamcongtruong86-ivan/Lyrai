import { MapPin, Clock, Sparkles, DollarSign, X } from 'lucide-react';
import type { Place } from '../data/mockPlaces';

interface PlaceCardProps {
  place: Place;
  onViewDetails?: () => void;
  onSave: () => void;
  onCancel?: () => void;
  variant?: 'full' | 'compact';
}

export function PlaceCard({ place, onViewDetails, onSave, onCancel, variant = 'full' }: PlaceCardProps) {
  // Default values for optional fields
  const hours = place.hours || '07:00 - 22:00';
  const isOpen = place.isOpen ?? true;
  const priceRange = place.priceRange || '₫₫';
  
  // Use first image from images array (with fallback for safety)
  const coverImage = place.images?.[0] || 'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800';
  
  return (
    <div className="bg-[#1E293B]/95 backdrop-blur-lg rounded-xl overflow-hidden border border-slate-700/50 shadow-lg hover:shadow-xl transition-shadow">
      {/* Header Image (optional for compact) */}
      {variant === 'full' && (
        <div className="relative h-48 md:h-72 lg:h-96 w-full">
          <img 
            src={coverImage} 
            alt={place.name} 
            className="w-full h-full object-cover"
          />
          {onCancel && (
            <button
              onClick={onCancel}
              className="absolute top-2 right-2 md:top-4 md:right-4 w-8 h-8 md:w-10 md:h-10 bg-black/50 backdrop-blur-sm rounded-full flex items-center justify-center text-white hover:bg-black/70 transition-colors"
            >
              <X className="w-4 h-4 md:w-5 md:h-5" />
            </button>
          )}
        </div>
      )}
      
      {/* Content */}
      <div className="p-4 md:p-6 lg:p-8 space-y-3 md:space-y-4 lg:space-y-5">
        {/* Header Section */}
        <div className="flex items-start justify-between gap-2 md:gap-4">
          <div className="flex-1">
            <h3 className="text-lg md:text-2xl lg:text-3xl mb-1 md:mb-2 line-clamp-2 text-white font-bold">{place.name}</h3>
            <span className="inline-block px-2 md:px-3 py-1 md:py-1.5 bg-[#FF6F4C]/15 text-[#FF8C42] text-xs md:text-sm rounded-full font-semibold border border-[#FF6F4C]/30">
              {place.category}
            </span>
          </div>
          <div className="flex items-center gap-1 md:gap-1.5 text-sm md:text-base lg:text-lg whitespace-nowrap">
            <span className="text-yellow-500 text-base md:text-xl">⭐</span>
            <span className="font-semibold text-white">{place.rating}</span>
            <span className="text-gray-400 text-xs md:text-sm">({place.reviewCount} đánh giá)</span>
          </div>
        </div>
        
        {/* Body Section - Info List */}
        <div className="space-y-2 md:space-y-3 text-sm md:text-base">
          {/* Address */}
          <div className="flex items-start gap-2 md:gap-3">
            <MapPin className="w-4 h-4 md:w-5 md:h-5 text-gray-400 mt-0.5 flex-shrink-0" />
            <span className="text-gray-300 flex-1">{place.address}</span>
          </div>
          
          {/* Hours */}
          <div className="flex items-center gap-2 md:gap-3">
            <Clock className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
            <span className="text-gray-300">{hours}</span>
            <span className={`text-xs md:text-sm px-2 md:px-3 py-0.5 md:py-1 rounded-full font-semibold ${
              isOpen 
                ? 'bg-green-500/20 text-green-400' 
                : 'bg-red-500/20 text-red-400'
            }`}>
              {isOpen ? 'Đang mở' : 'Đã đóng'}
            </span>
          </div>
          
          {/* Vibe/Features */}
          <div className="flex items-start gap-2 md:gap-3">
            <Sparkles className="w-4 h-4 md:w-5 md:h-5 text-[#8B5CF6] mt-0.5 flex-shrink-0" />
            <div className="flex flex-wrap gap-1.5 md:gap-2 flex-1">
              {(place.features || place.vibes || []).slice(0, 6).map((item, idx) => (
                <span 
                  key={idx}
                  className="px-2 md:px-3 py-0.5 md:py-1 bg-[#FF6F4C]/10 text-[#FF8C42] text-xs md:text-sm rounded-full font-medium"
                >
                  {item}
                </span>
              ))}
            </div>
          </div>
          
          {/* Price Range */}
          <div className="flex items-center gap-2 md:gap-3">
            <DollarSign className="w-4 h-4 md:w-5 md:h-5 text-gray-400 flex-shrink-0" />
            <span className="text-gray-300">{priceRange}</span>
          </div>
        </div>
        
        {/* Action Footer */}
        <div className="flex gap-2 md:gap-3 pt-2 md:pt-4">
          {onViewDetails && (
            <button
              onClick={onViewDetails}
              className="flex-1 py-3 md:py-4 lg:py-5 bg-slate-800/50 border-2 border-[#FF6F4C] text-[#FF8C42] rounded-xl hover:bg-[#FF6F4C]/5 transition-colors font-semibold text-sm md:text-base"
            >
              Xem ảnh & Đánh giá
            </button>
          )}
          <button
            onClick={onSave}
            className="flex-1 py-3 md:py-4 lg:py-5 bg-gradient-to-r from-[#FF6F4C] to-[#FF8C42] text-white rounded-xl hover:from-[#FF5733] hover:to-[#FF6F4C] transition-colors font-semibold text-sm md:text-base shadow-lg shadow-[#FF6F4C]/30"
          >
            Lưu địa điểm này
          </button>
        </div>
      </div>
    </div>
  );
}