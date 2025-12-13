import React from 'react';
import { StyleSheet, Pressable, View } from 'react-native';
import { Control, Controller, FieldValues, Path } from 'react-hook-form';
import { scale, verticalScale } from 'react-native-size-matters';
import colors from '@styles/colors';
import AppText from './AppText';

type Gender = 'male' | 'female' | 'other';

const OPTIONS: { label: string; value: Gender }[] = [
  { label: 'Male', value: 'male' },
  { label: 'Female', value: 'female' },
  { label: 'Other', value: 'other' },
];

interface AppGenderRadioProps {
  value?: Gender;
  onChange: (value: Gender) => void;
}

const AppGenderRadio = ({ value, onChange }: AppGenderRadioProps) => {
  return (
    <View style={styles.container}>
      {OPTIONS.map(option => {
        const selected = value === option.value;

        return (
          <Pressable
            key={option.value}
            style={styles.option}
            onPress={() => onChange(option.value)}
          >
            <View
              style={[styles.outerCircle, selected && styles.selectedOuter]}
            >
              {selected && <View style={styles.innerCircle} />}
            </View>
            <AppText>{option.label}</AppText>
          </Pressable>
        );
      })}
    </View>
  );
};

interface AppGenderRadioControllerProps<T extends FieldValues> {
  control: Control<T>;
  name: Path<T>;
}

export const AppGenderRadioController = <T extends FieldValues>({
  control,
  name,
}: AppGenderRadioControllerProps<T>) => {
  return (
    <Controller
      control={control}
      name={name}
      render={({ field: { value, onChange }, fieldState: { error } }) => (
        <>
          <AppGenderRadio value={value} onChange={onChange} />
          {error && <AppText style={styles.errorText}>{error.message}</AppText>}
        </>
      )}
    />
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    gap: scale(20),
    alignItems: 'center',
  },
  option: {
    flexDirection: 'row',
    alignItems: 'center',
    gap: scale(6),
  },
  outerCircle: {
    width: scale(18),
    height: scale(18),
    borderRadius: scale(9),
    borderWidth: 2,
    borderColor: colors.black,
    alignItems: 'center',
    justifyContent: 'center',
  },
  selectedOuter: {
    borderColor: colors.black,
  },
  innerCircle: {
    width: scale(10),
    height: scale(10),
    borderRadius: scale(5),
    backgroundColor: colors.black,
  },
  errorText: {
    color: colors.red,
    marginTop: verticalScale(4),
  },
});
