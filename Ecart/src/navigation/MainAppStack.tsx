import React, { useEffect, useState, createContext, useContext } from 'react';
import { View, ActivityIndicator, StyleSheet } from 'react-native';
import { createStackNavigator } from '@react-navigation/stack';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProductScreen from '@screens/ProductScreen';
import AuthStack from './AuthStack';
import MainAppBottomTabs from './MainAppBottomTabs';
import colors from '@styles/colors';

/* -------------------------------------------------------------------------- */
/*                              AUTH CONTEXT                                   */
/* -------------------------------------------------------------------------- */

type AuthContextType = {
  isLoggedIn: boolean;
  login: (userId: string) => Promise<void>;
  logout: () => Promise<void>;
};

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const ctx = useContext(AuthContext);
  if (!ctx) {
    throw new Error('useAuth must be used inside AuthProvider');
  }
  return ctx;
};

const Stack = createStackNavigator();

export default function MainAppStack() {
  const [isAuthLoading, setIsAuthLoading] = useState(true);
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        const userId = await AsyncStorage.getItem('userID');
        setIsLoggedIn(!!userId);
      } catch (e) {
        console.error('Auth bootstrap failed', e);
      } finally {
        setIsAuthLoading(false);
      }
    })();
  }, []);

  const login = async (userId: string) => {
    await AsyncStorage.setItem('userID', userId);
    setIsLoggedIn(true);
  };

  const logout = async () => {
    await AsyncStorage.removeItem('userID');
    setIsLoggedIn(false);
  };

  if (isAuthLoading) {
    return (
      <View style={styles.loaderContainer}>
        <ActivityIndicator size="large" color={colors.black} />
      </View>
    );
  }

  return (
    <AuthContext.Provider value={{ login, logout }}>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        {isLoggedIn ? (
          <>
            <Stack.Screen
              name="MainAppBottomTabs"
              component={MainAppBottomTabs}
            />
            <Stack.Screen name="ProductScreen" component={ProductScreen} />
          </>
        ) : (
          <Stack.Screen name="AuthStack" component={AuthStack} />
        )}
      </Stack.Navigator>
    </AuthContext.Provider>
  );
}

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: colors.background,
  },
});
