import React, { JSX } from 'react';
import { StyleSheet, Text, TextProps, TextStyle } from 'react-native';
import { scale } from 'react-native-size-matters';
import colors from '@styles/colors';
interface AppTextProps extends TextProps {
  children: React.ReactNode;
  customStyles?: TextStyle | TextStyle[];
  variant?: 'small' | 'medium' | 'large' | 'micro';
  bold?: boolean;
}

export default function AppText({
  children,
  customStyles,
  variant = 'medium',
  bold = false,
  ...rest
}: AppTextProps): JSX.Element {
  return (
    <Text style={[styles[variant], styles[bold ? 'bold' : 'normal'], customStyles]} {...rest}>
      {children}
    </Text>
  );
}

const styles = StyleSheet.create({
  normal: {
    color: colors.black,
    fontWeight: 'normal',
    fontFamily: 'nunito-medium',
  },
  bold: {
    color: colors.black,
    fontWeight: 'bold',
    fontFamily: 'nunito-bold',
  },
  large: {
    fontSize: scale(18),
    fontFamily: 'nunito-medium',
  },
  medium: {
    fontSize: scale(16),
    fontFamily: 'nunito-medium',
  },
  small: {
    fontSize: scale(14),
    fontFamily: 'nunito-medium',
  },
  micro: {
    fontSize: scale(10),
    fontFamily: 'nunito-medium',
  },
});
