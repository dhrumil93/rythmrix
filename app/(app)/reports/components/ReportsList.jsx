import React from 'react';
import { View, Text, FlatList, TouchableOpacity, StyleSheet } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';

const DUMMY_REPORTS = [
  {
    id: '1',
    type: 'ECG Report',
    date: '2024-03-15',
    time: '09:30 AM',
    status: 'Normal',
  },
  {
    id: '2',
    type: 'Heart Risk Assessment',
    date: '2024-03-14',
    time: '02:15 PM',
    status: 'Review Required',
  },
  {
    id: '3',
    type: 'ECG Report',
    date: '2024-03-13',
    time: '11:45 AM',
    status: 'Normal',
  },
];

export default function ReportsList() {
  const renderReport = ({ item }) => (
    <TouchableOpacity style={styles.reportCard}>
      <Text style={styles.reportType}>{item.type}</Text>
      <View style={styles.reportFooter}>
        <Text style={styles.reportDate}>{item.date} • {item.time}</Text>
        <Text 
          style={[
            styles.reportStatus,
            item.status === 'Normal' ? styles.statusNormal : styles.statusReview
          ]}
        >
          {item.status}
        </Text>
      </View>
    </TouchableOpacity>
  );

  return (
    <FlatList
      data={DUMMY_REPORTS}
      renderItem={renderReport}
      keyExtractor={item => item.id}
      showsVerticalScrollIndicator={false}
      contentContainerStyle={styles.listContainer}
    />
  );
}

const styles = StyleSheet.create({
  listContainer: {
    paddingTop: 8,
    paddingBottom: 100, // Space for bottom nav
  },
  reportCard: {
    backgroundColor: '#fff',
    borderRadius: 12,
    padding: 16,
    marginBottom: 12,
    shadowColor: '#000',
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.1,
    shadowRadius: 3,
    elevation: 3,
  },
  reportType: {
    fontSize: 16,
    fontWeight: '600',
    color: '#333',
    marginBottom: 12,
  },
  reportStatus: {
    paddingHorizontal: 12,
    paddingVertical: 4,
    borderRadius: 12,
    fontSize: 12,
    fontWeight: '500',
  },
  statusNormal: {
    backgroundColor: '#e8ffe8',
    color: '#28a745',
  },
  statusReview: {
    backgroundColor: '#fff3cd',
    color: '#ffc107',
  },
  reportFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
  },
  reportDate: {
    fontSize: 14,
    color: '#666',
  },
}); 