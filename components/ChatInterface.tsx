import { useState } from 'react';
import { Send, Image as ImageIcon, Camera, Loader2 } from 'lucide-react';
import { PlaceDetailCard } from './PlaceDetailCard';
import { PlaceDetailsSheet } from './PlaceDetailsSheet';

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

interface Message {
  id: string;
  type: 'user' | 'ai' | 'thinking';
  content?: string;
  imageUrl?: string;
  places?: PlaceDetail[];
}

interface ChatInterfaceProps {
  onSaveLocation: (location: any) => void;
  onSheetOpenChange?: (isOpen: boolean) => void;
}

export function ChatInterface({ onSaveLocation, onSheetOpenChange }: ChatInterfaceProps) {
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      type: 'user',
      content: 'Thông tin quán này?',
      imageUrl: 'https://images.unsplash.com/photo-1521017432531-fbd92d768814?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxjb2ZmZWUlMjBzaG9wJTIwaW50ZXJpb3J8ZW58MXx8fHwxNzY1MjkwNTI1fDA&ixlib=rb-4.1.0&q=80&w=1080',
    },
    {
      id: '2',
      type: 'ai',
      content: 'Tìm thấy 2 địa điểm từ hình ảnh của bạn:',
      places: [
        {
          id: 'p1',
          name: 'The Hideout Coffee & Bar',
          category: 'Cafe & Bar',
          rating: 4.5,
          reviewCount: 200,
          address: '15 Lê Thánh Tôn, Bến Nghé, Quận 1, TP.HCM',
          hours: '8:00 - 23:00',
          isOpen: true,
          vibe: ['Rooftop', 'Chill', 'View Landmark 81', 'Instagrammable'],
          priceRange: '80.000đ - 250.000đ',
          image: 'https://images.unsplash.com/photo-1585825228520-91eb348cf0b4?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHx2aWV0bmFtZXNlJTIwY2FmZSUyMGludGVyaW9yfGVufDF8fHx8MTc2NTMwMDk0NHww&ixlib=rb-4.1.0&q=80&w=1080',
        },
        {
          id: 'p2',
          name: 'Sky Lounge Saigon',
          category: 'Rooftop Bar',
          rating: 4.7,
          reviewCount: 350,
          address: '98 Nguyễn Huệ, Bến Nghé, Quận 1, TP.HCM',
          hours: '17:00 - 01:00',
          isOpen: true,
          vibe: ['Luxury', 'Sunset View', 'Live Music', 'Date Spot'],
          priceRange: '150.000đ - 500.000đ',
          image: 'https://images.unsplash.com/photo-1653087639822-cdb964a68774?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxyb29mdG9wJTIwYmFyJTIwY2l0eSUyMHZpZXd8ZW58MXx8fHwxNzY1MzAwOTQ0fDA&ixlib=rb-4.1.0&q=80&w=1080',
        },
      ],
    },
  ]);
  const [inputValue, setInputValue] = useState('');
  const [selectedImage, setSelectedImage] = useState<string | null>(null);
  const [selectedPlace, setSelectedPlace] = useState<PlaceDetail | null>(null);
  const [isSheetOpen, setIsSheetOpen] = useState(false);

  const handleCardClick = (place: PlaceDetail) => {
    setSelectedPlace(place);
    setIsSheetOpen(true);
    if (onSheetOpenChange) {
      onSheetOpenChange(true);
    }
  };

  const handleCloseSheet = () => {
    setIsSheetOpen(false);
    if (onSheetOpenChange) {
      onSheetOpenChange(false);
    }
  };

  const handleSaveFromSheet = () => {
    if (selectedPlace) {
      onSaveLocation(selectedPlace);
    }
  };

  const handleSend = () => {
    if (!inputValue.trim() && !selectedImage) return;
    
    const newMessage: Message = {
      id: Date.now().toString(),
      type: 'user',
      content: inputValue,
      imageUrl: selectedImage || undefined,
    };
    
    setMessages([...messages, newMessage]);
    setInputValue('');
    setSelectedImage(null);
    
    // Simulate AI thinking
    setTimeout(() => {
      setMessages(prev => [...prev, {
        id: (Date.now() + 1).toString(),
        type: 'thinking',
      }]);
    }, 500);
  };

  return (
    <div className="flex flex-col h-full bg-background">
      {/* Header */}
      <div className="px-6 py-4 border-b border-border bg-card/50 backdrop-blur-sm">
        <h2>Research Assistant</h2>
        <p className="text-muted-foreground text-sm">Upload photos to discover places</p>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto px-4 py-6 space-y-4">
        {messages.map((message) => (
          <div key={message.id}>
            {message.type === 'user' && (
              <div className="flex justify-end">
                <div className="max-w-[80%] bg-primary text-primary-foreground rounded-3xl rounded-tr-lg overflow-hidden">
                  {message.imageUrl && (
                    <img
                      src={message.imageUrl}
                      alt="Uploaded"
                      className="w-full"
                    />
                  )}
                  {message.content && (
                    <p className="px-5 py-3">{message.content}</p>
                  )}
                </div>
              </div>
            )}
            
            {message.type === 'thinking' && (
              <div className="flex justify-start">
                <div className="bg-muted/50 rounded-3xl rounded-tl-lg px-5 py-4 flex items-center gap-3">
                  <Loader2 className="w-4 h-4 animate-spin text-primary" />
                  <p className="text-muted-foreground text-sm">AI đang phân tích...</p>
                </div>
              </div>
            )}
            
            {message.type === 'ai' && (
              <div className="flex justify-start">
                <div className="max-w-[85%] space-y-3">
                  {message.content && (
                    <div className="bg-muted/50 rounded-3xl rounded-tl-lg px-5 py-3">
                      <p>{message.content}</p>
                    </div>
                  )}
                  
                  {message.places && message.places.length > 0 && (
                    <div className="space-y-3">
                      {message.places.map((place) => (
                        <PlaceDetailCard
                          key={place.id}
                          place={place}
                          onSave={onSaveLocation}
                          onViewDetails={handleCardClick}
                        />
                      ))}
                    </div>
                  )}
                </div>
              </div>
            )}
          </div>
        ))}
      </div>

      {/* Selected Image Preview */}
      {selectedImage && (
        <div className="px-4 pb-2">
          <div className="relative inline-block">
            <img
              src={selectedImage}
              alt="Selected"
              className="h-20 rounded-2xl"
            />
            <button
              onClick={() => setSelectedImage(null)}
              className="absolute -top-2 -right-2 bg-destructive text-destructive-foreground rounded-full p-1"
            >
              <span className="text-xs px-1">✕</span>
            </button>
          </div>
        </div>
      )}

      {/* Input Bar */}
      <div className="p-4 border-t border-border bg-card/50 backdrop-blur-sm">
        <div className="flex items-center gap-2 bg-input-background rounded-3xl px-4 py-2">
          <button className="p-2 hover:bg-accent rounded-full transition-colors">
            <ImageIcon className="w-5 h-5 text-primary" />
          </button>
          
          <button className="p-2 hover:bg-accent rounded-full transition-colors">
            <Camera className="w-5 h-5 text-primary" />
          </button>
          
          <input
            type="text"
            placeholder="Hỏi về địa điểm..."
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            onKeyPress={(e) => e.key === 'Enter' && handleSend()}
            className="flex-1 bg-transparent outline-none"
          />
          
          <button
            onClick={handleSend}
            className="p-2 bg-primary text-primary-foreground rounded-full hover:opacity-90 transition-opacity"
          >
            <Send className="w-5 h-5" />
          </button>
        </div>
      </div>

      {/* Place Details Sheet */}
      {selectedPlace && (
        <PlaceDetailsSheet
          place={selectedPlace}
          isOpen={isSheetOpen}
          onClose={handleCloseSheet}
          onSave={handleSaveFromSheet}
        />
      )}
    </div>
  );
}