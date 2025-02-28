import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LEADS = [
  { id: 'V1', color: '#FFD700' },  // Yellow for active
  { id: 'V2', color: '#E0E0E0' },  // Gray for inactive
  { id: 'V3', color: '#E0E0E0' },
  { id: 'II', color: '#E0E0E0' },
  { id: 'L', color: '#E0E0E0' },
];

export default function ElectrodePlacement() {
  const router = useRouter();

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>12 Lead ECG Test</Text>
      </View>

      <View style={styles.leadsContainer}>
        {LEADS.map((lead) => (
          <View 
            key={lead.id}
            style={[styles.leadCircle, { backgroundColor: lead.color }]}
          >
            <Text style={styles.leadText}>{lead.id}</Text>
          </View>
        ))}
      </View>

      <View style={styles.imageContainer}>
        <Image 
          source={require('../../../../assets/images/body-outline.png')}
          style={styles.image}
          resizeMode="contain"
        />
        {/* Add electrode position markers here */}
        <View style={[styles.marker, styles.markerRA]}>
          <Text style={styles.markerText}>RA</Text>
        </View>
        <View style={[styles.marker, styles.markerLA]}>
          <Text style={styles.markerText}>LA</Text>
        </View>
        <View style={[styles.marker, styles.markerV1]}>
          <Text style={styles.markerText}>V1</Text>
        </View>
      </View>

      <TouchableOpacity 
        style={styles.startButton}
        onPress={() => router.push('/tests/12l-ecg/recording')}
      >
        <Text style={styles.startButtonText}>Start Test</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  leadsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 20,
    gap: 16,
  },
  leadCircle: {
    width: 48,
    height: 48,
    borderRadius: 24,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leadText: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  imageContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    position: 'relative',
  },
  image: {
    width: '80%',
    height: '80%',
    marginBottom:48
  },
  marker: {
    position: 'absolute',
    width: 24,
    height: 24,
    borderRadius: 12,
    backgroundColor: '#074799',
    justifyContent: 'center',
    alignItems: 'center',
  },
  markerText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '600',
  },
  markerRA: {
    left: '30%',
    top: '31%',
  },
  markerLA: {
    right: '29%',
    top: '31%',
  },
  markerV1: {
    left: '40%',
    top: '43%',
  },
  startButton: {
    backgroundColor: '#074799',
    margin: 16,
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