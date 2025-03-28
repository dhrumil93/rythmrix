import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ScrollView,
  StatusBar,
} from "react-native";
import { Stack, useRouter } from "expo-router";
import { AntDesign } from "@expo/vector-icons";
import { Picker } from '@react-native-picker/picker';

const UserInfoScreen = () => {
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    age: "",
    gender: "Female",
    weight: "",
    height: "",
  });

  const handleInputChange = (field, value) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const handleSubmit = () => {
    router.push({
      pathname: "/tests/12l-ecg/report",
      params: {
        ...formData,
        date: new Date().toLocaleString(),
      }
    });
  };

  return (
    <View style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <Stack.Screen
        options={{
          title: "Enter details for the user",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: '400',
          },
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.scrollView}>
        <View style={styles.formContainer}>
          {/* Name Input */}
          <View style={styles.inputGroup}>
            <Text style={styles.label}>
              Full Name <Text style={styles.required}>*</Text>
            </Text>
            <TextInput
              style={styles.input}
              placeholder="Eg. Rekha"
              placeholderTextColor="#999"
              value={formData.name}
              onChangeText={(text) => handleInputChange("name", text)}
            />
          </View>

          {/* Age and Gender Row */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>
                Age <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Eg. 28"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={formData.age}
                onChangeText={(text) => handleInputChange("age", text)}
              />
            </View>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>
                Gender <Text style={styles.required}>*</Text>
              </Text>
              <View style={styles.pickerContainer}>
                <Picker
                  selectedValue={formData.gender}
                  onValueChange={(value) => handleInputChange("gender", value)}
                  style={styles.picker}
                >
                  <Picker.Item label="Female" value="Female" />
                  <Picker.Item label="Male" value="Male" />
                  <Picker.Item label="Other" value="Other" />
                </Picker>
              </View>
            </View>
          </View>

          {/* Weight and Height Row */}
          <View style={styles.row}>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>
                Weight <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Eg. 98"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={formData.weight}
                onChangeText={(text) => handleInputChange("weight", text)}
              />
            </View>
            <View style={[styles.inputGroup, styles.halfWidth]}>
              <Text style={styles.label}>
                Height <Text style={styles.required}>*</Text>
              </Text>
              <TextInput
                style={styles.input}
                placeholder="Eg. 175"
                placeholderTextColor="#999"
                keyboardType="numeric"
                value={formData.height}
                onChangeText={(text) => handleInputChange("height", text)}
              />
            </View>
          </View>
        </View>
      </ScrollView>

      {/* Continue Button */}
      <View style={styles.buttonContainer}>
        <TouchableOpacity style={styles.continueButton} onPress={handleSubmit}>
          <Text style={styles.continueButtonText}>CONTINUE</Text>
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
  scrollView: {
    flex: 1,
  },
  formContainer: {
    padding: 20,
  },
  inputGroup: {
    marginBottom: 20,
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginBottom: 20,
  },
  halfWidth: {
    width: "48%",
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
    fontWeight: "400",
  },
  required: {
    color: "red",
  },
  input: {
    backgroundColor: "#fff",
    borderRadius: 4,
    paddingHorizontal: 12,
    paddingVertical: 10,
    fontSize: 14,
    color: "#333",
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  selectText: {
    color: '#999',
    fontSize: 14,
  },
  buttonContainer: {
    padding: 20,
    paddingBottom: 30,
  },
  continueButton: {
    backgroundColor: "#003087",
    paddingVertical: 16,
    borderRadius: 25,
    alignItems: "center",
  },
  continueButtonText: {
    color: "#fff",
    fontSize: 14,
    fontWeight: "600",
    letterSpacing: 1,
  },
  pickerContainer: {
    backgroundColor: '#fff',
    borderRadius: 4,
    overflow: 'hidden',
  },
  picker: {
    height: 40,
    backgroundColor: '#fff',
  },
});

export default UserInfoScreen;
