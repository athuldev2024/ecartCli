import React from 'react';
import { useState, useEffect } from 'react';
import { StyleSheet, FlatList, View, ActivityIndicator } from 'react-native';
import { Product as ProductType } from '@types';
import ProductCard from '@components/ProductCard';
import AppTextInput from '@components/AppTextInput';
import { verticalScale } from 'react-native-size-matters';
import { commonStyles } from '@styles/sharedStyles';
import { useNavigation } from '@react-navigation/native';
import { RootStackParamList } from '@navigation/type';
import { StackNavigationProp } from '@react-navigation/stack';
import { useDispatch, useSelector } from 'react-redux';
import { fetchProducts } from '@store/productSlice';
import { setProducts as setProductsMock } from '@store/productSlice';
import { products as productListMock } from '../constants/mock';

type Nav = StackNavigationProp<RootStackParamList>;

const HomeScreen = () => {
  const dispatch = useDispatch();

  const productLoader = useSelector(state => state.products.loading);
  const productStatus = useSelector(state => state.products.status);
  const productList = useSelector(state => state.products.products);

  const [search, setSearch] = useState('');
  const [products, setproducts] = useState<ProductType[]>([]);

  const navigation = useNavigation<Nav>();

  useEffect(() => {
    (async () => {
      if (productList.length === 0 && productStatus === 'idle') {
        await dispatch(fetchProducts());
      }

      if (productList.length === 0 && productStatus !== 'idle') {
        dispatch(setProductsMock([...productListMock]));
      }
    })();
  }, [dispatch, productList, productStatus]);

  useEffect(() => {
    const filteredProducts = productList.filter((product: ProductType) =>
      product.title.toLowerCase().includes(search.toLowerCase()),
    );

    setproducts(filteredProducts);
  }, [search, productList]);

  const handleClick = (product: ProductType) => {
    navigation.navigate('ProductScreen', { product });
  };

  return (
    <View style={styles.container}>
      <View pointerEvents={productLoader ? 'none' : undefined}>
        <AppTextInput
          value={search}
          onChangeText={setSearch}
          placeholder="Search product"
          customStyles={styles.search}
        />
      </View>

      {productLoader && (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size={'large'} color="#0a041fff" />
        </View>
      )}

      {!productLoader && (
        <FlatList
          data={products}
          keyExtractor={item => item.id.toString()}
          renderItem={({ item }) => (
            <ProductCard {...{ ...item }} onPress={handleClick} />
          )}
          numColumns={2}
          columnWrapperStyle={styles.row}
          showsVerticalScrollIndicator={false}
        />
      )}
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
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
