import React, { useState, useEffect } from 'react';
import {
  ScrollView,
  SafeAreaView,
  StatusBar,
  StyleSheet,
  View,
  TouchableOpacity,
  Text,
} from "react-native";
import { useRouter, useLocalSearchParams } from "expo-router";
import { useToast } from "../../../../context/ToastContext";
import MemberForm from "../../../../components/MemberForm";
import { MaterialIcons } from "@expo/vector-icons";
import { validateMemberData } from "../../../../utils/validation";
import AsyncStorage from '@react-native-async-storage/async-storage';
import CustomInput from '../../../../components/CustomInput';
import GenderSelector from '../../../../components/GenderSelector';

export default function EditMemberScreen() {
  const router = useRouter();
  const { id } = useLocalSearchParams();
  const { showToast } = useToast();

  const [memberData, setMemberData] = useState({
    full_name: '',
    relation: '',
    age: '',
    gender: '',
    weight: '',
    height: '',
  });
console.log("memberData ::", memberData);

  const [errors, setErrors] = useState({
    full_name: "",
    relation: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
  });

  useEffect(() => {
    fetchMemberDetails();
  }, [id]);

  const fetchMemberDetails = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        router.replace('/(auth)');
        return;
      }

      // You'll need to implement an API endpoint to get single member details
      // For now, we'll use the data from the list
      const response = await fetch(`https://ecg-s6x7.onrender.com/api/adduser/getall-family-members`, {
        headers: {
          'Authorization': `${token}`,
        },
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      const member = data.data.find(m => m._id === id);
      if (member) {
        setMemberData({
          full_name: member.full_name,
          relation: member.relation,
          age: member.age.toString(),
          gender: member.gender,
          weight: member.weight.toString(),
          height: member.height.toString(),
        });
      }
    } catch (error) {
      showToast(error.message || 'Failed to fetch member details', 'error');
    }
  };

  const handleChangeData = (field, value) => {
    setMemberData((prev) => ({
      ...prev,
      [field]: value,
    }));
  };

  const handleClearError = (field) => {
    setErrors((prev) => ({
      ...prev,
      [field]: "",
    }));
  };

  const handleSubmit = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        router.replace('/(auth)');
        return;
      }

      const response = await fetch(`https://ecg-s6x7.onrender.com/api/adduser/family-member-update/${id}`, {
        method: 'PUT',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          full_name: memberData.full_name,
          relation: memberData.relation,
          age: memberData.age,
          gender: memberData.gender,
          weight: memberData.weight,
          height: memberData.height,
        }),
      });

      const data = await response.json();
      if (!response.ok) throw new Error(data.message);

      showToast('Member updated successfully!', 'success');
      router.back();
    } catch (error) {
      showToast(error.message || 'Failed to update member', 'error');
    }
  };

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
        <Text style={styles.title}>Edit Member</Text>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <MemberForm
          memberData={memberData}
          errors={errors}
          onChangeData={handleChangeData}
          onClearError={handleClearError}
          onSubmit={handleSubmit}
        />
      </ScrollView>
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
});
