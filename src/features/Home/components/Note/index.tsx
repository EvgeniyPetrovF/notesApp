import React, {FC} from 'react';
import {View} from 'react-native';
import dayjs from 'dayjs';
import CloseButton from '../../../../components/CloseButton';
import ImageGallery from '../../../../components/ImageGallery';
import MarkdownWrapper from '../../../../components/MarkdownWrapper';
import TextWrapper from '../../../../components/TextWrapper';
import {INote} from '../../../../models/types';
import {styles} from './styles';

type Props = {
  deleteNote?: (id: number) => void;
};

const Note: FC<INote & Props> = ({
  id,
  creationDate,
  noteText,
  images,
  deleteNote,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TextWrapper style={styles.name}>
          Date: {dayjs(creationDate).format('HH:mm, DD/MM/YYYY')}
        </TextWrapper>
      </View>
      {noteText && (
        <MarkdownWrapper text={noteText?.split(' ').slice(0, 5).join(' ')} />
      )}
      {!!images?.length && (
        <ImageGallery
          images={images}
          imageStyleContainer={styles.imageContainer}
          imageStyle={styles.image}
        />
      )}
      {deleteNote && (
        <CloseButton
          style={styles.deleteButton}
          onPress={() => {
            deleteNote(id);
          }}
        />
      )}
    </View>
  );
};

export default Note;
