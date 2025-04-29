import React, { useState, useEffect } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import { MaterialIcons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const BASE_URL = "https://ecg-wv62.onrender.com";

export default function PrivacyPolicyScreen() {
  const router = useRouter();
  const [privacyPolicies, setPrivacyPolicies] = useState([]);

  useEffect(() => {
    fetchPrivacyPolicies();
  }, []);

  const fetchPrivacyPolicies = async () => {
    try {
      const token = await AsyncStorage.getItem("userToken");
      if (!token) {
        return;
      }

      const response = await fetch(
        `${BASE_URL}/api/user/privacypolicy/getAll`,
        {
          method: "GET",
          headers: {
            Authorization: `${token}`,
            "Content-Type": "application/json",
          },
        }
      );
     
      if (response.ok) {
        const data = await response.json();
        console.log("Response of Privacy:", data);
        // Debug logs to check data structure
        console.log("Privacy Policies before setting:", data.getprivacypolicy);
        setPrivacyPolicies(data.getprivacypolicy || []); // Use the correct key from API response
      }
    } catch (err) {
      console.error("Error fetching privacy policies:", err);
    }
  };

  // Debug log to check state updates
  console.log("Current privacyPolicies state:", privacyPolicies);

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.header}>
        <TouchableOpacity
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Privacy Policy</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.content}
      >
        <Text style={styles.lastUpdated}>Last updated: March 15, 2024</Text>

        {Array.isArray(privacyPolicies) && privacyPolicies.length > 0 ? (
          privacyPolicies.map((policy, index) => (
            <View key={policy._id || index} style={styles.section}>
              <Text style={styles.sectionTitle}>
                {index + 1}. {policy.title}
              </Text>
              <Text style={styles.text}>{policy.description}</Text>
            </View>
          ))
        ) : (
          <View style={styles.section}>
            <Text style={styles.text}>No privacy policy content available.</Text>
          </View>
        )}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#f5f5f5",
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 16,
    backgroundColor: "#fff",
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
  },
  content: {
    padding: 16,
  },
  lastUpdated: {
    fontSize: 14,
    color: "#666",
    marginBottom: 24,
  },
  section: {
    marginBottom: 24,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 12,
  },
  text: {
    fontSize: 16,
    color: "#666",
    lineHeight: 24,
  },
});
