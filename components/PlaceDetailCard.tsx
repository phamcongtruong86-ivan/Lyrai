import { MapPin, Clock, Sparkles, DollarSign, Star, ExternalLink, Heart } from 'lucide-react';
import { useState } from 'react';

interface PlaceDetail {
  id: string;
  name: string;
  category: string;
  rating: number;
  reviewCount: number;
  address: string;
  hours: string;
  isOpen: boolean;
  vibe: string[];
  priceRange: string;
  image: string;
}

interface PlaceDetailCardProps {
  place: PlaceDetail;
  onSave: (place: PlaceDetail) => void;
  onViewDetails: (place: PlaceDetail) => void;
}

export function PlaceDetailCard({ place, onSave, onViewDetails }: PlaceDetailCardProps) {
  const [isSaved, setIsSaved] = useState(false);

  const handleSave = () => {
    setIsSaved(true);
    onSave(place);
  };

  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-all">
      {/* Image */}
      <div className="relative h-44 overflow-hidden">
        <img
          src={place.image}
          alt={place.name}
          className="w-full h-full object-cover"
        />
      </div>

      {/* Content */}
      <div className="p-4 space-y-4">
        {/* Header */}
        <div>
          <div className="flex items-start justify-between gap-2 mb-2">
            <h3 className="flex-1">{place.name}</h3>
            <div className="flex items-center gap-1 bg-primary/10 text-primary px-2 py-1 rounded-lg shrink-0">
              <Star className="w-3 h-3 fill-current" />
              <span className="text-sm">{place.rating}</span>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <span className="text-sm text-muted-foreground">{place.category}</span>
            <span className="text-muted-foreground">•</span>
            <span className="text-xs text-muted-foreground">{place.reviewCount} đánh giá</span>
          </div>
        </div>

        {/* Info List */}
        <div className="space-y-3">
          {/* Address */}
          <div className="flex items-start gap-3">
            <MapPin className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="flex-1 min-w-0">
              <p className="text-xs text-muted-foreground mb-0.5">Địa chỉ</p>
              <p className="text-sm break-words">{place.address}</p>
            </div>
          </div>

          {/* Opening Hours */}
          <div className="flex items-start gap-3">
            <Clock className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-0.5">Giờ mở cửa</p>
              <div className="flex items-center gap-2">
                <p className="text-sm">{place.hours}</p>
                <span className={`text-xs px-2 py-0.5 rounded-full ${
                  place.isOpen 
                    ? 'bg-green-100 text-green-700 dark:bg-green-900/30 dark:text-green-400' 
                    : 'bg-red-100 text-red-700 dark:bg-red-900/30 dark:text-red-400'
                }`}>
                  {place.isOpen ? 'Đang mở cửa' : 'Đã đóng cửa'}
                </span>
              </div>
            </div>
          </div>

          {/* Vibe/Features */}
          <div className="flex items-start gap-3">
            <Sparkles className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-1.5">Đặc điểm/Vibe</p>
              <div className="flex flex-wrap gap-1.5">
                {place.vibe.map((tag, index) => (
                  <span
                    key={index}
                    className="bg-accent text-accent-foreground px-2 py-1 rounded-lg text-xs"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Price Range */}
          <div className="flex items-start gap-3">
            <DollarSign className="w-4 h-4 text-primary shrink-0 mt-0.5" />
            <div className="flex-1">
              <p className="text-xs text-muted-foreground mb-0.5">Giá tham khảo</p>
              <p className="text-sm">{place.priceRange}</p>
            </div>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex gap-2 pt-2">
          <button
            onClick={() => onViewDetails(place)}
            className="flex-1 border border-border py-3 px-4 rounded-2xl hover:bg-accent transition-colors flex items-center justify-center gap-2"
          >
            <ExternalLink className="w-4 h-4" />
            <span className="text-sm">Xem ảnh & Đánh giá</span>
          </button>
          <button
            onClick={handleSave}
            disabled={isSaved}
            className={`flex-1 py-3 px-4 rounded-2xl transition-all flex items-center justify-center gap-2 ${
              isSaved
                ? 'bg-green-500 text-white'
                : 'bg-primary text-primary-foreground hover:opacity-90'
            }`}
          >
            <Heart className={`w-4 h-4 ${isSaved ? 'fill-current' : ''}`} />
            <span className="text-sm">{isSaved ? 'Đã lưu' : 'Lưu địa điểm'}</span>
          </button>
        </div>
      </div>
    </div>
  );
}
