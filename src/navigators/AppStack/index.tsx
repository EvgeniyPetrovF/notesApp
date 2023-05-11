import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {useAuth} from '../../common/hooks/useAuth';
import {StackParamList} from '../../models/navigation';
import LoginStackNavigator from '../LoginStackNavigator';
import MainTabNavigator from '../MainTabNavigator';

const Stack = createStackNavigator<StackParamList>();

const options: Record<string, StackNavigationOptions> = {
  app: {},
  login: {
    headerShown: false,
  },
};

const AppStack = () => {
  const {user} = useAuth();

  return (
    <Stack.Navigator initialRouteName="LoginStackNavigator">
      {user ? (
        <Stack.Screen
          name="MainTabNavigator"
          component={MainTabNavigator}
          options={options.home}
        />
      ) : (
        <Stack.Screen
          name="LoginStackNavigator"
          component={LoginStackNavigator}
          options={options.login}
        />
      )}
    </Stack.Navigator>
  );
};

export default AppStack;
