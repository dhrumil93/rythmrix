import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';

const LeadButton = ({ label, isActive, disabled, onPress }) => (
  <TouchableOpacity 
    style={[
      styles.leadButton,
      isActive && styles.activeButton,
      disabled && styles.disabledButton
    ]}
    onPress={onPress}
    disabled={disabled}
  >
    <Text style={[
      styles.leadButtonText,
      isActive && styles.activeButtonText
    ]}>
      {label}
    </Text>
  </TouchableOpacity>
);

export const LeadButtons = ({ activeLead, onLeadPress, disabled }) => {
  const leads = ['V1', 'V2', 'V3', 'II', 'L'];

  return (
    <View style={styles.container}>
      {leads.map((lead) => (
        <LeadButton
          key={lead}
          label={lead}
          isActive={activeLead === lead}
          disabled={disabled}
          onPress={() => onLeadPress?.(lead)}
        />
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    paddingHorizontal: 16,
  },
  leadButton: {
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#E0E0E0',
    justifyContent: 'center',
    alignItems: 'center',
  },
  activeButton: {
    backgroundColor: '#00FF00',
  },
  disabledButton: {
    opacity: 0.8,
  },
  leadButtonText: {
    fontSize: 18,
    fontWeight: '500',
    color: '#000',
  },
  activeButtonText: {
    color: '#000',
  },
});

export default LeadButtons;