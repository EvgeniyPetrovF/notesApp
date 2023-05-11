import auth from '@react-native-firebase/auth';

export interface AuthInfo {
  email: string;
  password: string;
}

class AuthAPI {
  static login = async ({email, password}: AuthInfo) => {
    await auth().signInWithEmailAndPassword(email, password);
  };

  static register = async ({email, password}: AuthInfo) => {
    await auth().createUserWithEmailAndPassword(email, password);
  };

  static logout = async () => {
    await auth().signOut();
  };
}

export default AuthAPI;
