import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, TouchableOpacity, ScrollView, StatusBar } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';

const SUBSCRIPTION_PLANS = [
  {
    id: 'basic',
    title: 'Basic Plan',
    price: 'Free',
    isActive: true,
    color: '#4CAF50',
    features: [
      "Free forever",
      "Unlimited ECG tests",
      "Real-time ECG monitoring",
      "5 different types of tests",
      "Local report storage",
      "10 free expert reviews for lifetime"
    ]
  },
  {
    id: 'premium',
    title: 'Premium Plan',
    price: '$ 349/month',
    color: '#FF9800',
    description: 'A plan for those prioritizing wellness, with advanced ECG analysis, cloud storage for reports, and priority support.',
    features: [
      "All basic plan features",
      "Auto-report sharing",
      "Premium customer support",
      "Record/export live monitor data",
      "Cloud storage for reports",
      "10 free expert reviews for lifetime"
    ]
  },
  {
    id: 'clinical',
    title: 'Clinical Plan',
    price: '$ 999/month',
    color: '#9C27B0',
    description: 'A plan for those prioritizing wellness, with advanced ECG analysis, cloud storage for reports, and priority support.',
    features: [
      "All basic plan features",
      "Set-up custom clinic",
      "Customised ECG reports",
      "Premium customer support",
      "Cloud storage for reports",
      "Unlimited free expert reviews per month"
    ]
  }
];

export default function SubscriptionPlanScreen() {
  const router = useRouter();
  const [expandedPlan, setExpandedPlan] = useState(null);

  const togglePlan = (planId) => {
    setExpandedPlan(expandedPlan === planId ? null : planId);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar backgroundColor="#fff" barStyle="dark-content" />
      <View style={styles.header}>
        <TouchableOpacity onPress={() => router.back()} style={styles.backButton}>
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.headerTitle}>Subscription Plan</Text>
      </View>

      <ScrollView style={styles.content}>
        {SUBSCRIPTION_PLANS.map((plan) => (
          <TouchableOpacity 
            key={plan.id} 
            style={[styles.planCard, expandedPlan === plan.id && styles.expandedCard]}
            onPress={() => togglePlan(plan.id)}
          >
            <View style={[styles.stripContainer, { backgroundColor: plan.color }]} />
            <View style={styles.planContent}>
              <View style={styles.planHeader}>
                <View style={styles.titleSection}>
                  <Text style={[styles.planTitle, { color: plan.color }]}>
                    {plan.title}
                  </Text>
                  {plan.isActive && (
                    <View style={[styles.activeTag, { backgroundColor: `${plan.color}20` }]}>
                      <Text style={[styles.activeText, { color: plan.color }]}>
                        Active
                      </Text>
                    </View>
                  )}
                  {!expandedPlan === plan.id && (
                    <Text style={styles.priceText}>{plan.price}</Text>
                  )}
                </View>
                <MaterialIcons 
                  name={expandedPlan === plan.id ? "keyboard-arrow-up" : "keyboard-arrow-down"} 
                  size={24} 
                  color="#333" 
                />
              </View>

              {expandedPlan === plan.id && (
                <View style={styles.expandedContent}>
                  {plan.description && (
                    <Text style={styles.description}>{plan.description}</Text>
                  )}
                  <View style={styles.featuresList}>
                    {plan.features.map((feature, index) => (
                      <View key={index} style={styles.featureItem}>
                        <View style={[styles.checkIcon, { backgroundColor: plan.color }]}>
                          <MaterialIcons name="check" size={16} color="#fff" />
                        </View>
                        <Text style={styles.featureText}>{feature}</Text>
                      </View>
                    ))}
                  </View>
                  {plan.id !== 'basic' && (
                    <View style={styles.priceButtonContainer}>
                      <TouchableOpacity 
                        style={[styles.priceButton, { backgroundColor: plan.color }]}
                        onPress={() => console.log(`Selected ${plan.title}`)}
                      >
                        <Text style={styles.priceButtonText}>{plan.price}</Text>
                      </TouchableOpacity>
                    </View>
                  )}
                </View>
              )}
            </View>
          </TouchableOpacity>
        ))}
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
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
  headerTitle: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  content: {
    flex: 1,
    padding: 16,
  },
  planCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    marginBottom: 16,
    overflow: 'hidden',
    flexDirection: 'row',
    elevation: 2,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  stripContainer: {
    width: 8,
  },
  planContent: {
    flex: 1,
    padding: 20,
  },
  planHeader: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'flex-start',
  },
  titleSection: {
    flex: 1,
  },
  planTitle: {
    fontSize: 28,
    fontWeight: '600',
    marginBottom: 4,
  },
  activeTag: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 16,
    alignSelf: 'flex-start',
    marginBottom: 8,
  },
  activeText: {
    fontSize: 14,
    fontWeight: '500',
  },
  priceText: {
    fontSize: 24,
    fontWeight: 'bold',
    color: '#333',
  },
  expandedCard: {
    marginBottom: 24,
  },
  expandedContent: {
    marginTop: 16,
  },
  description: {
    fontSize: 16,
    color: '#666',
    marginBottom: 24,
    lineHeight: 24,
  },
  featuresList: {
    marginBottom: 24,
  },
  featureItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
  },
  checkIcon: {
    width: 24,
    height: 24,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 12,
  },
  featureText: {
    fontSize: 16,
    color: '#333',
  },
  priceButtonContainer: {
    alignItems: 'center',
  },
  priceButton: {
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 24,
    minWidth: 160,
    alignItems: 'center',
  },
  priceButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
});