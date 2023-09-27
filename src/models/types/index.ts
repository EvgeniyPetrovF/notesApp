import {Image} from 'react-native-image-crop-picker';

export type LocalImage = Image & {
  id?: number;
  currentStatus: 'existed' | 'new' | 'deleted';
};

export interface INote {
  id: number;
  creationDate: string;
  noteText?: string;
  images: LocalImage[];
}
