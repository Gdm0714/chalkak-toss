import apiClient from './client';
import type {
  PhotoBooth,
  PhotoBoothWithDistance,
  Review,
  ReviewStats,
  CongestionResponse,
  PagedResponse,
} from '../types';

export const photoBoothApi = {
  getAll: () => apiClient.get<PhotoBooth[]>('/photo-booths'),

  getById: (id: number) => apiClient.get<PhotoBooth>(`/photo-booths/${id}`),

  getNearby: (latitude: number, longitude: number, radius = 3.0) =>
    apiClient.get<PhotoBoothWithDistance[]>('/photo-booths/nearby', {
      params: {latitude, longitude, radius},
    }),

  search: (keyword: string, page = 0, size = 20) =>
    apiClient.get<PagedResponse<PhotoBooth>>('/photo-booths/search/paged', {
      params: {keyword, page, size},
    }),

  getByBrand: (brand: string, page = 0, size = 20) =>
    apiClient.get<PagedResponse<PhotoBooth>>('/photo-booths/brand/' + brand + '/paged', {
      params: {page, size},
    }),
};

export const reviewApi = {
  getByPhotoBooth: (photoBoothId: number, page = 0, size = 20) =>
    apiClient.get<PagedResponse<Review>>(
      `/reviews/photo-booth/${photoBoothId}/paged`,
      {params: {page, size}},
    ),

  getStats: (photoBoothId: number) =>
    apiClient.get<ReviewStats>(`/reviews/photo-booth/${photoBoothId}/stats`),
};

export const congestionApi = {
  get: (photoBoothId: number) =>
    apiClient.get<CongestionResponse>(
      `/congestion/photo-booth/${photoBoothId}`,
    ),
};
