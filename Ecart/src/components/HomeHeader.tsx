import { StyleSheet, Pressable, View, Image } from 'react-native';
import React from 'react';
import colors from '@styles/colors';
import { scale, verticalScale } from 'react-native-size-matters';
import AntDesign from 'react-native-vector-icons/AntDesign';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { useAuth } from '@navigation/MainAppStack';

export const IMAGES = {
  appLogo: require('../assets/images/app-logo.png'),
};

export default function HomeHeader() {
  const { logout } = useAuth();

  const logOutHandler = async () => {
    await AsyncStorage.removeItem('userID');
    await logout();
  };

  return (
    <View style={styles.container}>
      <Image source={IMAGES.appLogo} style={styles.logo} />
      <Pressable
        onPress={logOutHandler}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      >
        <AntDesign name="logout" size={scale(26)} color="white" />
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.black,
    alignItems: 'flex-start',
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(15),
  },
  logo: {
    height: verticalScale(40),
    width: scale(40),
    tintColor: colors.white,
  },
});
