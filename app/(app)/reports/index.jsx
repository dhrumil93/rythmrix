import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import SearchBar from '../../components/shared/SearchBar';
import ReportBanner from './components/ReportBanner';
import ReportsList from './components/ReportsList';
import BottomNav from '../../components/shared/BottomNav';

export default function ReportsScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <Text style={styles.title}>My Reports</Text>
      </View>

      <View style={styles.searchContainer}>
        <SearchBar 
          placeholder="Search report by users etc"
        />
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>My Reports (3)</Text>
        <ReportBanner />
        <ReportsList />
      </View>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    color: '#333',
  },
  searchContainer: {
    paddingHorizontal: 24,
    marginBottom: 16,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: '600',
    marginBottom: 16,
    color: '#333',
  },
}); 