// Mock data cho reviews/đánh giá quán

export interface Review {
  id: string;
  placeId: string;
  userName: string;
  userAvatar: string;
  rating: number;
  date: string;
  comment: string;
  helpful?: number;
}

// Reviews cho Phở Mây Tre
export const phoHoaReviews: Review[] = [
  {
    id: 'rev-pho-1',
    placeId: 'pho-1',
    userName: 'Minh Nguyễn',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=Minh',
    rating: 5,
    date: '1 tuần trước',
    comment: 'Phở ở đây ngon xuất sắc! Nước dùng ngọt tự nhiên, mỡ nổi thơm phức. Thịt bò mềm tan trong miệng. Giá 45k/tô rất hợp lý. Quán mở từ 5h sáng nên rất tiện cho người đi làm sớm.',
    helpful: 24
  },
  {
    id: 'rev-pho-2',
    placeId: 'pho-1',
    userName: 'Thu Hà',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThuHa',
    rating: 4,
    date: '2 tuần trước',
    comment: 'Phở khá ngon, nước dùng đậm đà. Tuy nhiên vào giờ cao điểm 7-8h sáng thì hơi đông, phải đợi chút. Nhân viên phục vụ nhanh và nhiệt tình.',
    helpful: 12
  },
  {
    id: 'rev-pho-3',
    placeId: 'pho-1',
    userName: 'Tuấn Anh',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=TuanAnh',
    rating: 5,
    date: '3 tuần trước',
    comment: 'Quán phở ruột của mình! Đã ăn ở đây hơn 5 năm rồi. Chất lượng luôn ổn định, bánh phở dai, thịt mềm. Đặc biệt là mỡ nổi rất thơm. Recommend 100%!',
    helpful: 18
  },
  {
    id: 'rev-pho-4',
    placeId: 'pho-1',
    userName: 'Lan Anh',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=LanAnh',
    rating: 4,
    date: '1 tháng trước',
    comment: 'Phở ngon, giá ok. Nhưng chỗ đậu xe hơi khó tìm. Nên đi xe máy hoặc grab. Quán nhỏ nhưng sạch sẽ.',
    helpful: 8
  }
];

// Reviews cho Phở Ánh Dương
export const phoLeReviews: Review[] = [
  {
    id: 'rev-phol-1',
    placeId: 'pho-2',
    userName: 'Hoàng Phúc',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HoangPhuc',
    rating: 5,
    date: '5 ngày trước',
    comment: 'Nước dùng đậm đà, bánh phở dai ngon. Phục vụ nhanh, không phải đợi lâu. Giữ xe miễn phí rất tiện. Giá 50k hơi cao một chút nhưng xứng đáng.',
    helpful: 15
  },
  {
    id: 'rev-phol-2',
    placeId: 'pho-2',
    userName: 'Mai Linh',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=MaiLinh',
    rating: 4,
    date: '2 tuần trước',
    comment: 'Phở ngon, quán rộng rãi. Vào cuối tuần thì đông khách lắm. Nên đi vào giờ lẻ để được ngồi thoải mái hơn.',
    helpful: 9
  }
];

// Reviews cho Cà Phê Sóng Việt
export const highlandsReviews: Review[] = [
  {
    id: 'rev-hl-1',
    placeId: 'cafe-1',
    userName: 'Khánh Linh',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=KhanhLinh',
    rating: 5,
    date: '3 ngày trước',
    comment: 'View đẹp xuất sắc! Ngồi rooftop nhìn toàn cảnh Landmark 81 rất chill. Wi-Fi mạnh, thích hợp làm việc. Đồ uống ok, giá hơi cao nhưng trả tiền cho view thì đáng. Instagrammable 10/10!',
    helpful: 32
  },
  {
    id: 'rev-hl-2',
    placeId: 'cafe-1',
    userName: 'Đức Anh',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=DucAnh',
    rating: 4,
    date: '1 tuần trước',
    comment: 'Không gian đẹp, thoáng mát. Giữ xe free rất tiện. Nhân viên phục vụ ok. Buổi tối view đẹp hơn, đèn Landmark 81 lung linh. Nên book trước nếu đi nhóm đông.',
    helpful: 18
  },
  {
    id: 'rev-hl-3',
    placeId: 'cafe-1',
    userName: 'Phương Anh',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=PhuongAnh',
    rating: 5,
    date: '2 tuần trước',
    comment: 'Quán yêu thích của mình! View tuyệt vời, không gian chill. Thích hợp cho date hoặc meet bạn bè. Cafe ngon, bánh ngọt cũng ok. Giá 45k-60k một ly, acceptable.',
    helpful: 26
  },
  {
    id: 'rev-hl-4',
    placeId: 'cafe-1',
    userName: 'Bảo Trâm',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=BaoTram',
    rating: 4,
    date: '3 tuần trước',
    comment: 'Quán đẹp, nhiều góc sống ảo. Tuy nhiên vào cuối tuần đông lắm, khó tìm chỗ ngồi. Nên đi vào ngày thường. AC mát mẻ, ngồi cả ngày cũng ok.',
    helpful: 14
  }
];

