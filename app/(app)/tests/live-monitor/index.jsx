import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import TestDescription from '../components/TestDescription';

export default function LiveMonitorTest() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <TestDescription 
        icon={require('../../../../assets/images/monitor.png')}
        title="Live Heart Monitor"
        description="Continuous real-time monitoring of your heart's electrical activity for extended periods to detect any irregularities or patterns."
        benefits={[
          "24/7 heart rhythm monitoring",
          "Instant arrhythmia detection",
          "Emergency alerts for abnormalities",
          "Detailed activity correlation"
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