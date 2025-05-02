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
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function AddMemberScreen() {
  const router = useRouter();
  const { showToast } = useToast();

  const [memberData, setMemberData] = useState({
    full_name: '',
    email: '',
    relation: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
  });

  const [errors, setErrors] = useState({
    full_name: '',
    email: '',
    relation: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
  });

  const handleChangeData = (field, value) => {
    setMemberData(prev => ({
      ...prev,
      [field]: value
    }));
  };

  const handleClearError = (field) => {
    setErrors(prev => ({
      ...prev,
      [field]: ''
    }));
  };

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
        body: JSON.stringify(memberData),
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
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Add New Member</Text>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.formContainer}>
          <MemberForm
            memberData={memberData}
            errors={errors}
            onChangeData={handleChangeData}
            onClearError={handleClearError}
            onSubmit={handleSubmit}
          />
        </View>
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
    borderBottomWidth: 1,
    borderBottomColor: "#f0f0f0",
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
    paddingBottom: 2,
  },
  scrollContent: {
    flexGrow: 1,
    padding: 16,
  },
  formContainer: {
    flex: 1,
  },
});
