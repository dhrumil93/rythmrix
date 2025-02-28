import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter, useLocalSearchParams } from 'expo-router';
import SearchBar from '../../../components/shared/SearchBar';

export default function ECGTypeReports() {
  const router = useRouter();
  const { type } = useLocalSearchParams();

  const getTitle = () => {
    switch(type) {
      case '12-lead':
        return '12-Lead ECG';
      case '6-lead':
        return '6-Lead ECG';
      case 'lead-2':
        return 'Lead II';
      default:
        return 'ECG Reports';
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>{getTitle()}</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBarWrapper}>
          <SearchBar
            placeholder="Search reports"
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.inputContainer}
            inputStyle={styles.searchInput}
          />
        </View>
      </View>

      <ScrollView style={styles.content}>
        {/* Reports list will go here */}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  searchBarWrapper: {
    backgroundColor: '#f5f5f5',
    borderRadius: 8,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
  },
  inputContainer: {
    backgroundColor: 'transparent',
  },
  searchInput: {
    fontSize: 16,
  },
  content: {
    flex: 1,
  },
}); 