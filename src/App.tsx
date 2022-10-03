import { PrimaryButton } from '@/components';
import {
  AddProduct,
  ProductsList,
  SelectedProduct,
  UpdateProducts,
} from '@/screens';
import { ProductsProvider } from '@/store/products';
import { RootStackParamList } from '@/types/Navigator';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import React from 'react';

const Stack = createNativeStackNavigator<RootStackParamList>();

const App = () => {
  return (
    <ProductsProvider>
      <NavigationContainer>
        <Stack.Navigator
          screenOptions={{
            headerStyle: {
              backgroundColor: '#8edf8e',
            },
            headerTitleAlign: 'center',
            headerTintColor: '#5c4bbb',
            headerTitleStyle: {
              fontSize: 25,
              fontWeight: '600',
            },
          }}
        >
          <Stack.Screen
            name="Product"
            component={ProductsList}
            options={({ navigation }) => ({
              headerTitle: 'Produtos',
              headerRight: () => {
                return (
                  <PrimaryButton
                    label="  +  "
                    color="blue"
                    onPress={() => navigation.navigate('AddProduct')}
                  />
                );
              },
            })}
          />
          <Stack.Screen
            name="AddProduct"
            component={AddProduct}
            options={{
              headerTitle: 'Adicionar Produto',
            }}
          />
          <Stack.Screen
            name="UpdateProduct"
            component={UpdateProducts}
            options={{
              headerTitle: 'Atualizar Produto',
            }}
          />
          <Stack.Screen name="Selected" component={SelectedProduct} />
        </Stack.Navigator>
      </NavigationContainer>
    </ProductsProvider>
  );
};

export default App;
