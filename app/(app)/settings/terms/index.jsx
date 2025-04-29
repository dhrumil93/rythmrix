import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://ecg-wv62.onrender.com';

export default function TermsScreen() {
  const router = useRouter();
  const [terms, setTerms] = useState([]);

  useEffect(() => {
    fetchTerms();
  }, []);

  const fetchTerms = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/user/termscondition/getAll`,
        {
          method: 'GET',
          headers: {
            Authorization: `${token}`,
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.ok) {
        const data = await response.json();
        console.log('Terms Response:', data);
        // Using the correct key from the API response
        setTerms(data.gettermscondition || []);
      }
    } catch (err) {
      console.error('Error fetching terms:', err);
    }
  };

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
        <Text style={styles.title}>Terms & Conditions</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.lastUpdated}>Last updated: March 15, 2024</Text>
        
        {terms.map((term, index) => (
          <View key={term._id} style={styles.section}>
            <Text style={styles.sectionTitle}>{index + 1}. {term.title}</Text>
            <Text style={styles.text}>{term.description}</Text>
          </View>
        ))}

        {terms.length === 0 && (
          <View style={styles.section}>
            <Text style={styles.text}>No terms and conditions available.</Text>
          </View>
        )}
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
  lastUpdated: {
    fontSize: 14,
    color: '#666',
    marginBottom: 24,
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
  text: {
    fontSize: 16,
    color: '#666',
    lineHeight: 24,
  },
}); 