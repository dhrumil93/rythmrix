import React, { useState, useEffect } from 'react';
import { View, Text, Image, StyleSheet, ScrollView, TouchableOpacity, ActivityIndicator } from 'react-native';
import { Stack, useRouter, useLocalSearchParams } from 'expo-router';
import { AntDesign } from '@expo/vector-icons';
import AsyncStorage from '@react-native-async-storage/async-storage';
import BottomNav from '../../../components/shared/BottomNav';

const BASE_URL = 'https://ecg-wv62.onrender.com';

const PlanDetailsScreen = () => {
  const [activeTab, setActiveTab] = useState('OVERVIEW');
  const [plan, setPlan] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const router = useRouter();
  const params = useLocalSearchParams();
  const { id } = params;

  useEffect(() => {
    fetchPlan();
  }, [id]);

  const fetchPlan = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        router.replace('/(auth)');
        return;
      }
      const response = await fetch(`${BASE_URL}/api/user/plan/getplan/${id}`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });
      if (!response.ok) {
        throw new Error('Failed to fetch plan');
      }
      const data = await response.json();
      setPlan(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <ActivityIndicator size="large" color="#074799" />
      </View>
    );
  }

  if (error || !plan) {
    return (
      <View style={[styles.container, { justifyContent: 'center', alignItems: 'center' }]}>
        <Text style={{ color: '#ff3b30', fontSize: 16 }}>{error || 'Plan not found'}</Text>
      </View>
    );
  }

  const renderContent = () => {
    if (activeTab === 'OVERVIEW') {
      return (
        <View style={styles.content}>
          <Text style={styles.description}>{plan.description}</Text>
          <View style={styles.infoGrid}>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Duration</Text>
              <Text style={styles.infoValue}>{plan.duration_in_day} Days</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Times Per Week</Text>
              <Text style={styles.infoValue}>{plan.times_per_week}</Text>
            </View>
            <View style={styles.infoItem}>
              <Text style={styles.infoLabel}>Difficulty</Text>
              <Text style={styles.infoValue}>{plan.difficulty}</Text>
            </View>
          </View>
          <View style={styles.section}>
            <Text style={styles.sectionTitle}>{plan.title2 || 'What You Will Do'}</Text>
            <Text style={styles.sectionText}>{plan.description2}</Text>
          </View>
        </View>
      );
    }

    return (
      <View style={styles.scheduleContent}>
        {plan.schedule && plan.schedule.length > 0 ? (
          plan.schedule.map((week, index) => (
            <View key={week._id || index} style={styles.weekContainer}>
              <Text style={styles.weekTitle}>Week {week.weekNumber}</Text>
              <Text style={styles.weekDescription}>{week.week_description}</Text>
            </View>
          ))
        ) : (
          <Text>No schedule available.</Text>
        )}
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
        source={{ uri: plan.photo }}
        style={styles.headerImage}
      />
      <Text style={styles.title}>{plan.title}</Text>
      <Text style={styles.type}>{plan.categoty}</Text>
      <Text style={styles.duration}>{plan.duration_in_day} Days</Text>

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