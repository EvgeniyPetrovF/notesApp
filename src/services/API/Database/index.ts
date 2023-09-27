import auth from '@react-native-firebase/auth';
import {firebase} from '@react-native-firebase/database';
import {INote} from '../../../models/types';

enum DatabaseEndpoints {
  notes = 'notes/',
}

const db = firebase
  .app()
  .database(
    'https://notesapp-74bfd-default-rtdb.europe-west1.firebasedatabase.app/',
  );

class DatabaseAPI {
  static fetchNotes = async () => {
    const response = await db
      .ref(`${DatabaseEndpoints.notes}${auth().currentUser?.uid}`)
      .once('value');

    const snapshot = response.val();

    return snapshot
      ? (Array.isArray(snapshot) ? snapshot : Object.values(snapshot)).filter(
          Boolean,
        )
      : null;
  };

  static updateNote = async (note: INote) => {
    return await db
      .ref(`${DatabaseEndpoints.notes}${auth().currentUser?.uid}/${note.id}`)
      .update(note);
  };

  static addNote = async (note: INote) => {
    return await db
      .ref(`${DatabaseEndpoints.notes}${auth().currentUser?.uid}/${note.id}`)
      .set(note);
  };

  static removeNote = async (noteId: number) => {
    await db
      .ref(`${DatabaseEndpoints.notes}${auth().currentUser?.uid}/${noteId}`)
      .remove();
  };
}

export default DatabaseAPI;
