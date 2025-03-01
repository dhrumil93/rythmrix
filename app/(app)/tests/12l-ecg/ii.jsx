import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import ECGRecording from '../components/ECGRecording';

export default function IIRecordingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#003087" barStyle="light-content" />
      <ECGRecording activeLead="II" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 