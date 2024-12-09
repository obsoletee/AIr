import { StatusBar, Text, View } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

const App = () => {
  return (
    <View className="flex-1 items-center justify-center bg-white">
      <Text className="text-3xl font-pblack">AIr</Text>
      <StatusBar barStyle="dark-content" />
      <Link href="/home" className="text-2xl">
        Go to the profile
      </Link>
    </View>
  );
};

export default App;
