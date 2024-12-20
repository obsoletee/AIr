import { ResizeMode, Video } from 'expo-av';
import { useMemo, useState } from 'react';
import {
  View,
  TouchableOpacity,
  Image,
  ImageBackground,
  StyleSheet,
  Platform,
} from 'react-native';
import * as Animatable from 'react-native-animatable';

import { icons } from '@/constants/icons';
import React from 'react';

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
      style={styles.animatableContainer}
      animation={Platform.OS === 'web' ? undefined : animation}
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
          style={styles.videoPlayer}
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setIsPlaying(true);
          }}
          style={styles.thumbnailContainer}
        >
          <ImageBackground
            source={{ uri: item.thumbnail }}
            style={styles.thumbnailImage}
            resizeMode="cover"
          />
          {Platform.OS === 'web' ? (
            <></>
          ) : (
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
          )}
        </TouchableOpacity>
      )}
    </Animatable.View>
  );
};

const styles = StyleSheet.create({
  animatableContainer: {
    marginRight: 20,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    overflow: 'hidden',
    borderRadius: 35,
  },
  videoPlayer: {
    borderRadius: 35,
    marginTop: 12,
    backgroundColor: '#CDCDE0',
    ...Platform.select({
      web: { width: 355, height: 440 },
      default: { width: 208, height: 288 },
    }),
  },
  thumbnailContainer: {
    display: 'flex',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  thumbnailImage: {
    borderRadius: 35,
    overflow: 'hidden',
    marginTop: 20,
    marginBottom: 20,
    boxShadow: '0 10px 15px -3px, 0 4px 6px -4px',
    ...Platform.select({
      web: { width: 355, height: 440 },
      default: { width: 208, height: 288 },
    }),
  },
});
