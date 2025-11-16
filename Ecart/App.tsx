import React from 'react';
import { StyleSheet } from 'react-native';
import {
  SafeAreaProvider,
  SafeAreaView,
  useSafeAreaInsets,
} from 'react-native-safe-area-context';
import FlashMessage from 'react-native-flash-message';
import { scale } from 'react-native-size-matters';
import colors from '@styles/colors';
import { isAndroid } from '@utils/platform-utils';
import { NavigationContainer } from '@react-navigation/native';
import MainAppStack from '@navigation/MainAppStack';

function AppInner() {
  const insets = useSafeAreaInsets();

  return (
    <>
      <FlashMessage position="top" statusBarHeight={insets.top} />
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <MainAppStack />
      </SafeAreaView>
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <NavigationContainer>
        <AppInner />
      </NavigationContainer>
    </SafeAreaProvider>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    paddingTop: isAndroid ? scale(25) : 0,
  },
});