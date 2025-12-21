import React from 'react';
import { StyleSheet } from 'react-native';
import { SafeAreaProvider, SafeAreaView } from 'react-native-safe-area-context';
import { scale } from 'react-native-size-matters';
import colors from '@styles/colors';
import { isAndroid } from '@utils/platform-utils';
import { NavigationContainer } from '@react-navigation/native';
import MainAppStack from '@navigation/MainAppStack';
import Toast from 'react-native-toast-message';
import { Provider } from 'react-redux';
import store from '@store';

function AppInner() {
  return (
    <>
      <SafeAreaView style={styles.container} edges={['top', 'left', 'right']}>
        <MainAppStack />
      </SafeAreaView>
      <Toast />
    </>
  );
}

export default function App() {
  return (
    <SafeAreaProvider>
      <Provider store={store}>
        <NavigationContainer>
          <AppInner />
        </NavigationContainer>
      </Provider>
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
