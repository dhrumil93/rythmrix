import React, { useState, useEffect, useRef } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Animated, Easing, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const LEADS = [
  { id: 'V1', label: 'V1' },
  { id: 'V2', label: 'V2' },
  { id: 'V3', label: 'V3' },
  { id: 'II', label: 'II' },
  { id: 'L', label: 'L' },
];

const { width: SCREEN_WIDTH } = Dimensions.get('window');

export default function ECGRecording({ activeLead = 'V1' }) {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(true);
  const [isSuccess, setIsSuccess] = useState(false);
  const spinValue = useRef(new Animated.Value(0)).current;
  const loadingOpacity = useRef(new Animated.Value(1)).current;
  const successScale = useRef(new Animated.Value(0)).current;
  const wavePosition = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    // Start ECG wave animation
    Animated.loop(
      Animated.sequence([
        Animated.timing(wavePosition, {
          toValue: -SCREEN_WIDTH,
          duration: 3000,
          easing: Easing.linear,
          useNativeDriver: true,
        }),
        Animated.timing(wavePosition, {
          toValue: 0,
          duration: 0,
          useNativeDriver: true,
        }),
      ])
    ).start();

    // Start spinning animation for loading indicator
    Animated.loop(
      Animated.timing(spinValue, {
        toValue: 1,
        duration: 2000,
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start();

    // Timer for recording state
    const timer = setTimeout(() => {
      // Fade out loading
      Animated.timing(loadingOpacity, {
        toValue: 0,
        duration: 300,
        useNativeDriver: true,
      }).start(() => {
        setIsRecording(false);
        setIsSuccess(true);
        // Scale up success icon
        Animated.spring(successScale, {
          toValue: 1,
          friction: 8,
          tension: 40,
          useNativeDriver: true,
        }).start();
      });
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  const spin = spinValue.interpolate({
    inputRange: [0, 1],
    outputRange: ['0deg', '360deg'],
  });

  const getLedColor = (leadId) => {
    if (leadId === activeLead) {
      return '#4CAF50';
    }
    return '#E0E0E0';
  };

  const handleNext = () => {
    switch(activeLead) {
      case 'V1':
        router.push('/(app)/tests/12l-ecg/v2');
        break;
      case 'V2':
        router.push('/(app)/tests/12l-ecg/v3');
        break;
      case 'V3':
        router.push('/(app)/tests/12l-ecg/ii');
        break;
      case 'II':
        router.push('/(app)/tests/12l-ecg/l');
        break;
      case 'L':
        router.push('/(app)/tests/12l-ecg/member-report');
        break;
      default:
        router.push('/(app)/tests/12l-ecg');
    }
  };

  return (
    <View style={styles.container}>
      <View style={styles.headerBackground}>
        <View style={styles.header}>
          <TouchableOpacity 
            style={styles.backButton}
            onPress={() => router.back()}
          >
            <MaterialIcons name="arrow-back" size={24} color="#000" />
          </TouchableOpacity>
          <Text style={styles.title}>ECG Report</Text>
        </View>
      </View>

      <View style={styles.leadsContainer}>
        {LEADS.map((lead) => (
          <View 
            key={lead.id}
            style={[styles.leadIndicator, { backgroundColor: getLedColor(lead.id) }]}
          >
            <Text style={[
              styles.leadText, 
              { color: lead.id === activeLead ? '#fff' : '#333' }
            ]}>
              {lead.label}
            </Text>
          </View>
        ))}
      </View>

      <View style={styles.ecgContainer}>
        <View style={styles.ecgBackground}>
          <View style={styles.gridContainer}>
            {Array(20).fill().map((_, i) => (
              <View key={i} style={styles.gridLine} />
            ))}
          </View>
          <Animated.Image
            source={require('../../../../assets/images/ecg-wave.png')}
            style={[
              styles.ecgWave,
              {
                transform: [{ translateX: wavePosition }],
              },
            ]}
            resizeMode="stretch"
          />
        </View>
      </View>

      <View style={styles.indicatorContainer}>
        {isRecording && (
          <Animated.View 
            style={[
              styles.loadingIndicator,
              {
                opacity: loadingOpacity,
                transform: [{ rotate: spin }]
              }
            ]}
          >
            <MaterialIcons name="loop" size={48} color="#4CAF50" />
          </Animated.View>
        )}
        
        {isSuccess && (
          <Animated.View 
            style={[
              styles.successIndicator,
              {
                transform: [{ scale: successScale }]
              }
            ]}
          >
            <View style={styles.checkCircle}>
              <MaterialIcons name="check" size={40} color="#4CAF50" />
            </View>
          </Animated.View>
        )}
      </View>

      {isSuccess && (
        <TouchableOpacity 
          style={styles.nextButton}
          onPress={handleNext}
        >
          <Text style={styles.nextButtonText}>Move to next</Text>
        </TouchableOpacity>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  headerBackground: {
    backgroundColor: '#003087',
    paddingTop: 40,
    paddingBottom: 20,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
  },
  backButton: {
    marginRight: 16,
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#fff',
    justifyContent: 'center',
    alignItems: 'center',
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#fff',
  },
  leadsContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    paddingVertical: 16,
    gap: 12,
    backgroundColor: '#f5f5f5',
  },
  leadIndicator: {
    width: 36,
    height: 36,
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  leadText: {
    fontSize: 14,
    fontWeight: '600',
  },
  ecgContainer: {
    flex: 1,
    paddingHorizontal: 16,
    paddingVertical: 24,
    justifyContent: 'center',
  },
  ecgBackground: {
    height: 200,
    backgroundColor: '#f8f8f8',
    borderRadius: 12,
    overflow: 'hidden',
  },
  gridContainer: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  gridLine: {
    width: 1,
    height: '100%',
    backgroundColor: '#e0e0e0',
  },
  ecgWave: {
    width: SCREEN_WIDTH * 2,
    height: '100%',
  },
  indicatorContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  loadingIndicator: {
    width: 60,
    height: 60,
    justifyContent: 'center',
    alignItems: 'center',
  },
  successIndicator: {
    alignItems: 'center',
  },
  checkCircle: {
    width: 60,
    height: 60,
    borderRadius: 30,
    borderWidth: 2,
    borderColor: '#4CAF50',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
  },
  nextButton: {
    backgroundColor: '#003087',
    margin: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 