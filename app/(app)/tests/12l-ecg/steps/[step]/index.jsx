import React, { useState, useEffect } from 'react';
import { View, TouchableOpacity, StyleSheet } from 'react-native';
import { useLocalSearchParams, useRouter } from 'expo-router';
import WaitingScreen from '../components/WaitingScreen';

const StepScreen = () => {
  const [isLoading, setIsLoading] = useState(true);
  const { step } = useLocalSearchParams();
  const router = useRouter();

  // Messages for different steps
  const loadingMessages = {
    'v1': "Preparing for Lead V1...",
    'v2': "Preparing for Lead V2...",
    'v3': "Preparing for Lead V3...",
    'l': "Preparing for Lead L...",
    'll': "Preparing for Lead LL...",
  };

  useEffect(() => {
    // Show loading screen for 1.5 seconds when step changes
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, [step]);

  const handleNextStep = () => {
    setIsLoading(true); // Show loading before navigation
    
    // Define step sequence
    const stepSequence = ['v1', 'v2', 'v3', 'l', 'll'];
    const currentIndex = stepSequence.indexOf(step);
    
    if (currentIndex < stepSequence.length - 1) {
      // Navigate to next step
      router.push(`/tests/12l-ecg/steps/${stepSequence[currentIndex + 1]}`);
    } else {
      // Navigate to results or completion screen
      router.push('/tests/12l-ecg/results');
    }
  };

  if (isLoading) {
    return (
      <WaitingScreen 
        message={loadingMessages[step] || "Preparing next step..."}
      />
    );
  }

  return (
    <View style={styles.container}>
      {/* Your existing step content */}
      
      {/* Add this to your next button press handler */}
      <TouchableOpacity onPress={handleNextStep}>
        {/* Your next button content */}
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  // ... your other styles
});

export default StepScreen; 