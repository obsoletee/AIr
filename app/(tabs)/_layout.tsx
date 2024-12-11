import { Tabs } from 'expo-router';
import React from 'react';
import { View, Text, Image, ImageSourcePropType } from 'react-native';

import { icons } from '../../constants/icons';

interface TabIconProps {
  icon: ImageSourcePropType;
  color: string;
  name: string;
  focused: boolean;
}
const TabIcon = ({ icon, color, name, focused }: TabIconProps) => {
  return (
    <View
      style={{
        display: 'flex',
        flex: 1,
        justifyContent: 'space-around',
        alignItems: 'center',
        gap: 1,
      }}
    >
      <Image
        source={icon}
        resizeMode="contain"
        tintColor={color}
        style={{ width: 18, height: 18 }}
      />
      <Text
        style={{
          color: 'white',
          fontFamily: focused ? 'Poppins-Medium' : 'Poppins-Regular',
          fontSize: 12,
          lineHeight: 16,
          width: '100%',
        }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: '#FFA001',
          tabBarInactiveTintColor: '#CDCDE0',
          tabBarStyle: {
            backgroundColor: '#161622',
            borderTopWidth: 0,
            borderTopColor: '#232533',
            height: 48,
          },
        }}
      >
        <Tabs.Screen
          name="home"
          options={{
            title: 'Home',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.home}
                color={color}
                name="Home"
                focused={focused}
              ></TabIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="bookmark"
          options={{
            title: 'Bookmark',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.bookmark}
                color={color}
                name="Bookmark"
                focused={focused}
              ></TabIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="create"
          options={{
            title: 'Create',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.upload}
                color={color}
                name="Create"
                focused={focused}
              ></TabIcon>
            ),
          }}
        />
        <Tabs.Screen
          name="profile"
          options={{
            title: 'Profile',
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                icon={icons.profile}
                color={color}
                name="Profile"
                focused={focused}
              ></TabIcon>
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
