import React from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, ScrollView } from 'react-native';
import DeviceStatus from '../../components/shared/DeviceStatus';
import UserHeader from './components/UserHeader';
import WelcomeSection from './components/WelcomeSection';
import ReportCard from './components/ReportCard';
import FeatureGrid from './components/FeatureGrid';
import BottomNav from '../../components/shared/BottomNav';

export default function HomeScreen() {
  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="light-content" />
      
      {/* Fixed Header */}
      <View style={styles.fixedHeader}>
        <DeviceStatus />
        <UserHeader />
      </View>

      {/* Scrollable Content */}
      <ScrollView 
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContent}
      >
        <View style={styles.mainContent}>
          <WelcomeSection />
          <ReportCard />
          <Text style={styles.sectionTitle}>Record your ECG</Text>
          <FeatureGrid />
        </View>
        <View style={styles.bottomSpacing} />
      </ScrollView>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  fixedHeader: {
    backgroundColor: '#fff',
    zIndex: 1,
  },
  scrollContent: {
    flexGrow: 1,
  },
  mainContent: {
    paddingHorizontal: 20,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    marginTop: 24,
    marginLeft: 0,
    marginBottom: 16,
  },
  bottomSpacing: {
    height: 65,
  },
}); 