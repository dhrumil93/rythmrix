import React from "react";
import { View, Text, StyleSheet } from "react-native";
import CustomInput from "./CustomInput";
import CustomButton from "./CustomButton";
import GenderSelector from "./GenderSelector";

export default function MemberForm({
  memberData,
  errors,
  onChangeData,
  onClearError,
  onSubmit,
}) {
  return (
    <View style={styles.formContainer}>
      <Text style={styles.sectionTitle}>Personal Information</Text>

      <CustomInput
        label="Full Name"
        required
        icon="person"
        placeholder="Enter full name"
        value={memberData.name}
        onChangeText={(text) => {
          onChangeData("name", text);
          if (errors.name) onClearError("name");
        }}
        error={errors.name}
      />

      <CustomInput
        label="Email Address"
        icon="email"
        placeholder="Enter email address"
        keyboardType="email-address"
        value={memberData.email}
        onChangeText={(text) => {
          onChangeData("email", text);
          if (errors.email) onClearError("email");
        }}
        error={errors.email}
      />

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <CustomInput
            label="Age"
            required
            icon="calendar-today"
            placeholder="Enter age"
            keyboardType="numeric"
            value={memberData.age}
            onChangeText={(text) => {
              onChangeData("age", text);
              if (errors.age) onClearError("age");
            }}
            error={errors.age}
          />
        </View>

        <View style={styles.halfWidth}>
          <GenderSelector
            label="Gender"
            required
            value={memberData.gender}
            onChange={(value) => {
              onChangeData("gender", value);
              if (errors.gender) onClearError("gender");
            }}
            error={errors.gender}
          />
        </View>
      </View>

      <View style={styles.row}>
        <View style={styles.halfWidth}>
          <CustomInput
            label="Weight"
            required
            icon="fitness-center"
            placeholder="In kg"
            keyboardType="numeric"
            value={memberData.weight}
            onChangeText={(text) => {
              onChangeData("weight", text);
              if (errors.weight) onClearError("weight");
            }}
            error={errors.weight}
          />
        </View>

        <View style={styles.halfWidth}>
          <CustomInput
            label="Height"
            required
            icon="height"
            placeholder="In cm"
            keyboardType="numeric"
            value={memberData.height}
            onChangeText={(text) => {
              onChangeData("height", text);
              if (errors.height) onClearError("height");
            }}
            error={errors.height}
          />
        </View>
      </View>

      <CustomButton
        title="Next"
        onPress={onSubmit}
        disabled={
          !memberData.name ||
          !memberData.age ||
          !memberData.gender ||
          !memberData.weight ||
          !memberData.height
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  formContainer: {
    width: "100%",
    gap: 16,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 4,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
});
