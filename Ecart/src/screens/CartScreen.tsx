import React from 'react';
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import { cartItems } from '@constants/mock';
import AppText from '@components/AppText';
import colors from '@styles/colors';
import { Cart } from '@types';

const CartItem = ({ item }: { item: Cart }) => {
  return (
    <View style={styles.cartItem}>
      <View>
        <Image
          style={styles.image}
          source={{
            uri: item.imageURL,
          }}
        />
        <AppText variant="micro" bold customStyles={{ color: colors.cartText }}>
          {item.title}
        </AppText>
      </View>

      <AppText variant="small" bold customStyles={{ color: colors.textSecondary }}>
        {`₹ ${item.price * item.quantity}`}
      </AppText>
    </View>
  );
};

const CartScreen = () => {
  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {cartItems.length > 0 && cartItems.map(item => <CartItem key={item.id} item={item} />)}
        </ScrollView>
      </View>
    </View>
  );
};

export default CartScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: verticalScale(10),
    paddingHorizontal: scale(10),
  },
  scrollContainer: {
    height: '60%',
    backgroundColor: colors.white,
  },
  scrollContent: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(22),
  },
  cartItem: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    height: verticalScale(70),
    borderBottomWidth: 1,
    borderBottomColor: colors.cartText,
    marginBottom: verticalScale(10),
  },
  image: {
    width: scale(50),
    height: verticalScale(50),
    borderRadius: scale(8),
  },
});
