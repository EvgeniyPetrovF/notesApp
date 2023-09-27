import React from 'react';
import {openCamera, openPicker, Options} from 'react-native-image-crop-picker';
import CustomButton from '../CustomButton';
import DefaultModal, {DefaultModalProps} from '../DefaultModal';
import {styles} from './styles';

export interface ImagePickerAction {
  title: string;
  callback: typeof openPicker | typeof openCamera;
  options: Options;
}

interface ImagePickerModal extends DefaultModalProps {
  onButtonPress: (
    options: ImagePickerAction['options'],
    callback: ImagePickerAction['callback'],
  ) => void;
}

const actions: ImagePickerAction[] = [
  {
    title: 'Take Image',
    callback: openCamera,
    options: {
      mediaType: 'photo',
      includeBase64: true,
      width: 400,
      height: 300,
      freeStyleCropEnabled: true,
      cropping: true,
    },
  },
  {
    title: 'Select Image',
    callback: openPicker,
    options: {
      mediaType: 'photo',
      includeBase64: true,
      width: 400,
      height: 300,
      freeStyleCropEnabled: true,
      cropping: true,
    },
  },
];

const ImagePickerModal = ({
  isVisible,
  closeModal,
  onButtonPress,
}: ImagePickerModal) => {
  return (
    <DefaultModal isVisible={isVisible} closeModal={closeModal}>
      {actions.map(({title, callback, options}) => {
        return (
          <CustomButton
            label={title}
            key={title}
            style={styles.bottomOffset}
            onPress={() => onButtonPress(options, callback)}
          />
        );
      })}
    </DefaultModal>
  );
};

export default ImagePickerModal;
