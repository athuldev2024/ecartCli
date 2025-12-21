import React, { useEffect, useState } from 'react';
import {
  StyleSheet,
  View,
  Image,
  ScrollView,
  Text,
  Pressable,
} from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import { useSelector } from 'react-redux';
import Ionicons from 'react-native-vector-icons/Ionicons';

import AppText from '@components/AppText';
import colors from '@styles/colors';
import { Product as ProductType, Cart } from '@types';

const CartItem = ({ item }: { item: Cart }) => {
  return (
    <View style={styles.cartItem}>
      <View style={styles.itemLeft}>
        <Image style={styles.image} source={{ uri: item.imageURL }} />
        <AppText variant="micro" bold customStyles={{ color: colors.cartText }}>
          {item.title}
        </AppText>
      </View>

      <AppText
        variant="small"
        bold
        customStyles={{ color: colors.textSecondary }}
      >
        ₹ {item.price * item.quantity}
      </AppText>
    </View>
  );
};

const CartScreen = () => {
  const [cartItems, setCartItems] = useState<Cart[]>([]);
  const productList = useSelector((state: any) => state.products.products);

  useEffect(() => {
    if (productList.length > 0) {
      const temp = productList.map((item: ProductType) => ({
        id: item.id,
        title: item.title,
        price: item.price,
        quantity: item.quantity,
        imageURL: item.imageURL,
      }));

      setCartItems(temp);
    }
  }, [productList]);

  const activeItems = cartItems.filter(item => item.quantity > 0);

  const totalAmount = activeItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0,
  );

  const checkOutFuc = () => {
    console.log('Total amount: ', totalAmount);
  };

  if (activeItems.length === 0) {
    return (
      <View style={styles.emptyContainer}>
        <Ionicons
          name="cart-outline"
          size={64}
          color="#ccc"
          style={{ marginBottom: 16 }}
        />
        <Text style={styles.emptyTitle}>Your cart is empty</Text>
        <Text style={styles.emptySubtitle}>
          Looks like you haven’t added anything yet
        </Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <View style={styles.scrollContainer}>
        <ScrollView contentContainerStyle={styles.scrollContent}>
          {activeItems.map(item => (
            <CartItem key={item.id} item={item} />
          ))}
        </ScrollView>
      </View>

      <View style={styles.checkoutContainer}>
        <View style={styles.totalRow}>
          <Text style={styles.totalLabel}>Total</Text>
          <Text style={styles.totalAmount}>₹ {totalAmount}</Text>
        </View>

        <Pressable onPress={checkOutFuc}>
          <View style={styles.checkoutButton}>
            <Ionicons name="lock-closed-outline" size={18} color="#fff" />
            <Text style={styles.checkoutText}>Proceed to Checkout</Text>
          </View>
        </Pressable>
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
    backgroundColor: '#F5F5F5',
  },

  scrollContainer: {
    flex: 1,
    backgroundColor: colors.white,
    borderRadius: scale(12),
  },

  scrollContent: {
    paddingVertical: verticalScale(10),
    paddingHorizontal: scale(20),
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

  itemLeft: {
    alignItems: 'center',
  },

  image: {
    width: scale(50),
    height: verticalScale(50),
    borderRadius: scale(8),
    marginBottom: 4,
  },

  emptyContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 24,
    backgroundColor: '#F9F9F9',
  },

  emptyTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#222',
    marginBottom: 8,
  },

  emptySubtitle: {
    fontSize: 14,
    color: '#777',
    textAlign: 'center',
    lineHeight: 20,
  },

  checkoutContainer: {
    backgroundColor: colors.white,
    paddingVertical: verticalScale(14),
    paddingHorizontal: scale(20),
    borderTopWidth: 1,
    borderTopColor: '#eee',
  },

  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: verticalScale(12),
  },

  totalLabel: {
    fontSize: 16,
    color: '#444',
    fontWeight: '500',
  },

  totalAmount: {
    fontSize: 18,
    fontWeight: '700',
    color: '#000',
  },

  checkoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#000',
    height: verticalScale(48),
    borderRadius: scale(10),
  },

  checkoutText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
    marginLeft: scale(8),
  },
});
