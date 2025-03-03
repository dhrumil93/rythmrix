import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import TestDescription from '../components/TestDescription';

export default function HRVTest() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <TestDescription 
        icon={require('../../../../assets/images/bike.png')}
        title="Heart Rate Variability (HRV)"
        description="Measure the variation in time between consecutive heartbeats to assess your stress levels and overall heart health."
        benefits={[
          "Real-time stress level monitoring",
          "Recovery and readiness insights",
          "Autonomic nervous system assessment",
          "Personalized wellness recommendations"
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