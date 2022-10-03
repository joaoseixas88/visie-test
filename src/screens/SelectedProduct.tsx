import { app } from '@/api';
import { PrimaryButton } from '@/components';
import { colors } from '@/globalStyles';
import { NavigationProps, Product, SelectedScreenProps } from '@/types';
import { alert, formatBRL, optionsAlert } from '@/utils';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { ActivityIndicator, Image, StyleSheet, Text, View } from 'react-native';
interface Props {
  navigation: NavigationProps;
}

export const SelectedProduct = ({ navigation }: Props) => {
  const {
    params: { itemId },
  } = useRoute<SelectedScreenProps>();
  const [product, setProduct] = React.useState<Product>();
  const [loading, setLoading] = React.useState<boolean>(false);

  const findProduct = async () => {
    setLoading(true);
    const response = await app.get(`products/${itemId}`);
    setLoading(false);
    navigation.setOptions({
      title: response.data.title,
    });
    setProduct(response.data);
  };

  React.useEffect(() => {
    findProduct();
  }, []);

  React.useLayoutEffect(() => {
    navigation.setOptions({
      title: product?.title,
    });
  }, [navigation, itemId]);

  const deleteProduct = async () => {
    const response = await app.delete(`products/${itemId}`, {
      method: 'DELETE',
    });
    if (!response.data) {
      alert('Algo deu errado');
    }
    alert('Deletado');
    navigation.navigate('Product');
  };

  const handleDelete = () => {
    optionsAlert('Deseja deletar este produto?', 'Deletar', deleteProduct);
  };

  return (
    <View style={styles.container}>
      <View>
        <View>
          <View>
            <Text style={styles.title}>{product?.brand}</Text>
          </View>
          <View style={styles.imagesContainer}>
            {product?.images.map((uri) => {
              return loading ? (
                <ActivityIndicator />
              ) : (
                <Image
                  key={uri}
                  style={styles.image}
                  source={{
                    uri,
                  }}
                />
              );
            })}
          </View>
        </View>
        <View>
          <Text style={styles.description}>{product?.description}</Text>
          <Text>{formatBRL(product?.price)}</Text>
          <Text>Estoque: {product?.stock}</Text>
          <Text>Categoria: {product?.category}</Text>
          <Text>Desconto: {product?.discountPercentage}%</Text>
        </View>
      </View>
      <View>
        <View style={styles.btnContainer}>
          <PrimaryButton label="Alterar" color="blue" key={'alterar'} />
        </View>
        <View style={styles.btnContainer}>
          <PrimaryButton
            label="Excluir"
            color="red"
            key={'deletar'}
            onPress={handleDelete}
          />
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.background,
    padding: 10,
    justifyContent: 'space-between',
  },
  imagesContainer: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    display: 'flex',
    justifyContent: 'space-between',
  },
  image: {
    width: '49%',
    height: 150,
    borderRadius: 10,
    padding: 10,
    marginVertical: 5,
    resizeMode: 'contain',
  },
  title: {
    fontSize: 30,
    textAlign: 'center',
  },
  description: {
    fontSize: 20,
  },
  btnContainer: {
    marginVertical: 10,
    height: 50,
  },
});
