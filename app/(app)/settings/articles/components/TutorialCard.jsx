import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function TutorialCard({ tutorial }) {
  return (
    <TouchableOpacity style={styles.card}>
      <View style={styles.iconContainer}>
        <MaterialIcons name="play-circle-filled" size={40} color="#074799" />
      </View>
      <View style={styles.content}>
        <Text style={styles.title}>{tutorial.title}</Text>
        <Text style={styles.duration}>{tutorial.duration}</Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    padding: 16,
    flexDirection: 'row',
    alignItems: 'center',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  iconContainer: {
    marginRight: 16,
  },
  content: {
    flex: 1,
  },
  title: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 4,
  },
  duration: {
    fontSize: 14,
    color: '#666',
  },
}); 