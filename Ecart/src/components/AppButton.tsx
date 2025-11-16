import React, { JSX } from 'react';
import { StyleSheet, View, Pressable, ViewProps, ViewStyle, Text } from 'react-native';
import { scale, verticalScale } from 'react-native-size-matters';
import colors from '@styles/colors';

interface AppButtonProps extends ViewProps {
  title: string;
  onPress: () => void;
  type: 'primary' | 'secondary';
  customStyles?: ViewStyle | ViewStyle[];
  disabled?: boolean;
}

export default function AppButton({
  title,
  type,
  onPress,
  customStyles,
  disabled = false,
  ...rest
}: AppButtonProps): JSX.Element {
  return (
    <Pressable
      onPress={onPress}
      disabled={disabled}
      style={({ pressed }) => [{ opacity: pressed || disabled ? 0.5 : 1 }]}
    >
      <View {...rest} style={[styles.common, styles[type], customStyles]}>
        <Text
          style={[
            styles.buttonText,
            { color: type === 'primary' ? colors.secondaryBtn : colors.primaryBtn },
          ]}
        >
          {title}
        </Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  common: {
    height: verticalScale(40),
    width: scale(200),
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: verticalScale(10),
    padding: scale(10),
  },
  primary: {
    backgroundColor: colors.primaryBtn,
  },
  secondary: {
    backgroundColor: colors.secondaryBtn,
  },
  buttonText: {
    fontSize: verticalScale(13),
  },
});
