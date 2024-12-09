import {
  Dimensions,
  Image,
  ScrollView,
  StatusBar,
  Text,
  View,
} from 'react-native';
import React from 'react';
import { SafeAreaView } from 'react-native-safe-area-context';

import { images } from '../constants/images';
import StartButton from '@/components/startButton/';
import { Redirect, router } from 'expo-router';
import { useGlobalContext } from '@/context/GlobalProvider';

const App = () => {
  const { isLoggedIn, isLoading } = useGlobalContext();

  if (!isLoading && isLoggedIn) return <Redirect href="/home"></Redirect>;

  return (
    <SafeAreaView style={{ backgroundColor: '#161622', height: '100%' }}>
      <ScrollView contentContainerStyle={{ height: '100%' }}>
        <View
          style={{
            width: '100%',
            height: '100%',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            paddingLeft: 16,
            paddingRight: 16,
          }}
        >
          <Image
            source={images.logoUpdated}
            style={{ width: 130, height: 84 }}
            resizeMode="contain"
          />
          <Image
            source={images.cards}
            style={{ maxWidth: 380, width: '100%', height: 300 }}
            resizeMode="contain"
          />
          <View style={{ position: 'relative' }}>
            <Text
              style={{
                fontSize: 30,
                lineHeight: 36,
                color: 'white',
                textAlign: 'center',
                fontFamily: 'Poppins-Bold',
              }}
            >
              Discover Endless Possibilities with{' '}
              <Text style={{ color: '#FF8E01' }}>AIr</Text>
            </Text>
            <Image
              source={images.path}
              style={{
                width: 70,
                height: 12,
                position: 'absolute',
                bottom: -1,
                right: -10,
              }}
              resizeMode="contain"
            />
          </View>
          <Text
            style={{
              fontSize: 14,
              lineHeight: 20,
              color: '#CDCDE0',
              fontFamily: 'Poppins-Regular',
              marginTop: 28,
              textAlign: 'center',
            }}
          >
            Where creativity meets innovation: embark on a journey of limitless
            exploration with AIr
          </Text>

          <StartButton
            title="Continue with Email"
            handlePress={() => {
              router.push('/sign-in');
            }}
            containerStyles={{ marginTop: 28, width: '100%' }}
          ></StartButton>
        </View>
      </ScrollView>
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
    </SafeAreaView>
  );
};

export default App;
