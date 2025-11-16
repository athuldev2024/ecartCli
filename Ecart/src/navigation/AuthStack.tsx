import { createStackNavigator } from '@react-navigation/stack';
import SignInScreen from '@screens/SignInScreen';
import SignUpScreen from '@screens/SignUpScreen';

const Stack = createStackNavigator();

export default function AuthStack() {
  return (
    <Stack.Navigator
      initialRouteName="SignInScreen"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="SignInScreen" component={SignInScreen} />
      <Stack.Screen name="SignUpScreen" component={SignUpScreen} />
    </Stack.Navigator>
  );
}
