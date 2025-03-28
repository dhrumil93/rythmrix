import React, { useState } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import BottomNav from '../../../components/shared/BottomNav';

const PlanDetailsScreen = () => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const router = useRouter();
  const params = useLocalSearchParams();
  const { title, type, duration, imageUrl } = params;

  const scheduleData = [
    {
      week: 'Week 1',
      description: 'Lorem ipsum dolor sit amet consectetur. Urna in varius integer velit suspendisse et vitae diam.',
    },
    {
      week: 'Week 2',
      description: 'Lorem ipsum dolor sit amet consectetur. Urna in varius integer velit suspendisse et vitae diam.',
    },
    {
      week: 'Week 3',
      description: 'Lorem ipsum dolor sit amet consectetur. Urna in varius integer velit suspendisse et vitae diam.',
    },
    {
      week: 'Week 4',
      description: 'Lorem ipsum dolor sit amet consectetur. Urna in varius integer velit suspendisse et vitae diam.',
    },
  ];

  const renderContent = () => {
    if (activeTab === 'OVERVIEW') {
      return (
        <View style={styles.content}>
          <Text style={styles.description}>
            Lorem ipsum dolor sit amet consectetur. Urna in varius integer velit suspendisse et vitae diam.
          </Text>

          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>{duration} Days</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Times Per Week</Text>
              <Text style={styles.infoValue}>Daily</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Difficulty</Text>
              <Text style={styles.infoValue}>Beginner</Text>
            </View>
          </View>

          <View style={styles.section}>
            <Text style={styles.sectionTitle}>What You Will Do</Text>
            <Text style={styles.sectionText}>
              Lorem ipsum dolor sit amet consectetur. Urna in varius integer velit suspendisse et vitae diam.
            </Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.scheduleContent}>
        {scheduleData.map((week, index) => (
          <View key={index} style={styles.weekContainer}>
            <Text style={styles.weekTitle}>{week.week}</Text>
            <Text style={styles.weekDescription}>{week.description}</Text>
          </View>
        ))}
      </View>
    );
  };

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Plans Details',
          headerLeft: () => (
            <TouchableOpacity 
              onPress={() => router.back()}
              style={styles.backButton}
            >
              <AntDesign name="left" size={24} color="#000" />
            </TouchableOpacity>
          ),
          headerShadowVisible: false,
        }}
      />

      <Image
        source={{ uri: imageUrl }}
        style={styles.headerImage}
      />
      <Text style={styles.title}>{title}</Text>
      <Text style={styles.type}>{type}</Text>
      <Text style={styles.duration}>{duration} Days</Text>

      <View style={styles.tabContainer}>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'OVERVIEW' && styles.activeTab]}
          onPress={() => setActiveTab('OVERVIEW')}
        >
          <Text style={[styles.tabText, activeTab === 'OVERVIEW' && styles.activeTabText]}>
            OVERVIEW
          </Text>
        </TouchableOpacity>
        <TouchableOpacity 
          style={[styles.tab, activeTab === 'SCHEDULE' && styles.activeTab]}
          onPress={() => setActiveTab('SCHEDULE')}
        >
          <Text style={[styles.tabText, activeTab === 'SCHEDULE' && styles.activeTabText]}>
            SCHEDULE
          </Text>
        </TouchableOpacity>
      </View>

      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.scrollContent}
      >
        {renderContent()}
      </ScrollView>
      <BottomNav />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  backButton: {
    padding: 8,
  },
  headerImage: {
    width: '100%',
    height: 250,
    resizeMode: 'cover',
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    padding: 20,
    paddingBottom: 10,
  },
  type: {
    fontSize: 14,
    color: '#666',
    padding: 20,
    paddingBottom: 10,
  },
  duration: {
    fontSize: 14,
    color: '#666',
    padding: 20,
    paddingBottom: 10,
  },
  tabContainer: {
    flexDirection: 'row',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  tab: {
    flex: 1,
    paddingVertical: 15,
    alignItems: 'center',
  },
  activeTab: {
    borderBottomWidth: 2,
    borderBottomColor: '#074799',
  },
  tabText: {
    fontSize: 14,
    color: '#666',
    fontWeight: '500',
  },
  activeTabText: {
    color: '#074799',
  },
  content: {
    padding: 20,
    paddingBottom: 100,
  },
  scheduleContent: {
    padding: 20,
    paddingBottom: 100,
  },
  weekContainer: {
    marginBottom: 24,
  },
  weekTitle: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  weekDescription: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  description: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
    marginBottom: 20,
  },
  infoGrid: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 30,
  },
  infoItem: {
    flex: 1,
  },
  infoLabel: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  infoValue: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  section: {
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '600',
    marginBottom: 10,
  },
  sectionText: {
    fontSize: 14,
    color: '#666',
    lineHeight: 20,
  },
  scrollContent: {
    flex: 1,
  },
});

export default PlanDetailsScreen; 