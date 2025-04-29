import React, { useState, useEffect } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert, ActivityIndicator } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import AsyncStorage from '@react-native-async-storage/async-storage';
import CalendarStrip from '../../components/Calendar/CalendarStrip';
import FilterChips from '../../components/Plans/FilterChips';
import PlanCard from '../../components/Plans/PlanCard';
import BottomNav from '../../components/shared/BottomNav';

const BASE_URL = 'https://ecg-wv62.onrender.com';

const PlansScreen = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Filter');
  const [plans, setPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  useEffect(() => {
    fetchPlans();
  }, []);

  const fetchPlans = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        router.replace('/(auth)');
        return;
      }

      const response = await fetch(`${BASE_URL}/api/user/plan/getallplans`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch plans');
      }

      const rawResponse = await response.text();
      // console.log('Raw API Response:', rawResponse); // Debug log

      const data = JSON.parse(rawResponse);
      // console.log('Parsed data:', data); // Debug log

      // Handle different response structures
      const plansArray = Array.isArray(data) ? data :
                        data?.data ? data.data :
                        data?.plans ? data.plans :
                        data?.result ? data.result : [];

      // console.log('Final plans array:', plansArray); // Debug log
      setPlans(plansArray);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching plans:', err);
    } finally {
      setLoading(false);
    }
  };

  const getFilteredPlans = () => {
    // Ensure plans is an array
    const safePlans = Array.isArray(plans) ? plans : [];
    
    if (!safePlans.length) {
      return [];
    }

    if (activeFilter === 'Filter') {
      return safePlans;
    }

    return safePlans.filter(plan => plan?.categoty === activeFilter) || [];
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handlePlanPress = (plan) => {
    router.push({
      pathname: `/activities/${plan._id}`,
      params: {
        title: plan.title,
        type: plan.categoty,
        duration: plan.duration_in_day,
        imageUrl: plan.photo,
        description: plan.description,
        schedule: plan.schedule
      }
    });
  };

  if (loading) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <ActivityIndicator size="large" color="#074799" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.container, styles.centerContent]}>
        <Text style={styles.errorText}>{error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: 'Plans',
          headerShadowVisible: false,
        }}
      />

      <CalendarStrip />

      <View style={styles.content}>
        <Text style={styles.title}>Find a Plan</Text>
        <Text style={styles.description}>
          Choose from our curated selection of plans to achieve your health goals.
        </Text>

        <FilterChips 
          activeFilter={activeFilter}
          onFilterChange={handleFilterChange}
        />

        <Text style={styles.sectionTitle}>Available Plans</Text>
      </View>
        
      <ScrollView 
        showsVerticalScrollIndicator={false}
        style={styles.plansScroll}
        contentContainerStyle={styles.plansContainer}
      >
        {getFilteredPlans().map(plan => (
          <PlanCard
            key={plan._id}
            title={plan.title}
            duration={plan.duration_in_day}
            imageUrl={plan.photo}
            onPress={() => handlePlanPress(plan)}
            isPremium={plan.isPremium}
          />
        ))}
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
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    padding: 20,
  },
  plansScroll: {
    flex: 1,
  },
  plansContainer: {
    padding: 20,
    paddingTop: 0,
    paddingBottom: 80,
  },
  title: {
    fontSize: 24,
    fontWeight: '600',
    color: '#333',
    marginBottom: 8,
  },
  description: {
    fontSize: 14,
    color: '#666',
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 18,
    fontWeight: '600',
    color: '#333',
    marginTop: 20,
    marginBottom: 15,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 16,
    textAlign: 'center',
    padding: 20,
  },
});

export default PlansScreen;
