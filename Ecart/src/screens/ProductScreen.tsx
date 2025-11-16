import React, { useState } from 'react';
import { StyleSheet, Pressable, View, Image } from 'react-native';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { verticalScale, scale } from 'react-native-size-matters';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/type';
import { StackNavigationProp } from '@react-navigation/stack';
import { useRoute } from '@react-navigation/native';
import AppText from '@components/AppText';
import { Product } from '@types';
import AntDesign from 'react-native-vector-icons/AntDesign';
import colors from '@styles/colors';
import AppButton from '@components/AppButton';

type Nav = StackNavigationProp<RootStackParamList>;

const BackButton = () => {
  const navigation = useNavigation<Nav>();

  return (
    <Pressable
      onPress={() => navigation.goBack()}
      style={({ pressed }) => [
        { opacity: pressed ? 0.5 : 1, alignSelf: 'flex-start', marginLeft: scale(10) },
      ]}
    >
      <Ionicons name="arrow-back-circle-outline" size={scale(40)} color="black" />
    </Pressable>
  );
};

const ProductScreen = () => {
  const route = useRoute();
  const navigation = useNavigation<Nav>();

  const { product } = (route.params ?? {}) as { product: Product };
  const { imageURL, description, quantity } = product;

  const [qty, setQty] = useState(quantity);

  const navigateTocart = () => {
    navigation.navigate('MainAppBottomTabs', { screen: 'CartScreen' });
  };

  return (
    <View style={styles.container}>
      <BackButton />

      <Image
        style={styles.image}
        source={{
          uri: imageURL,
        }}
      />

      <AppText variant="small" customStyles={styles.description}>
        {description}
      </AppText>

      <View style={styles.buttonContainer}>
        {qty === 0 ? (
          <Pressable style={styles.addBtn} onPress={() => setQty(1)}>
            <AppText variant="small" customStyles={styles.btnText}>
              Add to cart <AntDesign name="shopping-cart" size={scale(32)} />
            </AppText>
          </Pressable>
        ) : (
          <View style={styles.row}>
            <Pressable style={styles.circle} onPress={() => setQty(qty - 1)}>
              <AppText variant="small" customStyles={styles.symbol}>
                −
              </AppText>
            </Pressable>

            <AppText variant="large" customStyles={styles.qty}>
              {qty}
            </AppText>

            <Pressable style={styles.circle} onPress={() => setQty(qty + 1)}>
              <AppText variant="small" customStyles={styles.symbol}>
                +
              </AppText>
            </Pressable>
          </View>
        )}
      </View>

      <AppButton title="Go to cart  🛒" type={'primary'} onPress={navigateTocart} />
    </View>
  );
};

export default ProductScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: verticalScale(20),
    justifyContent: 'space-around',
    alignItems: 'center',
  },
  image: {
    width: scale(300),
    height: verticalScale(220),
    borderRadius: scale(8),
  },
  description: {
    fontSize: scale(13),
    lineHeight: verticalScale(20),
    textAlign: 'center',
    color: colors.textSecondary,
    paddingHorizontal: scale(15),
    fontStyle: 'italic',
    fontWeight: '400',
  },
  // Button parts
  buttonContainer: { alignItems: 'center' },
  addBtn: {
    backgroundColor: colors.addBtn,
    width: scale(200),
    height: verticalScale(50),
    borderRadius: scale(8),
    justifyContent: 'center',
    alignItems: 'center',
  },
  btnText: { color: '#fff', fontSize: scale(18), fontWeight: '600' },
  row: { flexDirection: 'row', alignItems: 'center', gap: scale(20) },
  circle: {
    width: scale(46),
    height: scale(46),
    borderRadius: scale(28),
    backgroundColor: colors.addBtn,
    alignItems: 'center',
    justifyContent: 'center',
  },
  symbol: { color: '#fff', fontWeight: '700' },
  qty: { fontSize: 16, fontWeight: '600', color: colors.textSecondary },
});
