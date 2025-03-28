import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Image,
  StatusBar,
} from "react-native";
import React from "react";
import { Stack, useRouter } from "expo-router";

const ProductTestsScreen = () => {
  const router = useRouter();

  const handleBuyNow = () => {
    router.push("/tests/product-detail");
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stack.Screen
        options={{
          title: "Buy now",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: "400",
          },
          headerStyle: {
            backgroundColor: "#fff",
          },
          headerShadowVisible: false,
        }}
      />

      <View style={styles.content}>
        <Text style={styles.instructionText}>
          Please connect the RythmRix device
        </Text>

        <View style={styles.helpSection}>
          <Text style={styles.questionText}>Couldn't connect device?</Text>
          <TouchableOpacity>
            <Text style={styles.troubleshootLink}>Troubleshoot Now</Text>
          </TouchableOpacity>
        </View>

        <Text style={styles.orText}>OR</Text>

        <TouchableOpacity style={styles.buyButton} onPress={handleBuyNow}>
          <Text style={styles.buyButtonText}>Buy Now</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#FFFFFF",
  },

  content: {
    flex: 1,
    alignItems: "center",
    paddingHorizontal: 20,
    paddingTop: "50%",
  },
  instructionText: {
    textAlign: "center",
    fontSize: 18,
    lineHeight: 22,
    color: "#000000",
    marginBottom: 30,
  },
  helpSection: {
    alignItems: "center",
    marginBottom: 15,
  },
  questionText: {
    fontSize: 16,
    color: "#000000",
    marginBottom: 5,
  },
  troubleshootLink: {
    color: "#074799",
    fontSize: 16,
  },
  orText: {
    fontSize: 18,
    color: "#000000",
    marginVertical: 15,
  },
  buyButton: {
    backgroundColor: "#074799",
    paddingVertical: 8,
    paddingHorizontal: 20,
    borderRadius: 20,
    width: "90%",
  },
  buyButtonText: {
    color: "#FFFFFF",
    fontSize: 16,
    textAlign: "center",
    fontWeight: "400",
  },
});

export default ProductTestsScreen;
