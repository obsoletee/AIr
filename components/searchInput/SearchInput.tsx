import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants/icons';

interface SearchInputProps {
  value: string;
  handleChangeText: (e: string) => void;
  additionalStyles?: {};
}
export const SearchInput = ({
  value,
  handleChangeText,
  additionalStyles,
}: SearchInputProps) => {
  const [isFocused, setIsFocused] = useState(false);

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
      }}
    >
      <TextInput
        placeholder="Search for a video topic"
        placeholderTextColor="#7b7b8b"
        value={value}
        onChangeText={handleChangeText}
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
      <TouchableOpacity>
        <Image
          source={icons.search}
          resizeMode="contain"
          style={{ width: 16, height: 16 }}
        />
      </TouchableOpacity>
    </View>
  );
};
