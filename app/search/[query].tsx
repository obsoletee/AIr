import { View, Text, SafeAreaView, FlatList, Platform } from 'react-native';
import React, { useCallback, useEffect, useState } from 'react';
import { useLocalSearchParams } from 'expo-router';
import Empty from '@/components/empty';
import SearchInput from '@/components/searchInput';
import VideoCard from '@/components/videoCard';
import { useAppwite } from '@/hooks/useAppwite';
import { searchPosts } from '@/lib/appwrite';

const Search = () => {
  const [numberOfColumns, setNumberOfColumns] = useState(
    Platform.OS === 'web' ? 3 : 1,
  );
  const response = useLocalSearchParams();
  const query = Array.isArray(response.query)
    ? response.query[0]
    : response.query || '';

  const memoizedSearchPosts = useCallback(() => searchPosts(query), [query]);

  const { data: posts, refetch } = useAppwite({ fn: memoizedSearchPosts });

  useEffect(() => {
    refetch();
  }, [query]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#161622',
        height: '100%',
      }}
    >
      <FlatList
        key={numberOfColumns}
        numColumns={numberOfColumns}
        data={posts}
        keyExtractor={(item) => item.id}
        renderItem={({ item }) => <VideoCard data={item} />}
        ListHeaderComponent={() => {
          return (
            <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
              <Text
                style={{
                  fontFamily: 'Poppins-Medium',
                  fontSize: 14,
                  lineHeight: 20,
                  color: '#CDCDE0',
                }}
              >
                Search Results
              </Text>
              <Text
                style={{
                  fontFamily: 'Poppins-Bold',
                  fontSize: 24,
                  lineHeight: 32,
                  color: 'white',
                }}
              >
                {query}
              </Text>
              <View style={{ marginBottom: 16 }}>
                <SearchInput initialQuery={query} />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <Empty
            title="No Videos Found"
            subtitle="No videos found for this search query"
          />
        )}
      />
    </SafeAreaView>
  );
};

export default Search;
