// UNIFIED MOCK DATA for Lyrai App
// All saved places data centralized here for consistency

export interface Place {
  id: string;
  name: string;
  type: 'cafe' | 'restaurant' | 'bar';
  category: string;
  rating: number;
  reviewCount: number;
  priceRange: string;
  priceRangeAmount?: string; // NEW: "50.000 - 100.000"
  distance: string;
  address: string;
  hours: string;
  closedDays?: string; // NEW: Ngày nghỉ (e.g., "Thứ 2", "Không nghỉ")
  isOpen: boolean;
  isSaved: boolean; // TRUE = Always UNLOCKED
  
  // Map coordinates
  lat: number;
  lng: number;
  
  // Images (4 for full gallery)
  images: string[];
  
  // AI Analysis (UNLOCKED content)
  aiTags: string[];
  aiSummary: string;
  pros: string[];
  cons: string[];
  
  // Search/Filter metadata
  vibes: string[];
  features: string[];
}

// ============================================
// SAVED PLACES (Always UNLOCKED)
// ============================================

export const SAVED_PLACES: Place[] = [
  {
    id: 'saved-1',
    name: 'Cà Phê Hoa Sen',
    type: 'cafe',
    category: 'Cafe',
    rating: 4.7,
    reviewCount: 234,
    priceRange: '₫₫',
    priceRangeAmount: '50.000 - 100.000',
    distance: '0.3 km',
    address: '123 Đường Hòa Sen, Q.1',
    hours: '7:00 - 22:00',
    closedDays: 'Không nghỉ',
    isOpen: true,
    isSaved: true, // UNLOCKED
    
    lat: 40.7589,
    lng: -73.9851,
    
    images: [
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=800',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=800',
    ],
    
    aiTags: ['Yên tĩnh', 'Wifi mạnh', 'Điều hòa mát'],
    aiSummary: 'Không gian thoáng mát, thích hợp làm việc và đọc sách. Cà phê đậm đà, nhân viên thân thiện.',
    pros: [
      'Không gian yên tĩnh, view đẹp nhìn ra hồ sen',
      'Wifi tốc độ cao, ổ điện nhiều',
      'Cà phê phin truyền thống ngon, giá hợp lý',
      'Nhân viên phục vụ nhiệt tình',
    ],
    cons: [
      'Chỗ đậu xe hơi hạn chế',
      'Giờ cao điểm đông khách, có thể khó tìm chỗ ngồi',
    ],
    
    vibes: ['Yên tĩnh', 'Làm việc', 'View đẹp'],
    features: ['Wifi', 'Điều hòa', 'Ổ điện', 'Chỗ đậu xe'],
  },
  
  {
    id: 'saved-2',
    name: 'Cà Phê Sóng Việt',
    type: 'cafe',
    category: 'Cafe',
    rating: 4.4,
    reviewCount: 178,
    priceRange: '₫₫',
    priceRangeAmount: '50.000 - 100.000',
    distance: '0.7 km',
    address: '555 Đường Biển Xanh, Q.5',
    hours: '8:00 - 23:00',
    closedDays: 'Chủ Nhật', // TEST: Closed on Sundays
    isOpen: true,
    isSaved: true, // UNLOCKED
    
    lat: 40.7650,
    lng: -73.9800,
    
    images: [
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=800',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
      'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
    ],
    
    aiTags: ['Beach vibe', 'Instagram đẹp', 'Cà phê sữa ngon'],
    aiSummary: 'Phong cách biển Việt Nam, không gian mở thoáng đãng. Đồ uống ngon, setup chụp ảnh đẹp.',
    pros: [
      'Concept độc đáo, phong cách biển Việt Nam',
      'Không gian thoáng, ánh sáng tự nhiên đẹp',
      'Cà phê sữa đá đậm vị, topping đa dạng',
      'Góc sống ảo nhiều, phù hợp chụp hình',
    ],
    cons: [
      'Giá hơi cao so với mặt bằng chung',
      'Giờ cao điểm có thể hơi ồn do đông khách',
    ],
    
    vibes: ['Chill', 'Beach', 'Instagram'],
    features: ['Outdoor', 'Photo Spot', 'Sống ảo'],
  },
  
  {
    id: 'saved-3',
    name: 'River Chill Lounge',
    type: 'bar',
    category: 'Bar',
    rating: 4.5,
    reviewCount: 189,
    priceRange: '₫₫₫',
    priceRangeAmount: '100.000 - 200.000',
    distance: '0.8 km',
    address: '789 Đường Hoàng Hôn, Q.7',
    hours: '17:00 - 02:00',
    closedDays: 'Thứ 2',
    isOpen: true,
    isSaved: true, // UNLOCKED
    
    lat: 40.7558,
    lng: -73.9903,
    
    images: [
      'https://images.unsplash.com/photo-1683371266972-bcc9500bd5dc?w=800',
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',
    ],
    
    aiTags: ['Rooftop đẹp', 'Cocktail ngon', 'View thành phố'],
    aiSummary: 'Bar rooftop cao tầng, view panorama thành phố tuyệt đẹp. Cocktail pha chế tinh tế, không gian lãng mạn.',
    pros: [
      'View toàn cảnh thành phố từ tầng 23, hoàng hôn đẹp',
      'Cocktail signature độc đáo, bartender chuyên nghiệp',
      'Không gian sang trọng, phù hợp hẹn hò/kỷ niệm',
      'Âm nhạc live vào cuối tuần',
    ],
    cons: [
      'Giá đồ uống khá cao (200-400k/ly)',
      'Nên đặt chỗ trước vào thứ 7-CN để có chỗ đẹp',
    ],
    
    vibes: ['Lãng mạn', 'Rooftop', 'View đẹp'],
    features: ['Rooftop', 'Cocktails', 'Live Music', 'Đặt chỗ'],
  },
  
  {
    id: 'saved-4',
    name: 'Phở Gia Truyền Mây Tre',
    type: 'restaurant',
    category: 'Phở',
    rating: 4.8,
    reviewCount: 456,
    priceRange: '₫',
    priceRangeAmount: '30.000 - 50.000',
    distance: '0.5 km',
    address: '456 Đường Tre Xanh, Q.3',
    hours: '6:00 - 14:00',
    closedDays: 'Không nghỉ',
    isOpen: true,
    isSaved: true, // UNLOCKED
    
    lat: 40.7614,
    lng: -73.9776,
    
    images: [
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
    ],
    
    aiTags: ['Mỡ nổi', 'Nước trong', 'Tái lăn'],
    aiSummary: 'Phở truyền thống Hà Nội, nước dùng trong ngọt tự nhiên. Thịt bò tươi, mỡ nổi vàng ươm.',
    pros: [
      'Nước dùng ninh từ xương bò 12 tiếng, trong ngọt',
      'Tái bò tươi, thái mỏng, lăn vừa tới',
      'Mỡ nổi vàng ươm, thơm béo chuẩn Hà Nội',
      'Giá rẻ (40-60k/tô), quán sạch sẽ',
    ],
    cons: [
      'Chỉ mở cửa sáng, hết hàng sớm (11h)',
      'Giờ cao điểm đông khách, có thể phải chờ chỗ ngồi',
    ],
    
    vibes: ['Truyền thống', 'Sáng sớm', 'Nhanh', 'Mỡ nổi'],
    features: ['Mỡ nổi', 'Nước trong', 'Giá rẻ'],
  },
  
  {
    id: 'saved-5',
    name: 'Quán Ánh Trăng',
    type: 'restaurant',
    category: 'Bistro',
    rating: 4.6,
    reviewCount: 301,
    priceRange: '₫₫',
    priceRangeAmount: '50.000 - 100.000',
    distance: '1.2 km',
    address: '321 Đường Trăng Sáng, Q.2',
    hours: '8:00 - 22:00',
    closedDays: 'Thứ 2',
    isOpen: false,
    isSaved: true, // UNLOCKED
    
    lat: 40.7601,
    lng: -73.9820,
    
    images: [
      'https://images.unsplash.com/photo-1684568519320-8c6b14f7e65f?w=800',
      'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=800',
      'https://images.unsplash.com/photo-1546069901-ba9599a7e63c?w=800',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=800',
    ],
    
    aiTags: ['Healthy', 'Brunch ngon', 'Outdoor thoáng'],
    aiSummary: 'Bistro phong cách Địa Trung Hải, thực đơn healthy đa dạng. Không gian vườn thoáng mát.',
    pros: [
      'Menu healthy đa dạng: salad, smoothie bowl, pasta',
      'Không gian sân vườn thoáng mát, nhiều cây xanh',
      'Brunch set cuối tuần phong phú, giá hợp lý',
      'Pet-friendly, cho mang thú cưng',
    ],
    cons: [
      'Thứ 2 nghỉ (chủ nhật là ngày cuối)',
      'Phần ăn hơi nhỏ cho người ăn nhiều, phù hợp healthy meal',
    ],
    
    vibes: ['Healthy', 'Brunch', 'Garden', 'View đẹp'],
    features: ['Outdoor', 'Pet-friendly', 'Brunch', 'Healthy'],
  },
];

