import React, {FC} from 'react';
import {SafeAreaView, View} from 'react-native';
import auth from '@react-native-firebase/auth';
import CustomButton from '../../../../components/CustomButton';
import TextWrapper from '../../../../components/TextWrapper';
import AuthAPI from '../../../../services/API/Auth';
import {styles} from './styles';

const SettingsScreen: FC = () => {
  const user = auth().currentUser?.email;

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.contentContainer}>
        <TextWrapper style={styles.username} selectable>
          {user}
        </TextWrapper>
        <CustomButton label={'Logout'} onPress={AuthAPI.logout} />
      </View>
    </SafeAreaView>
  );
};
export default SettingsScreen;
