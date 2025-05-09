import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { Picker } from "@react-native-picker/picker";
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
        value={memberData.full_name}
        onChangeText={(text) => {
          onChangeData("full_name", text);
          if (errors.name) onClearError("name");
        }}
        error={errors.name}
      />

      <CustomInput
        label="Email Address"
        icon="email"
        placeholder="Enter email address"
        value={memberData.email}
        onChangeText={(text) => {
          onChangeData("email", text);
          if (errors.email) onClearError("email");
        }}
        error={errors.email}
        keyboardType="email-address"
        autoCapitalize="none"
      />

      <View style={styles.formGroup}>
        <Text style={styles.label}>Relation</Text>
        <View
          style={[styles.pickerContainer, errors.relation && styles.errorInput]}
        >
          <Picker
            selectedValue={memberData.relation}
            onValueChange={(value) => {
              onChangeData("relation", value);
              if (errors.relation) onClearError("relation");
            }}
          >
            <Picker.Item label="Select relation" value="" />
            <Picker.Item label="Father" value="Father" />
            <Picker.Item label="Mother" value="Mother" />
            <Picker.Item label="Sibling" value="Sibling" />
            <Picker.Item label="Spouse" value="Spouse" />
          </Picker>
        </View>
        {errors.relation && (
          <Text style={styles.errorText}>{errors.relation}</Text>
        )}
      </View>

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
        style={styles.submitButton}
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
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 24,
  },
  row: {
    flexDirection: "row",
    gap: 16,
  },
  halfWidth: {
    flex: 1,
  },
  formGroup: {
    marginBottom: 16,
  },
  label: {
    fontSize: 14,
    color: "#333",
    marginBottom: 8,
  },
  pickerContainer: {
    borderWidth: 1,
    borderColor: "#ccc",
    borderRadius: 8,
    padding: 0,
  },
  errorInput: {
    borderColor: "#ff3b30",
  },
  errorText: {
    color: "#ff3b30",
    marginTop: 4,
  },
  submitButton: {
    marginTop: 24,
    borderRadius: 30,
  },
});
