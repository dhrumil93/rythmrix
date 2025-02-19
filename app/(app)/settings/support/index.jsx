import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import Modal from 'react-native-modal';

const HELP_TOPICS = [
  {
    id: '1',
    question: 'Whatsteps should take if I can not connect the device even after several attempts?',
    answer: 'First, ensure Bluetooth is enabled on your device. Check if the device is properly charged. Try restarting both your phone and the ECG device. If issues persist, try forgetting the device from Bluetooth settings and pair again.'
  },
  {
    id: '2',
    question: 'I have properly connected the device but I am experiencing straight-linee issues. How can I resolve this?',
    answer: 'This usually occurs due to improper contact. Ensure the electrodes are clean and making proper skin contact. Try moistening the contact points slightly. Check if the device is properly positioned.'
  },
  {
    id: '3',
    question: 'Despite following all the guidelines in the user manual, the traces are not generating accurately. What can I do',
    answer: 'Check if you are in a stable position without movement. Ensure proper skin contact and electrode placement. Try recalibrating the device. If problems persist, contact support for detailed troubleshooting.'
  },
  {
    id: '4',
    question: 'The test is returning blank readings. How can I address this?',
    answer: 'First check the battery level of your device. Clean the electrodes and ensure proper skin contact. If the issue continues, try resetting the device and reconnecting.'
  },
  {
    id: '5',
    question: 'I am noticing some noise in the ECG signal generated from the device. How can I address this?',
    answer: 'Ensure you are in a quiet environment away from electronic interference. Keep still during recording. Check electrode placement and contact. Try moving away from power sources or other electronic devices.'
  },
  {
    id: '6',
    question: 'Is the device compatible with iOS, and if not, when can we anticipate an update?',
    answer: 'Currently, the device is compatible with both iOS and Android platforms. Regular updates are provided through the App Store and Play Store.'
  },
  {
    id: '7',
    question: 'Is it necessary to enable the OTG connection for every test?',
    answer: 'No, OTG connection is not required. The device uses Bluetooth technology for communication with your smartphone.'
  }
];

export default function SupportScreen() {
  const router = useRouter();
  const [expandedId, setExpandedId] = useState(null);
  const [isModalVisible, setModalVisible] = useState(false);

  const toggleExpand = (id) => {
    setExpandedId(expandedId === id ? null : id);
  };

  const toggleModal = () => {
    setModalVisible(!isModalVisible);
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
        <Text style={styles.title}>Help & Support</Text>
      </View>

      <Text style={styles.sectionTitle}>Popular Help Topics</Text>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        {HELP_TOPICS.map((topic) => (
          <TouchableOpacity
            key={topic.id}
            style={styles.topicCard}
            onPress={() => toggleExpand(topic.id)}
          >
            <View style={styles.questionRow}>
              <Text style={styles.question}>{topic.question}</Text>
              <MaterialIcons 
                name={expandedId === topic.id ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                size={24} 
                color="#666" 
              />
            </View>
            {expandedId === topic.id && (
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