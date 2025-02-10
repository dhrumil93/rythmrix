import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const UI_MODES = [
  {
    id: 'light',
    name: 'Light Mode',
    icon: 'light-mode',
  },
  {
    id: 'dark',
    name: 'Dark Mode',
    icon: 'dark-mode',
  },
  {
    id: 'system',
    name: 'System Default',
    icon: 'settings-suggest',
  },
];

export default function UIModeScreen() {
  const router = useRouter();
  const [selectedMode, setSelectedMode] = useState('light');

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>UI Mode</Text>
      </View>

      <View style={styles.content}>
        {UI_MODES.map((mode) => (
          <TouchableOpacity
            key={mode.id}
            style={[
              styles.modeCard,
              selectedMode === mode.id && styles.selectedCard
            ]}
            onPress={() => setSelectedMode(mode.id)}
          >
            <View style={styles.modeInfo}>
              <MaterialIcons 
                name={mode.icon} 
                size={24} 
                color={selectedMode === mode.id ? '#074799' : '#666'} 
              />
              <Text style={[
                styles.modeName,
                selectedMode === mode.id && styles.selectedText
              ]}>
                {mode.name}
              </Text>
            </View>
            {selectedMode === mode.id && (
              <MaterialIcons name="check-circle" size={24} color="#074799" />
            )}
          </TouchableOpacity>
        ))}
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    padding: 16,
  },
  modeCard: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  modeInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  modeName: {
    fontSize: 16,
    color: '#333',
    marginLeft: 12,
  },
  selectedCard: {
    borderColor: '#074799',
    borderWidth: 2,
  },
  selectedText: {
    color: '#074799',
    fontWeight: '600',
  },
  saveButton: {
    backgroundColor: '#074799',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 