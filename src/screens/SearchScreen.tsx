import React, {useEffect} from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  ActivityIndicator,
} from 'react-native';
import {useNavigation, useRoute} from '@react-navigation/native';
import type {StackNavigationProp} from '@react-navigation/stack';
import type {RouteProp} from '@react-navigation/native';
import {usePhotoBoothStore} from '../store/usePhotoBoothStore';
import {PhotoBoothCard} from '../components/PhotoBoothCard';
import {SearchBar} from '../components/SearchBar';
import {COLORS} from '../constants';
import type {PhotoBooth} from '../types';

type NavigationProp = StackNavigationProp<any>;
type SearchRouteProp = RouteProp<{Search: {keyword?: string}}, 'Search'>;

export const SearchScreen: React.FC = () => {
  const navigation = useNavigation<NavigationProp>();
  const route = useRoute<SearchRouteProp>();
  const {searchResults, loading, search, clearSearch} = usePhotoBoothStore();

  useEffect(() => {
    if (route.params?.keyword) {
      search(route.params.keyword);
    }
    return () => clearSearch();
  }, [route.params?.keyword]);

  const handleSearch = (keyword: string) => {
    search(keyword);
  };

  const handleBoothPress = (booth: PhotoBooth) => {
    navigation.navigate('Detail', {boothId: booth.id});
  };

  return (
    <View style={styles.container}>
      <SearchBar onSearch={handleSearch} />

      {loading ? (
        <View style={styles.center}>
          <ActivityIndicator size="large" color={COLORS.primary} />
        </View>
      ) : (
        <FlatList
          data={searchResults}
          keyExtractor={item => String(item.id)}
          renderItem={({item}) => (
            <PhotoBoothCard booth={item} onPress={handleBoothPress} />
          )}
          contentContainerStyle={styles.list}
          ListEmptyComponent={
            <View style={styles.center}>
              <Text style={styles.emptyText}>검색 결과가 없어요</Text>
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
  list: {
    paddingVertical: 8,
  },
  center: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 40,
  },
  emptyText: {
    fontSize: 15,
    color: COLORS.textSecondary,
  },
});
