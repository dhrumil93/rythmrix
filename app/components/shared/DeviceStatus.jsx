import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DeviceStatus = () => {
  return (
    <View style={styles.container}>
      <View style={styles.statusBarSpace} />
      <View style={styles.content}>
        <View style={styles.deviceStatus}>
          <View style={styles.iconContainer}>
            <MaterialIcons name="bluetooth" size={20} color="#fff" />
          </View>
          <Text style={styles.deviceText}>Device Not Connected</Text>
        </View>
        <TouchableOpacity>
          <Text style={styles.connectLink}>How to Connect</Text>
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    backgroundColor: '#074799',
    width: '100%',
  },
  statusBarSpace: {
    height: StatusBar.currentHeight || 40,
  },
  content: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
    paddingHorizontal: 20,
  },
  deviceStatus: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  iconContainer: {
    marginRight: 8,
  },
  deviceText: {
    color: '#fff',
    fontSize: 12,
    fontWeight: '500',
  },
  connectLink: {
    color: '#fff',
    textDecorationLine: 'underline',
    fontSize: 12,
    fontWeight: '500',
  },
});

export default DeviceStatus; 