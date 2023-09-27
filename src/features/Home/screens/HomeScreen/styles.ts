import {StyleSheet} from 'react-native';
import {colors, dimensions, text} from '../../../../constants';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  centerContainer: {
    alignItems: 'center',
    marginBottom: dimensions.offset.normal,
  },
  listContainer: {
    marginVertical: dimensions.offset.normal,
    width: '100%',
    paddingHorizontal: dimensions.offset.small,
  },
  listHeader: {
    fontSize: text.size.big,
    fontWeight: text.weight.bold,
    marginBottom: dimensions.offset.normal,
  },
  separator: {
    marginBottom: dimensions.offset.small,
  },
});
