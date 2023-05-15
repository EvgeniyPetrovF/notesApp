import {StyleSheet} from 'react-native';
import {text} from '../../constants';
import {scaleFontSize} from '../../utils/scaleStyleValues';

export const styles = StyleSheet.create({
  text: {
    fontSize: scaleFontSize(text.size.middle),
  },
});
