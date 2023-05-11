import {StyleSheet} from 'react-native';
import {colors, dimensions} from '../../../../constants';

export const styles = StyleSheet.create({
  formContainer: {
    flex: 1,
    paddingHorizontal: dimensions.offset.huge,
    width: '100%',
    flexGrow: 1,
    justifyContent: 'center',
  },
  inputsContainer: {
    alignItems: 'center',
    gap: dimensions.offset.normal,
  },
  error: {
    position: 'absolute',
    bottom: -dimensions.offset.small,
    alignSelf: 'flex-start',
    color: colors.error,
  },
  bottomOffset: {
    marginBottom: dimensions.offset.normal,
  },
  hugeBottomOffset: {
    marginBottom: dimensions.offset.huge,
  },
});
