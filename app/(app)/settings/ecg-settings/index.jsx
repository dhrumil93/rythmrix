import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

export default function ECGSettingsScreen() {
  const router = useRouter();
  const [autoStart, setAutoStart] = useState(false);
  const [switchPosition, setSwitchPosition] = useState(false);
  const [interpretation, setInterpretation] = useState(false);
  const [startDuration, setStartDuration] = useState(1);
  const [switchDuration, setSwitchDuration] = useState(5);

  const handleIncrement = (setter, value, max = 10) => {
    setter(prev => Math.min(prev + 1, max));
  };

  const handleDecrement = (setter, value, min = 1) => {
    setter(prev => Math.max(prev - 1, min));
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>ECG Settings</Text>
      </View>

      <ScrollView style={styles.content}>
        {/* Auto Start Section */}
        <Text style={styles.sectionTitle}>Auto Start</Text>
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Auto Start Test</Text>
            <TouchableOpacity
              style={[styles.toggle, autoStart && styles.toggleActive]}
              onPress={() => setAutoStart(!autoStart)}
            >
              <View style={[styles.toggleHandle, autoStart && styles.toggleHandleActive]} />
            </TouchableOpacity>
          </View>

          <View style={styles.durationRow}>
            <MaterialIcons name="timer" size={24} color="#666" />
            <Text style={styles.durationLabel}>Start Duration</Text>
            <View style={styles.durationControls}>
              <TouchableOpacity onPress={() => handleDecrement(setStartDuration)} style={styles.durationButton}>
                <MaterialIcons name="remove" size={24} color="#074799" />
              </TouchableOpacity>
              <Text style={styles.durationValue}>{startDuration} sec</Text>
              <TouchableOpacity onPress={() => handleIncrement(setStartDuration)} style={styles.durationButton}>
                <MaterialIcons name="add" size={24} color="#074799" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* Auto Switch Position */}
        <Text style={styles.sectionTitle}>Auto Switch Position</Text>
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Switch Lead Position</Text>
            <TouchableOpacity
              style={[styles.toggle, switchPosition && styles.toggleActive]}
              onPress={() => setSwitchPosition(!switchPosition)}
            >
              <View style={[styles.toggleHandle, switchPosition && styles.toggleHandleActive]} />
            </TouchableOpacity>
          </View>

          <View style={styles.durationRow}>
            <MaterialIcons name="timer" size={24} color="#666" />
            <Text style={styles.durationLabel}>Switch Duration</Text>
            <View style={styles.durationControls}>
              <TouchableOpacity onPress={() => handleDecrement(setSwitchDuration)} style={styles.durationButton}>
                <MaterialIcons name="remove" size={24} color="#074799" />
              </TouchableOpacity>
              <Text style={styles.durationValue}>{switchDuration} sec</Text>
              <TouchableOpacity onPress={() => handleIncrement(setSwitchDuration)} style={styles.durationButton}>
                <MaterialIcons name="add" size={24} color="#074799" />
              </TouchableOpacity>
            </View>
          </View>
        </View>

        {/* ECG Interpretation */}
        <Text style={styles.sectionTitle}>ECG Interpretation</Text>
        <View style={styles.settingCard}>
          <View style={styles.settingRow}>
            <Text style={styles.settingLabel}>Switch Lead Position</Text>
            <TouchableOpacity
              style={[styles.toggle, interpretation && styles.toggleActive]}
              onPress={() => setInterpretation(!interpretation)}
            >
              <View style={[styles.toggleHandle, interpretation && styles.toggleHandleActive]} />
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  settingCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 24,
  },
  settingRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 16,
  },
  settingLabel: {
    fontSize: 16,
    color: '#333',
  },
  toggle: {
    width: 50,
    height: 30,
    backgroundColor: '#ddd',
    borderRadius: 15,
    padding: 2,
  },
  toggleActive: {
    backgroundColor: '#074799',
  },
  toggleHandle: {
    width: 26,
    height: 26,
    backgroundColor: '#fff',
    borderRadius: 13,
  },
  toggleHandleActive: {
    transform: [{ translateX: 20 }],
  },
  durationRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginTop: 8,
  },
  durationLabel: {
    fontSize: 16,
    color: '#666',
    marginLeft: 8,
    flex: 1,
  },
  durationControls: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  durationButton: {
    width: 36,
    height: 36,
    backgroundColor: '#f5f5f5',
    borderRadius: 18,
    justifyContent: 'center',
    alignItems: 'center',
  },
  durationValue: {
    fontSize: 16,
    color: '#333',
    marginHorizontal: 16,
  },
  saveButton: {
    backgroundColor: '#074799',
    margin: 16,
    padding: 16,
    borderRadius: 12,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 