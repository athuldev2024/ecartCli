import { StyleSheet, View, Image } from 'react-native';
import React, { useState } from 'react';
import { sharedPaddingHorizontal } from '@styles/sharedStyles';
import { scale, verticalScale } from 'react-native-size-matters';
import AppTextInput from '@components/AppTextInput';
import AppButton from '@components/AppButton';
import colors from '@styles/colors';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/type';
import { StackNavigationProp } from '@react-navigation/stack';

export const IMAGES = {
  appLogo: require('../assets/images/app-logo.png'),
};

type Nav = StackNavigationProp<RootStackParamList>;

const SignUpScreen = () => {
  const userId = 101; // Dummy user ID
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigation = useNavigation<Nav>();

  const signUpClicked = () => {
    navigation.reset({
      index: 0,
      routes: [
        {
          name: 'MainAppBottomTabs',
          params: {
            screen: 'HomeScreen', // 👈 go directly to Home
            params: { userId }, // 👈 pass the ID
          },
        },
      ],
    });
  };

  return (
    <View style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <AppTextInput placeholder="Email" value={email} onChangeText={setEmail} />

      <AppTextInput
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry={true}
      />

      <AppButton title="Register" type={'primary'} onPress={signUpClicked} />
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
