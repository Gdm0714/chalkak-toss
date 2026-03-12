import {create} from 'zustand';
import {photoBoothApi, congestionApi, reviewApi} from '../api/photoBoothApi';
import type {
  PhotoBooth,
  PhotoBoothWithDistance,
  CongestionResponse,
  ReviewStats,
} from '../types';

interface PhotoBoothState {
  nearbyBooths: PhotoBoothWithDistance[];
  searchResults: PhotoBooth[];
  selectedBooth: PhotoBooth | null;
  congestion: CongestionResponse | null;
  reviewStats: ReviewStats | null;
  loading: boolean;
  error: string | null;

  fetchNearby: (lat: number, lng: number, radius?: number) => Promise<void>;
  search: (keyword: string) => Promise<void>;
  selectBooth: (booth: PhotoBooth) => void;
  fetchDetail: (id: number) => Promise<void>;
  clearSearch: () => void;
}

export const usePhotoBoothStore = create<PhotoBoothState>((set) => ({
  nearbyBooths: [],
  searchResults: [],
  selectedBooth: null,
  congestion: null,
  reviewStats: null,
  loading: false,
  error: null,

  fetchNearby: async (lat, lng, radius = 3.0) => {
    set({loading: true, error: null});
    try {
      const {data} = await photoBoothApi.getNearby(lat, lng, radius);
      set({nearbyBooths: data, loading: false});
    } catch (e: any) {
      set({error: e.message, loading: false});
    }
  },

  search: async (keyword) => {
    set({loading: true, error: null});
    try {
      const {data} = await photoBoothApi.search(keyword);
      set({searchResults: data.content, loading: false});
    } catch (e: any) {
      set({error: e.message, loading: false});
    }
  },

  selectBooth: (booth) => {
    set({selectedBooth: booth, congestion: null, reviewStats: null});
  },

  fetchDetail: async (id) => {
    set({loading: true});
    try {
      const [boothRes, congestionRes, statsRes] = await Promise.allSettled([
        photoBoothApi.getById(id),
        congestionApi.get(id),
        reviewApi.getStats(id),
      ]);

      set({
        selectedBooth:
          boothRes.status === 'fulfilled' ? boothRes.value.data : null,
        congestion:
          congestionRes.status === 'fulfilled'
            ? congestionRes.value.data
            : null,
        reviewStats:
          statsRes.status === 'fulfilled' ? statsRes.value.data : null,
        loading: false,
      });
    } catch (e: any) {
      set({error: e.message, loading: false});
    }
  },

  clearSearch: () => set({searchResults: []}),
}));
