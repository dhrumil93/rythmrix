import React from 'react';
import { View, Text, StyleSheet, ScrollView, Image } from 'react-native';
import { Stack, useLocalSearchParams } from 'expo-router';
import { AntDesign } from "@expo/vector-icons";

const ECGReport = () => {
  const params = useLocalSearchParams();

  const leads = ['V1', 'V2', 'V3', 'II', 'I'];
  
  return (
    <View style={styles.container}>
      <Stack.Screen
        options={{
          title: "ECG Report",
          headerShown: true,
          headerTitleStyle: {
            fontSize: 16,
            fontWeight: '400',
          },
          headerStyle: {
            backgroundColor: '#fff',
          },
          headerShadowVisible: false,
        }}
      />

      <ScrollView style={styles.scrollView}>
        {/* Date */}
        <View style={styles.dateContainer}>
          <Text style={styles.dateText}>{params.date}</Text>
        </View>

        {/* User Info */}
        <View style={styles.infoContainer}>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Name</Text>
            <Text style={styles.infoValue}>{params.name}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Age</Text>
            <Text style={styles.infoValue}>{params.age}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Gender</Text>
            <Text style={styles.infoValue}>{params.gender}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Weight</Text>
            <Text style={styles.infoValue}>{params.weight}</Text>
          </View>
          <View style={styles.infoRow}>
            <Text style={styles.infoLabel}>Height</Text>
            <Text style={styles.infoValue}>{params.height}</Text>
          </View>
        </View>

        {/* ECG Characteristics */}
        <Text style={styles.sectionTitle}>ECG characteristics</Text>
        
        <View style={styles.ecgContainer}>
          {leads.map((lead, index) => (
            <View key={lead} style={styles.leadContainer}>
              <Image
                source={require('../../../../../assets/images/ecg-wave.png')}
                style={styles.ecgWave}
                resizeMode="contain"
              />
              <Text style={styles.leadLabel}>{lead}</Text>
            </View>
          ))}
        </View>
      </ScrollView>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
  scrollView: {
    flex: 1,
  },
  dateContainer: {
    backgroundColor: '#E0E0E0',
    padding: 8,
    alignItems: 'center',
    marginVertical: 16,
    alignSelf: 'center',
    borderRadius: 4,
  },
  dateText: {
    color: '#333',
    fontSize: 14,
  },
  infoContainer: {
    paddingHorizontal: 20,
  },
  infoRow: {
    flexDirection: 'row',
    marginBottom: 8,
  },
  infoLabel: {
    width: 80,
    color: '#074799',
    fontSize: 14,
  },
  infoValue: {
    color: '#333',
    fontSize: 14,
  },
  sectionTitle: {
    fontSize: 16,
    fontWeight: '500',
    color: '#333',
    marginTop: 24,
    marginBottom: 16,
    paddingHorizontal: 20,
  },
  ecgContainer: {
    paddingHorizontal: 20,
  },
  leadContainer: {
    marginBottom: 24,
  },
  ecgWave: {
    width: '100%',
    height: 80,
    backgroundColor: '#F5F5F5',
  },
  leadLabel: {
    position: 'absolute',
    left: '50%',
    top: '40%',
    transform: [{ translateX: -10 }, { translateY: -10 }],
    fontSize: 14,
    color: '#333',
  },
});

export default ECGReport; 