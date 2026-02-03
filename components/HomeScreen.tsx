import { useState, useRef, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { toast } from 'sonner@2.0.3';
import { PlaceCard } from './PlaceCard';
import { PlaceDetailsSheet } from './PlaceDetailsSheet';
import { NearbyCarousel } from './NearbyCarousel';
import { SAVED_PLACES, NEW_PLACES, type Place } from '../data/mockPlaces';
import logoImage from 'figma:asset/d10dac4378c8030eb921c82fde9252a169ca91a1.png';
import { WalletChip } from './WalletChip';
import { MiniWalletSheet } from './MiniWalletSheet';

interface HomeScreenProps {
  onSaveLocation: (location: any) => void;
  onSheetOpenChange: (isOpen: boolean) => void;
  userAvatar: string;
  onOpenProfile: () => void;
  credits?: number;
}

type AnalyzeState = 'idle' | 'processing' | 'nearby-carousel';

export function HomeScreen({ onSaveLocation, onSheetOpenChange, userAvatar, onOpenProfile, credits }: HomeScreenProps) {
  const [analyzeState, setAnalyzeState] = useState<AnalyzeState>('idle');
  const [inputValue, setInputValue] = useState('');
  const [uploadedImage, setUploadedImage] = useState<string | null>(null);
  const [processingStep, setProcessingStep] = useState(0);
  const [selectedPlace, setSelectedPlace] = useState<Place | null>(null);
  const [isDetailsSheetOpen, setIsDetailsSheetOpen] = useState(false);
  const [isWalletSheetOpen, setIsWalletSheetOpen] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const processingSteps = [
    'AI đang soi ảnh...',
    'Đang đọc review...',
    'Trích xuất đặc điểm...'
  ];

  // Sync isDetailsSheetOpen with parent onSheetOpenChange
  useEffect(() => {
    onSheetOpenChange(isDetailsSheetOpen || analyzeState === 'nearby-carousel');
  }, [isDetailsSheetOpen, analyzeState, onSheetOpenChange]);

  // Mock scan result - A new place with UNLOCKED AI data but NOT SAVED
  const scanResultPlace: Place = {
    id: 'scan-result-1',
    name: 'Cà Phê Ngọc Lan',
    type: 'cafe',
    category: 'Cafe',
    rating: 4.6,
    reviewCount: 342,
    priceRange: '₫₫',
    priceRangeAmount: '40.000 - 80.000', // NEW: Price amount
    distance: '0.5 km',
    address: '86-88 Cao Thắng, Q.3, TP.HCM',
    hours: '7:00 - 22:30',
    closedDays: 'Không nghỉ',
    isOpen: true,
    isSaved: false, // NOT SAVED - Will show "Lưu địa điểm này" button
    
    lat: 40.7589,
    lng: -73.9851,
    
    images: [
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    ],
    
    aiTags: ['Instagram-worthy', 'Wifi mạnh', 'Nhiều góc sống ảo'],
    aiSummary: 'Không gian hiện đại, thiết kế trẻ trung với nhiều góc check-in đẹp. Menu đa dạng từ cà phê đến đồ ăn nhẹ.',
    pros: [
      'Thiết kế đẹp, nhiều góc sống ảo cho Gen Z',
      'Menu đa dạng: cà phê, trà, smoothie, bánh ngọt',
      'Wifi tốc độ cao, ổ điện đầy đủ',
      'Điều hòa mát, nhân viên phục vụ nhanh nhẹn',
    ],
    cons: [
      'Giờ cao điểm (14h-17h) rất đông, ồn ào',
      'Giá hơi cao so với mặt bằng chung (40-80k/ly)',
    ],
    
    vibes: ['Trendy', 'Instagram', 'Làm việc'],
    features: ['Wifi', 'Điều hòa', 'Ổ điện', 'Instagram-worthy'],
  };

  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      toast.info('Đang soi ảnh...');
      const reader = new FileReader();
      reader.onload = (e) => {
        setUploadedImage(e.target?.result as string);
        setAnalyzeState('processing');
        setProcessingStep(0);
        
        const interval = setInterval(() => {
          setProcessingStep((prev) => {
            if (prev < processingSteps.length - 1) {
              return prev + 1;
            } else {
              clearInterval(interval);
              
              toast.success('✅ Phân tích xong!', {
                duration: 2000,
                style: {
                  background: '#10B981',
                  color: 'white',
                }
              });
              
              // Open details sheet directly
              setAnalyzeState('idle');
              setUploadedImage(null);
              setSelectedPlace(scanResultPlace);
              setIsDetailsSheetOpen(true);
              return prev;
            }
          });
        }, 1500);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = () => {
    if (selectedPlace) {
      onSaveLocation(selectedPlace);
      toast.success('Đã lưu ✅');
      resetToIdle();
    }
  };

  const handleCloseDetailsSheet = () => {
    setIsDetailsSheetOpen(false);
    // Reset to idle when closing details sheet
    resetToIdle();
  };

  const resetToIdle = () => {
    setAnalyzeState('idle');
    setUploadedImage(null);
    setSelectedPlace(null);
    setInputValue('');
  };

  const handleFindNearby = () => {
    toast.info('Đang tìm quán gần đây...');
    setTimeout(() => {
      // Show carousel with 5 places: 2 saved + 3 locked
      setAnalyzeState('nearby-carousel');
    }, 1500);
  };

  const handleCarouselPlaceClick = (place: Place) => {
    setSelectedPlace(place);
    setIsDetailsSheetOpen(true);
  };

  const handleCarouselClose = () => {
    resetToIdle();
  };

  // Mock 5 nearby places: 2 saved + 3 new (locked)
  const nearbyPlaces: Place[] = [
    SAVED_PLACES[0], // Cà Phê Hoa Sen (saved)
    SAVED_PLACES[4], // Quán Ánh Trăng (saved)
    NEW_PLACES[0],   // Phở Hùng (locked)
    NEW_PLACES[1],   // Cà Phê Nhựa Đen (locked)
    NEW_PLACES[2],   // (locked)
  ];

  const handleScanClick = () => {
    toast.info('Đang soi ảnh...');
    
    setTimeout(() => {
      setUploadedImage('https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800');
      setAnalyzeState('processing');
      setProcessingStep(0);

      const interval = setInterval(() => {
        setProcessingStep((prev) => {
          if (prev < processingSteps.length - 1) {
            return prev + 1;
          } else {
            clearInterval(interval);
            
            toast.success('✅ Phân tích xong!', {
              duration: 2000,
              style: {
                background: '#10B981',
                color: 'white',
              }
            });
            
            // Open details sheet directly
            setAnalyzeState('idle');
            setUploadedImage(null);
            setSelectedPlace(scanResultPlace);
            setIsDetailsSheetOpen(true);
            return prev;
          }
        });
      }, 1500);
    }, 500);
  };

  const suggestionChips = [
    'Cà phê làm việc',
    'Hẹn hò lãng mạn',
    'Quán mỡ nổi',
    'Nhà hàng sân vườn',
    'Vỉa hè chill',
    'Món chay'
  ];

  const handleSuggestionClick = (text: string) => {
    toast.info(`Đang tìm: ${text}`);
    
    setTimeout(() => {
      setAnalyzeState('nearby-carousel');
    }, 1500);
  };

  const handleSearchSubmit = () => {
    if (inputValue.trim()) {
      toast.info(`Đang tìm: ${inputValue}`);
      setInputValue('');
      inputRef.current?.blur();
      
      setTimeout(() => {
        window.scrollTo(0, 0);
        setAnalyzeState('nearby-carousel');
      }, 1500);
    }
  };

  return (
    <div className="h-full flex flex-col bg-[#0B0E14] relative overflow-hidden">
      {/* Main Content - Scrollable */}
      <div className="flex-1 overflow-y-auto overflow-x-hidden pb-safe">
        {/* Desktop: Max width tăng lên max-w-7xl, padding tăng */}
        {/* Mobile: Tăng padding bottom để tránh bị che bởi browser bottom bar */}
        <div className="w-full max-w-full md:max-w-7xl mx-auto flex flex-col gap-5 md:gap-8 p-4 md:px-12 md:py-16 pb-[320px] md:pb-32">
          <AnimatePresence mode="wait">
            {/* Idle State - Hero Section */}
            {analyzeState === 'idle' && (
              <motion.div
                key="idle"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -20 }}
                className="space-y-4 md:space-y-0"
              >
                {/* Hero Panel - Compact cho mobile, lớn cho desktop */}
                <div className="p-3 md:p-16 flex flex-col items-center justify-center relative overflow-hidden min-h-[100px] md:min-h-[500px]">
                  {/* AI Avatar - Nhỏ cho mobile */}
                  <div className="w-12 h-12 md:w-48 md:h-48 mb-1.5 md:mb-8 relative">
                    {/* Neon Glow Background */}
                    <div className="absolute inset-0 bg-primary/30 blur-3xl rounded-full" 
                         style={{ boxShadow: '0 0 80px -20px rgba(139, 92, 246, 0.5)' }}></div>
                    
                    {/* Avatar Container */}
                    <div className="relative w-full h-full bg-slate-900 border border-primary/40 rounded-xl md:rounded-[2.5rem] flex items-center justify-center shadow-2xl">
                      <img 
                        alt="Lyrai AI" 
                        className="w-8 h-8 md:w-32 md:h-32 object-contain" 
                        src={logoImage}
                      />
                    </div>
                  </div>

                  {/* Hero Text - Compact cho mobile */}
                  <h1 className="text-base md:text-6xl lg:text-7xl font-bold text-white mb-0.5 md:mb-4 text-center tracking-tight max-w-md md:max-w-none">
                    Bây giờ bạn chọn quán nào?
                  </h1>
                  <p className="text-slate-400 text-[10px] md:text-xl lg:text-2xl text-center font-medium">
                    Trợ lý AI của bạn sẵn sàng giúp đỡ!
                  </p>
                </div>

                {/* Action Cards - Spacing rõ ràng */}
                <div className="flex flex-col md:flex-row gap-3 md:gap-6 mt-3 md:mt-6">
                  {/* Soi ảnh/video - Premium Purple */}
                  <button 
                    onClick={handleScanClick}
                    className="flex-1 glass-panel p-3 md:p-12 flex flex-col items-center justify-center gap-2 md:gap-6 group hover:border-primary/50 transition-all duration-300 w-full text-center min-h-[90px] md:min-h-[260px]"
                  >
                    <div className="shrink-0 w-10 h-10 md:w-24 md:h-24 bg-primary rounded-lg md:rounded-3xl flex items-center justify-center shadow-lg shadow-primary/20 group-hover:scale-105 transition-transform">
                      <span className="material-symbols-outlined text-white text-xl md:text-5xl">photo_camera</span>
                    </div>
                    
                    <div>
                      <h3 className="text-sm md:text-3xl font-bold text-white mb-0 md:mb-2">Soi ảnh/video</h3>
                      <p className="text-slate-500 text-[10px] md:text-lg">Phân tích không gian quán</p>
                    </div>
                  </button>

                  {/* Tìm quanh đây - Dark Slate */}
                  <button 
                    onClick={handleFindNearby}
                    className="flex-1 glass-panel p-3 md:p-12 flex flex-col items-center justify-center gap-2 md:gap-6 group hover:border-slate-500 transition-all duration-300 w-full text-center min-h-[90px] md:min-h-[260px]"
                  >
                    <div className="shrink-0 w-10 h-10 md:w-24 md:h-24 bg-slate-800/60 border border-slate-700 rounded-lg md:rounded-3xl flex items-center justify-center group-hover:bg-slate-700 transition-colors">
                      <span className="material-symbols-outlined text-white text-xl md:text-5xl">radar</span>
                    </div>
                    
                    <div>
                      <h3 className="text-sm md:text-3xl font-bold text-white mb-0 md:mb-2">Tìm quanh đây</h3>
                      <p className="text-slate-500 text-[10px] md:text-lg">Khám phá địa điểm gần bạn</p>
                    </div>
                  </button>
                </div>
              </motion.div>
            )}

            {/* File Picker State */}
            {analyzeState === 'file-picker' && (
              <motion.div
                key="file-picker"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center w-full max-w-sm mx-auto py-12"
              >
                <div className="w-full h-48 object-cover rounded-xl mb-6 bg-slate-900/40 backdrop-blur-xl border border-slate-800/50 flex items-center justify-center">
                  <span className="material-symbols-outlined text-slate-600 text-[64px]">photo_camera</span>
                </div>
                
                <p className="text-slate-400 text-center text-sm mb-4">
                  Tải lên ảnh hoặc video của quán bạn muốn tìm
                </p>
                
                <button
                  onClick={() => fileInputRef.current?.click()}
                  className="mt-4 px-6 py-3 bg-primary hover:bg-primary/80 text-white rounded-full font-semibold transition-colors"
                >
                  Chọn file
                </button>
              </motion.div>
            )}

            {/* Processing State */}
            {analyzeState === 'processing' && (
              <motion.div
                key="processing"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                className="flex flex-col items-center w-full max-w-sm mx-auto py-12"
              >
                {uploadedImage && (
                  <img 
                    src={uploadedImage} 
                    alt="Uploaded" 
                    className="w-full h-48 object-cover rounded-xl mb-6 border border-slate-800/50"
                  />
                )}
                
                {/* Progress Bar */}
                <div className="w-full bg-slate-800/50 rounded-full h-2 mb-4 overflow-hidden">
                  <motion.div
                    className="h-full bg-gradient-to-r from-primary to-secondary"
                    initial={{ width: '0%' }}
                    animate={{ width: `${((processingStep + 1) / processingSteps.length) * 100}%` }}
                    transition={{ duration: 0.5 }}
                  />
                </div>
                
                <motion.p
                  key={processingStep}
                  initial={{ opacity: 0, y: 10 }}
                  animate={{ opacity: 1, y: 0 }}
                  className="text-primary font-medium"
                >
                  {processingSteps[processingStep]}
                </motion.p>
              </motion.div>
            )}

            {/* Nearby Carousel State */}
            {analyzeState === 'nearby-carousel' && (
              <NearbyCarousel
                places={nearbyPlaces}
                onClose={handleCarouselClose}
                onSave={handleSave}
                credits={credits || 3}
              />
            )}
          </AnimatePresence>
        </div>
      </div>

      {/* Floating WalletChip - Top Right (Idle state only) */}
      {analyzeState === 'idle' && (
        <div className="fixed top-4 right-4 md:right-6 z-50 md:top-6">
          <WalletChip 
            credits={credits || 15} 
            onClick={() => setIsWalletSheetOpen(true)}
          />
        </div>
      )}

      {/* Hidden file input */}
      <input
        ref={fileInputRef}
        type="file"
        accept="image/*,video/*"
        onChange={handleImageUpload}
        className="hidden"
      />

      {/* Bottom Input Area - Fixed at bottom - Phóng to cho desktop */}
      {analyzeState === 'idle' && (
        <div className="fixed bottom-[80px] md:bottom-0 left-0 right-0 z-40 bg-gradient-to-t from-[#0B0E14] via-[#0B0E14]/95 to-transparent pt-24 md:pt-20">
          <div className="max-w-full md:max-w-7xl mx-auto px-4 md:px-12 pb-4 md:pb-12 flex flex-col gap-4 md:gap-6">
            {/* Suggestion Chips - Phóng to */}
            <div className="flex flex-col gap-2.5 md:gap-4">
              <div className="flex items-center gap-2 md:gap-3 px-1">
                <span className="material-symbols-outlined text-primary text-sm md:text-lg">auto_awesome</span>
                <span className="text-[10px] md:text-sm font-bold uppercase tracking-widest text-slate-500">Gợi ý chủ đề</span>
              </div>
              <div className="flex overflow-x-auto gap-2.5 md:gap-4 pb-2 hide-scrollbar">
                {suggestionChips.map((chip) => (
                  <button
                    key={chip}
                    onClick={() => handleSuggestionClick(chip)}
                    className="flex-none px-4 md:px-6 py-2 md:py-3.5 bg-slate-800/40 border border-slate-700/50 rounded-xl md:rounded-2xl text-xs md:text-base font-medium hover:border-primary/50 transition-all text-slate-300 whitespace-nowrap backdrop-blur-md"
                  >
                    {chip}
                  </button>
                ))}
              </div>
            </div>

            {/* Search Input - Phóng to */}
            <div className="relative group">
              <div className="absolute inset-y-0 left-4 md:left-8 flex items-center pointer-events-none">
                <span className="material-symbols-outlined text-slate-500 text-xl md:text-3xl">search</span>
              </div>
              <input 
                ref={inputRef}
                className="w-full bg-slate-800/80 border border-slate-700/50 backdrop-blur-3xl rounded-full py-4 md:py-8 pl-12 md:pl-20 pr-14 md:pr-32 text-white placeholder-slate-500 focus:outline-none focus:ring-2 focus:ring-primary/50 transition-all shadow-2xl text-sm md:text-2xl" 
                placeholder="Tìm trong Đã lưu (Miễn phí)" 
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                onKeyDown={(e) => {
                  if (e.key === 'Enter' && inputValue.trim()) {
                    handleSearchSubmit();
                  }
                }}
              />
              <div className="absolute inset-y-0 right-2 md:right-4 flex items-center">
                <button 
                  onClick={handleSearchSubmit}
                  className="h-10 w-10 md:h-16 md:w-16 bg-primary text-white rounded-full hover:bg-primary/80 transition-all flex items-center justify-center shadow-lg shadow-primary/20"
                >
                  <span className="material-symbols-outlined text-lg md:text-3xl">send</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Place Details Sheet */}
      {isDetailsSheetOpen && selectedPlace && (
        <PlaceDetailsSheet
          place={selectedPlace}
          isOpen={isDetailsSheetOpen}
          onClose={handleCloseDetailsSheet}
          onSave={handleSave}
          credits={credits || 3}
          isSaved={selectedPlace.isSaved}
          autoUnlock={selectedPlace.id === 'scan-result-1'} // Auto-unlock for scan results
        />
      )}

      {/* Mini Wallet Sheet */}
      <MiniWalletSheet
        isOpen={isWalletSheetOpen}
        onClose={() => setIsWalletSheetOpen(false)}
        credits={credits || 15}
        freeCredits={3}
        paidCredits={(credits || 15) - 3}
        onTopUp={() => {
          setIsWalletSheetOpen(false);
          toast.info('Tính năng nạp tiền đang phát triển!');
        }}
      />
    </div>
  );
}