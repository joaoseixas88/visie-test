import 'intl';
import 'intl/locale-data/jsonp/pt-BR';

export const formatBRL = (value: number | undefined): string => {
  if (!value) {
    return '';
  }
  const formatted = new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL',
  }).format(value);
  return formatted;
};
