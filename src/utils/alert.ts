import { Alert } from 'react-native';

export const alert = (response: string) => {
  Alert.alert(response);
};

export const optionsAlert = (
  message: string,
  title: string,
  onPress: () => void
) => {
  Alert.alert(title, message, [
    {
      text: 'Cancelar',
      onPress: () => {},
    },
    {
      text: 'Confirma ?',
      onPress,
    },
  ]);
};
