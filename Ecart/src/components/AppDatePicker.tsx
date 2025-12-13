import React, { useState } from 'react';
import { StyleSheet, Pressable, Platform, View } from 'react-native';
import DateTimePicker from '@react-native-community/datetimepicker';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { verticalScale, scale } from 'react-native-size-matters';
import colors from '@styles/colors';
import AppText from './AppText';

interface AppDatePickerProps {
  value?: Date;
  onChange: (date: Date) => void;
  placeholder: string;
  customStyles?: any;
}

const AppDatePicker = ({
  value,
  onChange,
  placeholder,
  customStyles,
}: AppDatePickerProps) => {
  const [show, setShow] = useState(false);

  const formattedDate = value ? value.toDateString() : placeholder;

  return (
    <>
      <Pressable
        style={[styles.input, customStyles]}
        onPress={() => setShow(true)}
      >
        <AppText
          style={{
            color: value ? colors.black : colors.gray,
          }}
        >
          {formattedDate}
        </AppText>
      </Pressable>

      {show && (
        <DateTimePicker
          value={value || new Date()}
          mode="date"
          display={Platform.OS === 'ios' ? 'spinner' : 'default'}
          onChange={(_, selectedDate) => {
            setShow(false);
            if (selectedDate) {
              onChange(selectedDate);
            }
          }}
        />
      )}
    </>
  );
};

interface AppDatePickerControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
  placeholder: string;
}

export const AppDatePickerController = <T extends FieldValues>({
  control,
  name,
  placeholder,
}: AppDatePickerControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { onChange, value }, fieldState: { error } }) => (
        <>
          <AppDatePicker
            value={value}
            onChange={onChange}
            placeholder={placeholder}
            customStyles={error && styles.errorDate}
          />
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
    justifyContent: 'center',
    backgroundColor: colors.white,
    width: '100%',
  },
  errorText: {
    color: colors.red,
    marginTop: scale(4),
  },
  errorDate: {
    borderColor: colors.red,
    borderWidth: scale(2),
  },
});
