import { ResizeMode, Video } from 'expo-av';
import { useState } from 'react';
import { View, Text, Image, TouchableOpacity } from 'react-native';

import { icons } from '@/constants/icons';

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
interface VideoCardProps {
  data: Post;
}
export const VideoCard = ({ data }: VideoCardProps) => {
  const [isPlaying, setIsPlaying] = useState(false);

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'column',
        flex: 1,
        alignItems: 'center',
        paddingHorizontal: 16,
        marginBottom: 56,
      }}
    >
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          flex: 1,
          gap: 12,
          alignItems: 'flex-start',
        }}
      >
        <View
          style={{
            display: 'flex',
            flexDirection: 'row',
            flex: 1,
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <View
            style={{
              width: 46,
              height: 46,
              borderRadius: 8,
              borderColor: '#FF9C01',
              borderWidth: 1,

              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
            }}
          >
            <Image
              source={{ uri: data.creator.avatar }}
              style={{ width: '100%', height: '100%', borderRadius: 8 }}
              resizeMode="contain"
            />
          </View>
          <View
            style={{
              display: 'flex',
              justifyContent: 'center',
              flex: 1,
              marginLeft: 12,
              columnGap: 4,
            }}
          >
            <Text
              style={{
                fontSize: 14,
                lineHeight: 20,
                color: 'white',
                fontFamily: 'Poppins-Medium',
              }}
              numberOfLines={1}
            >
              {data.title}
            </Text>
            <Text
              style={{
                fontSize: 12,
                lineHeight: 16,
                color: '#CDCDE0',
                fontFamily: 'Poppins-Regular',
              }}
              numberOfLines={1}
            >
              {data.creator.username}
            </Text>
          </View>
        </View>
        <View style={{ paddingTop: 8 }}>
          <Image
            source={icons.menu}
            style={{ width: 16, height: 16 }}
            resizeMode="contain"
          ></Image>
        </View>
      </View>
      {isPlaying ? (
        <Video
          style={{
            width: '100%',
            height: 240,
            borderRadius: 8,
            marginTop: 12,
            backgroundColor: '#CDCDE0',
          }}
          source={{ uri: data.video }}
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
        />
      ) : (
        <TouchableOpacity
          activeOpacity={0.6}
          onPress={() => {
            setIsPlaying(true);
          }}
          style={{
            width: '100%',
            height: 240,
            borderRadius: 8,
            marginTop: 12,
            position: 'relative',
          }}
        >
          <Image
            source={{ uri: data.thumbnail }}
            style={{ width: '100%', height: '100%', borderRadius: 8 }}
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
    </View>
  );
};
