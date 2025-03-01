import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const PATIENT_INFO = {
  name: 'Rekha',
  age: '28',
  gender: 'Female',
  weight: '98',
  height: '175',
  date: '28 Feb 2025,6:06 Pm'
};

const ECG_LEADS = ['V1', 'V2', 'V3', 'II', 'L'];

export default function TestReportScreen() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>ECG Report</Text>
        </View>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{PATIENT_INFO.date}</Text>
        </View>

        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Name</Text>
              <Text style={styles.infoValue}>{PATIENT_INFO.name}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Age</Text>
              <Text style={styles.infoValue}>{PATIENT_INFO.age}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Gender</Text>
              <Text style={styles.infoValue}>{PATIENT_INFO.gender}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Weight</Text>
              <Text style={styles.infoValue}>{PATIENT_INFO.weight}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Height</Text>
              <Text style={styles.infoValue}>{PATIENT_INFO.height}</Text>
            </View>
          </View>
        </View>

        <View style={styles.ecgSection}>
          <Text style={styles.sectionTitle}>ECG characteristics</Text>
          {ECG_LEADS.map((lead, index) => (
            <View key={lead} style={styles.ecgLeadContainer}>
              <Text style={styles.leadLabel}>{lead}</Text>
              <Image
                source={require('../../../../assets/images/ecg-wave.png')}
                style={styles.ecgWave}
                resizeMode="stretch"
              />
            </View>
          ))}
        </View>
      </ScrollView>

      <View style={styles.footer}>
        <TouchableOpacity 
          style={styles.shareButton}
          onPress={() => {/* Handle share */}}
        >
          <MaterialIcons name="share" size={24} color="#fff" />
          <Text style={styles.shareButtonText}>Share Report</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    backgroundColor: '#003087',
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  content: {
    flex: 1,
  },
  dateContainer: {
    alignItems: 'center',
    paddingVertical: 12,
    backgroundColor: '#E0E0E0',
    borderRadius: 20,
    marginHorizontal: 16,
    marginTop: 16,
  },
  dateText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#000',
  },
  infoContainer: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  infoRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    justifyContent: 'space-between',
  },
  infoItem: {
    marginBottom: 16,
    minWidth: '30%',
  },
  infoLabel: {
    fontSize: 16,
    color: '#003087',
    fontWeight: '600',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 16,
    color: '#000',
  },
  ecgSection: {
    marginTop: 20,
    paddingHorizontal: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#000',
    marginBottom: 20,
  },
  ecgLeadContainer: {
    marginBottom: 24,
  },
  leadLabel: {
    fontSize: 18,
    fontWeight: '600',
    color: '#000',
    marginBottom: 8,
  },
  ecgWave: {
    width: '100%',
    height: 100,
    backgroundColor: '#f8f8f8',
    borderRadius: 8,
  },
  footer: {
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#E0E0E0',
  },
  shareButton: {
    backgroundColor: '#003087',
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    padding: 16,
    borderRadius: 8,
    gap: 8,
  },
  shareButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 