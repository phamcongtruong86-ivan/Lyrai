import { Star, MapPin, Clock } from 'lucide-react';

interface LocationCardProps {
  location: {
    name: string;
    image: string;
    rating: number;
    isOpen: boolean;
    category: string;
  };
  onSave: () => void;
}

export function LocationCard({ location, onSave }: LocationCardProps) {
  return (
    <div className="bg-card border border-border rounded-3xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow">
      {/* Image */}
      <div className="relative h-48 overflow-hidden">
        <img
          src={location.image}
          alt={location.name}
          className="w-full h-full object-cover"
        />
        <div className="absolute top-3 right-3">
          <span className="bg-accent/90 backdrop-blur-sm text-accent-foreground px-3 py-1 rounded-full text-xs">
            {location.category}
          </span>
        </div>
      </div>

      {/* Content */}
      <div className="p-4 space-y-3">
        <div>
          <h3 className="mb-2">{location.name}</h3>
          
          <div className="flex items-center gap-4 text-sm">
            <div className="flex items-center gap-1 text-primary">
              <Star className="w-4 h-4 fill-current" />
              <span>{location.rating}</span>
            </div>
            
            <div className={`flex items-center gap-1 ${location.isOpen ? 'text-green-600' : 'text-red-600'}`}>
              <Clock className="w-4 h-4" />
              <span>{location.isOpen ? 'Open Now' : 'Closed'}</span>
            </div>
          </div>
        </div>

        {/* Action Button */}
        <button
          onClick={onSave}
          className="w-full bg-primary text-primary-foreground py-3 rounded-2xl hover:opacity-90 transition-opacity flex items-center justify-center gap-2"
        >
          <MapPin className="w-5 h-5" />
          Save to My Map
        </button>
      </div>
    </div>
  );
}
