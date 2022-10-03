import React from 'react';
import { Product } from '@/types';

import { createContext, Dispatch, SetStateAction } from 'react';
import { app } from '@/api';

interface ProductsProviderProps {
  children: React.ReactNode;
}

interface Props {
  products: Product[];
  setProducts: Dispatch<SetStateAction<Product[]>>;
  loadProducts: () => void;
}

export const ProductsContext = createContext({} as Props);

export const ProductsProvider = ({ children }: ProductsProviderProps) => {
  const [products, setProducts] = React.useState<Product[]>([]);

  const loadProducts = async () => {
    const getProducts = await app.get('products');
    const loadedProducts = getProducts.data.products;
    setProducts(loadedProducts);
  };

  return (
    <ProductsContext.Provider value={{ products, setProducts, loadProducts }}>
      {children}
    </ProductsContext.Provider>
  );
};
