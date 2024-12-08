import { StatusBar, StyleSheet, Text, View } from 'react-native';
import { Link } from 'expo-router';
import React from 'react';

const App = () => {
  return (
    <View style={styles.container}>
      <Text>AIr</Text>
      <StatusBar barStyle="dark-content" />
      <Link href="/profile" style={styles.link}>
        Go to the profile
      </Link>
    </View>
  );
};

export default App;

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#fff',
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  link: {
    color: 'blue',
    fontSize: 24,
  },
});
