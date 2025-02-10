import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, Switch } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SETTINGS_OPTIONS = [
  {
    id: 'notifications',
    title: 'ECG Notifications',
    description: 'Get notified about irregular rhythms and completed recordings',
    type: 'switch'
  },
  {
    id: 'recording_length',
    title: 'Recording Length',
    description: '30 seconds',
    type: 'select'
  },
  {
    id: 'lead_config',
    title: 'Lead Configuration',
    description: 'Standard 12-lead',
    type: 'select'
  },
  {
    id: 'auto_analysis',
    title: 'Automatic Analysis',
    description: 'AI-powered ECG analysis after recording',
    type: 'switch'
  },
  {
    id: 'grid',
    title: 'Show ECG Grid',
    description: 'Display grid lines on ECG recordings',
    type: 'switch'
  },
  {
    id: 'backup',
    title: 'Auto Backup',
    description: 'Automatically backup ECG recordings',
    type: 'switch'
  }
];

export default function ECGSettingsScreen() {
  const router = useRouter();
  const [switches, setSwitches] = useState({
    notifications: true,
    auto_analysis: true,
    grid: true,
    backup: true
  });

  const toggleSwitch = (id) => {
    setSwitches(prev => ({
      ...prev,
      [id]: !prev[id]
    }));
  };

  const handleOptionPress = (option) => {
    if (option.type === 'select') {
      // Handle selection options
      console.log('Open selection for:', option.id);
    }
  };

  const renderOption = (option) => (
    <TouchableOpacity
      key={option.id}
      style={styles.optionCard}
      onPress={() => option.type === 'select' && handleOptionPress(option)}
    >
      <View style={styles.optionInfo}>
        <Text style={styles.optionTitle}>{option.title}</Text>
        <Text style={styles.optionDescription}>{option.description}</Text>
      </View>
      {option.type === 'switch' ? (
        <Switch
          value={switches[option.id]}
          onValueChange={() => toggleSwitch(option.id)}
          trackColor={{ false: '#ddd', true: '#a7c8ff' }}
          thumbColor={switches[option.id] ? '#074799' : '#f4f3f4'}
        />
      ) : (
        <MaterialIcons name="chevron-right" size={24} color="#666" />
      )}
    </TouchableOpacity>
  );

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
        <Text style={styles.title}>ECG Settings</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {SETTINGS_OPTIONS.map(renderOption)}
      </ScrollView>
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
  optionCard: {
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
  optionInfo: {
    flex: 1,
    marginRight: 16,
  },
  optionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  optionDescription: {
    fontSize: 14,
    color: '#666',
  },
}); 