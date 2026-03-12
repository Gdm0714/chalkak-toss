import React from 'react';
import {View, Text, StyleSheet} from 'react-native';
import {COLORS, CONGESTION_LABELS} from '../constants';
import type {CongestionLevel} from '../types';

interface Props {
  level: CongestionLevel;
  reliability?: 'LOW' | 'MEDIUM' | 'HIGH';
  compact?: boolean;
}

export const CongestionBadge: React.FC<Props> = ({
  level,
  reliability,
  compact = false,
}) => {
  const color = COLORS.congestion[level];
  const label = CONGESTION_LABELS[level];

  if (compact) {
    return (
      <View style={[styles.compactBadge, {backgroundColor: color + '20'}]}>
        <View style={[styles.dot, {backgroundColor: color}]} />
        <Text style={[styles.compactText, {color}]}>{label}</Text>
      </View>
    );
  }

  return (
    <View style={[styles.badge, {backgroundColor: color + '15'}]}>
      <View style={[styles.dot, {backgroundColor: color}]} />
      <Text style={[styles.label, {color}]}>{label}</Text>
      {reliability && (
        <Text style={styles.reliability}>
          (신뢰도: {reliability === 'HIGH' ? '높음' : reliability === 'MEDIUM' ? '보통' : '낮음'})
        </Text>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  badge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    gap: 6,
  },
  compactBadge: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 8,
    paddingVertical: 4,
    borderRadius: 12,
    gap: 4,
  },
  dot: {
    width: 8,
    height: 8,
    borderRadius: 4,
  },
  label: {
    fontSize: 14,
    fontWeight: '600',
  },
  compactText: {
    fontSize: 12,
    fontWeight: '600',
  },
  reliability: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
});
