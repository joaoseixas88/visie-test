import React from 'react';
import { StyleSheet, Text, TouchableOpacity } from 'react-native';

interface Props {
  label: string;
  onPress?: () => void;
  color?: 'default' | 'blue' | 'red';
}

export const PrimaryButton = ({
  label,
  onPress,
  color: choosedColor = 'default',
}: Props) => {
  let color = '#e6f7b7';

  if (choosedColor === 'red') {
    color = '#f18585';
  }

  if (choosedColor === 'blue') {
    color = '#7db5f5';
  }

  const styles = StyleSheet.create({
    container: {
      padding: 4,
      backgroundColor: color,
      borderRadius: 5,
      alignItems: 'center',
      height: '100%',
      alignContent: 'center',
      justifyContent: 'center',
    },
    text: {
      fontSize: 15,
      color: choosedColor !== 'default' ? 'white' : 'gray',
    },
  });

  return (
    <TouchableOpacity onPress={onPress} style={[styles.container]}>
      <Text style={styles.text}>{label}</Text>
    </TouchableOpacity>
  );
};
