import React, { useEffect } from 'react';
import { View, Text, StyleSheet, Animated, Dimensions } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const { width } = Dimensions.get('window');

const getIconName = (type) => {
  switch (type) {
    case 'success':
      return 'check-circle';
    case 'error':
      return 'error';
    case 'info':
      return 'info';
    default:
      return 'info';
  }
};

const getBackgroundColor = (type) => {
  switch (type) {
    case 'success':
      return '#4caf50';
    case 'error':
      return '#f44336';
    case 'info':
      return '#2196f3';
    default:
      return '#2196f3';
  }
};

export default function Toast({ message, type = 'info', onHide }) {
  const translateY = new Animated.Value(-100);

  useEffect(() => {
    // Slide in
    Animated.spring(translateY, {
      toValue: 0,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    }).start();

    // Auto hide after 3 seconds
    const timer = setTimeout(() => {
      Animated.timing(translateY, {
        toValue: -100,
        duration: 300,
        useNativeDriver: true,
      }).start(() => onHide());
    }, 3000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <Animated.View 
      style={[
        styles.container, 
        { transform: [{ translateY }], backgroundColor: getBackgroundColor(type) }
      ]}
    >
      <MaterialIcons name={getIconName(type)} size={24} color="#fff" />
      <Text style={styles.message}>{message}</Text>
    </Animated.View>
  );
}

const styles = StyleSheet.create({
  container: {
    position: 'absolute',
    top: 0,
    left: 0,
    right: 0,
    zIndex: 999,
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    paddingTop: 40,
    backgroundColor: '#333',
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },
  message: {
    color: '#fff',
    fontSize: 16,
    marginLeft: 12,
    fontWeight: '500',
  },
}); 