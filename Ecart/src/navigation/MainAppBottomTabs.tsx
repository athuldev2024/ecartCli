import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import HomeScreen from '@screens/HomeScreen';
import CartScreen from '@screens/CartScreen';
import ProfileScreen from '@screens/ProfileScreen';
import colors from '../styles/colors';
import { verticalScale } from 'react-native-size-matters';
import Ionicons from 'react-native-vector-icons/Ionicons';
import HomeHeader from '@components/HomeHeader';
import { isAndroid } from '@utils/platform-utils';

const Tab = createBottomTabNavigator();

export default function MainAppBottomTabs() {
  return (
    <>
      <HomeHeader />

      <Tab.Navigator
        screenOptions={{
          headerShown: false,
          tabBarActiveTintColor: colors.black,
          tabBarLabelStyle: {
            paddingVertical: verticalScale(6),
          },
          tabBarStyle: isAndroid && {
            height: verticalScale(100),
          },
        }}
      >
        <Tab.Screen
          name="HomeScreen"
          component={HomeScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="home" size={size} color={color} />,
            title: 'Home',
          }}
        />
        <Tab.Screen
          name="CartScreen"
          component={CartScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="cart" size={size} color={color} />,
            title: 'Cart',
          }}
        />
        <Tab.Screen
          name="ProfileScreen"
          component={ProfileScreen}
          options={{
            tabBarIcon: ({ color, size }) => <Ionicons name="person" size={size} color={color} />,
            title: 'Profile',
          }}
        />
      </Tab.Navigator>
    </>
  );
}
