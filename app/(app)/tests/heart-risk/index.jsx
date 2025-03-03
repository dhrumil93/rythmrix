import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import TestDescription from '../components/TestDescription';

export default function HeartRiskTest() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <TestDescription 
        icon={require('../../../../assets/images/heart.png')}
        title="Heart Risk Calculator"
        description="Calculate your heart health risk based on various factors including age, lifestyle, and medical history."
        benefits={[
          "Personalized heart risk assessment",
          "Lifestyle recommendations",
          "Risk factor analysis",
          "Prevention guidelines"
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