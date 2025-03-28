import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

const CalendarStrip = () => {
  const days = [
    { day: 'S', date: '15' },
    { day: 'M', date: '16' },
    { day: 'T', date: '17' },
    { day: 'W', date: '18', isActive: true },
    { day: 'T', date: '19' },
    { day: 'F', date: '20' },
    { day: 'S', date: '21' },
  ];

  return (
    <View style={styles.container}>
      {days.map((item, index) => (
        <View 
          key={index} 
          style={[
            styles.dayColumn,
            item.isActive && styles.activeColumn
          ]}
        >
          <Text style={[
            styles.dayText,
            item.isActive && styles.activeDayText
          ]}>
            {item.day}
          </Text>
          <Text style={[
            styles.dateText,
            item.isActive && styles.activeDateText
          ]}>
            {item.date}
          </Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 20,
    paddingVertical: 8,
    backgroundColor: '#fff',
    borderBottomWidth: 1,
    borderBottomColor: '#eee',
  },
  dayColumn: {
    alignItems: 'center',
    width: 32,
    height: 48,
    justifyContent: 'center',
  },
  activeColumn: {
    backgroundColor: '#e8f1ff',
    borderRadius: 8,
  },
  dayText: {
    fontSize: 12,
    color: '#666',
    marginBottom: 4,
  },
  activeDayText: {
    color: '#074799',
  },
  dateText: {
    fontSize: 14,
    color: '#333',
    fontWeight: '500',
  },
  activeDateText: {
    color: '#074799',
  },
});

export default CalendarStrip; 