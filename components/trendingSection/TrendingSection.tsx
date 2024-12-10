import { View, Text, FlatList } from 'react-native';
import React from 'react';

interface Post {
  $id: string;
}

interface TrendingSectionProps {
  posts: Post[];
}

export const TrendingSection = ({ posts }: TrendingSectionProps) => {
  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.$id}
      renderItem={({ item }) => (
        <Text style={{ color: 'white' }}>{item.$id}</Text>
      )}
      horizontal
    />
  );
};
