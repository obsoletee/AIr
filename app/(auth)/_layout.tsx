import { Stack } from 'expo-router';
import React from 'react';
import { StatusBar } from 'react-native';

const AuthLayout = () => {
  return (
    <>
      <Stack>
        <Stack.Screen name="sign-in" options={{ headerShown: false }} />
        <Stack.Screen name="sign-up" options={{ headerShown: false }} />
      </Stack>
      <StatusBar backgroundColor="#161622" barStyle="light-content" />
    </>
  );
};

export default AuthLayout;
