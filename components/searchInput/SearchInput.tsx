import { useState } from 'react';
import {
  View,
  Image,
  TextInput,
  TouchableOpacity,
  Alert,
  Platform,
} from 'react-native';

import { icons } from '@/constants/icons';
import { router, usePathname } from 'expo-router';

interface SearchInputProps {
  additionalStyles?: {};
  initialQuery?: string;
}
export const SearchInput = ({
  additionalStyles,
  initialQuery,
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const pathname = usePathname();
  const [query, setQuery] = useState(initialQuery || '');

  return (
    <View
      style={{
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        borderWidth: 2,
        borderColor: isFocused ? '#FF8E01' : '#232533',
        borderRadius: 16,
        width: '100%',
        height: 64,
        paddingHorizontal: 16,
        backgroundColor: '#1E1E2D',
        marginTop: 8,
        ...additionalStyles,
      }}
    >
      <TextInput
        placeholder={
          Platform.OS === 'web'
            ? 'Search for a product'
            : 'Search for a video topic'
        }
        placeholderTextColor="#7b7b8b"
        value={query}
        onChangeText={(e) => setQuery(e)}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        style={{
          display: 'flex',
          flex: 1,
          fontSize: 16,
          lineHeight: 36,
          color: '#FFF',
          fontFamily: 'Poppins-Regular',
        }}
      />
      <TouchableOpacity
        onPress={() => {
          if (!query) {
            return Alert.alert(
              'Missing query',
              'Please input something to search results across database',
            );
          }
          if (pathname.startsWith('/search')) {
            router.setParams({ query });
          } else {
            router.push(`/search/${query}`);
          }
        }}
      >
        <Image
          source={icons.search}
          resizeMode="contain"
          style={{ width: 16, height: 16 }}
        />
      </TouchableOpacity>
    </View>
  );
};
