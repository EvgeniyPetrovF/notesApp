import {Dimensions, PixelRatio} from 'react-native';

type DimensionsSchema = {
  width: number;
  height: number;
};

const {width, height}: DimensionsSchema = Dimensions.get('window');
const ratio: number = PixelRatio.getFontScale();

// edit values according to your layout template
const idealWidth = 428;
const idealHeight = 926;

export const scaleHorizontal = (inWidth = 1): number => {
  const delimiter: number = idealWidth / inWidth;

  return width / delimiter;
};

export const scaleVertical = (inHeight = 1) => {
  const delimiter: number = idealHeight / inHeight;

  return height / delimiter;
};

export const scaleFontSize = (fontSize = 1): number => {
  const divisionRatio: number = idealWidth / (fontSize / ratio);

  return width / divisionRatio;
};

export const scaleLineHeight = (lineHeight = 1): number => {
  const divisionRatio: number = idealHeight / (lineHeight / ratio);

  return height / divisionRatio;
};
