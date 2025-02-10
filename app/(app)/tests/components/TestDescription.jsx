import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TestDescription({ 
  icon, 
  title, 
  description, 
  benefits 
}) {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <TouchableOpacity 
        style={styles.backButton} 
        onPress={() => router.back()}
      >
        <MaterialIcons name="arrow-back" size={24} color="#333" />
      </TouchableOpacity>

      <View style={styles.header}>
        <Image source={icon} style={styles.icon} />
        <Text style={styles.title}>{title}</Text>
      </View>

      <View style={styles.section}>
        <Text style={styles.sectionTitle}>Test Description</Text>
        <Text style={styles.description}>{description}</Text>
      </View>

      {benefits && (
        <View style={styles.section}>
          <Text style={styles.sectionTitle}>What you will get?</Text>
          {benefits.map((benefit, index) => (
            <View key={index} style={styles.benefitItem}>
              <MaterialIcons name="check-circle" size={20} color="#074799" />
              <Text style={styles.benefitText}>{benefit}</Text>
            </View>
          ))}
        </View>
      )}

      <View style={styles.checkboxContainer}>
        <TouchableOpacity style={styles.checkbox}>
          <MaterialIcons name="check-box-outline-blank" size={24} color="#074799" />
          <Text style={styles.checkboxLabel}>Don't show this again</Text>
        </TouchableOpacity>
      </View>

      <TouchableOpacity style={styles.startButton}>
        <Text style={styles.startButtonText}>Start Test</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    padding: 20,
  },
  backButton: {
    marginBottom: 20,
  },
  header: {
    alignItems: 'center',
    marginBottom: 30,
  },
  icon: {
    width: 80,
    height: 80,
    marginBottom: 16,
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    textAlign: 'center',
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  description: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
  benefitItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  benefitText: {
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
  },
  checkboxContainer: {
    marginTop: 'auto',
    marginBottom: 20,
  },
  checkbox: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkboxLabel: {
    marginLeft: 8,
    fontSize: 14,
    color: '#666',
  },
  startButton: {
    backgroundColor: '#074799',
    paddingVertical: 16,
    borderRadius: 30,
    alignItems: 'center',
  },
  startButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 