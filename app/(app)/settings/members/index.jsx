import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, FlatList } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const MEMBERS = [
  {
    id: '1',
    name: 'Rekha',
    email: 'rekha@gmail.com',
    status: 'Active',
    avatar: 'https://api.dicebear.com/7.x/avataaars/png?seed=rekha'
  }
];

export default function MembersScreen() {
  const router = useRouter();

  const renderMember = ({ item }) => (
    <View style={styles.memberCard}>
      <Image source={{ uri: item.avatar }} style={styles.memberAvatar} />
      <View style={styles.memberInfo}>
        <Text style={styles.memberName}>{item.name}</Text>
        <Text style={styles.memberEmail}>{item.email}</Text>
      </View>
      <View style={[
        styles.statusBadge,
        item.status === 'Active' && styles.activeBadge
      ]}>
        <Text style={[
          styles.statusText,
          item.status === 'Active' && styles.activeText
        ]}>{item.status}</Text>
      </View>
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>All Members</Text>
      </View>

      <FlatList
        data={MEMBERS}
        renderItem={renderMember}
        keyExtractor={item => item.id}
        contentContainerStyle={styles.listContent}
      />

      <TouchableOpacity 
        style={styles.addButton}
        onPress={() => router.push('/(app)/settings/members/addmembers')}
      >
        <MaterialIcons name="add" size={24} color="#fff" />
      </TouchableOpacity>
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
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  listContent: {
    padding: 16,
  },
  memberCard: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#fff',
    padding: 16,
    borderRadius: 12,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  memberAvatar: {
    width: 50,
    height: 50,
    borderRadius: 25,
    backgroundColor: '#f0f0f0',
  },
  memberInfo: {
    flex: 1,
    marginLeft: 12,
  },
  memberName: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
  },
  memberEmail: {
    fontSize: 14,
    color: '#666',
    marginTop: 4,
  },
  statusBadge: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    borderRadius: 16,
    backgroundColor: '#f0f0f0',
  },
  activeBadge: {
    backgroundColor: '#e8ffe8',
  },
  statusText: {
    fontSize: 12,
    fontWeight: '500',
    color: '#666',
  },
  activeText: {
    color: '#28a745',
  },
  addButton: {
    position: 'absolute',
    bottom: 24,
    right: 24,
    width: 56,
    height: 56,
    borderRadius: 28,
    backgroundColor: '#074799',
    alignItems: 'center',
    justifyContent: 'center',
    elevation: 4,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.25,
    shadowRadius: 4,
  },
}); 