import {useCallback, useEffect, useState} from 'react';
import {Image} from 'react-native-image-crop-picker';
import {ImagePickerAction} from '../../../components/ImagePickerModal';
import {LocalImage} from '../../../models/types';
import {INotesForm} from '../components/NotesForm';

type useNotesFormType = Pick<
  INotesForm,
  'note' | 'onButtonPress' | 'closeModal'
>;

const useNotesForm = ({note, onButtonPress, closeModal}: useNotesFormType) => {
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

  return {
    noteText,
    filteredImages,
    buttonHandler,
    deleteImage,
    imageModalVisible,
    closeImagePickerModal,
    addImages,
    openImagePickerModal,
    setNoteText,
  };
};

export default useNotesForm;
