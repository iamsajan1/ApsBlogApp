import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
 import MainBottomNavigator from './MainBottomNavigator';
import MainStackNavigator from './MainStackNavigator';
  
const App = () => {
  return (
    <NavigationContainer>
      <MainStackNavigator/>
    </NavigationContainer>
  );
};

export default App;