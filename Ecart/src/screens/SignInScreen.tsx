import { StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import { sharedPaddingHorizontal } from '@styles/sharedStyles';
import { scale, verticalScale } from 'react-native-size-matters';
import { AppTextInputController } from '@components/AppTextInput';
import AppButton from '@components/AppButton';
import colors from '@styles/colors';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/type';
import { StackNavigationProp } from '@react-navigation/stack';
import { useForm } from 'react-hook-form';
import * as yup from 'yup';
import { yupResolver } from '@hookform/resolvers/yup';

export const IMAGES = {
  appLogo: require('../assets/images/app-logo.png'),
};

const schema = yup
  .object({
    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
  })
  .required();

type Nav = StackNavigationProp<RootStackParamList>;

const SignInScreen = () => {
  const navigation = useNavigation<Nav>();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const signInClicked = () => {
    // Need to added - Authentication Logic Here
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainAppBottomTabs',
          params: {
            screen: 'HomeScreen',
            params: { userId: 101 },
          },
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />

      <AppTextInputController
        control={control}
        name="email"
        placeholder="Email"
        keyboardType="email-address"
      />
      <AppTextInputController
        control={control}
        name="password"
        placeholder="Password"
        secureTextEntry
      />

      <AppButton title="Login" type={'primary'} onPress={handleSubmit(signInClicked)} />
      <AppButton
        title="Sign Up"
        type={'secondary'}
        customStyles={styles.registerButton}
        onPress={() => navigation.navigate('AuthStack', { screen: 'SignUpScreen' })}
      />
    </View>
  );
};

export default SignInScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
    gap: scale(10),
    alignItems: 'center',
    paddingHorizontal: sharedPaddingHorizontal,
  },
  logo: {
    height: scale(150),
    width: scale(150),
    marginBottom: verticalScale(30),
  },
  appName: {
    fontSize: scale(16),
    marginBottom: verticalScale(15),
  },
  registerButton: {
    backgroundColor: colors.white,
    borderWidth: 1,
    marginTop: verticalScale(15),
    borderColor: colors.black,
  },
});
