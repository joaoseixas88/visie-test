import { RouteProp } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';

export type RootStackParamList = {
  Product: undefined;
  Selected: {
    itemId: number;
  };
  AddProduct: undefined;
  UpdateProduct: {
    itemId: number;
  };
};

export type NavigationProps = NativeStackNavigationProp<RootStackParamList>;
export type SelectedScreenProps = RouteProp<RootStackParamList, 'Selected'>;
export type UpdateScreenProps = RouteProp<RootStackParamList, 'UpdateProduct'>;
