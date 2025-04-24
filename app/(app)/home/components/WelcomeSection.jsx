import React, { useEffect } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../../../context/UserContext';

export default function WelcomeSection() {
  const { userData, fetchUserProfile } = useUser();

  useEffect(() => {
    fetchUserProfile();
  }, []);

  return (
    <View style={styles.welcome}>
      <Text style={styles.welcomeText}>
        Hello, <Text style={styles.userName}>{userData?.full_name || 'User'}</Text>
        <Text style={styles.waveEmoji}> 👋</Text>
      </Text>
      <Text style={styles.welcomeSubtext}>Hope you have a great day!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  welcome: {
    marginTop: 20,
  },
  welcomeText: {
    fontSize: 24,
    fontWeight: 'bold',
  },
  userName: {
    color: '#074799',
  },
  waveEmoji: {
    fontSize: 24,
  },
  welcomeSubtext: {
    color: '#666',
    marginTop: 4,
  },
}); 