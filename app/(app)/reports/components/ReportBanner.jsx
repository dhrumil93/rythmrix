import React from "react";
import { View, Text, Image, TouchableOpacity, StyleSheet } from "react-native";

export default function ReportBanner() {
  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Text style={styles.title}>Manual Report Review</Text>
        <Text style={styles.description}>
          Get your reports reviewed by our ECG Experts!
        </Text>
        <TouchableOpacity style={styles.learnMoreButton}>
          <Text style={styles.learnMore}>Learn more →</Text>
        </TouchableOpacity>
      </View>
      <Image
        source={require("../../../../assets/images/doctor.png")}
        style={styles.image}
      />
      <TouchableOpacity style={styles.closeButton}>
        <Text style={styles.closeText}>×</Text>
      </TouchableOpacity>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    backgroundColor: "#f0f4ff",
    borderRadius: 12,
    padding: 16,
    position: "relative",
  },
  content: {
    flex: 1,
    paddingRight: 12,
  },
  title: {
    fontSize: 18,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: "#666",
    marginBottom: 8,
  },
  learnMore: {
    color: "#074799",
    fontSize: 14,
  },
  image: {
    width: 80,
    height: 80,
  },
  closeButton: {
    position: "absolute",
    top: 8,
    right: 8,
    width: 24,
    height: 24,
    alignItems: "center",
    justifyContent: "center",
  },
  closeText: {
    fontSize: 24,
    color: "#666",
    fontWeight: "bold",
  },
});
