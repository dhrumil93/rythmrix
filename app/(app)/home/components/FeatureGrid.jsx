import React from 'react';
import { View, StyleSheet } from 'react-native';
import FeatureCard from './FeatureCard';
import { ROUTES } from '../../../../navigation/routes';

const FEATURES = [
  {
    icon: require('../../../../assets/images/ecg.png'),
    title: '12 Lead ECG',
    description: 'Comprehensive heart analysis from 12 angles',
    route: ROUTES.TESTS.TWELVE_LEAD_ECG
  },
  {
    icon: require('../../../../assets/images/heart.png'),
    title: 'Heart Risk Calculator',
    description: 'Heart risk assessment made easy',
    route: ROUTES.TESTS.HEART_RISK
  },
  {
    icon: require('../../../../assets/images/bike.png'),
    title: 'HRV',
    description: 'Instant stress level readings',
    route: ROUTES.TESTS.HRV
  },
  {
    icon: require('../../../../assets/images/monitor.png'),
    title: 'Live Monitor',
    description: 'Continuous, round-the-clock heart monitoring',
    route: ROUTES.TESTS.LIVE_MONITOR
  },
  {
    icon: require('../../../../assets/images/lead2.png'),
    title: 'Lead II ECG',
    description: 'Your go-to solution for basic arrhythmia tests',
    route: ROUTES.TESTS.LEAD_TWO_ECG
  },
  {
    icon: require('../../../../assets/images/potassium.png'),
    title: 'Hyperkalemia',
    description: 'Quick potassium level checks',
    route: ROUTES.TESTS.HYPERKALEMIA
  }
];

export default function FeatureGrid() {
  return (
    <View style={styles.featuresGrid}>
      {FEATURES.map((feature, index) => (
        <FeatureCard
          key={index}
          {...feature}
        />
      ))}
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
}); 