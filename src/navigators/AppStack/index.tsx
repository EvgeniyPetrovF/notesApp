import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import {useAuth} from '../../common/hooks/useAuth';
import Loader from '../../components/Loader';
import {StackParamList} from '../../models/navigation';
import LoginStackNavigator from '../LoginStackNavigator';
import MainTabNavigator from '../MainTabNavigator';

const Stack = createStackNavigator<StackParamList>();

const options: Record<string, StackNavigationOptions> = {
  app: {},
  login: {
    headerShown: false,
  },
  main: {
    headerShown: false,
  },
};

const AppStack = () => {
  const {user, initializing} = useAuth();

  if (initializing) {
    return <Loader />;
  }

  return (
    <Stack.Navigator initialRouteName="LoginStackNavigator">
      {user ? (
        <Stack.Screen
          name="MainTabNavigator"
          component={MainTabNavigator}
          options={options.main}
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
