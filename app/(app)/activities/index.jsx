import React, { useState } from 'react';
import { View, Text, ScrollView, StyleSheet, Alert } from 'react-native';
import { Stack, useRouter } from 'expo-router';
import CalendarStrip from '../../components/Calendar/CalendarStrip';
import FilterChips from '../../components/Plans/FilterChips';
import PlanCard from '../../components/Plans/PlanCard';
import BottomNav from '../../components/shared/BottomNav';

const PlansScreen = () => {
  const router = useRouter();
  const [activeFilter, setActiveFilter] = useState('Filter');
  
  const allPlans = {
    'Meal Plan': [
      {
        id: 1,
        title: 'Ultimate High Protein',
        duration: 28,
        imageUrl: 'https://images.unsplash.com/photo-1546069901-ba9599a7e63c',
        type: 'Meal Plan',
        isPremium: true,
      },
      {
        id: 2,
        title: 'Low Carb',
        duration: 21,
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        type: 'Meal Plan',
        isPremium: true,
      },
      {
        id: 3,
        title: 'Beginner Meal Guide',
        duration: 14,
        imageUrl: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd',
        type: 'Meal Plan',
        isPremium: false,
      },
    ],
    'Meditation': [
      {
        id: 4,
        title: 'Daily Mindfulness',
        duration: 30,
        imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597',
        type: 'Meditation',
        isPremium: true,
      },
      {
        id: 5,
        title: 'Stress Relief',
        duration: 14,
        imageUrl: 'https://images.unsplash.com/photo-1545205597-3d9d02c29597',
        type: 'Meditation',
        isPremium: false,
      },
    ],
    'Exercises': [
      {
        id: 6,
        title: 'Total Body Power',
        duration: 28,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        type: 'Exercises',
        isPremium: true,
      },
      {
        id: 7,
        title: 'Beginner Workout',
        duration: 21,
        imageUrl: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b',
        type: 'Exercises',
        isPremium: false,
      },
    ],
  };

  const getFilteredPlans = () => {
    if (activeFilter === 'Filter') {
      return Object.values(allPlans).flat();
    }
    return allPlans[activeFilter] || [];
  };

  const handleFilterChange = (filter) => {
    setActiveFilter(filter);
  };

  const handlePlanPress = (plan) => {
    if (plan.isPremium) {
      Alert.alert(
        "Premium Plan",
        "This is a premium plan. Please upgrade to access this content.",
        [
          {
            text: "Cancel",
            style: "cancel"
          },
          {
            text: "Upgrade",
            onPress: () => router.push("/settings/subscription")
          }
        ]
      );
      return;
    }
    
    // For free plans, navigate with plan data
    router.push({
      pathname: `/activities/${plan.id}`,
      params: {
        title: plan.title,
        type: plan.type,
        duration: plan.duration,
        imageUrl: plan.imageUrl
      }
    });
  };

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
          Lorem ipsum dolor sit amet consectetur. Quis justo gravida nisi urna.
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
            key={plan.id}
            {...plan}
            onPress={() => handlePlanPress(plan)}
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
});

export default PlansScreen;
