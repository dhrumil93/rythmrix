import React from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

export default function CustomInput({ 
  label, 
  icon, 
  placeholder, 
  isPassword, 
  showPassword, 
  togglePassword,
  keyboardType = 'default',
  error,
  isPhoneNumber,
  ...props 
}) {
  return (
    <View style={styles.inputGroup}>
      <Text style={styles.label}>{label}</Text>
      <View style={[styles.inputField, error && styles.inputFieldError]}>
        <MaterialIcons name={icon} size={24} color="#666" />
        <TextInput
          placeholder={placeholder}
          style={styles.input}
          placeholderTextColor="#999"
          secureTextEntry={isPassword && !showPassword}
          keyboardType={keyboardType}
          maxLength={isPhoneNumber ? 10 : undefined}
          {...props}
        />
        {isPassword && (
          <TouchableOpacity onPress={togglePassword}>
            <MaterialIcons 
              name={showPassword ? "visibility" : "visibility-off"} 
              size={24} 
              color="#666" 
            />
          </TouchableOpacity>
        )}
      </View>
      {error && <Text style={styles.errorText}>{error}</Text>}
    </View>
  );
}

const styles = StyleSheet.create({
  inputGroup: {
    width: '100%',
    marginBottom: 20,
  },
  label: {
    marginBottom: 8,
    color: '#333',
    fontSize: 16,
    fontWeight: '500',
  },
  inputField: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 50,
    paddingHorizontal: 16,
    paddingVertical: 10,
    backgroundColor: '#fff',
  },
  inputFieldError: {
    borderColor: '#ff3b30',
  },
  input: {
    flex: 1,
    marginLeft: 12,
    fontSize: 16,
    color: '#333',
    paddingVertical: 2,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
  focusedInput: {
    borderColor: '#074799',
  },
  focusedLabel: {
    color: '#074799',
  },
}); 