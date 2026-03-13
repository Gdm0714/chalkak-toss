import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  ScrollView,
  StyleSheet,
  ActivityIndicator,
  TouchableOpacity,
} from 'react-native';
import {useRoute} from '@react-navigation/native';
import type {RouteProp} from '@react-navigation/native';
import {usePhotoBoothStore} from '../store/usePhotoBoothStore';
import {reviewApi} from '../api/photoBoothApi';
import {CongestionBadge} from '../components/CongestionBadge';
import {ReviewCard} from '../components/ReviewCard';
import {COLORS} from '../constants';
import {shareMessage} from '../toss/tossSdk';
import type {Review} from '../types';

type DetailRouteProp = RouteProp<{Detail: {boothId: number}}, 'Detail'>;

export const DetailScreen: React.FC = () => {
  const route = useRoute<DetailRouteProp>();
  const {boothId} = route.params;
  const {selectedBooth, congestion, reviewStats, loading, fetchDetail} =
    usePhotoBoothStore();
  const [reviews, setReviews] = useState<Review[]>([]);
  const [reviewsLoading, setReviewsLoading] = useState(false);

  useEffect(() => {
    fetchDetail(boothId);
    loadReviews();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [boothId]);

  const loadReviews = async () => {
    setReviewsLoading(true);
    try {
      const {data} = await reviewApi.getByPhotoBooth(boothId, 0, 10);
      setReviews(data.content);
    } catch {
      // 리뷰 로딩 실패는 무시
    }
    setReviewsLoading(false);
  };

  if (loading && !selectedBooth) {
    return (
      <View style={styles.center}>
        <ActivityIndicator size="large" color={COLORS.primary} />
      </View>
    );
  }

  if (!selectedBooth) {
    return (
      <View style={styles.center}>
        <Text style={styles.errorText}>사진관 정보를 불러올 수 없어요</Text>
      </View>
    );
  }

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      {/* 기본 정보 */}
      <View style={styles.section}>
        <View style={styles.brandRow}>
          <Text style={styles.brand}>{selectedBooth.brand}</Text>
          {selectedBooth.series ? (
            <Text style={styles.series}>{selectedBooth.series}</Text>
          ) : null}
        </View>
        <Text style={styles.name}>{selectedBooth.name}</Text>
        <Text style={styles.address}>{selectedBooth.address}</Text>
        {selectedBooth.operatingHours && (
          <Text style={styles.hours}>{selectedBooth.operatingHours}</Text>
        )}
        <TouchableOpacity
          style={styles.shareButton}
          onPress={() =>
            shareMessage(
              `${selectedBooth.name} - ${selectedBooth.address} (찰칵에서 찾았어요!)`,
            )
          }>
          <Text style={styles.shareButtonText}>공유하기</Text>
        </TouchableOpacity>
      </View>

      {/* 혼잡도 */}
      <View style={styles.section}>
        <Text style={styles.sectionTitle}>현재 혼잡도</Text>
        {congestion ? (
          <View style={styles.congestionContainer}>
            <CongestionBadge
              level={congestion.congestionLevel}
              reliability={congestion.reliability}
            />
            <Text style={styles.congestionMessage}>{congestion.message}</Text>
          </View>
        ) : (
          <Text style={styles.noData}>혼잡도 정보가 없어요</Text>
        )}
      </View>

      {/* 리뷰 통계 */}
      {reviewStats && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>리뷰</Text>
          <View style={styles.statsRow}>
            <Text style={styles.avgRating}>
              {'\u2605'} {reviewStats.averageRating.toFixed(1)}
            </Text>
            <Text style={styles.reviewCount}>
              리뷰 {reviewStats.totalCount}개
            </Text>
          </View>
        </View>
      )}

      {/* 리뷰 목록 */}
      <View style={styles.section}>
        {reviewsLoading ? (
          <ActivityIndicator color={COLORS.primary} />
        ) : reviews.length > 0 ? (
          reviews.map(review => (
            <ReviewCard key={review.id} review={review} />
          ))
        ) : (
          <Text style={styles.noData}>아직 리뷰가 없어요</Text>
        )}
      </View>

      <View style={styles.bottomSpacer} />
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.background,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  errorText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
  section: {
    paddingHorizontal: 20,
    paddingVertical: 20,
    borderBottomWidth: 8,
    borderBottomColor: COLORS.surface,
  },
  sectionTitle: {
    fontSize: 17,
    fontWeight: '700',
    color: COLORS.text,
    marginBottom: 16,
    letterSpacing: -0.3,
  },
  brandRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 6,
  },
  brand: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.primary,
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 10,
    paddingVertical: 3,
    borderRadius: 8,
    overflow: 'hidden',
  },
  series: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  name: {
    fontSize: 22,
    fontWeight: '800',
    color: COLORS.text,
    marginBottom: 8,
    letterSpacing: -0.5,
  },
  address: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginBottom: 4,
    lineHeight: 20,
  },
  hours: {
    fontSize: 13,
    color: COLORS.textTertiary,
    marginTop: 4,
  },
  congestionContainer: {
    gap: 8,
  },
  congestionMessage: {
    fontSize: 13,
    color: COLORS.textSecondary,
  },
  noData: {
    fontSize: 14,
    color: COLORS.textTertiary,
    textAlign: 'center',
    paddingVertical: 20,
  },
  statsRow: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  avgRating: {
    fontSize: 24,
    fontWeight: '700',
    color: '#FFB300',
  },
  reviewCount: {
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  shareButton: {
    marginTop: 16,
    backgroundColor: COLORS.primary,
    height: 48,
    paddingHorizontal: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'flex-start',
  },
  shareButtonText: {
    color: '#FFFFFF',
    fontSize: 15,
    fontWeight: '600',
  },
  bottomSpacer: {
    height: 40,
  },
});
