import { useState } from 'react';
import { Star, MapPin } from 'lucide-react';
import Masonry from 'react-responsive-masonry';
import { useTheme } from './ThemeProvider';

interface SavedPlace {
  id: string;
  name: string;
  image: string;
  rating: number;
  category: 'cafe' | 'restaurant' | 'hidden-gem';
  highlightTags: string[]; // AI-generated highlight tags (max 3)
}

const mockSavedPlaces: SavedPlace[] = [
  {
    id: '1',
    name: 'The Petal Cafe',
    image: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800',
    rating: 4.7,
    category: 'cafe',
    highlightTags: ['💻 Workspace', '🚀 Wifi nhanh', '☕ Cafe ngon', '🔌 Ổ cắm'],
  },
  {
    id: '2',
    name: 'Moonlight Bistro',
    image: 'https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?w=800',
    rating: 4.5,
    category: 'restaurant',
    highlightTags: ['🥑 Brunch', '🌿 Healthy', '🥗 Salad bar'],
  },
  {
    id: '3',
    name: 'Bar Hoàng Hôn Đỏ',
    image: 'https://images.unsplash.com/photo-1683371266972-bcc9500bd5dc?w=800',
    rating: 4.8,
    category: 'hidden-gem',
    highlightTags: ['🌅 View hoàng hôn', '🍹 Cocktail', '📸 Sống ảo', '🎶 Live music'],
  },
  {
    id: '4',
    name: 'Sunrise Coffee',
    image: 'https://images.unsplash.com/photo-1736520537688-1f1f06b71605?w=800',
    rating: 4.6,
    category: 'cafe',
    highlightTags: ['🥐 Bánh tươi', '🌅 Mở sớm', '🍞 Artisan'],
  },
  {
    id: '5',
    name: 'The Book Nook',
    image: 'https://images.unsplash.com/photo-1760636803247-588f983d1b49?w=800',
    rating: 4.9,
    category: 'hidden-gem',
    highlightTags: ['📚 Sách', '☔ Ngày mưa', '☕ Ấm cúng', '🤫 Yên tĩnh'],
  },
  {
    id: '6',
    name: 'Bamboo House',
    image: 'https://images.unsplash.com/photo-1635379511574-bc167ca085c8?w=800',
    rating: 4.7,
    category: 'restaurant',
    highlightTags: ['🍜 Ramen', '🔥 Tonkotsu', '⭐ Phải thử'],
  },
];

const categories = [
  { id: 'all', label: 'All Places' },
  { id: 'cafe', label: 'Cafes' },
  { id: 'restaurant', label: 'Restaurants' },
  { id: 'hidden-gem', label: 'Hidden Gems' },
];

export function SavedCollections() {
  const { isDark } = useTheme();
  const [selectedCategory, setSelectedCategory] = useState('all');

  const filteredPlaces = selectedCategory === 'all' 
    ? mockSavedPlaces 
    : mockSavedPlaces.filter(place => place.category === selectedCategory);

  return (
    <div className="h-full flex flex-col bg-background">
      {/* Header - Fixed */}
      <div 
        className={`backdrop-blur-xl border-b flex-shrink-0 ${
          isDark 
            ? 'bg-slate-900/60 border-slate-700/50' 
            : 'bg-white/80 border-slate-200/50'
        }`}
        style={{
          paddingTop: 'max(env(safe-area-inset-top), 16px)'
        }}
      >
        <h1 className={`text-xl px-4 pt-4 pb-2 ${isDark ? 'text-white' : 'text-slate-900'}`}>My Saved Places</h1>
        
        {/* Category Filter */}
        <div className="px-4 pb-3 flex gap-2 overflow-x-auto scrollbar-hide">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-4 py-2 rounded-full whitespace-nowrap transition-all flex-shrink-0 ${
                selectedCategory === cat.id
                  ? 'bg-[#FF6F4C] text-white shadow-[0_0_12px_rgba(255,111,76,0.5)]'
                  : isDark
                    ? 'bg-slate-800/40 text-slate-300 hover:bg-slate-700/50 border border-slate-700/50'
                    : 'bg-white text-slate-600 hover:bg-slate-50 border border-slate-200'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>
      </div>

      {/* Scrollable Grid - Masonry Layout */}
      <div 
        className="flex-1 overflow-y-auto overflow-x-hidden p-4"
        style={{
          paddingBottom: 'max(calc(env(safe-area-inset-bottom) + 80px), 96px)'
        }}
      >
        <Masonry columnsCount={2} gutter="16px">
          {filteredPlaces.map((place) => (
            <div
              key={place.id}
              className={`rounded-3xl overflow-hidden shadow-md hover:shadow-xl transition-all group border ${
                isDark 
                  ? 'bg-card border-border' 
                  : 'bg-white border-slate-200/80'
              }`}
            >
              {/* Image */}
              <div className="relative overflow-hidden">
                <img
                  src={place.image}
                  alt={place.name}
                  className="w-full h-auto object-cover group-hover:scale-105 transition-transform duration-300"
                />
                <div className="absolute top-2 right-2">
                  <div className={`backdrop-blur-sm px-2 py-1 rounded-full flex items-center gap-1 ${
                    isDark ? 'bg-background/90' : 'bg-white/90'
                  }`}>
                    <Star className="w-3 h-3 text-primary fill-current" />
                    <span className={`text-xs ${isDark ? 'text-white' : 'text-slate-900'}`}>{place.rating}</span>
                  </div>
                </div>
              </div>

              {/* Content */}
              <div className="p-4 space-y-2">
                <h4 className={isDark ? 'text-white' : 'text-slate-900'}>{place.name}</h4>
                
                <div className={`flex items-center gap-2 text-xs ${isDark ? 'text-muted-foreground' : 'text-slate-500'}`}>
                  <MapPin className="w-3 h-3" />
                  <span className="capitalize">{place.category.replace('-', ' ')}</span>
                </div>

                {/* AI Highlight Tags */}
                <div className="relative">
                  <div className="flex gap-1.5 overflow-x-auto scrollbar-hide pr-8">
                    {place.highlightTags.map((tag, index) => (
                      <span
                        key={index}
                        className="px-2 py-1 bg-[#FF6F4C]/10 text-[#FF8C42] text-xs font-semibold rounded-full whitespace-nowrap flex-shrink-0 border border-[#FF6F4C]/30"
                      >
                        {tag}
                      </span>
                    ))}
                  </div>
                  <div className={`absolute top-0 right-0 h-full w-8 bg-gradient-to-l to-transparent pointer-events-none ${
                    isDark ? 'from-card' : 'from-white'
                  }`} />
                </div>
              </div>
            </div>
          ))}
        </Masonry>
      </div>
    </div>
  );
}
