import { useRef, useState } from 'react';
import { FlatList, Platform, ViewToken } from 'react-native';

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

  const viewabilityCallback = useRef(
    ({
      viewableItems,
    }: {
      viewableItems: Array<ViewToken & { item: Post }>;
    }) => {
      if (viewableItems.length > 0) {
        const newActiveItem = viewableItems[0].item.id;
        if (newActiveItem !== activeItem) {
          setActiveItem(newActiveItem);
        }
      }
    },
  );

  return (
    <FlatList
      data={Platform.OS === 'web' ? posts.slice(0, 5) : posts}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <TrendingItem activeItem={activeItem} item={item} />
      )}
      horizontal
      onViewableItemsChanged={viewabilityCallback.current}
      viewabilityConfig={{
        itemVisiblePercentThreshold: 70,
      }}
      contentOffset={{ x: 170, y: 0 }}
    />
  );
};
