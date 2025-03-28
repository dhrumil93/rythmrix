import React from 'react';
import { ScrollView, TouchableOpacity, Text, StyleSheet, View } from 'react-native';

const FilterChips = ({ activeFilter, onFilterChange }) => {
  const filters = ['Filter', 'Meal Plan', 'Meditation', 'Exercises'];

  return (
    <ScrollView 
      horizontal 
      showsHorizontalScrollIndicator={false}
      contentContainerStyle={styles.container}
    >
      {filters.map((filter, index) => (
        <React.Fragment key={filter}>
          <TouchableOpacity 
            style={[
              styles.chip,
              activeFilter === filter && styles.activeChip,
              filter === 'Filter' && styles.filterChip
            ]}
            onPress={() => onFilterChange(filter)}
          >
            <Text style={[
              styles.chipText,
              activeFilter === filter && styles.activeChipText,
              filter === 'Filter' && styles.filterChipText
            ]}>
              {filter}
            </Text>
          </TouchableOpacity>
          {index === 0 && <View style={styles.separator} />}
        </React.Fragment>
      ))}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    gap: 8,
    alignItems: 'center',
  },
  chip: {
    paddingHorizontal: 12,
    paddingVertical: 6,
    backgroundColor: '#fff',
    borderRadius: 16,
    borderWidth: 1,
    borderColor: '#ddd',
  },
  activeChip: {
    backgroundColor: '#003087',
    borderColor: '#003087',
  },
  filterChip: {
    backgroundColor: '#f5f5f5',
    borderColor: '#ddd',
  },
  chipText: {
    fontSize: 14,
    color: '#333',
  },
  activeChipText: {
    color: '#fff',
  },
  filterChipText: {
    color: '#666',
  },
  separator: {
    width: 1,
    height: 20,
    backgroundColor: '#ddd',
    marginHorizontal: 8,
  },
});

export default FilterChips; 