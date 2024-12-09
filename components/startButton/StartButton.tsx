import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';

interface StartButtonProps {
  title: string;
  handlePress: () => void;
  containerStyles?: {};
  textStyles?: {};
  isLoading?: boolean;
}
export const StartButton = ({
  title,
  handlePress,
  containerStyles,
  textStyles,
  isLoading,
}: StartButtonProps) => {
  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={{
        backgroundColor: '#FF9C01',
        borderRadius: 12,
        minHeight: 62,
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        ...containerStyles,
        opacity: isLoading ? 0.5 : 1,
      }}
      disabled={isLoading}
    >
      <Text
        style={{
          fontFamily: 'Poppins-Medium',
          color: '161622',
          fontSize: 18,
          lineHeight: 28,
          ...textStyles,
        }}
      >
        {title}
      </Text>
    </TouchableOpacity>
  );
};
