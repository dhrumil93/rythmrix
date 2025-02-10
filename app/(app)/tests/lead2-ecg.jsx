import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import TestDescription from './components/TestDescription';

export default function LeadTwoECGTest() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <TestDescription 
        icon={require('../../../assets/images/lead2.png')}
        title="Lead II ECG"
        description="A focused ECG test that records the heart's electrical activity between two specific points, ideal for basic rhythm analysis and arrhythmia detection."
        benefits={[
          "Quick rhythm assessment",
          "Basic arrhythmia detection",
          "Easy-to-perform test",
          "Instant preliminary results"
        ]}
      />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 40,
  },
}); 