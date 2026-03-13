export const API_BASE_URL = __DEV__
  ? 'http://localhost:8082/api'
  : 'https://api.chalkak.co.kr/api';

export const DEFAULT_RADIUS = 3.0;

export const COLORS = {
  primary: '#3182F6',
  primaryLight: '#5B9CF6',
  accent: '#3182F6',
  background: '#FFFFFF',
  surface: '#F4F4F4',
  text: '#191F28',
  textSecondary: '#8B95A1',
  textTertiary: '#B0B8C1',
  border: '#E4E8EB',
  error: '#F04452',
  success: '#00C851',
  warning: '#FF9800',
  congestion: {
    RELAXED: '#00C851',
    NORMAL: '#4CAF50',
    BUSY: '#FF9800',
    VERY_BUSY: '#F04452',
    UNKNOWN: '#B0B8C1',
  },
} as const;

export const CONGESTION_LABELS: Record<string, string> = {
  RELAXED: '여유',
  NORMAL: '보통',
  BUSY: '혼잡',
  VERY_BUSY: '매우 혼잡',
  UNKNOWN: '정보 없음',
};

export const BRANDS = [
  '인생네컷',
  '하루필름',
  '포토이즘',
  '포토그레이',
  '셀픽스',
  '포토시그니처',
  '비룸',
] as const;
