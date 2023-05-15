import React, {FC, useCallback} from 'react';
import {
  FlatList,
  ListRenderItem,
  SafeAreaView,
  TouchableOpacity,
  View,
} from 'react-native';
import Animated from 'react-native-reanimated';
import {StackScreenProps} from '@react-navigation/stack';
import CustomButton from '../../../../components/CustomButton';
import Loader from '../../../../components/Loader';
import TextWrapper from '../../../../components/TextWrapper';
import {MainStackParamList} from '../../../../models/navigation';
import {INote} from '../../../../models/types';
import Note from '../../components/Note';
import NotesForm from '../../components/NotesForm';
import {useAnimatedList, useNotes} from '../../hooks';
import {styles} from './styles';

type Props = StackScreenProps<MainStackParamList, 'Home'>;

const ListEmptyComponent: FC = () => {
  return (
    <View style={styles.centerContainer}>
      <TextWrapper>No items</TextWrapper>
    </View>
  );
};

const keyExtractor = (item: INote) => {
  return `${item.id}`;
};

const ItemSeparatorComponent: FC = () => {
  return <View style={styles.separator} />;
};

const HomeScreen: FC<Props> = () => {
  const {
    showModal,
    showEditModal,
    isLoading,
    isRefreshing,
    tempNote,
    notes,
    addNote,
    deleteNote,
    editNote,
    refreshNotes,
    onNotePress,
    closeAddModal,
    openAddModal,
    closeEditModal,
  } = useNotes();

  const renderNote: ListRenderItem<INote> = ({item}) => {
    return (
      <TouchableOpacity onPress={() => onNotePress(item)}>
        <Note {...item} deleteNote={deleteNote} />
      </TouchableOpacity>
    );
  };

  const ListHeaderComponent: FC = useCallback(() => {
    return (
      <View style={styles.centerContainer}>
        <CustomButton label="Add new note" onPress={openAddModal} />
      </View>
    );
  }, [openAddModal]);

  const {animatedOpacityStyle} = useAnimatedList({isLoading});

  return (
    <SafeAreaView style={styles.container}>
      {isLoading ? (
        <Loader />
      ) : (
        <>
          <Animated.View style={[animatedOpacityStyle, styles.listContainer]}>
            <FlatList
              data={notes}
              renderItem={renderNote}
              onRefresh={refreshNotes}
              refreshing={isRefreshing}
              ListHeaderComponent={ListHeaderComponent}
              ItemSeparatorComponent={ItemSeparatorComponent}
              ListEmptyComponent={ListEmptyComponent}
              keyExtractor={keyExtractor}
            />
          </Animated.View>
          <NotesForm
            buttonTitle="Add Note"
            onButtonPress={addNote}
            visible={showModal}
            closeModal={closeAddModal}
          />
          <NotesForm
            buttonTitle="Edit Note"
            onButtonPress={editNote}
            visible={showEditModal}
            closeModal={closeEditModal}
            note={tempNote}
          />
        </>
      )}
    </SafeAreaView>
  );
};

export default HomeScreen;
