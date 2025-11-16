import { StyleSheet, View, Image } from 'react-native';
import React from 'react';
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
// import { createUser } from '@database/schema/User';

export const IMAGES = {
  appLogo: require('../assets/images/app-logo.png'),
};

const schema = yup
  .object({
    fullName: yup
      .string()
      .required('Full name is required')
      .min(3, 'Full name must be at least 3 characters long'),

    email: yup.string().email('Please enter a valid email').required('Email is required'),
    password: yup
      .string()
      .required('Password is required')
      .min(6, 'Password must be at least 6 characters'),
    confirmPassword: yup
      .string()
      .oneOf([yup.ref('password'), undefined], 'Passwords must match')
      .required('Please confirm your password'),
    mobile: yup
      .string()
      .required('Phone number is required')
      .matches(/^[0-9]{10}$/, 'Phone number must be 10 digits'),
  })
  .required();

type SignUpFormData = yup.InferType<typeof schema>;
type Nav = StackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
  const userId = 101; // Dummy user ID
  const navigation = useNavigation<Nav>();
  const { control, handleSubmit } = useForm({
    resolver: yupResolver(schema),
  });

  const signUpClicked = async (data: SignUpFormData) => {
    // const user = await createUser(data);

    console.log('++++++++++++++++++++++++++++++++++++');
    console.log('User created:', user);
    console.log('++++++++++++++++++++++++++++++++++++');

    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainAppBottomTabs',
          params: {
            screen: 'HomeScreen',
            params: { userId },
          },
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInputController control={control} name="fullName" placeholder="Full name" />
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
      <AppTextInputController
        control={control}
        name="confirmPassword"
        placeholder="Confirm password"
        secureTextEntry
      />
      <AppTextInputController
        control={control}
        name="mobile"
        placeholder="Mobile number"
        keyboardType="numeric"
      />

      <AppButton title="Register" type={'primary'} onPress={handleSubmit(signUpClicked)} />
      <AppButton
        title="Sign In"
        type={'secondary'}
        customStyles={styles.registerButton}
        onPress={() => navigation.navigate('AuthStack', { screen: 'SignInScreen' })}
      />
    </View>
  );
};

export default SignUpScreen;

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
