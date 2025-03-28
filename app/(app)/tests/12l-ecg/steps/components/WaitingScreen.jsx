import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import LoadingDots from '../../../../../components/shared/LoadingDots';

const WaitingScreen = ({ message = "Please wait" }) => {
  return (
    <View style={styles.container}>
      <Text style={styles.message}>{message}</Text>
      <LoadingDots />
      <Text style={styles.subText}>
        Please wait while we prepare the next lead placement
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 20,
  },
  message: {
    fontSize: 20,
    fontWeight: '600',
    color: '#333',
    marginBottom: 24,
    textAlign: 'center',
  },
  subText: {
    fontSize: 14,
    color: '#666',
    marginTop: 16,
    textAlign: 'center',
    maxWidth: '80%',
    lineHeight: 20,
  },
});

export default WaitingScreen; 