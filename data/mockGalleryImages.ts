// Mock gallery images cho các địa điểm

export interface GalleryImages {
  placeId: string;
  images: string[];
}

// Gallery cho Phở places
export const phoGalleryImages: GalleryImages[] = [
  {
    placeId: 'pho-1',
    images: [
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1080',
      'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=1080',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=1080',
      'https://images.unsplash.com/photo-1626266061368-46a8f578dbd6?w=1080',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1080',
      'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=1080'
    ]
  },
  {
    placeId: 'pho-2',
    images: [
      'https://images.unsplash.com/photo-1591814468924-caf88d1232e1?w=1080',
      'https://images.unsplash.com/photo-1582878826629-29b7ad1cdc43?w=1080',
      'https://images.unsplash.com/photo-1608877907149-a206d75ba011?w=1080',
      'https://images.unsplash.com/photo-1555126634-323283e090fa?w=1080',
      'https://images.unsplash.com/photo-1585032226651-759b368d7246?w=1080'
    ]
  }
];

// Gallery cho Cafe places
export const cafeGalleryImages: GalleryImages[] = [
  {
    placeId: 'cafe-1',
    images: [
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1080',
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1080',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1080',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1080',
      'https://images.unsplash.com/photo-1559496417-e7f25cb247f6?w=1080',
      'https://images.unsplash.com/photo-1495474472287-4d71bcdd2085?w=1080',
      'https://images.unsplash.com/photo-1509042239860-f550ce710b93?w=1080'
    ]
  },
  {
    placeId: 'cafe-2',
    images: [
      'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1080',
      'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1080',
      'https://images.unsplash.com/photo-1559496417-e7f25cb247f6?w=1080',
      'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1080',
      'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1080',
      'https://images.unsplash.com/photo-1445116572660-236099ec97a0?w=1080'
    ]
  }
];

// Gallery cho Restaurant places
export const restaurantGalleryImages: GalleryImages[] = [
  {
    placeId: 'res-1',
    images: [
      'https://images.unsplash.com/photo-1517248135467-4c7edcad34c4?w=1080',
      'https://images.unsplash.com/photo-1414235077428-338989a2e8c0?w=1080',
      'https://images.unsplash.com/photo-1504674900247-0877df9cc836?w=1080',
      'https://images.unsplash.com/photo-1565557623262-b51c2513a641?w=1080',
      'https://images.unsplash.com/photo-1559339352-11d035aa65de?w=1080',
      'https://images.unsplash.com/photo-1552566626-52f8b828add9?w=1080',
      'https://images.unsplash.com/photo-1592861956120-e524fc739696?w=1080'
    ]
  }
];

// Map gallery images by place ID
export const galleryImagesByPlaceId: Record<string, string[]> = {
  'pho-1': phoGalleryImages[0].images,
  'pho-2': phoGalleryImages[1].images,
  'cafe-1': cafeGalleryImages[0].images,
  'cafe-2': cafeGalleryImages[1].images,
  'res-1': restaurantGalleryImages[0].images
};

// Get gallery images for a specific place
export const getGalleryImagesForPlace = (placeId: string): string[] => {
  return galleryImagesByPlaceId[placeId] || [
    'https://images.unsplash.com/photo-1511920170033-f8396924c348?w=1080',
    'https://images.unsplash.com/photo-1554118811-1e0d58224f24?w=1080',
    'https://images.unsplash.com/photo-1521017432531-fbd92d768814?w=1080',
    'https://images.unsplash.com/photo-1501339847302-ac426a4a7cbb?w=1080',
    'https://images.unsplash.com/photo-1559496417-e7f25cb247f6?w=1080'
  ];
};
