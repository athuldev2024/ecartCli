import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View } from 'react-native';
import { products as productList } from '../constants/mock';
import { Product } from '@types';
import ProductCard from '@components/ProductCard';
import AppTextInput from '@components/AppTextInput';
import { verticalScale } from 'react-native-size-matters';
import { commonStyles } from '@styles/sharedStyles';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/type';
import { StackNavigationProp } from '@react-navigation/stack';

type Nav = StackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const [search, setSearch] = useState('');
  const [products, setproducts] = useState<Product[]>([]);

  const navigation = useNavigation<Nav>();

  useEffect(() => {
    const filteredProducts = productList.filter(product =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );

    setproducts(filteredProducts); // remove when API is integrated
  }, [search]);

  const handleClick = (product: Product) => {
    navigation.navigate('ProductScreen', { product });
  };

  return (
    <View style={styles.container}>
      <AppTextInput
        value={search}
        onChangeText={setSearch}
        placeholder="Search product"
        customStyles={styles.search}
      />
      <FlatList
        data={products}
        keyExtractor={item => item.id.toString()}
        renderItem={({ item }) => <ProductCard {...{ ...item }} onPress={handleClick} />}
        numColumns={2}
        columnWrapperStyle={styles.row}
        showsVerticalScrollIndicator={false}
      />
    </View>
  );
};

export default HomeScreen;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    gap: verticalScale(10),
    paddingTop: verticalScale(10),
  },
  row: {
    justifyContent: 'space-between',
  },
  search: {
    width: '90%',
    alignSelf: 'center',
    ...commonStyles.shadow,
  },
});
