import React, {useEffect, useState} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
  Platform,
  PermissionsAndroid,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import {usePhotoBoothStore} from '../store/usePhotoBoothStore';
import {PhotoBoothCard} from '../components/PhotoBoothCard';
import {SearchBar} from '../components/SearchBar';
import {COLORS, DEFAULT_RADIUS} from '../constants';
import type {PhotoBooth} from '../types';

type NavigationProp = StackNavigationProp<any>;

export const HomeScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const {nearbyBooths, loading, error, fetchNearby} = usePhotoBoothStore();
  const [location, setLocation] = useState<{lat: number; lng: number} | null>(
    null,
  );

  useEffect(() => {
    requestLocationAndFetch();
  }, []);

  const requestLocationAndFetch = async () => {
    try {
      if (Platform.OS === 'android') {
        const granted = await PermissionsAndroid.request(
          PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        );
        if (granted !== PermissionsAndroid.RESULTS.GRANTED) {
          fetchNearby(37.5665, 126.978, DEFAULT_RADIUS);
          return;
        }
      }

      (navigator as any).geolocation?.getCurrentPosition(
        (position: any) => {
          const {latitude, longitude} = position.coords;
          setLocation({lat: latitude, lng: longitude});
          fetchNearby(latitude, longitude, DEFAULT_RADIUS);
        },
        () => {
          fetchNearby(37.5665, 126.978, DEFAULT_RADIUS);
        },
        {enableHighAccuracy: true, timeout: 5000},
      );
    } catch {
      fetchNearby(37.5665, 126.978, DEFAULT_RADIUS);
    }
  };

  const handleSearch = (keyword: string) => {
    navigation.navigate('Search', {keyword});
  };

  const handleBoothPress = (booth: PhotoBooth) => {
    navigation.navigate('Detail', {boothId: booth.id});
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Text style={styles.title}>찰칵</Text>
        <Text style={styles.subtitle}>내 주변 네컷사진관</Text>
      </View>

      <SearchBar onSearch={handleSearch} />

      {loading && nearbyBooths.length === 0 ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
          <Text style={styles.loadingText}>주변 사진관을 찾고 있어요</Text>
        </View>
      ) : error ? (
        <View style={styles.center}>
          <Text style={styles.errorText}>사진관을 불러올 수 없어요</Text>
          <Text style={styles.errorSub}>{error}</Text>
        </View>
      ) : (
        <FlatList
          data={nearbyBooths}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <PhotoBoothCard booth={item} onPress={handleBoothPress} />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>주변에 사진관이 없어요</Text>
            </View>
          }
          showsVerticalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.surface,
  },
  header: {
    paddingHorizontal: 20,
    paddingTop: 16,
    paddingBottom: 8,
  },
  title: {
    fontSize: 24,
    fontWeight: '800',
    color: COLORS.primary,
  },
  subtitle: {
    fontSize: 14,
    color: COLORS.textSecondary,
    marginTop: 2,
  },
  list: {
    paddingVertical: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  loadingText: {
    marginTop: 12,
    fontSize: 14,
    color: COLORS.textSecondary,
  },
  errorText: {
    fontSize: 16,
    fontWeight: '600',
    color: COLORS.text,
  },
  errorSub: {
    fontSize: 13,
    color: COLORS.textSecondary,
    marginTop: 4,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
});
