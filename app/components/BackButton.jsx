import React from 'react';
import { TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function BackButton() {
  const router = useRouter();
  
  return (
    <TouchableOpacity style={styles.backButton} onPress={() => router.back()}>
      <MaterialIcons name="arrow-back" size={24} color="#333" />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 20,
    top: 10,
    zIndex: 1,
  },
}); 