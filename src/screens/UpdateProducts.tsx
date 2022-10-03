import { app } from '@/api';
import { PrimaryButton } from '@/components';
import { colors } from '@/globalStyles';
import { NavigationProps, Product, UpdateScreenProps } from '@/types';
import { alert } from '@/utils';
import { translate, validator, Word } from '@/utils/validator';
import { useRoute } from '@react-navigation/native';
import React from 'react';
import { StyleSheet, TextInput, View } from 'react-native';

interface AddProductProps {
  name: string;
  description: string;
  stock: string;
  price: string;
  category: string;
  discountPercentage: string;
}

interface Props {
  navigation: NavigationProps;
}

export const UpdateProducts = ({ navigation }: Props) => {
  const [data, setData] = React.useState({} as AddProductProps);
  const {
    params: { itemId },
  } = useRoute<UpdateScreenProps>();

  const loadData = async () => {
    const response = await app.get(`products/${itemId}`);
    const product: Product = response.data;
    setData({
      name: product.title,
      category: product.category,
      description: product.description,
      discountPercentage: String(product.discountPercentage),
      price: String(product.price),
      stock: String(product.stock),
    });
  };

  React.useEffect(() => {
    loadData();
  }, []);

  const handleSave = () => {
    const { isValid, field } = validator(data);
    if (!isValid) {
      if (!field) {
        return;
      }
      alert(`Campo: ${translate(field as Word)} requerido(a)`);
      return;
    }
    alert('Dados salvos');
    navigation.navigate('Product');
  };

  return (
    <View style={styles.container}>
      <View>
        <TextInput
          placeholder="Nome do produto"
          style={styles.input}
          onChangeText={(e) => setData({ ...data, name: e })}
          value={data.name}
        />
        <TextInput
          placeholder="Descrição do produto"
          style={styles.input}
          onChangeText={(e) => setData({ ...data, description: e })}
          value={data.description}
        />
        <TextInput
          placeholder="Preço"
          style={styles.input}
          keyboardType="numeric"
          value={String(data.price ?? '')}
          onChangeText={(e) => setData({ ...data, price: e })}
        />
        <TextInput
          placeholder="Estoque"
          style={styles.input}
          onChangeText={(e) => setData({ ...data, stock: e })}
          value={String(data.stock)}
        />
        <TextInput
          placeholder="Categoria"
          style={styles.input}
          onChangeText={(e) => setData({ ...data, category: e })}
          value={data.category}
        />
        <TextInput
          placeholder="Desconto"
          style={styles.input}
          onChangeText={(e) => setData({ ...data, discountPercentage: e })}
          value={String(data.discountPercentage)}
        />
      </View>
      <View
        style={{
          display: 'flex',
          justifyContent: 'space-around',
        }}
      >
        <View style={styles.buttonContainer}>
          <PrimaryButton label="Salvar" onPress={handleSave} />
        </View>
        <View style={styles.buttonContainer}>
          <PrimaryButton
            label="Cancelar"
            color="red"
            onPress={() => navigation.navigate('Product')}
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
  input: {
    backgroundColor: 'white',
    borderRadius: 5,
    marginVertical: 10,
    paddingHorizontal: 15,
  },
  buttonContainer: {
    marginVertical: 10,
    height: 50,
  },
});
