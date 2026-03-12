export interface PhotoBooth {
  id: number;
  name: string;
  brand: string;
  series: string;
  address: string;
  latitude: number;
  longitude: number;
  operatingHours: string | null;
  createdAt: string;
  updatedAt: string;
}

export interface PhotoBoothWithDistance extends PhotoBooth {
  distance: number;
}

export interface Review {
  id: number;
  userId: number;
  userNickname: string;
  photoBoothId: number;
  rating: number;
  content: string;
  createdAt: string;
  updatedAt: string;
}

export interface ReviewStats {
  averageRating: number;
  totalCount: number;
  distribution: Record<number, number>;
}

export interface CongestionResponse {
  photoBoothId: number;
  congestionLevel: CongestionLevel;
  score: number;
  reportCount: number;
  reliability: 'LOW' | 'MEDIUM' | 'HIGH';
  message: string;
}

export type CongestionLevel = 'RELAXED' | 'NORMAL' | 'BUSY' | 'VERY_BUSY' | 'UNKNOWN';

export interface PagedResponse<T> {
  content: T[];
  totalElements: number;
  totalPages: number;
  size: number;
  number: number;
  first: boolean;
  last: boolean;
}
