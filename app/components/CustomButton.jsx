import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';

export default function CustomButton({ title, onPress, style, textStyle, disabled }) {
  return (
    <TouchableOpacity 
      style={[
        styles.button, 
        disabled && styles.buttonDisabled,
        style
      ]} 
      onPress={onPress}
      disabled={disabled}
    >
      <Text style={[
        styles.buttonText, 
        disabled && styles.buttonTextDisabled,
        textStyle
      ]}>
        {title}
      </Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    width: '100%',
    backgroundColor: '#074799',
    paddingVertical: 10,
    borderRadius: 50,
    alignItems: 'center',
    marginTop: 10,
    marginBottom: 16,
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  buttonDisabled: {
    backgroundColor: '#074799',
    opacity: 0.5,
  },
  buttonTextDisabled: {
    opacity: 0.8,
  },
}); 