import React, {FC} from 'react';
import CustomButton from '../../../../components/CustomButton';
import DefaultModal from '../../../../components/DefaultModal';
import ImageGallery from '../../../../components/ImageGallery';
import ImagePickerModal from '../../../../components/ImagePickerModal';
import MarkdownWrapper from '../../../../components/MarkdownWrapper';
import TextInputWrapper from '../../../../components/TextInputWrapper';
import {INote} from '../../../../models/types';
import {useNotesForm} from '../../hooks';
import {styles} from './styles';

export interface INotesForm {
  visible: boolean;
  buttonTitle: string;
  onButtonPress: (note: INote) => Promise<void>;
  closeModal: () => void;
  note?: INote | null;
}

const NotesForm: FC<INotesForm> = ({
  buttonTitle,
  visible,
  onButtonPress,
  closeModal,
  note,
}) => {
  const {
    noteText,
    filteredImages,
    buttonHandler,
    deleteImage,
    imageModalVisible,
    closeImagePickerModal,
    addImages,
    openImagePickerModal,
    setNoteText,
  } = useNotesForm({note, onButtonPress, closeModal});

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
