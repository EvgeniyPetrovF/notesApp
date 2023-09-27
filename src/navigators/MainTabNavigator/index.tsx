import * as React from 'react';
import {
  BottomTabNavigationOptions,
  createBottomTabNavigator,
} from '@react-navigation/bottom-tabs';
import HomeIcon from '../../assets/icons/HomeIcon';
import SettingsIcon from '../../assets/icons/SettingsIcon';
import HomeScreen from '../../features/Home/screens/HomeScreen';
import SettingsScreen from '../../features/Settings/screens/SettingsScreen';
import {MainStackParamList} from '../../models/navigation';

const Tab = createBottomTabNavigator<MainStackParamList>();

const options: Record<string, BottomTabNavigationOptions> = {
  homeStackNavigator: {
    headerShown: false,
    tabBarLabel: 'Home',
    tabBarIcon: HomeIcon,
  },
  settings: {
    tabBarIcon: SettingsIcon,
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
      <Tab.Screen
        name="Settings"
        component={SettingsScreen}
        options={options.settings}
      />
    </Tab.Navigator>
  );
};

export default MainTabNavigator;
