import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS} from '../constants';
import type {Review} from '../types';

interface Props {
  review: Review;
}

const StarRating: React.FC<{rating: number}> = ({rating}) => {
  const stars = Array.from({length: 5}, (_, i) =>
    i < rating ? '\u2605' : '\u2606',
  ).join('');
  return <Text style={styles.stars}>{stars}</Text>;
};

export const ReviewCard: React.FC<Props> = ({review}) => {
  const date = new Date(review.createdAt);
  const formattedDate = `${date.getFullYear()}.${String(date.getMonth() + 1).padStart(2, '0')}.${String(date.getDate()).padStart(2, '0')}`;

  return (
    <View style={styles.card}>
      <View style={styles.header}>
        <Text style={styles.nickname}>{review.userNickname}</Text>
        <Text style={styles.date}>{formattedDate}</Text>
      </View>
      <StarRating rating={review.rating} />
      <Text style={styles.content}>{review.content}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    paddingVertical: 16,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.surface,
  },
  header: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 4,
  },
  nickname: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.text,
  },
  date: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
  stars: {
    fontSize: 14,
    color: '#FFB300',
    marginBottom: 6,
  },
  content: {
    fontSize: 14,
    color: COLORS.text,
    lineHeight: 22,
  },
});
