import { NavigatorScreenParams } from '@react-navigation/native';
import { Product } from '@types';

export type AuthStackParamList = {
  SignInScreen: undefined;
  SignUpScreen: undefined;
};

export type MainTabParamList = {
  HomeScreen: { userId: string };
  CartScreen: undefined;
  ProfileScreen: undefined;
};

export type RootStackParamList = {
  AuthStack: NavigatorScreenParams<AuthStackParamList>;
  MainAppBottomTabs: NavigatorScreenParams<MainTabParamList>;
  ProductScreen: { product: Product };
};
