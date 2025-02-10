import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import TestDescription from './components/TestDescription';

export default function TwelveLeadECGTest() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <TestDescription 
        icon={require('../../../assets/images/ecg.png')}
        title="12 Lead ECG Test"
        description="Lorem ipsum dolor sit amet consectetur. Quis justo gravida urna urna porttitor. Sit tincidunt ullamcorper a dignissim neque fusce dui diam et. Faucibus egestas neque tincidunt auctor. Justo velit ut accumsan faucibus sed."
        benefits={[
          "Comprehensive heart analysis from 12 different angles",
          "Detailed ECG report with interpretation",
          "Early detection of heart abnormalities",
          "Professional medical review option"
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