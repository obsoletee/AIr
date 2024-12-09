import { View, Text, Image, TextInput, TouchableOpacity } from 'react-native';
import React, { useState } from 'react';
import { icons } from '@/constants/icons';

interface FormFieldProps {
  title: string;
  value: string;
  handleChangeText: (e: string) => void;
  additionalStyles: {};
  keyboardType: 'email-address' | 'default';
  placeholder: string;
}
export const FormField = ({
  title,
  value,
  handleChangeText,
  additionalStyles,
  keyboardType,
  placeholder,
}: FormFieldProps) => {
  const [isFocused, setIsFocused] = useState(false);
  const [isPasswordHidden, setIsPasswordHidden] = useState(true);

  return (
    <View style={{ ...additionalStyles }}>
      <Text
        style={{
          marginTop: 8,
          fontSize: 16,
          lineHeight: 24,
          color: '#CDCDE0',
          fontFamily: 'Poppins-Medium',
        }}
      >
        {title}
      </Text>
      <View
        style={{
          display: 'flex',
          flexDirection: 'row',
          alignItems: 'center',
          justifyContent: 'center',
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
          keyboardType={keyboardType}
          placeholder={placeholder}
          placeholderTextColor="#7b7b8b"
          value={value}
          onChangeText={handleChangeText}
          secureTextEntry={
            title === 'Password' && isPasswordHidden ? true : false
          }
          onFocus={() => setIsFocused(true)}
          onBlur={() => setIsFocused(false)}
          style={{
            display: 'flex',
            flex: 1,
            fontSize: 16,
            lineHeight: 24,
            color: '#FFF',
            fontFamily: 'Poppins-Medium',
          }}
        />
        {title === 'Password' ? (
          <TouchableOpacity
            onPress={() => setIsPasswordHidden(!isPasswordHidden)}
          >
            <Image
              source={isPasswordHidden ? icons.eye : icons.eyeHide}
              resizeMode="contain"
              style={{ width: 36, height: 36 }}
            />
          </TouchableOpacity>
        ) : (
          <></>
        )}
      </View>
    </View>
  );
};
