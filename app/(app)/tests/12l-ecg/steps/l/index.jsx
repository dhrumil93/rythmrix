import React, { useState, useEffect } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, Animated, StatusBar } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import { LeadButtons } from '../../../../../components/ECGTest/LeadButtons';
import { Svg, Path } from 'react-native-svg';
import { AntDesign } from '@expo/vector-icons';

const lTestScreen = () => {
  const router = useRouter();
  const [isRecording, setIsRecording] = useState(false);
  const [progress] = useState(new Animated.Value(0));
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);

  useEffect(() => {
    if (isRecording) {
      // Start the recording animation
      Animated.timing(progress, {
        toValue: 1,
        duration: 5000, // 5 seconds recording
        useNativeDriver: true,
      }).start(() => {
        setIsRecordingComplete(true);
      });
    }
  }, [isRecording]);

  // SVG path for ECG wave
  const ecgPath = "M 0 50 L 10 50 L 15 10 L 20 90 L 25 50 L 35 50 L 40 50 L 45 10 L 50 90 L 55 50 L 65 50";

  const handleStartTest = () => {
    setIsRecording(true);
  };

  const handleMoveToNext = () => {
    router.push('/tests/12l-ecg/user-info');
  };

  return (
    <View style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <Stack.Screen
        options={{
          title: '12 Lead ECG Test',
          headerShown: true,
          headerBackTitle: '',
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
        }}
      />

      {/* Lead selection buttons - always visible */}
      <View style={styles.leadButtonsContainer}>
        <LeadButtons activeLead="l" disabled={isRecording} />
      </View>

      {!isRecording ? (
        // Initial Test Screen with Body Diagram
        <View style={styles.bodyContainer}>
          <View style={styles.bodyDiagram}>
            {/* Your existing body diagram code */}
            <Text style={[styles.sideLabel, styles.leftLabel]}>R</Text>
            <Text style={[styles.sideLabel, styles.rightLabel]}>L</Text>
            <View style={[styles.marker, styles.markerRA]}>
              <Text style={styles.markerText}>RA</Text>
            </View>
            <View style={[styles.marker, styles.markerLA]}>
              <Text style={styles.markerText}>LA</Text>
            </View>
            <View style={[styles.marker, styles.markerV1]}>
              <Text style={styles.markerText}>V1</Text>
            </View>
          </View>

          <TouchableOpacity 
            style={styles.startButton}
            onPress={handleStartTest}
          >
            <Text style={styles.buttonText}>Start Test</Text>
          </TouchableOpacity>
        </View>
      ) : (
        // Recording Screen
        <View style={styles.recordingContainer}>
          <View style={styles.ecgContainer}>
            <Svg width="100%" height="300" viewBox="0 0 400 100">
              <Animated.View
                style={{
                  transform: [{
                    translateX: progress.interpolate({
                      inputRange: [0, 1],
                      outputRange: [400, -100]
                    })
                  }]
                }}
              >
                {[0, 65, 130, 195, 260, 325].map((offset, index) => (
                  <Path
                    key={index}
                    d={ecgPath}
                    stroke="#003087"
                    strokeWidth="1.5"
                    fil="none"
                    transform={`translate(${offset}, 0)`}
                  />
                ))}
              </Animated.View>
            </Svg>
          </View>

          {isRecordingComplete && (
            <View style={styles.completeContainer}>
              <View style={styles.checkmarkCircle}>
                <AntDesign name="check" size={40} color="#4CAF50" />
              </View>
            </View>
          )}

          {isRecordingComplete && (
            <TouchableOpacity 
              style={styles.nextButton}
              onPress={handleMoveToNext}
            >
              <Text style={styles.buttonText}>Submit Test</Text>
            </TouchableOpacity>
          )}
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  leadButtonsContainer: {
    backgroundColor: '#F5F5F5',
    paddingVertical: 16,
  },
  bodyContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  bodyDiagram: {
    flex: 1,
    position: 'relative',
    alignItems: 'center',
    justifyContent: 'center',
  },
  sideLabel: {
    fontSize: 32,
    fontWeight: 'bold',
    position: 'absolute',
  },
  leftLabel: {
    left: 20,
  },
  rightLabel: {
    right: 20,
  },
  marker: {
    width: 40,
    height: 40,
    borderRadius: 20,
    backgroundColor: '#003087',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
  },
  markerText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  markerRA: {
    left: '30%',
    top: '30%',
  },
  markerLA: {
    right: '30%',
    top: '30%',
  },
  markerV1: {
    left: '48%',
    top: '45%',
  },
  recordingContainer: {
    flex: 1,
    justifyContent: 'space-between',
    paddingBottom: 16,
  },
  ecgContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  completeContainer: {
    position: 'absolute',
    top: '50%',
    left: '50%',
    transform: [{ translateX: -35 }, { translateY: -35 }],
  },
  checkmarkCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: '#fff',
    borderWidth: 2,
    borderColor: '#ccc',
    justifyContent: 'center',
    alignItems: 'center',
  },
  startButton: {
    backgroundColor: '#003087',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  nextButton: {
    backgroundColor: '#003087',
    marginHorizontal: 16,
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  buttonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});

export default lTestScreen;