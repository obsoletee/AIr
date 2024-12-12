import { Text, TouchableOpacity, Platform, StyleSheet } from 'react-native';

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
  const dynamicButtonStyle = {
    ...styles.buttonWrapper,
    opacity: isLoading ? 0.5 : 1,
    ...containerStyles,
  };

  return (
    <TouchableOpacity
      onPress={handlePress}
      activeOpacity={0.7}
      style={dynamicButtonStyle}
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

const styles = StyleSheet.create({
  buttonWrapper: {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#FF9C01',
    borderRadius: 12,
    minHeight: 62,
    ...Platform.select({
      web: { width: '20%' },
      default: { width: 'auto' },
    }),
  },
});
