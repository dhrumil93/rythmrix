import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import ECGRecording from '../components/ECGRecording';

export default function V3RecordingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#003087" barStyle="light-content" />
      <ECGRecording activeLead="V3" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 