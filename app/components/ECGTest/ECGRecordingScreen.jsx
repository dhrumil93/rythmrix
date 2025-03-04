import React, { useEffect, useState } from "react";
import {
  View,
  Text,
  TouchableOpacity,
  StyleSheet,
  Animated,
  StatusBar,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { LeadButtons } from "./LeadButtons";
import { Svg, Path } from "react-native-svg";
import { AntDesign } from "@expo/vector-icons";

const ECGRecordingScreen = ({ activeLead = "V1" }) => {
  const router = useRouter();
  const [progress] = useState(new Animated.Value(0));
  const [isRecordingComplete, setIsRecordingComplete] = useState(false);

  useEffect(() => {
    // Start the recording animation
    Animated.timing(progress, {
      toValue: 1,
      duration: 5000, // 5 seconds recording
      useNativeDriver: true,
    }).start(() => {
      setIsRecordingComplete(true);
    });
  }, []);

  // SVG path for ECG wave - more detailed pattern matching the image
  const ecgPath =
    "M 0 50 L 10 50 L 15 10 L 20 90 L 25 50 L 35 50 L 40 50 L 45 10 L 50 90 L 55 50 L 65 50";

  const handleMoveToNext = () => {
    // Navigate to next lead or complete screen
    const nextLead = {
      V1: "v2",
      V2: "v3",
      V3: "ll",
      LL: "l",
      L: "complete",
    }[activeLead];

    if (nextLead === "complete") {
      router.push("/tests/12l-ecg/user-info");
    } else {
      router.push(`/tests/12l-ecg/${nextLead}/recording`);
    }
  };

  return (
    <View style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />
      <Stack.Screen
        options={{
          title: "12 Lead ECG Test",
          headerShown: true,
          headerBackTitle: "",
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
        }}
      />
      {/* Lead selection buttons */}
      <View style={styles.leadButtonsContainer}>
        <LeadButtons activeLead={activeLead} disabled />
      </View>

      {/* ECG Recording Area */}
      <View style={styles.recordingContainer}>
        <Svg width="100%" height="300" viewBox="0 0 400 100">
          <Animated.View
            style={{
              transform: [
                {
                  translateX: progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [400, -100],
                  }),
                },
              ],
            }}
          >
            {/* Repeat the ECG pattern more times for continuous effect */}
            {[0, 65, 130, 195, 260, 325].map((offset, index) => (
              <Path
                key={index}
                d={ecgPath}
                stroke="#003087"
                strokeWidth="1.5"
                fill="none"
                transform={`translate(${offset}, 0)`}
              />
            ))}
          </Animated.View>
        </Svg>
      </View>

      {/* Recording Complete Indicator */}
      {isRecordingComplete && (
        <View style={styles.completeContainer}>
          <View style={styles.checkmarkCircle}>
            <AntDesign name="check" size={40} color="#4CAF50" />
          </View>
        </View>
      )}

      {/* Move to Next Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity
          style={[
            styles.nextButton,
            !isRecordingComplete && styles.disabledButton,
          ]}
          onPress={handleMoveToNext}
          disabled={!isRecordingComplete}
        >
          <Text style={styles.nextButtonText}>Move to next</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#F5F5F5",
  },
  leadButtonsContainer: {
    backgroundColor: "#F5F5F5",
    paddingVertical: 16,
  },
  recordingContainer: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#F5F5F5",
    paddingHorizontal: 20,
  },
  completeContainer: {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: [{ translateX: -35 }, { translateY: -35 }],
  },
  checkmarkCircle: {
    width: 70,
    height: 70,
    borderRadius: 35,
    backgroundColor: "#fff",
    borderWidth: 2,
    borderColor: "#ccc",
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  buttonContainer: {
    padding: 16,
    backgroundColor: "#F5F5F5",
  },
  nextButton: {
    backgroundColor: "#003087",
    paddingVertical: 16,
    borderRadius: 8,
    alignItems: "center",
  },
  disabledButton: {
    opacity: 0.7,
  },
  nextButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});

export default ECGRecordingScreen;
