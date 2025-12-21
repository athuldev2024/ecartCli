import React, { useState, useEffect } from 'react';
import { StyleSheet, View, Image, ScrollView, Text } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import AppText from '@components/AppText';
import colors from '@styles/colors';
import { useSelector } from 'react-redux';
import { Product as ProductType } from '@types';
import Ionicons from 'react-native-vector-icons/Ionicons';
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

      <AppText
        variant="small"
        bold
        customStyles={{ color: colors.textSecondary }}
      >
        {`₹ ${item.price * item.quantity}`}
      </AppText>
    </View>
  );
};

const CartScreen = () => {
  const [cartItems, setCartItems] = useState([]);
  const productList = useSelector(state => state.products.products);

  useEffect(() => {
    if (productList.length > 0) {
      const temp = JSON.parse(JSON.stringify(productList)).map(
        (item: ProductType) => {
          return {
            id: item.id,
            title: item.title,
            price: item.price,
            quantity: item.quantity,
            imageURL: item.imageURL,
          };
        },
      );

      setCartItems([...temp]);
    }
  }, [productList]);

  if (!cartItems.some(item => item.quantity > 0)) {
    return (
      <View
        style={{
          ...styles.emptyContainer,
        }}
      >
        <Text style={styles.emptyTitle}>Your cart is empty 🛒</Text>
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
          {cartItems.length > 0 &&
            cartItems
              .filter(item => item.quantity > 0)
              .map(item => <CartItem key={item.id} item={item} />)}
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
});
