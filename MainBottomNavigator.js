import React from 'react';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Icon, Provider as PaperProvider, useTheme } from 'react-native-paper';
 import Blogs from './src/Screens/Blogs';
import Profile from './src/Screens/Profile';
import Courses from './src/Screens/Courses';
import Universities from './src/Screens/Universities';
import Home from './src/Screens/Home';
import CustomHeader from './src/Screens/CustomHeader';

const Tab = createBottomTabNavigator();

const MainBottomNavigator = () => {
  const { colors } = useTheme();

  return (
    <PaperProvider>
      <Tab.Navigator
        tabBarOptions={{
          activeTintColor: colors.primary,
          inactiveTintColor: colors.text,
          labelStyle: {
            fontSize: 14,
             marginBottom: 5,
          },
          style: {
            backgroundColor: colors.background,
            borderTopWidth: 1,
            borderTopColor: colors.border,
          },
        }}
      >
        <Tab.Screen
          name="Home"
          component={Home}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon source="home" color={color} size={size} />
            ),
            header: () => <CustomHeader />, // Use CustomHeader as the header for Home screen
          }}
        />
        <Tab.Screen
          name="Blog"
          component={Blogs}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon source="newspaper" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Course"
          component={Courses}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon source="menu" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Universities"
          component={Universities}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon source="school-outline" color={color} size={size} />
            ),
          }}
        />
        <Tab.Screen
          name="Profile"
          component={Profile}
          options={{
            tabBarIcon: ({ color, size }) => (
              <Icon source="account" color={color} size={size} />
            ),
          }}
        />
      </Tab.Navigator>
    </PaperProvider>
  );
};

export default MainBottomNavigator;