// ============================================
// NEW PLACES (LOCKED by default)
// ============================================

export const NEW_PLACES: Place[] = [
  {
    id: 'new-1',
    name: 'Phở Hùng',
    type: 'restaurant',
    category: 'Phở',
    rating: 4.3,
    reviewCount: 198,
    priceRange: '₫',
    priceRangeAmount: '30.000 - 50.000',
    distance: '0.9 km',
    address: '234 Đường Cầu Giấy, Q.10',
    hours: '6:00 - 22:00',
    isOpen: true,
    isSaved: false, // LOCKED
    
    lat: 40.7580,
    lng: -73.9870,
    
    images: [
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
    ],
    
    aiTags: ['Nước ngọt', 'Giá rẻ', 'Quán lề đường'],
    aiSummary: 'Phở bình dân, nước dùng ngọt nhẹ. Phục vụ nhanh, giá rẻ.',
    pros: [
      'Giá rất rẻ (35-50k/tô)',
      'Mở cửa cả ngày, phục vụ đến tối',
      'Phần ăn nhiều, no bụng',
    ],
    cons: [
      'Không gian chật hẹp, quán lề đường',
      'Nước dùng hơi ngọt, thiếu vị truyền thống',
      'Thịt bò đông lạnh, không tươi như quán khác',
    ],
    
    vibes: ['Bình dân', 'Nhanh', 'Rẻ'],
    features: ['Giá rẻ', 'Cả ngày'],
  },
  
  {
    id: 'new-2',
    name: 'Cà Phê Nhựa Đen',
    type: 'cafe',
    category: 'Cafe',
    rating: 4.2,
    reviewCount: 89,
    priceRange: '₫',
    priceRangeAmount: '15.000 - 25.000',
    distance: '1.5 km',
    address: '678 Đường Nguyễn Huệ, Q.1',
    hours: '7:00 - 23:00',
    isOpen: true,
    isSaved: false, // LOCKED
    
    lat: 40.7620,
    lng: -73.9890,
    
    images: [
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=800',
      'https://images.unsplash.com/photo-1453614512568-c4024d13c247?w=800',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=800',
      'https://images.unsplash.com/photo-1442512595331-e89e73853f31?w=800',
    ],
    
    aiTags: ['Cà phê đen đậm', 'Giá bình dân', 'Không gian nhỏ'],
    aiSummary: 'Quán cà phê vỉa hè truyền thống, cà phê đen đậm đà. Giá rẻ, không gian giản dị.',
    pros: [
      'Cà phê đen rang xay ngon, đậm đà',
      'Giá rẻ (15-25k/ly)',
      'Phục vụ nhanh',
    ],
    cons: [
      'Không gian nhỏ, ghế nhựa',
      'Không có wifi/ổ điện',
      'Ồn ào, không phù hợp làm việc',
    ],
    
    vibes: ['Vỉa hè', 'Truyền thống', 'Giản dị'],
    features: ['Giá rẻ', 'Nhanh'],
  },
  
  {
    id: 'new-3',
    name: 'Bar Đêm Xanh',
    type: 'bar',
    category: 'Bar',
    rating: 4.0,
    reviewCount: 145,
    priceRange: '₫₫',
    priceRangeAmount: '50.000 - 100.000',
    distance: '2.1 km',
    address: '999 Đường Pasteur, Q.3',
    hours: '18:00 - 03:00',
    isOpen: true,
    isSaved: false, // LOCKED
    
    lat: 40.7540,
    lng: -73.9920,
    
    images: [
      'https://images.unsplash.com/photo-1514933651103-005eec06c04b?w=800',
      'https://images.unsplash.com/photo-1470337458703-46ad1756a187?w=800',
      'https://images.unsplash.com/photo-1572116469696-31de0f17cc34?w=800',
      'https://images.unsplash.com/photo-1560540478-ba74c2c949be?w=800',
    ],
    
    aiTags: ['Nhạc EDM', 'Không gian tối', 'Bia rẻ'],
    aiSummary: 'Bar nhạc điện tử, không gian tối, ánh sáng neon. Bia giá tốt, tập trung khách trẻ.',
    pros: [
      'Nhạc EDM sôi động, DJ chuyên nghiệp',
      'Bia ưu đãi happy hour (50% 18h-20h)',
      'Không gian rộng, sàn nhảy lớn',
    ],
    cons: [
      'Quá ồn, không phù hợp trò chuyện',
      'Đông đúc cuối tuần, khó di chuyển',
      'Service cocktail chưa tinh tế bằng bar cao cấp',
    ],
    
    vibes: ['Clubbing', 'EDM', 'Party'],
    features: ['DJ', 'Dance Floor', 'Happy Hour'],
  },
  
  {
    id: 'new-4',
    name: 'Bún Bò Huế Gánh',
    type: 'restaurant',
    category: 'Bún Bò Huế',
    rating: 4.5,
    reviewCount: 267,
    priceRange: '₫',
    priceRangeAmount: '45.000 - 65.000',
    distance: '1.8 km',
    address: '111 Đường Lê Lợi, Q.4',
    hours: '6:00 - 15:00',
    isOpen: true,
    isSaved: false, // LOCKED
    
    lat: 40.7560,
    lng: -73.9840,
    
    images: [
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=800',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800',
    ],
    
    aiTags: ['Cay nồng', 'Chân giò mềm', 'Chả cua ngon'],
    aiSummary: 'Bún bò Huế truyền thống, nước lèo cay nồng đúng vị. Chân giò ninh mềm, chả cua tự làm.',
    pros: [
      'Nước lèo đậm đà, cay nồng chuẩn Huế',
      'Chân giò ninh mềm, tan trong miệng',
      'Chả cua tự làm, tươi ngon',
      'Giá tốt (45-65k/tô)',
    ],
    cons: [
      'Quán nhỏ, đông khách giờ cao điểm',
      'Chỉ bán sáng đến trưa, hết hàng sớm nên cần đến sớm',
    ],
    
    vibes: ['Truyền thống', 'Cay', 'Sáng sớm'],
    features: ['Cay nồng', 'Chân giò', 'Chả cua'],
  },
  
  {
    id: 'new-5',
    name: 'Cà Phê Đọc Sách',
    type: 'cafe',
    category: 'Book Cafe',
    rating: 4.6,
    reviewCount: 156,
    priceRange: '₫₫',
    priceRangeAmount: '50.000 - 100.000',
    distance: '0.8 km',
    address: '88 Đường Văn Học, Q.3',
    hours: '9:00 - 23:00',
    isOpen: true,
    isSaved: false, // GHOST
    
    lat: 40.7595,
    lng: -73.9885,
    
    images: [
      'https://images.unsplash.com/photo-1519682337058-a94d519337bc?w=800',
      'https://images.unsplash.com/photo-1481349518771-20055b2a7b24?w=800',
      'https://images.unsplash.com/photo-1524995997946-a1c2e315a42f?w=800',
      'https://images.unsplash.com/photo-1507842217343-583bb7270b66?w=800',
    ],
    
    aiTags: ['Sách miễn phí', 'Yên tĩnh', 'View sân vườn'],
    aiSummary: 'Cafe kết hợp thư viện nhỏ, đọc sách miễn phí. Không gian yên tĩnh, view sân vườn thư giãn.',
    pros: [
      'Thư viện sách đa dạng, miễn phí đọc',
      'Không gian yên tĩnh, ánh sáng tự nhiên tốt',
      'Menu đồ uống phong phú, có cả trà thảo mộc',
      'Ghế ngồi êm ái, bàn đọc sách rộng rãi',
    ],
    cons: [
      'Không phù hợp nhóm đông, ưu tiên khách đọc sách',
      'Wifi tốc độ trung bình, không phù hợp meeting online',
    ],
    
    vibes: ['Đọc sách', 'Yên tĩnh', 'Một mình'],
    features: ['Library', 'Quiet', 'Reading Space'],
  },
  
  {
    id: 'new-6',
    name: 'Bún Chả Hải Yến',
    type: 'restaurant',
    category: 'Bún Chả',
    rating: 4.4,
    reviewCount: 289,
    priceRange: '₫',
    priceRangeAmount: '30.000 - 50.000',
    distance: '1.1 km',
    address: '45 Đường Hàng Bài, Q.7',
    hours: '10:00 - 20:00',
    isOpen: true,
    isSaved: false, // GHOST
    
    lat: 40.7615,
    lng: -73.9825,
    
    images: [
      'https://images.unsplash.com/photo-1559847844-d7cf1645c92a?w=800',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=800',
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=800',
      'https://images.unsplash.com/photo-1626082927389-6cd097cdc6ec?w=800',
    ],
    
    aiTags: ['Chả ngon', 'Nước mắm chua ngọt', 'Giá bình dân'],
    aiSummary: 'Bún chả Hà Nội truyền thống, chả nướng thơm lừng. Nước mắm pha chuẩn vị chua ngọt.',
    pros: [
      'Chả nướng than hồng, thơm phức',
      'Nước mắm pha đúng vị Hà Nội',
      'Rau sống tươi ngon, đầy đủ',
      'Giá hợp lý, phần ăn no bụng',
    ],
    cons: [
      'Không gian nhỏ, giờ trưa đông khách phải đợi',
      'Chỗ đậu xe khó, phải đỗ xa',
    ],
    
    vibes: ['Truyền thống', 'Nhanh', 'Trưa'],
    features: ['Bún chả', 'Nướng than', 'Giá rẻ'],
  },
  
  {
    id: 'new-7',
    name: 'Quán Bia Hơi Gốc',
    type: 'bar',
    category: 'Bia Hơi',
    rating: 4.1,
    reviewCount: 342,
    priceRange: '₫',
    priceRangeAmount: '10.000 - 20.000',
    distance: '1.5 km',
    address: '22 Đường Tạ Hiện, Q.1',
    hours: '16:00 - 23:00',
    isOpen: true,
    isSaved: false, // GHOST
    
    lat: 40.7570,
    lng: -73.9810,
    
    images: [
      'https://images.unsplash.com/photo-1436076863939-06870fe779c2?w=800',
      'https://images.unsplash.com/photo-1608270586620-248524c67de9?w=800',
      'https://images.unsplash.com/photo-1596290015161-34fe69e3c5d4?w=800',
      'https://images.unsplash.com/photo-1558618666-fcd25c85cd64?w=800',
    ],
    
    aiTags: ['Bia tươi', 'Nhậu vỉa hè', 'Đồ nhậu ngon'],
    aiSummary: 'Bia hơi Hà Nội truyền thống, không gian vỉa hè sôi động. Đồ nhậu đa dạng, giá siêu rẻ.',
    pros: [
      'Bia tươi ngon, giá rẻ (10k/cốc)',
      'Đồ nhậu đa dạng: nem, chả, gỏi',
      'Không khí sôi động, thân thiện',
      'Mở cửa đến khuya, phù hợp tụ tập',
    ],
    cons: [
      'Ngồi vỉa hè, không gian đơn giản',
      'Ồn ào, không phù hợp trò chuyện quan trọng',
      'Không có điều hòa, mùa hè nóng',
    ],
    
    vibes: ['Nhậu', 'Bạn bè', 'Vỉa hè'],
    features: ['Bia hơi', 'Nhậu', 'Giá rẻ'],
  },
  
  {
    id: 'new-8',
    name: 'Trà Sữa Mây Ngọt',
    type: 'cafe',
    category: 'Trà Sữa',
    rating: 4.3,
    reviewCount: 512,
    priceRange: '₫',
    priceRangeAmount: '30.000 - 50.000',
    distance: '0.5 km',
    address: '99 Đường Mây Trắng, Q.10',
    hours: '8:00 - 22:00',
    isOpen: true,
    isSaved: false, // GHOST
    
    lat: 40.7608,
    lng: -73.9795,
    
    images: [
      'https://images.unsplash.com/photo-1525385133512-2f3bdd039054?w=800',
      'https://images.unsplash.com/photo-1556679343-c7306c1976bc?w=800',
      'https://images.unsplash.com/photo-1481391243133-f96216dcb5d2?w=800',
      'https://images.unsplash.com/photo-1563729784474-d77dbb933a9e?w=800',
    ],
    
    aiTags: ['Trân châu Q', 'Ngọt vừa', 'Take away'],
    aiSummary: 'Trà sữa phong cách Đài Loan, trân châu Q đàn hồi. Menu đa dạng, giá sinh viên.',
    pros: [
      'Trân châu Q ngon, đàn hồi chuẩn Đài Loan',
      'Đường tùy chỉnh được (0-100%)',
      'Menu đa dạng: trà sữa, trà trái cây, smoothie',
      'Giá rẻ, nhiều combo ưu đãi',
    ],
    cons: [
      'Không gian nhỏ, chủ yếu take away',
      'Giờ cao điểm phải chờ lâu (15-20 phút)',
    ],
    
    vibes: ['Giải khát', 'Take away', 'Sinh viên'],
    features: ['Trà sữa', 'Trân châu', 'Giá rẻ'],
  },
];

