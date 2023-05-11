import {useState} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import AuthAPI from '../../../services/API/Auth';
import {validateEmail, validatePassword} from '../../../utils/validators';

const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onNicknameChange = (text: string) => {
    setError('');
    setEmail(text);
  };

  const onPasswordChange = (text: string) => {
    setError('');
    setPassword(text);
  };

  const loginHandler = async () => {
    try {
      setIsLoading(true);
      const validationError =
        validateEmail(email) || validatePassword(password);
      if (validationError) {
        setError(validationError);
        return;
      }

      await AuthAPI.login({email, password});
    } catch (e) {
      const error = e as FirebaseAuthTypes.NativeFirebaseAuthError;

      if (['auth/invalid-email', 'auth/wrong-password'].includes(error.code)) {
        setError('Your email or password was incorrect');
      } else if (error.code === 'auth/email-already-in-use') {
        setError('An account with this email already exists');
      } else {
        setError('There was a problem with your request');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return {
    nickName: email,
    error,
    isLoading,
    onChangeText: onNicknameChange,
    password,
    onPasswordChange,
    loginHandler,
  };
};

export default useLoginForm;
