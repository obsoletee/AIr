import { FlatList, ViewToken } from 'react-native';
import React, { useState } from 'react';
import TrendingItem from './item';

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

interface TrendingSectionProps {
  posts: Post[];
}

export const TrendingSection = ({ posts }: TrendingSectionProps) => {
  const [activeItem, setActiveItem] = useState<string | null>(null);

  const viewableItemsChanged = ({
    viewableItems,
  }: {
    viewableItems: Array<ViewToken & { item: Post }>;
  }) => {
    if (viewableItems.length > 0) {
      setActiveItem(viewableItems[0].item.id);
    }
  };

  return (
    <FlatList
      data={posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewableItemsChanged}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};
