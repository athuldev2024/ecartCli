import { StyleSheet } from 'react-native';
import { scale } from 'react-native-size-matters';
import colors from './colors';

export const sharedPaddingHorizontal = scale(12);

export const commonStyles = StyleSheet.create({
  shadow: {
    // IOS
    shadowColor: colors.black,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.2,
    shadowRadius: 4,
    // Android
    elevation: 4,
  },
});
