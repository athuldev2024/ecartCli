import React, { JSX } from 'react';
import { StyleSheet, TextInput, TextStyle } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import colors from '@styles/colors';
import { isAndroid } from '@utils/platform-utils';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import AppText from './AppText';

interface AppTextInputProps {
  value: string;
  onChangeText: (text: string) => void;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
  customStyles?: TextStyle;
}

export default function AppTextInput({
  value,
  onChangeText,
  placeholder,
  secureTextEntry,
  keyboardType,
  customStyles,
}: AppTextInputProps): JSX.Element {
  return (
    <TextInput
      value={value}
      onChangeText={onChangeText}
      placeholder={placeholder}
      secureTextEntry={secureTextEntry}
      keyboardType={keyboardType}
      style={[styles.input, customStyles, isAndroid && styles.androidFix]}
    />
  );
}

interface AppTextInputControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  rules?: object;
  placeholder: string;
  secureTextEntry?: boolean;
  keyboardType?: 'default' | 'email-address' | 'numeric';
}

export const AppTextInputController = <T extends FieldValues>({
  control,
  name,
  rules,
  placeholder,
  secureTextEntry,
  keyboardType,
}: AppTextInputControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      rules={rules}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <AppTextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            secureTextEntry={secureTextEntry}
            keyboardType={keyboardType}
            customStyles={error && styles.errorInput}
          />
          {error?.message === 'Passwords must match' && error && (
            <AppText style={{ color: colors.red }}>{error.message}</AppText>
          )}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  input: {
    height: verticalScale(40),
    borderRadius: scale(25),
    borderWidth: 1,
    borderColor: colors.black,
    paddingHorizontal: scale(15),
    fontSize: scale(16),
    backgroundColor: colors.white,
    width: '100%',
  },
  androidFix: {
    textAlignVertical: 'center',
    paddingVertical: scale(3),
    lineHeight: verticalScale(50),
  },
  errorInput: {
    borderColor: colors.red,
    borderWidth: scale(2),
  },
});
