import {
  View,
  Text,
  TouchableOpacity,
  Image,
  ImageBackground,
} from 'react-native';
import React, { useMemo, useState } from 'react';
import * as Animatable from 'react-native-animatable';
import { icons } from '@/constants/icons';
import { ResizeMode, Video } from 'expo-av';

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

interface TrendingItemProps {
  activeItem: string | null;
  item: Post;
}

export const TrendingItem = ({ activeItem, item }: TrendingItemProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  const createAnimation = (fromScale: number, toScale: number) => ({
    0: { transform: [{ scale: fromScale }] },
    1: { transform: [{ scale: toScale }] },
  });

  const zoomIn = createAnimation(0.9, 1.05);
  const zoomOut = createAnimation(1.05, 0.9);

  const animation = useMemo(
    () => (activeItem === item.id ? zoomIn : zoomOut),
    [activeItem, item.id],
  );

  return (
    <Animatable.View
      style={{ marginRight: 20 }}
      animation={animation}
      duration={500}
    >
      {isPlaying ? (
        <Video
          source={{ uri: item.video }}
          resizeMode={ResizeMode.CONTAIN}
          shouldPlay
          useNativeControls
          onPlaybackStatusUpdate={(status) => {
            if (
              status.isLoaded &&
              !status.isPlaying &&
              status.positionMillis === status.durationMillis
            ) {
              setIsPlaying(false);
            }
          }}
          style={{
            width: 208,
            height: 288,
            borderRadius: 35,
            marginTop: 12,
            backgroundColor: '#CDCDE0',
          }}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setIsPlaying(true);
          }}
          style={{
            display: 'flex',
            flex: 1,
            justifyContent: 'center',
            alignItems: 'center',
            position: 'relative',
          }}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={{
              width: 208,
              height: 288,
              borderRadius: 35,
              overflow: 'hidden',
              marginTop: 20,
              marginBottom: 20,
              boxShadow: '0 10px 15px -3px, 0 4px 6px -4px',
            }}
            resizeMode="cover"
          />
          <View
            style={{
              position: 'absolute',
              top: 0,
              left: 0,
              width: '100%',
              height: '100%',
              justifyContent: 'center',
              alignItems: 'center',
            }}
          >
            <Image
              source={icons.play}
              style={{ width: 48, height: 48 }}
              resizeMode="contain"
            />
          </View>
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};
