import {useEffect, useState} from 'react';
import auth, {FirebaseAuthTypes} from '@react-native-firebase/auth';

export function useAuth() {
  const [user, setUser] = useState<FirebaseAuthTypes.User | null>(null);
  const [initializing, setInitializing] = useState(true);

  useEffect(() => {
    const onAuthStateChanged = (authUser: FirebaseAuthTypes.User | null) => {
      setUser(authUser);

      if (initializing) {
        setInitializing(false);
      }
    };

    const subscriber = auth().onAuthStateChanged(onAuthStateChanged);

    return subscriber;
  }, []);

  return {
    initializing,
    user,
    setUser,
  };
}
