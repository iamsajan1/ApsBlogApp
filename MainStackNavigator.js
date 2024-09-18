import React from 'react';
import {createStackNavigator,TransitionPresets} from '@react-navigation/stack';
import {TouchableOpacity} from 'react-native';
import {IconButton} from 'react-native-paper'; // Import IconButton from React Native Paper
import MainBottomNavigator from './MainBottomNavigator';
import Blogs from './src/Screens/Blogs';
import PostDetail from './src/Screens/PostDetail';
import CourseDetails from './src/Screens/CourseDetails';
import UniversityDetails from './src/Screens/UniversityDetails';
import Login from './src/Screens/Login';
import OtpScreen from './src/Screens/OtpScreen';
import SplashScreen from './src/Screens/SplashScreen';

const Stack = createStackNavigator();

const MainStackNavigator = () => {
  return (
    <Stack.Navigator   screenOptions={{
       ...TransitionPresets.SlideFromRightIOS,
    }}>
        <Stack.Screen
        name="SplashScreen"
        component={SplashScreen}
        options={{ headerShown: false }}
      />
        <Stack.Screen
        name="Login"
        component={Login}
        options={{headerShown: false}}
      />
      <Stack.Screen
        name="OtpScreen"
        component={OtpScreen}
        options={{headerShown: false}}
      />

      <Stack.Screen
        name="MainBottomNavigator"
        component={MainBottomNavigator}
        options={{headerShown: false}}
      />
      
      <Stack.Screen name="Blogs" component={Blogs} options={{title: 'Blogs'}} />
      <Stack.Screen
        name="PostDetail"
        component={PostDetail}
        options={{title: 'Post Detail'}}
      />
      <Stack.Screen
        name="CourseDetails"
        component={CourseDetails}
        options={({navigation}) => ({
          title: 'Course Details',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconButton icon="arrow-left" size={24} />
            </TouchableOpacity>
          ),
        })}
      />
      <Stack.Screen
        name="UniversityDetails"
        component={UniversityDetails}
        options={({navigation}) => ({
          title: 'University Details',
          headerLeft: () => (
            <TouchableOpacity onPress={() => navigation.goBack()}>
              <IconButton icon="arrow-left" size={24} />
            </TouchableOpacity>
          ),
        })}
      />
    </Stack.Navigator>
  );
};

export default MainStackNavigator;
