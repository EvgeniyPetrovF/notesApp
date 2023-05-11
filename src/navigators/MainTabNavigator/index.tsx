import * as React from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import HomeScreen from '../../features/Home/screens/HomeScreen';
import SettingsScreen from '../../features/Settings/screens/SettingsScreen';
import {MainStackParamList} from '../../models/navigation';

const Tab = createBottomTabNavigator<MainStackParamList>();

const options = {
  homeStackNavigator: {
    headerShown: false,
    tabBarLabel: 'Home',
  },
};

const MainTabNavigator = () => {
  return (
    <Tab.Navigator>
      <Tab.Screen
        name="Home"
        component={HomeScreen}
        options={options.homeStackNavigator}
      />
      <Tab.Screen name="Settings" component={SettingsScreen} />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
