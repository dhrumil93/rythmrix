import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import TestDescription from '../components/TestDescription';

export default function HyperkalemiaTest() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <TestDescription 
        icon={require('../../../../assets/images/potassium.png')}
        title="Hyperkalemia Test"
        description="Screen for elevated potassium levels in your blood through ECG analysis, which can indicate various cardiac and metabolic conditions."
        benefits={[
          "Non-invasive potassium screening",
          "Early warning system",
          "Regular monitoring capability",
          "Quick results and recommendations"
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