import React from 'react';
import { TouchableOpacity, Text, StyleSheet } from 'react-native';
import { MaterialCommunityIcons } from '@expo/vector-icons';

export default function SocialButton({ platform, color, onPress }) {
  return (
    <TouchableOpacity style={styles.button} onPress={onPress}>
      <MaterialCommunityIcons name={platform} size={24} color={color} />
      <Text style={styles.text}>{platform.charAt(0).toUpperCase() + platform.slice(1)}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 14,
    paddingVertical:10,
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    backgroundColor: '#fff',
  },
  text: {
    color: '#666',
    marginLeft: 8,
    fontSize: 15,
    fontWeight: '500',
  },
}); 