import React, { useState, useEffect } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView, ActivityIndicator } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Modal from 'react-native-modal';
import AsyncStorage from '@react-native-async-storage/async-storage';

const BASE_URL = 'https://ecg-wv62.onrender.com';

export default function SupportScreen() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);
  const [helpTopics, setHelpTopics] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetchHelpTopics();
  }, []);

  const fetchHelpTopics = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        return; // If no token, use default static data
      }

      const response = await fetch(`${BASE_URL}/api/user/help/getAll`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (response.ok) {
        const data = await response.json();
        if (data.gethelp && Array.isArray(data.gethelp)) {
          setHelpTopics(data.gethelp);
        }
      }
    } catch (err) {
      console.error('Error fetching help topics:', err);
    } finally {
      setLoading(false);
    }
  };

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#074799" />
      </View>
    );
  }

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
        <Text style={styles.title}>Help & Support</Text>
      </View>

      <Text style={styles.sectionTitle}>Popular Help Topics</Text>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {helpTopics.map((topic) => (
          <TouchableOpacity
            key={topic._id}
            style={styles.topicCard}
            onPress={() => toggleExpand(topic._id)}
          >
            <View style={styles.questionRow}>
              <Text style={styles.question}>{topic.question}</Text>
              <MaterialIcons 
                name={expandedId === topic._id ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#666" 
              />
            </View>
            {expandedId === topic._id && (
              <Text style={styles.answer}>{topic.answer}</Text>
            )}
          </TouchableOpacity>
        ))}
      </ScrollView>

      <TouchableOpacity style={styles.contactButton} onPress={toggleModal}>
        <Text style={styles.contactButtonText}>Contact Us</Text>
      </TouchableOpacity>

      <Modal
        isVisible={isModalVisible}
        onBackdropPress={toggleModal}
        style={styles.modal}
      >
        <View style={styles.modalContent}>
          <Text style={styles.modalTitle}>Contact Us</Text>
          <Text style={styles.modalText}>For any inquiries, please contact us at support@example.com or call us at (123) 456-7890.</Text>
          <TouchableOpacity style={styles.closeButton} onPress={toggleModal}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
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
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    margin: 16,
  },
  content: {
    padding: 16,
    paddingBottom: 100, // Adjusted padding to avoid overlap with bottom nav
  },
  topicCard: {
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
  questionRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  question: {
    flex: 1,
    fontSize: 16,
    color: '#333',
    marginRight: 16,
  },
  answer: {
    fontSize: 14,
    color: '#666',
    marginTop: 12,
    lineHeight: 20,
  },
  contactButton: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: '#074799',
    padding: 16,
    alignItems: 'center',
  },
  contactButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  modal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
  modalContent: {
    backgroundColor: 'white',
    padding: 22,
    borderTopLeftRadius: 17,
    borderTopRightRadius: 17,
    alignItems: 'center',
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 12,
  },
  modalText: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    marginBottom: 20,
  },
  closeButton: {
    backgroundColor: '#074799',
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
  },
  closeButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});