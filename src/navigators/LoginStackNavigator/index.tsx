import React from 'react';
import {
  createStackNavigator,
  StackNavigationOptions,
} from '@react-navigation/stack';
import LoginScreen from '../../features/Login/screens/LoginScreen';
import SignUpScreen from '../../features/Login/screens/SignUpScreen';
import {LoginStackParamList} from '../../models/navigation';

const Stack = createStackNavigator<LoginStackParamList>();

const options: Record<string, StackNavigationOptions> = {
  signUp: {headerTitle: 'Sign Up'},
};

const LoginStackNavigator = () => {
  return (
    <Stack.Navigator>
      <Stack.Screen name="Login" component={LoginScreen} />
      <Stack.Screen
        name="SignUp"
        component={SignUpScreen}
        options={options.signUp}
      />
    </Stack.Navigator>
  );
};

export default LoginStackNavigator;
