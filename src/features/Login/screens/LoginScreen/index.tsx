import React, {FC} from 'react';
import {SafeAreaView, TouchableOpacity} from 'react-native';
import {NativeStackScreenProps} from '@react-navigation/native-stack';
import TextWrapper from '../../../../components/TextWrapper';
import {LoginStackParamList} from '../../../../models/navigation';
import LoginForm from '../../components/LoginForm';
import {styles} from './styles';

type Props = NativeStackScreenProps<LoginStackParamList, 'Login'>;

const LoginScreen: FC<Props> = ({navigation}) => {
  const goToRegistration = () => {
    navigation.navigate('SignUp');
  };

  return (
    <SafeAreaView style={styles.container}>
      <LoginForm />
      <TouchableOpacity onPress={goToRegistration}>
        <TextWrapper>Register account</TextWrapper>
      </TouchableOpacity>
    </SafeAreaView>
  );
};

export default LoginScreen;
