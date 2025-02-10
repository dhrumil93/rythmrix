import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const NAV_ITEMS = [
  { name: 'home', icon: 'home', label: 'Home' },
  { name: 'reports', icon: 'description', label: 'Reports' },
  { name: 'articles', icon: 'article', label: 'Articles' },
  { name: 'settings', icon: 'settings', label: 'Settings' },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  return (
    <View style={styles.bottomNav}>
      {NAV_ITEMS.map((item) => {
        const isActive = pathname === `/(app)/${item.name}`;
        return (
          <TouchableOpacity 
            key={item.name}
            style={[styles.navItem, isActive && styles.activeNavItem]}
            onPress={() => router.push(`/(app)/${item.name}`)}
          >
            <MaterialIcons 
              name={item.icon} 
              size={24} 
              color={isActive ? '#6178BC' : '#666'} 
            />
            <Text style={[styles.navText, isActive && styles.activeNavText]}>
              {item.label}
            </Text>
          </TouchableOpacity>
        );
      })}
    </View>
  );
}

const styles = StyleSheet.create({
  bottomNav: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    paddingVertical: 8,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    padding: 8,
  },
  activeNavItem: {
    backgroundColor: '#f0f4ff',
    borderRadius: 8,
  },
  navText: {
    fontSize: 12,
    color: '#666',
    marginTop: 4,
  },
  activeNavText: {
    color: '#6178BC',
  },
}); 