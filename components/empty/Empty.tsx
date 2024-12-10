import { View, Text, Image } from 'react-native';
import React from 'react';
import { images } from '@/constants/images';
import StartButton from '../startButton';
import { router } from 'expo-router';

interface EmptyProps {
  title: string;
  subtitle: string;
}

export const Empty = ({ title, subtitle }: EmptyProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
        paddingHorizontal: 16,
      }}
    >
      <Image
        source={images.empty}
        style={{ width: 270, height: 215 }}
        resizeMode="contain"
      ></Image>

      <Text
        style={{
          fontFamily: 'Poppins-Bold',
          fontSize: 20,
          lineHeight: 28,
          color: 'white',
          textAlign: 'center',
        }}
      >
        {title}
      </Text>
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          fontSize: 14,
          lineHeight: 20,
          color: '#CDCDE0',
        }}
      >
        {subtitle}
      </Text>
      <StartButton
        title="Create video"
        handlePress={() => router.push('/create')}
        containerStyles={{ width: '100%', marginTop: 20, marginBottom: 20 }}
      />
    </View>
  );
};
