import React, { useState } from "react";
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter } from "expo-router";
import { useToast } from "../../../../context/ToastContext";
import MemberForm from "../../../../components/MemberForm";
import { MaterialIcons } from "@expo/vector-icons";
import { validateMemberData } from "../../../../utils/validation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../../../components/CustomInput';
import GenderSelector from '../../../../components/GenderSelector';

export default function AddMemberScreen() {
  const router = useRouter();
  const { showToast } = useToast();

  const [formData, setFormData] = useState({
    full_name: '',
    relation: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
  });

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        router.replace('/(auth)');
        return;
      }

      const response = await fetch('https://ecg-wv62.onrender.com/api/adduser/addMember', {
        method: 'POST',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: formData.full_name,
          relation: formData.relation,
          age: formData.age,
          gender: formData.gender,
          weight: formData.weight,
          height: formData.height,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      showToast('Member added successfully!', 'success');
      router.back();
    } catch (error) {
      showToast(error.message || 'Failed to add member', 'error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Add Family Member</Text>
      </View>

      <ScrollView style={styles.content}>
        <View style={styles.form}>
          <CustomInput
            label="Full Name"
            icon="person"
            value={formData.full_name}
            onChangeText={(text) => setFormData({ ...formData, full_name: text })}
            required
          />

          <CustomInput
            label="Relation"
            icon="people"
            value={formData.relation}
            onChangeText={(text) => setFormData({ ...formData, relation: text })}
            required
          />

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <CustomInput
                label="Age"
                icon="event"
                value={formData.age}
                onChangeText={(text) => setFormData({ ...formData, age: text })}
                keyboardType="numeric"
                suffix="yr(s)"
                required
              />
            </View>
            <View style={styles.halfInput}>
              <GenderSelector
                label="Gender"
                value={formData.gender}
                onChange={(value) => setFormData({ ...formData, gender: value })}
                required
              />
            </View>
          </View>

          <View style={styles.row}>
            <View style={styles.halfInput}>
              <CustomInput
                label="Weight"
                icon="fitness-center"
                value={formData.weight}
                onChangeText={(text) => setFormData({ ...formData, weight: text })}
                keyboardType="numeric"
                suffix="kg(s)"
                required
              />
            </View>
            <View style={styles.halfInput}>
              <CustomInput
                label="Height"
                icon="height"
                value={formData.height}
                onChangeText={(text) => setFormData({ ...formData, height: text })}
                keyboardType="numeric"
                suffix="cm(s)"
                required
              />
            </View>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.submitButton} onPress={handleSubmit}>
        <Text style={styles.submitButtonText}>Add Member</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight || 40,
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    padding: 12,
    backgroundColor: "#fff",
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#333",
  },
  form: {
    // Add appropriate styles for the form
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
  },
  halfInput: {
    width: '48%',
  },
  submitButton: {
    backgroundColor: '#074799',
    padding: 16,
    alignItems: 'center',
    borderRadius: 8,
    marginTop: 24,
  },
  submitButtonText: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#fff',
  },
});
