import {useCallback, useEffect, useState} from 'react';
import {INote} from '../../../models/types';
import DatabaseAPI from '../../../services/API/Database';

const useNotes = () => {
  const [showModal, setShowModal] = useState(false);
  const [showEditModal, setShowEditModal] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [isRefreshing, setIsRefreshing] = useState(false);
  const [tempNote, setTempNote] = useState<INote | null>(null);
  const [notes, setNotes] = useState<INote[]>([]);

  const fetchNotes = async () => {
    return await DatabaseAPI.fetchNotes();
  };

  const refreshNotes = useCallback(async () => {
    setIsRefreshing(true);
    const storedItems = await fetchNotes();

    if (storedItems?.length) {
      setNotes(storedItems);
    }

    setIsRefreshing(false);
  }, []);

  const addNote = useCallback(
    async (note: INote) => {
      const newNote = {
        ...note,
        id: notes.length ? notes[notes.length - 1].id + 1 : 0,
        creationDate: new Date().toISOString(),
      };

      try {
        await DatabaseAPI.addNote(newNote);

        setNotes([...notes, newNote]);

        setShowModal(false);
      } catch (error) {
        console.log((error as Error).message);
      }
    },
    [notes],
  );

  const deleteNote = async (id: number) => {
    try {
      await DatabaseAPI.removeNote(id);
      setNotes(notes.filter(cleaner => cleaner.id !== id));
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const editNote = async (editedNote: INote) => {
    const updatedNote = {...editedNote};
    try {
      await DatabaseAPI.updateNote(updatedNote);

      setNotes(
        notes.map(note => (note.id === updatedNote.id ? updatedNote : note)),
      );
    } catch (error) {
      console.log((error as Error).message);
    }
  };

  const initialFetchNotes = async () => {
    setIsLoading(true);
    const storedItems = await fetchNotes();
    if (storedItems?.length) {
      setNotes(storedItems);
    }
    setIsLoading(false);
  };

  useEffect(() => {
    initialFetchNotes();
  }, []);

  const onNotePress = (item: INote) => {
    setTempNote(item);
    openEditModal();
  };

  const closeAddModal = () => {
    setShowModal(false);
  };

  const openAddModal = () => {
    setShowModal(true);
  };

  const closeEditModal = () => {
    setShowEditModal(false);
  };

  const openEditModal = () => {
    setShowEditModal(true);
  };

  return {
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
    openEditModal,
  };
};

export default useNotes;
