import React from 'react';
import { TouchableOpacity, Text, Image, StyleSheet } from 'react-native';
import { useRouter } from 'expo-router';

export default function FeatureCard({ icon, title, description, route }) {
  const router = useRouter();

  return (
    <TouchableOpacity 
      style={styles.featureCard}
      onPress={() => router.push(route)}
    >
      <Image source={icon} style={styles.featureIcon} />
      <Text style={styles.featureTitle}>{title}</Text>
      <Text style={styles.featureDescription}>{description}</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  featureCard: {
    width: '48%',
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginVertical: 8,
    shadowColor: '#074799',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  featureIcon: {
    width: 40,
    height: 40,
    marginBottom: 12,
  },
  featureTitle: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  featureDescription: {
    fontSize: 12,
    color: '#666',
  },
}); 