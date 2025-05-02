import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { useUser } from '../../../context/UserContext';
import AsyncStorage from '@react-native-async-storage/async-storage';

export default function WelcomeSection() {
  const { userData, fetchUserProfile } = useUser();
  const [activeUser, setActiveUser] = useState(null);

  useEffect(() => {
    fetchUserProfile();
    loadActiveUser();
  }, []);

  const loadActiveUser = async () => {
    try {
      const activeUserData = await AsyncStorage.getItem('activeUser');
      if (activeUserData) {
        setActiveUser(JSON.parse(activeUserData));
      }
    } catch (error) {
      console.error('Error loading active user:', error);
    }
  };

  // Add listener for active user changes
  useEffect(() => {
    const checkActiveUserInterval = setInterval(loadActiveUser, 1000);
    return () => clearInterval(checkActiveUserInterval);
  }, []);

  return (
    <View style={styles.welcome}>
      <Text style={styles.welcomeText}>
        Hello, <Text style={styles.userName}>{activeUser?.full_name || userData?.full_name || 'User'}</Text>
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