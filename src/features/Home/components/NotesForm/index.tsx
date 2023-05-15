import React, {FC, useCallback, useEffect, useState} from 'react';
import {Image} from 'react-native-image-crop-picker';
import CustomButton from '../../../../components/CustomButton';
import DefaultModal from '../../../../components/DefaultModal';
import ImageGallery from '../../../../components/ImageGallery';
import ImagePickerModal, {
  ImagePickerAction,
} from '../../../../components/ImagePickerModal';
import MarkdownWrapper from '../../../../components/MarkdownWrapper';
import TextInputWrapper from '../../../../components/TextInputWrapper';
import {INote, LocalImage} from '../../../../models/types';
import {styles} from './styles';

export interface NotesForm {
  visible: boolean;
  buttonTitle: string;
  onButtonPress: (note: INote) => Promise<void>;
  closeModal: () => void;
  note?: null | INote;
}

const NotesForm: FC<NotesForm> = ({
  buttonTitle,
  visible,
  onButtonPress,
  closeModal,
  note,
}) => {
  const [noteText, setNoteText] = useState('');
  const [images, setImages] = useState<LocalImage[]>([]);
  const [imageModalVisible, setImageModalVisible] = useState(false);

  useEffect(() => {
    setNoteText(note?.noteText ?? '');
    setImages(note?.images ?? []);
  }, [note]);

  const buttonHandler = async () => {
    await onButtonPress({
      creationDate: note?.creationDate as string,
      noteText: noteText,
      id: note?.id as number,
      images,
    });
    closeModal();
    setNoteText('');
    setImages([]);
  };

  const addImages = async (
    options: ImagePickerAction['options'],
    callback: ImagePickerAction['callback'],
  ) => {
    try {
      const result: Image = await callback(options);

      if (result.data) {
        setImages([{...result, currentStatus: 'new'}]);
      }
    } catch (e) {
      console.log(e);
    } finally {
      setImageModalVisible(false);
    }
  };

  const deleteImage = useCallback(
    async (image: LocalImage) => {
      if (image.currentStatus === 'new') {
        setImages(
          images.filter(item => item.localIdentifier !== image.localIdentifier),
        );
      } else {
        const clearImages = images.map<LocalImage>(item =>
          item?.id === image.id ? {...item, currentStatus: 'deleted'} : item,
        );
        setImages(clearImages);
      }
    },
    [images],
  );

  const openImagePickerModal = useCallback(() => {
    setImageModalVisible(true);
  }, []);

  const closeImagePickerModal = useCallback(() => {
    setImageModalVisible(false);
  }, []);

  const filteredImages = images.filter(
    image => image.currentStatus !== 'deleted',
  );

  return (
    <DefaultModal isVisible={visible} closeModal={closeModal}>
      {noteText && <MarkdownWrapper text={noteText} />}
      <TextInputWrapper
        containerStyle={styles.bottomOffset}
        style={styles.textArea}
        label="Enter markdown text"
        value={noteText}
        onChangeText={setNoteText}
        multiline
      />
      <ImageGallery
        limit={1}
        label={'Images'}
        images={filteredImages}
        deleteImage={deleteImage}
        onAddPress={openImagePickerModal}
      />
      <CustomButton
        label={buttonTitle}
        onPress={buttonHandler}
        disabled={!noteText}
      />
      <ImagePickerModal
        isVisible={imageModalVisible}
        closeModal={closeImagePickerModal}
        onButtonPress={addImages}
      />
    </DefaultModal>
  );
};

export default NotesForm;