// ============================================
// UTILITY FUNCTIONS
// ============================================

export const getAllPlaces = (): Place[] => {
  return [...SAVED_PLACES, ...NEW_PLACES];
};

export const getPlaceById = (id: string): Place | undefined => {
  return getAllPlaces().find(place => place.id === id);
};

export const getSavedPlaces = (): Place[] => {
  return SAVED_PLACES;
};

export const getNewPlaces = (): Place[] => {
  return NEW_PLACES;
};

// Search by query
export const searchPlaces = (query: string): Place[] => {
  const lowerQuery = query.toLowerCase();
  return getAllPlaces().filter(place => 
    place.name.toLowerCase().includes(lowerQuery) ||
    place.category.toLowerCase().includes(lowerQuery) ||
    place.vibes.some(vibe => vibe.toLowerCase().includes(lowerQuery)) ||
    place.features.some(feature => feature.toLowerCase().includes(lowerQuery))
  );
};

// Filter by vibe/smart chip
export const filterByVibe = (vibe: string): Place[] => {
  const lowerVibe = vibe.toLowerCase();
  return SAVED_PLACES.filter(place => 
    place.vibes.some(v => v.toLowerCase().includes(lowerVibe)) ||
    place.features.some(f => f.toLowerCase().includes(lowerVibe)) ||
    place.aiTags.some(tag => tag.toLowerCase().includes(lowerVibe))
  );
};

// Get place by specific criteria
export const getPlaceByTag = (tag: string): Place | undefined => {
  return SAVED_PLACES.find(place => 
    place.aiTags.some(t => t.toLowerCase().includes(tag.toLowerCase()))
  );
};

export const getPlaceByVibe = (vibe: string): Place | undefined => {
  return SAVED_PLACES.find(place => 
    place.vibes.some(v => v.toLowerCase().includes(vibe.toLowerCase()))
  );
};