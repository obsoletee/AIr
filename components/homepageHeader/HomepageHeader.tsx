import { View, Text, Image, StyleSheet, Platform } from 'react-native';
import React, { useEffect, useState } from 'react';
import { images } from '@/constants/images';
import SearchInput from '../searchInput';
import TrendingSection from '../trendingSection';
import { Post } from '../trendingSection/TrendingSection';
import { getCurrentUser } from '@/lib/appwrite';

interface HomePageHeaderProps {
  memoizedLatestPosts: Post[] | null;
}

const HomepageHeader = ({ memoizedLatestPosts }: HomePageHeaderProps) => {
  const [user, setUser] = useState('');

  useEffect(() => {
    getCurrentUser()
      .then((res) => {
        if (res) {
          setUser(res.username);
        } else {
          setUser('Guest');
        }
      })
      .catch((error: any) => {
        console.log(error);
      });
  }, []);

  return (
    <View style={styles.wrapper}>
      <View style={styles.mainContainer}>
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
            {user ? user : 'User'}
          </Text>
        </View>
        <View style={{ marginTop: 6 }}>
          <Image
            source={images.logoSmall}
            style={{ width: 36, height: 40, resizeMode: 'contain' }}
          />
        </View>
      </View>
      <SearchInput />
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
          {Platform.OS === 'web' ? 'Popular Products' : 'Latest Videos'}
        </Text>
        <TrendingSection posts={memoizedLatestPosts ?? []} />
      </View>
    </View>
  );
};

export default HomepageHeader;

const styles = StyleSheet.create({
  wrapper: { marginTop: 24, paddingHorizontal: 16 },
  mainContainer: {
    display: 'flex',
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
    marginBottom: 24,
  },
});
function seEffect(arg0: () => void, arg1: never[]) {
  throw new Error('Function not implemented.');
}
