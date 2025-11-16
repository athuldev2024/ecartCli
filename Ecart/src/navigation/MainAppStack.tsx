import { createStackNavigator } from '@react-navigation/stack';
import ProductScreen from '@screens/ProductScreen';
import AuthStack from './AuthStack';
import MainAppBottomTabs from './MainAppBottomTabs';

const Stack = createStackNavigator();

export default function MainAppStack() {
  return (
    <Stack.Navigator
      initialRouteName="AuthStack"
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="AuthStack" component={AuthStack} />
      <Stack.Screen name="MainAppBottomTabs" component={MainAppBottomTabs} />
      <Stack.Screen name="ProductScreen" component={ProductScreen} />
    </Stack.Navigator>
  );
}
