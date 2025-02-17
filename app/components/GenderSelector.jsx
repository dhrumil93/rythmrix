import React, { useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const GENDER_OPTIONS = ['Male', 'Female', 'Other'];

export default function GenderSelector({ label, required, value, onChange, error }) {
  const [modalVisible, setModalVisible] = useState(false);

  return (
    <View style={styles.container}>
      <View style={styles.labelContainer}>
        <Text style={styles.label}>{label}</Text>
        {required && <Text style={styles.required}>*</Text>}
      </View>

      <TouchableOpacity 
        style={[
          styles.selector,
          error ? styles.errorBorder : null
        ]}
        onPress={() => setModalVisible(true)}
      >
        <Text style={[
          styles.value,
          !value && styles.placeholder
        ]}>
          {value || 'Select gender'}
        </Text>
        <MaterialIcons name="arrow-drop-down" size={24} color="#666" />
      </TouchableOpacity>

      {error && <Text style={styles.errorText}>{error}</Text>}

      <Modal
        visible={modalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setModalVisible(false)}
      >
        <TouchableOpacity 
          style={styles.modalOverlay}
          activeOpacity={1}
          onPress={() => setModalVisible(false)}
        >
          <View style={styles.modalContent}>
            {GENDER_OPTIONS.map((option) => (
              <TouchableOpacity
                key={option}
                style={styles.option}
                onPress={() => {
                  onChange(option);
                  setModalVisible(false);
                }}
              >
                <Text style={[
                  styles.optionText,
                  value === option && styles.selectedOption
                ]}>
                  {option}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
        </TouchableOpacity>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  labelContainer: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  label: {
    fontSize: 16,
    color: '#333',
    marginRight: 4,
  },
  required: {
    color: '#ff3b30',
    fontSize: 16,
  },
  selector: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderWidth: 1,
    borderColor: '#ddd',
    borderRadius: 8,
    paddingHorizontal: 12,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  errorBorder: {
    borderColor: '#ff3b30',
  },
  value: {
    fontSize: 16,
    color: '#333',
  },
  placeholder: {
    color: '#999',
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 12,
    marginTop: 4,
  },
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modalContent: {
    backgroundColor: '#fff',
    borderRadius: 12,
    width: '80%',
    padding: 16,
  },
  option: {
    paddingVertical: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  optionText: {
    fontSize: 16,
    color: '#333',
    textAlign: 'center',
  },
  selectedOption: {
    color: '#074799',
    fontWeight: 'bold',
  },
}); 