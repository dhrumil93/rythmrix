import React from 'react';
import { View, TextInput, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function SearchBar({ placeholder, onChangeText }) {
  return (
    <View style={styles.container}>
      <View style={styles.searchBar}>
        <MaterialIcons name="search" size={18} color="#666" />
        <TextInput
          style={styles.input}
          placeholder={placeholder}
          placeholderTextColor="#666"
          onChangeText={onChangeText}
        />
      </View>
      </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 24,
    marginBottom: 8,
  },
  searchBar: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#f5f5f5',
    borderRadius: 12,
    paddingHorizontal: 10,
    paddingVertical: 4,
    marginRight: 12,
  },
  input: {
    flex: 1,
    marginLeft: 2,
    fontSize: 14,
    color: '#333',
  },
  menuIcon: {
    padding: 10,
  },
}); 