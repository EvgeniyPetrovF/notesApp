import React, {FC} from 'react';
import {SafeAreaView} from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../../../components/CustomButton';
import TextWrapper from '../../../../components/TextWrapper';
import AuthAPI from '../../../../services/API/Auth';
import {styles} from './styles';

const SettingsScreen: FC = () => {
  const user = auth().currentUser?.email;

  return (
    <SafeAreaView style={styles.container}>
      <TextWrapper style={styles.username} selectable>
        {user}
      </TextWrapper>
      <CustomButton label={'Logout'} onPress={AuthAPI.logout} />
    </SafeAreaView>
  );
};
export default SettingsScreen;
