import React, { useState } from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, Animated } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

// Using DiceBear API for avatars
// You can change the style by using different collections: 
// avataaars, bottts, initials, pixel-art, etc.
const getAvatarUrl = (username) => {
  const collections = [
    'avataaars',
    'bottts',
    'pixel-art',
    'lorelei',
    'micah',
    'adventurer'
  ];
  const collection = collections[0]; // Using avataaars style
  return `https://api.dicebear.com/7.x/${collection}/png?seed=${username}&backgroundColor=b6e3f4`;
};

export default function UserHeader({ username = 'rekha' }) {
  const [isGuestMode, setIsGuestMode] = useState(false);
  const slideAnim = useState(new Animated.Value(0))[0];

  const toggleGuestMode = () => {
    setIsGuestMode(!isGuestMode);
    Animated.spring(slideAnim, {
      toValue: isGuestMode ? 0 : 1,
      useNativeDriver: true,
      speed: 12,
      bounciness: 8,
    }).start();
  };

  return (
    <View style={styles.userSection}>
      <View style={styles.userInfo}>
        <Image 
          source={{ uri: getAvatarUrl(username) }}
          style={styles.avatar}
          defaultSource={require('../../../../assets/images/default-avatar.png')}
        />
        <TouchableOpacity style={styles.profileButton}>
          <MaterialIcons name="person" size={24} color="#666" />
        </TouchableOpacity>
      </View>

      <View style={styles.guestModeWrapper}>
        <View style={styles.guestModeContainer}>
          <TouchableOpacity 
            style={styles.guestModeTab}
            onPress={() => isGuestMode && toggleGuestMode()}
          >
            <Text style={styles.guestModeText}>OFF</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={styles.guestModeTab}
            onPress={() => !isGuestMode && toggleGuestMode()}
          >
            <Text style={styles.guestModeText}>GUEST MODE</Text>
          </TouchableOpacity>
          <Animated.View 
            style={[
              styles.slider,
              {
                transform: [{
                  translateX: slideAnim.interpolate({
                    inputRange: [0, 1],
                    outputRange: [0, 75]
                  })
                }]
              }
            ]}
          />
        </View>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  userSection: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  userInfo: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  avatar: {
    width: 24,
    height: 24,
    borderRadius: 20,
    backgroundColor: '#f5f5f5',
  },
  profileButton: {
    marginLeft: 10,
  },
  guestModeWrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 20,
    padding: 2,
  },
  guestModeContainer: {
    flexDirection: 'row',
    position: 'relative',
    width: 150,
    height: 26,
  },
  guestModeTab: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 1,
  },
  guestModeText: {
    fontSize: 9,
    color: ({ isActive }) => isActive ? '#fff' : '#074799',
    fontWeight: '500',
  },
  slider: {
    position: 'absolute',
    top: 0,
    left: 0,
    width: '50%',
    height: '100%',
    backgroundColor: '#074799',
    borderRadius: 20,
    zIndex: 0,
  },
}); 