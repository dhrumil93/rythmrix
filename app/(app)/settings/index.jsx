import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import BottomNav from '../../components/shared/BottomNav';

const MENU_ITEMS = {
  profile: {
    title: 'Profile',
    items: [
      {
        id: 'plan',
        title: 'Basic Plan',
        subtitle: 'You are currently in the',
        type: 'plan',
        showArrow: true,
        highlight: true
      }
    ]
  },
  general: {
    title: 'General',
    items: [
      { id: 'members', title: 'Added Members', showArrow: true },
      { id: 'language', title: 'Change Language', showArrow: true },
      { id: 'subscription', title: 'Subscription History', showArrow: true },
      { id: 'support', title: 'Help & Support', showArrow: true }
    ]
  },
  appSettings: {
    title: 'App Settings',
    items: [
      { id: 'ui', title: 'UI Mode', showArrow: true },
      { id: 'ecg', title: 'ECG Settings', showArrow: true }
    ]
  },
  about: {
    title: 'About',
    items: [
      { id: 'version', title: 'App Version', value: '4.3.4' },
      { id: 'privacy', title: 'Privacy Policy', showArrow: true },
      { id: 'terms', title: 'Terms & Conditions', showArrow: true }
    ]
  },
};

export default function SettingsScreen() {
  const renderMenuItem = (item) => {
    if (item.type === 'plan') {
      return (
        <TouchableOpacity 
          key={item.id}
          style={[styles.menuItem, styles.planItem]}
        >
          <View>
            <Text style={styles.planSubtitle}>{item.subtitle}</Text>
            <Text style={styles.planTitle}>{item.title}</Text>
          </View>
          <MaterialIcons name="chevron-right" size={24} color="#333" />
        </TouchableOpacity>
      );
    }

    return (
      <TouchableOpacity 
        key={item.id}
        style={styles.menuItem}
      >
        <Text style={styles.menuItemText}>{item.title}</Text>
        {item.value ? (
          <Text style={styles.menuItemValue}>{item.value}</Text>
        ) : item.showArrow && (
          <MaterialIcons name="chevron-right" size={24} color="#666" />
        )}
      </TouchableOpacity>
    );
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>Settings</Text>
      </View>

      <View style={styles.profileSection}>
        <Image 
          source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=rekha' }}
          style={styles.avatar}
        />
        <View style={styles.profileInfo}>
          <Text style={styles.profileName}>rekha</Text>
          <Text style={styles.profilePhone}>+911234567890</Text>
        </View>
        <TouchableOpacity style={styles.editButton}>
          <Text style={styles.editButtonText}>Edit</Text>
        </TouchableOpacity>
      </View>

      {Object.entries(MENU_ITEMS).map(([key, section]) => (
        <View key={key} style={styles.section}>
          <Text style={styles.sectionTitle}>{section.title}</Text>
          <View style={styles.sectionContent}>
            {section.items.map(renderMenuItem)}
          </View>
        </View>
      ))}

      <TouchableOpacity style={styles.logoutButton}>
        <MaterialIcons name="logout" size={24} color="#ff3b30" />
        <Text style={styles.logoutText}>Log Out</Text>
      </TouchableOpacity>

      <BottomNav />
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
    paddingHorizontal: 24,
    paddingVertical: 16,
    backgroundColor: '#fff',
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  profileSection: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    marginBottom: 16,
  },
  avatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  profileInfo: {
    flex: 1,
    marginLeft: 12,
  },
  profileName: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
  },
  profilePhone: {
    fontSize: 14,
    color: '#666',
    marginTop: 2,
  },
  editButton: {
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#ff3b30',
    borderRadius: 20,
  },
  editButtonText: {
    color: '#fff',
    fontSize: 14,
    fontWeight: '500',
  },
  section: {
    marginBottom: 16,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
    paddingHorizontal: 24,
  },
  sectionContent: {
    backgroundColor: '#fff',
  },
  menuItem: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 24,
    borderBottomWidth: 1,
    borderBottomColor: '#f0f0f0',
  },
  planItem: {
    backgroundColor: '#e8ffe8',
  },
  planSubtitle: {
    fontSize: 12,
    color: '#666',
  },
  planTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginTop: 2,
  },
  menuItemText: {
    fontSize: 16,
    color: '#333',
  },
  menuItemValue: {
    fontSize: 14,
    color: '#666',
  },
  logoutButton: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#fff',
    paddingVertical: 16,
    marginTop: 'auto',
    marginBottom: 80,
  },
  logoutText: {
    color: '#ff3b30',
    fontSize: 16,
    fontWeight: '500',
    marginLeft: 8,
  },
}); 