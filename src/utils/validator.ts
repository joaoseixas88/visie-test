interface ValidatorResponse {
  isValid: boolean;
  field?: string;
}

export const validator = (params: any): ValidatorResponse => {
  const requiredFields: Word[] = [
    'name',
    'description',
    'price',
    'stock',
    'discountPercentage',
  ];
  for (const field of requiredFields) {
    if (!params[field]) {
      return {
        field,
        isValid: false,
      };
    }
  }
  return {
    isValid: true,
  };
};

export const translate = (word: Word): string => {
  const response = {
    name: 'Nome',
    description: 'Descrição',
    price: 'Preço',
    stock: 'Estoque',
    category: 'Categoria',
    discountPercentage: 'Desconto',
  };
  return response[word];
};

export type Word =
  | 'name'
  | 'description'
  | 'price'
  | 'stock'
  | 'category'
  | 'discountPercentage';
