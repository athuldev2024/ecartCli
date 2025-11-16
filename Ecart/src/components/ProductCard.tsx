import React, { JSX } from 'react';
import { StyleSheet, View, Image, Pressable } from 'react-native';
import { verticalScale, scale } from 'react-native-size-matters';
import colors from '@styles/colors';
import { Product } from '@types';
import AppText from '@components/AppText';
import { commonStyles } from '@styles/sharedStyles';

function CircleBadge({ value }: { value: number }): JSX.Element {
  return (
    <View style={styles.CircleBadge}>
      <AppText variant="small" customStyles={{ color: colors.white }}>
        {value}
      </AppText>
    </View>
  );
}

export default function ProductCard({
  id,
  price,
  title,
  imageURL,
  description,
  quantity,
  onPress,
}: Product & { onPress: (product: Product) => void }): JSX.Element {
  return (
    <>
      <Pressable
        onPress={() => onPress({ id, price, title, imageURL, description, quantity })}
        style={({ pressed }) => [{ opacity: pressed ? 0.5 : 1 }]}
      >
        <View style={styles.container}>
          {quantity > 0 && <CircleBadge value={quantity} />}
          <Image
            style={styles.image}
            source={{
              uri: imageURL,
            }}
          />
          <AppText variant="medium">{title}</AppText>
          <AppText variant="small" bold customStyles={styles.price}>{`₹ ${price}`}</AppText>
        </View>
      </Pressable>
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    width: scale(160),
    height: verticalScale(190),
    backgroundColor: colors.white,
    borderRadius: scale(10),
    flexDirection: 'column',
    justifyContent: 'space-around',
    alignItems: 'center',
    padding: scale(10),
    margin: scale(8),
    ...commonStyles.shadow,
  },
  image: {
    width: scale(120),
    height: verticalScale(120),
    borderRadius: scale(8),
  },
  price: {
    fontStyle: 'italic',
    color: colors.price,
  },
  CircleBadge: {
    width: scale(32),
    height: scale(32),
    borderRadius: scale(32) / 2,
    backgroundColor: colors.textSecondary,
    position: 'absolute',
    zIndex: 1,
    top: -scale(4),
    right: -scale(4),
    justifyContent: 'center',
    alignItems: 'center',
    ...commonStyles.shadow,
  },
});
