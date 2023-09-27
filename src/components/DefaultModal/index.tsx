import React, {FC} from 'react';
import {ScrollView, View} from 'react-native';
import Modal, {ModalProps} from 'react-native-modal';
import styles from './styles';

export interface DefaultModalProps extends Partial<ModalProps> {
  closeModal?: () => void;
}

const DefaultModal: FC<DefaultModalProps> = ({
  isVisible,
  children,
  closeModal,
  ...props
}) => {
  return (
    <Modal
      isVisible={isVisible}
      propagateSwipe
      avoidKeyboard
      onBackButtonPress={closeModal}
      onBackdropPress={closeModal}
      style={styles.container}
      animationIn="fadeIn"
      animationOut="fadeOut"
      useNativeDriver
      useNativeDriverForBackdrop
      hideModalContentWhileAnimating
      {...props}>
      <View renderToHardwareTextureAndroid>
        <ScrollView
          showsVerticalScrollIndicator={false}
          contentContainerStyle={styles.modalView}>
          {children}
        </ScrollView>
      </View>
    </Modal>
  );
};

export default DefaultModal;
