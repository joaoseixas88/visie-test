import { app } from '@/api';
import { PrimaryButton } from '@/components';
import { useProducts } from '@/hooks';
import { NavigationProps, Product } from '@/types';
import { alert, formatBRL, optionsAlert } from '@/utils';
import { useNavigation } from '@react-navigation/native';
import React from 'react';
import { Image, StyleSheet, Text, View } from 'react-native';

interface Props {
  product: Product;
}

export const ProductBox = ({ product }: Props) => {
  const { price, rating, thumbnail, title } = product;
  const { navigate } = useNavigation<NavigationProps>();
  const handleNavigate = () => {
    navigate('Selected', {
      itemId: product.id,
    });
  };

  const { setProducts, products } = useProducts();

  const handleUpdateItem = () => {
    navigate('UpdateProduct', {
      itemId: product.id,
    });
  };
  const deleteProduct = async () => {
    const response = await app.delete(`products/${product.id}`, {
      method: 'DELETE',
    });
    if (!response.data) {
      alert('Algo deu errado');
    }
    const modifiedProducts = products.filter((prod) => prod.id !== product.id);
    setProducts(modifiedProducts);
    alert('Deletado');
  };

  const handleDelete = () => {
    optionsAlert('Deseja deletar este produto?', 'Deletar', deleteProduct);
  };

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <View>
          <Image
            style={styles.image}
            source={{
              uri: thumbnail,
            }}
          />
        </View>
        <View style={styles.priceContainer}>
          <Text style={styles.title}>{title}</Text>
          <Text>{formatBRL(price)}</Text>
          <Text>Nota: {rating} / 5</Text>
          <View
            style={{
              flexDirection: 'row',
              flex: 1,
              justifyContent: 'space-around',
            }}
          >
            <PrimaryButton label="Ver mais" onPress={handleNavigate} />
            <PrimaryButton
              label="Alterar"
              color="blue"
              onPress={handleUpdateItem}
            />
            <PrimaryButton label="Deletar" color="red" onPress={handleDelete} />
          </View>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: 'flex',
    alignItems: 'center',
    margin: 10,
    padding: 5,
    backgroundColor: '#FFF',
    borderRadius: 10,
  },
  content: {
    width: '90%',
    padding: 20,
  },
  image: {
    width: 300,
    height: 200,
    borderRadius: 20,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 20,
    textAlign: 'left',
  },
  description: {
    fontSize: 18,
    textAlign: 'center',
  },
  priceContainer: {
    flexDirection: 'column',
    margin: 10,
  },
});
