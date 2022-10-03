import React from 'react';
import { ProductBox } from '@/components';
import { useProducts } from '@/hooks';
import { ScrollView, StyleSheet } from 'react-native';
import { colors } from '@/globalStyles';

export const ProductsList = () => {
  const { products, loadProducts } = useProducts();

  React.useEffect(() => {
    if (products.length === 0) {
      loadProducts();
    }
  }, []);

  return (
    <ScrollView
      style={styles.container}
      contentContainerStyle={styles.scrollview}
    >
      {products.map((product) => {
        return <ProductBox product={product} key={product.id} />;
      })}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: colors.background,
    flex: 1,
  },
  scrollview: {
    flexDirection: 'column',
    alignContent: 'center',
  },
});
