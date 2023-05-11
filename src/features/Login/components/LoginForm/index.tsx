import React from 'react';
import {View} from 'react-native';
import CustomButton from '../../../../components/CustomButton';
import TextInputWrapper from '../../../../components/TextInputWrapper';
import useLoginForm from '../../hooks/useLogin';
import {styles} from './styles';

const LoginForm = () => {
  const {
    isLoading,
    loginHandler,
    nickName,
    onChangeText,
    error,
    password,
    onPasswordChange,
  } = useLoginForm();

  return (
    <View style={styles.formContainer}>
      <TextInputWrapper
        keyboardType="email-address"
        autoCapitalize="none"
        label="Your email"
        value={nickName}
        onChangeText={onChangeText}
        placeholder="Email"
        containerStyle={styles.bottomOffset}
      />
      <TextInputWrapper
        secureTextEntry
        autoCapitalize="none"
        label="Your password"
        value={password}
        onChangeText={onPasswordChange}
        placeholder="Password"
        error={error}
        containerStyle={styles.hugeBottomOffset}
      />
      <CustomButton
        label="Login"
        onPress={loginHandler}
        disabled={isLoading}
        pending={isLoading}
      />
    </View>
  );
};
export default LoginForm;
