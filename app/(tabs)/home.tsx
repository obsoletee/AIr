import {
  View,
  Text,
  SafeAreaView,
  FlatList,
  Image,
  RefreshControl,
  Alert,
} from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants/images';
import SearchInput from '@/components/searchInput';
import TrendingSection from '@/components/trendingSection';
import Empty from '@/components/empty';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import { useAppwite } from '@/hooks/useAppwite';
import VideoCard from '@/components/videoCard';

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);

  const { data: posts, refetch } = useAppwite({ fn: getAllPosts });
  const { data: latestPosts } = useAppwite({
    fn: getLatestPosts,
  });

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch;
    setRefreshing(false);
  };

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#161622',
        height: '100%',
      }}
    >
      <FlatList
        data={posts}
        keyExtractor={(item) => item.$id}
        renderItem={({ item }) => <VideoCard data={item} />}
        ListHeaderComponent={() => {
          return (
            <View style={{ marginTop: 24, paddingHorizontal: 16 }}>
              <View
                style={{
                  display: 'flex',
                  flexDirection: 'row',
                  flex: 1,
                  justifyContent: 'space-between',
                  alignItems: 'flex-start',
                  marginBottom: 24,
                }}
              >
                <View>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Medium',
                      fontSize: 14,
                      lineHeight: 20,
                      color: '#CDCDE0',
                    }}
                  >
                    Welcome back
                  </Text>
                  <Text
                    style={{
                      fontFamily: 'Poppins-Bold',
                      fontSize: 24,
                      lineHeight: 32,
                      color: 'white',
                    }}
                  >
                    User
                  </Text>
                </View>
                <View style={{ marginTop: 6 }}>
                  <Image
                    source={images.logoSmall}
                    style={{ width: 36, height: 40, resizeMode: 'contain' }}
                  />
                </View>
              </View>
              <SearchInput handleChangeText={() => {}} value="" />
              <View
                style={{
                  width: '100%',
                  display: 'flex',
                  flex: 1,
                  paddingBottom: 16,
                  paddingTop: 20,
                }}
              >
                <Text
                  style={{
                    color: '#CDCDE0',
                    fontFamily: 'Poppins-Regular',
                    marginBottom: 12,
                  }}
                >
                  Latest Videos
                </Text>
                <TrendingSection posts={latestPosts ?? []} />
              </View>
            </View>
          );
        }}
        ListEmptyComponent={() => (
          <Empty
            title="No Videos Found"
            subtitle="Be the first one to upload a video"
          />
        )}
        refreshControl={
          <RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
        }
      />
    </SafeAreaView>
  );
};

export default Home;
