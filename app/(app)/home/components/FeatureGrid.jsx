import React, { useState, useEffect } from 'react';
import { View, StyleSheet, ActivityIndicator, Text } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import FeatureCard from './FeatureCard';
import { ROUTES } from '../../../../navigation/routes';

const BASE_URL = 'https://ecg-wv62.onrender.com';

export default function FeatureGrid() {
  const [features, setFeatures] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchFeatures();
  }, []);

  const fetchFeatures = async () => {
    try {
      const token = await AsyncStorage.getItem('userToken');
      if (!token) {
        throw new Error('Authentication token not found');
      }

      const response = await fetch(`${BASE_URL}/api/user/test/getalltest`, {
        method: 'GET',
        headers: {
          'Authorization': `${token}`,
          'Content-Type': 'application/json',
        },
      });

      if (!response.ok) {
        throw new Error(`HTTP error! status: ${response.status}`);
      }

      const rawResponse = await response.text();
      // console.log('Raw API Response:', rawResponse);

      let data;
      try {
        data = JSON.parse(rawResponse);
        // Log the full structure
        // console.log('Response structure:', JSON.stringify(data, null, 2));
        // Log available keys in the object
        // console.log('Available keys:', Object.keys(data));
      } catch (parseError) {
        throw new Error(`Failed to parse JSON response: ${parseError.message}`);
      }

      // Look for the tests array in common response structures
      let testsArray;
      if (data.tests) {
        testsArray = data.tests;
      } else if (data.data) {
        testsArray = data.data;
      } else if (data.result) {
        testsArray = data.result;
      } else {
        throw new Error('Could not find tests array in response. Response structure: ' + 
          JSON.stringify(Object.keys(data)));
      }

      if (!Array.isArray(testsArray)) {
        throw new Error(`Tests data is not an array. Got type: ${typeof testsArray}`);
      }

      const transformedFeatures = testsArray.map(test => ({
        icon: test.photo ? { uri: `${BASE_URL}/${test.photo.replace(/\\/g, '/')}` } : require('../../../../assets/images/ecg.png'),
        title: test.name,
        description: test.description_name,
        route: ROUTES.TESTS.TWELVE_LEAD_ECG,
        _id: test._id
      }));

      setFeatures(transformedFeatures);
    } catch (err) {
      setError(err.message);
      console.error('Error fetching tests:', err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <View style={[styles.featuresGrid, styles.centerContent]}>
        <ActivityIndicator size="large" color="#0000ff" />
      </View>
    );
  }

  if (error) {
    return (
      <View style={[styles.featuresGrid, styles.centerContent]}>
        <Text style={styles.errorText}>Error: {error}</Text>
      </View>
    );
  }

  return (
    <View style={styles.featuresGrid}>
      {features.length === 0 ? (
        <Text style={styles.noFeaturesText}>No tests available</Text>
      ) : (
        features.map((feature) => (
          <FeatureCard
            key={feature._id}
            {...feature}
          />
        ))
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  featuresGrid: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    padding: 10,
    justifyContent: 'space-between',
  },
  centerContent: {
    justifyContent: 'center',
    alignItems: 'center',
    minHeight: 200, // Add some minimum height for better visibility
  },
  errorText: {
    color: 'red',
    fontSize: 16,
    textAlign: 'center',
  },
  noFeaturesText: {
    color: '#666',
    fontSize: 16,
    textAlign: 'center',
    width: '100%',
    marginTop: 20,
  },
});