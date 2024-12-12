import { useEffect, useMemo, useState } from 'react';
import {
  ActivityIndicator,
  FlatList,
  Image,
  Platform,
  RefreshControl,
  SafeAreaView,
  Text,
  View,
} from 'react-native';

import Empty from '@/components/empty';
import SearchInput from '@/components/searchInput';
import TrendingSection from '@/components/trendingSection';
import VideoCard from '@/components/videoCard';
import { images } from '@/constants/images';
import { getAllPosts, getLatestPosts } from '@/lib/appwrite';
import { useAppwite } from '@/hooks/useAppwite';
import HomepageHeader from '@/components/homepageHeader/HomepageHeader';

export interface Post {
  id: string;
  title: string;
  thumbnail: string;
  video: string;
  creator: {
    avatar: string;
    username: string;
  };
  createdAt: string;
}

const Home = () => {
  const [refreshing, setRefreshing] = useState(false);
  const [numberOfColumns, setNumberOfColumns] = useState(
    Platform.OS === 'web' ? 3 : 1,
  );

  const { data: posts, refetch } = useAppwite({ fn: getAllPosts });
  const { data: latestPosts, refetch: latestPostsRefetch } = useAppwite({
    fn: getLatestPosts,
  });

  const memoizedLatestPosts = useMemo(() => latestPosts, [latestPosts]);

  const onRefresh = async () => {
    setRefreshing(true);
    await refetch();
    await latestPostsRefetch();
    setRefreshing(false);
  };

  useEffect(() => {
    if (latestPosts && latestPosts.length > 0) {
      setRefreshing(false);
    }
  }, [latestPosts]);

  return (
    <SafeAreaView
      style={{
        backgroundColor: '#161622',
        height: '100%',
      }}
    >
      {refreshing ? (
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
          }}
        >
          <ActivityIndicator size="large" color="#FF8E01" />
        </View>
      ) : (
        <FlatList
          data={posts}
          key={numberOfColumns}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => <VideoCard data={item} />}
          ListHeaderComponent={() => {
            return <HomepageHeader memoizedLatestPosts={memoizedLatestPosts} />;
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
          numColumns={numberOfColumns}
        />
      )}
    </SafeAreaView>
  );
};

export default Home;
