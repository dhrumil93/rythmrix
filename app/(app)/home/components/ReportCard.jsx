import React from 'react';
import { View, Text, TouchableOpacity, Image, StyleSheet } from 'react-native';

export default function ReportCard() {
  return (
    <TouchableOpacity style={styles.reportCard}>
      <View style={styles.reportContent}>
        <Text style={styles.reportTitle}>Manual Report Review</Text>
        <Text style={styles.reportDescription}>
          Get your reports reviewed by our ECG Experts.
        </Text>
        <Text style={styles.learnMore}>Learn more →</Text>
      </View>
      <Image 
        source={require('../../../../assets/images/doctor.png')} 
        style={styles.doctorImage}
      />
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  reportCard: {
    flexDirection: 'row',
    backgroundColor: '#f0f4ff',
    borderRadius: 12,
    padding: 16,
    marginTop: 20,
  },
  reportContent: {
    flex: 1,
  },
  reportTitle: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 8,
  },
  reportDescription: {
    color: '#666',
    marginBottom: 8,
  },
  learnMore: {
    color: '#074799',
  },
  doctorImage: {
    width: 80,
    height: 80,
  },
}); 