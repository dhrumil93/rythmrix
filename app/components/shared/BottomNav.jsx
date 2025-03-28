import React from 'react';
import { View, Text, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, usePathname } from 'expo-router';

const NAV_ITEMS = [
  { name: 'home', icon: 'home', label: 'Home', route: '/' },
  { name: 'reports', icon: 'description', label: 'Reports', route: '/reports' },
  { name: 'activity', icon: 'article', label: 'Activities', route: '/activities' },
  { name: 'settings', icon: 'settings', label: 'Settings', route: '/settings' },
];

export default function BottomNav() {
  const router = useRouter();
  const pathname = usePathname();

  const isRouteActive = (route) => {
    if (route === "/") {
      return pathname === "/" || pathname === "/home";
    }
    return pathname.startsWith(route);
  };
  

  return (
    <View style={styles.container}>
      {NAV_ITEMS.map((item) => {
        const isActive = isRouteActive(item.route);
        return (
          <TouchableOpacity
            key={item.name}
            style={[styles.navItem, isActive && styles.activeNavItem]}
            onPress={() => router.push(item.route)}
          >
            <MaterialIcons
              name={item.icon}
              size={24}
              color={isActive ? '#074799' : '#666'}
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
  container: {
    flexDirection: 'row',
    borderTopWidth: 1,
    borderTopColor: '#eee',
    backgroundColor: '#fff',
    paddingVertical: 2,
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    elevation: 8,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -2 },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  navItem: {
    flex: 1,
    alignItems: 'center',
    paddingVertical: 10,
  },
  activeNavItem: {
    backgroundColor: '#f0f4ff',
    borderRadius: 6,
  },
  navText: {
    fontSize: 11,
    color: '#666',
    marginTop: 2,
  },
  activeNavText: {
    color: '#074799',
    fontWeight: '500',
  },
});
