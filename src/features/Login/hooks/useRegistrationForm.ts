import {useState} from 'react';
import {FirebaseAuthTypes} from '@react-native-firebase/auth';
import AuthAPI from '../../../services/API/Auth';
// import DatabaseAPI from '../../../services/API/Database';
import {
  validateConfirmedPassword,
  validateEmail,
  validatePassword,
} from '../../../utils/validators';

const useLoginForm = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmedPassword, setConfirmedPassword] = useState('');
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);

  const onEmailChange = (text: string) => {
    setError('');
    setEmail(text);
  };

  const onPasswordChange = (text: string) => {
    setError('');
    setPassword(text);
  };

  const onConfirmedPasswordChange = (text: string) => {
    setError('');
    setConfirmedPassword(text);
  };

  const signUpHandler = async () => {
    try {
      setIsLoading(true);
      const validationError =
        validateEmail(email) ||
        validatePassword(password) ||
        validateConfirmedPassword(password, confirmedPassword);

      if (validationError) {
        setError(validationError);
        return;
      }

      await AuthAPI.register({email, password});

      // await DatabaseAPI.createNewUser();
    } catch (e) {
      const error = e as FirebaseAuthTypes.NativeFirebaseAuthError;

      setError(error.message);
    } finally {
      setIsLoading(false);
    }
  };

  return {
    email,
    error,
    isLoading,
    onEmailChange,
    password,
    onPasswordChange,
    signUpHandler,
    confirmedPassword,
    onConfirmedPasswordChange,
  };
};

export default useLoginForm;
