import React from 'react';
import { SafeAreaView, StatusBar, StyleSheet } from 'react-native';
import ElectrodePlacement from '../components/ElectrodePlacement';

export default function ECGPlacementScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <ElectrodePlacement />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 40,
  },
}); 