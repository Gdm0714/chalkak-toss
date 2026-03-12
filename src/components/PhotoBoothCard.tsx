import React from 'react';
import {View, Text, StyleSheet, TouchableOpacity} from 'react-native';
import {COLORS} from '../constants';
import type {PhotoBooth, PhotoBoothWithDistance} from '../types';

interface Props {
  booth: PhotoBooth | PhotoBoothWithDistance;
  onPress: (booth: PhotoBooth) => void;
}

export const PhotoBoothCard: React.FC<Props> = ({booth, onPress}) => {
  const distance = 'distance' in booth ? booth.distance : null;

  return (
    <TouchableOpacity
      style={styles.card}
      onPress={() => onPress(booth)}
      activeOpacity={0.7}>
      <View style={styles.header}>
        <Text style={styles.brand}>{booth.brand}</Text>
        {booth.series ? <Text style={styles.series}>{booth.series}</Text> : null}
      </View>
      <Text style={styles.name} numberOfLines={1}>
        {booth.name}
      </Text>
      <Text style={styles.address} numberOfLines={1}>
        {booth.address}
      </Text>
      <View style={styles.footer}>
        {distance !== null && (
          <Text style={styles.distance}>
            {distance < 1
              ? `${Math.round(distance * 1000)}m`
              : `${distance.toFixed(1)}km`}
          </Text>
        )}
        {booth.operatingHours && (
          <Text style={styles.hours}>{booth.operatingHours}</Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  card: {
    backgroundColor: COLORS.background,
    borderRadius: 16,
    padding: 16,
    marginHorizontal: 16,
    marginVertical: 6,
    shadowColor: '#000',
    shadowOffset: {width: 0, height: 2},
    shadowOpacity: 0.06,
    shadowRadius: 8,
    elevation: 2,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 8,
    marginBottom: 4,
  },
  brand: {
    fontSize: 12,
    fontWeight: '700',
    color: COLORS.primary,
    backgroundColor: COLORS.primary + '15',
    paddingHorizontal: 8,
    paddingVertical: 2,
    borderRadius: 8,
    overflow: 'hidden',
  },
  series: {
    fontSize: 12,
    color: COLORS.textSecondary,
  },
  name: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
    marginBottom: 4,
  },
  address: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginBottom: 8,
  },
  footer: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: 12,
  },
  distance: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.accent,
  },
  hours: {
    fontSize: 12,
    color: COLORS.textTertiary,
  },
});