// Reviews cho Cafe Hoa Đào
export const coffeeHouseReviews: Review[] = [
  {
    id: 'rev-tch-1',
    placeId: 'cafe-2',
    userName: 'Thanh Tùng',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThanhTung',
    rating: 5,
    date: '4 ngày trước',
    comment: 'Không gian rất rộng, có nhiều tầng. View sông Sài Gòn tuyệt đẹp! Wi-Fi nhanh, ổn cắm để làm việc cả ngày. Menu đa dạng, giá cả hợp lý. Highly recommended!',
    helpful: 28
  },
  {
    id: 'rev-tch-2',
    placeId: 'cafe-2',
    userName: 'Hương Giang',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HuongGiang',
    rating: 4,
    date: '1 tuần trước',
    comment: 'Quán đẹp, nhiều góc chụp ảnh đẹp. Đồ uống ngon, giá bình dân. AC mát, phục vụ nhanh. Đi với hội bạn thân rất vui.',
    helpful: 16
  },
  {
    id: 'rev-tch-3',
    placeId: 'cafe-2',
    userName: 'Quốc Huy',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=QuocHuy',
    rating: 5,
    date: '2 tuần trước',
    comment: 'Không gian sang trọng. View sông tuyệt vời vào buổi chiều/tối. Giá 29k-55k rất ok. Sẽ quay lại nhiều lần.',
    helpful: 22
  }
];

// Reviews cho Nhà Hàng Cỏ May
export const quanAnNgonReviews: Review[] = [
  {
    id: 'rev-qan-1',
    placeId: 'res-1',
    userName: 'Việt Anh',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=VietAnh',
    rating: 5,
    date: '2 ngày trước',
    comment: 'Nhà hàng cao cấp nhưng rất đáng tiền! Món ăn truyền thống được làm rất chỉn chu. Không gian sân vườn mát mẻ, lãng mạn. Phục vụ nhiệt tình và chuyên nghiệp. Nên đặt bàn trước.',
    helpful: 45
  },
  {
    id: 'rev-qan-2',
    placeId: 'res-1',
    userName: 'Ngọc Trinh',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=NgocTrinh',
    rating: 5,
    date: '5 ngày trước',
    comment: 'Quán ăn yêu thích để đưa khách quốc tế! Món ngon đúng chuẩn Việt Nam. Không gian đẹp, có nhiều khu vực riêng tư. Giá 150k-300k/người tùy món. Xứng đáng 5 sao!',
    helpful: 38
  },
  {
    id: 'rev-qan-3',
    placeId: 'res-1',
    userName: 'Hoàng Long',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=HoangLong',
    rating: 4,
    date: '1 tuần trước',
    comment: 'Món ăn ngon, đa dạng. Không gian rộng rãi, thoáng mát. Giá hơi cao nhưng chất lượng tương xứng. Thích hợp cho ăn gia đình hoặc tiếp khách.',
    helpful: 24
  },
  {
    id: 'rev-qan-4',
    placeId: 'res-1',
    userName: 'Thu Hương',
    userAvatar: 'https://api.dicebear.com/7.x/avataaars/svg?seed=ThuHuong',
    rating: 5,
    date: '2 tuần trước',
    comment: 'Mình đã tổ chức sinh nhật ở đây, rất hài lòng! Staff hỗ trợ nhiệt tình, món ăn ngon. Không gian sân vườn rất đẹp để chụp ảnh. Recommend cho các dịp đặc biệt.',
    helpful: 31
  }
];

// Map reviews by place ID
export const reviewsByPlaceId: Record<string, Review[]> = {
  'pho-1': phoHoaReviews,
  'pho-2': phoLeReviews,
  'cafe-1': highlandsReviews,
  'cafe-2': coffeeHouseReviews,
  'res-1': quanAnNgonReviews
};

// Get reviews for a specific place
export const getReviewsForPlace = (placeId: string): Review[] => {
  return reviewsByPlaceId[placeId] || [];
};

// Get average rating from reviews
export const getAverageRating = (reviews: Review[]): number => {
  if (reviews.length === 0) return 0;
  const sum = reviews.reduce((acc, review) => acc + review.rating, 0);
  return Math.round((sum / reviews.length) * 10) / 10;
};

// Get review count
export const getReviewCount = (reviews: Review[]): number => {
  return reviews.length;
};