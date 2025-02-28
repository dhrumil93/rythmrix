import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function TwelveLeadECGTest() {
  const router = useRouter();
  const [currentStep, setCurrentStep] = useState(1);
  const totalSteps = 3;

  const renderStepIndicator = () => (
    <View style={styles.stepIndicator}>
      {Array(totalSteps).fill(0).map((_, index) => (
        <View 
          key={index} 
          style={[
            styles.stepDot,
            currentStep === index + 1 && styles.activeStepDot
          ]} 
        />
      ))}
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>12-Lead ECG Test</Text>
      </View>

      {renderStepIndicator()}

      <ScrollView style={styles.content}>
        <View style={styles.stepContent}>
          <Image 
            source={require('../../../../../assets/images/ecg.png')}
            style={styles.image}
          />
          <Text style={styles.stepTitle}>Step {currentStep}</Text>
          <Text style={styles.stepDescription}>
            Place the electrodes as shown in the image above. Make sure the skin is clean and dry.
          </Text>
        </View>
      </ScrollView>

      <View style={styles.footer}>
        {currentStep > 1 && (
          <TouchableOpacity 
            style={styles.secondaryButton}
            onPress={() => setCurrentStep(prev => prev - 1)}
          >
            <Text style={styles.secondaryButtonText}>Previous</Text>
          </TouchableOpacity>
        )}
        <TouchableOpacity 
          style={styles.primaryButton}
          onPress={() => {
            if (currentStep < totalSteps) {
              setCurrentStep(prev => prev + 1);
            } else {
              // Start the test
              console.log('Start test');
            }
          }}
        >
          <Text style={styles.primaryButtonText}>
            {currentStep === totalSteps ? 'Start Test' : 'Next'}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  stepIndicator: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 8,
  },
  stepDot: {
    width: 8,
    height: 8,
    borderRadius: 4,
    backgroundColor: '#ddd',
  },
  activeStepDot: {
    backgroundColor: '#074799',
    width: 24,
  },
  content: {
    flex: 1,
  },
  stepContent: {
    padding: 20,
    alignItems: 'center',
  },
  image: {
    width: '100%',
    height: 300,
    resizeMode: 'contain',
    marginBottom: 24,
  },
  stepTitle: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
    marginBottom: 12,
  },
  stepDescription: {
    fontSize: 16,
    color: '#666',
    textAlign: 'center',
    lineHeight: 24,
  },
  footer: {
    flexDirection: 'row',
    padding: 16,
    borderTopWidth: 1,
    borderTopColor: '#eee',
    gap: 12,
  },
  primaryButton: {
    flex: 1,
    backgroundColor: '#074799',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  primaryButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
  secondaryButton: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingVertical: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  secondaryButtonText: {
    color: '#333',
    fontSize: 16,
    fontWeight: '600',
  },
}); 