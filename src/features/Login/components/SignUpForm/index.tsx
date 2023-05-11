import React from 'react';
import {View} from 'react-native';
import CustomButton from '../../../../components/CustomButton';
import TextInputWrapper from '../../../../components/TextInputWrapper';
import TextWrapper from '../../../../components/TextWrapper';
import useRegistrationForm from '../../hooks/useRegistrationForm';
import {styles} from './styles';

const SignUpForm = () => {
  const {
    error,
    isLoading,
    email,
    password,
    onEmailChange,
    onPasswordChange,
    signUpHandler,
    confirmedPassword,
    onConfirmedPasswordChange,
  } = useRegistrationForm();

  return (
    <View style={styles.formContainer}>
      <View style={[styles.inputsContainer, styles.hugeBottomOffset]}>
        <TextInputWrapper
          label="Email"
          placeholder="your_email@email.com"
          keyboardType="email-address"
          value={email}
          onChangeText={onEmailChange}
        />
        <TextInputWrapper
          label="Password"
          placeholder="******"
          secureTextEntry
          value={password}
          onChangeText={onPasswordChange}
        />
        <TextInputWrapper
          label="Confirm password"
          placeholder="******"
          secureTextEntry
          value={confirmedPassword}
          onChangeText={onConfirmedPasswordChange}
        />
        {error && <TextWrapper style={styles.error}>{error}</TextWrapper>}
      </View>
      <CustomButton
        label="Sign Up"
        onPress={signUpHandler}
        disabled={isLoading}
        pending={isLoading}
      />
    </View>
  );
};

export default SignUpForm;
