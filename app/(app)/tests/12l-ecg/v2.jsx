import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import ECGRecording from '../components/ECGRecording';

export default function V2RecordingScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#003087" barStyle="light-content" />
      <ECGRecording activeLead="V2" />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
}); 