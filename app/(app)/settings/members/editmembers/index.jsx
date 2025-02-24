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

export default function AddMemberScreen() {
  const router = useRouter();
  const { showToast } = useToast();

  const [memberData, setMemberData] = useState({
    name: "",
    relation: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
  });

  const [errors, setErrors] = useState({
    name: "",
    relation: "",
    age: "",
    gender: "",
    weight: "",
    height: "",
  });

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

  const handleAddMember = () => {
    const { isValid, errors: validationErrors } =
      validateMemberData(memberData);

    if (isValid) {
      // Add member logic here
      showToast("Member updated successfully!", "success");
      router.back();
    } else {
      setErrors(validationErrors);
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
          onSubmit={handleAddMember}
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
