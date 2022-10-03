import { ProductsContext } from '@/store/products';
import { useContext } from 'react';

export const useProducts = () => {
  const context = useContext(ProductsContext);
  return context;
};
