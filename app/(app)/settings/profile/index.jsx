import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity, Image, TextInput } from 'react-native';
import { MaterialIcons } from '@expo/vector-icons';
import { useRouter } from 'expo-router';
import CustomInput from '../../../components/CustomInput';

export default function EditProfileScreen() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    fullName: 'Rekha',
    phone: '+911234567890',
    email: 'Rekha@gmail.com',
    age: '28',
    gender: 'Male',
    weight: '98',
    height: '175'
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      <View style={styles.header}>
        <TouchableOpacity 
          style={styles.backButton}
          onPress={() => router.back()}
        >
          <MaterialIcons name="arrow-back" size={24} color="#333" />
        </TouchableOpacity>
        <Text style={styles.title}>Edit Profile</Text>
      </View>

      <View style={styles.profileImageSection}>
        <Image 
          source={{ uri: 'https://api.dicebear.com/7.x/avataaars/png?seed=rekha' }}
          style={styles.avatar}
        />
        <TouchableOpacity style={styles.cameraButton}>
          <MaterialIcons name="camera-alt" size={20} color="#fff" />
        </TouchableOpacity>
      </View>

      <View style={styles.form}>
        <CustomInput
          label="Full Name"
          value={formData.fullName}
          onChangeText={(text) => setFormData({...formData, fullName: text})}
          required
        />
        <CustomInput
          label="Phone Number"
          value={formData.phone}
          onChangeText={(text) => setFormData({...formData, phone: text})}
          keyboardType="phone-pad"
        />
        <CustomInput
          label="Email Address"
          value={formData.email}
          onChangeText={(text) => setFormData({...formData, email: text})}
          keyboardType="email-address"
        />
        
        <View style={styles.row}>
          <View style={styles.halfInput}>
            <CustomInput
              label="Age"
              value={formData.age}
              onChangeText={(text) => setFormData({...formData, age: text})}
              keyboardType="numeric"
              suffix="yr(s)"
              required
            />
          </View>
          <View style={styles.halfInput}>
            <CustomInput
              label="Gender"
              value={formData.gender}
              onChangeText={(text) => setFormData({...formData, gender: text})}
              required
            />
          </View>
        </View>

        <View style={styles.row}>
          <View style={styles.halfInput}>
            <CustomInput
              label="Weight"
              value={formData.weight}
              onChangeText={(text) => setFormData({...formData, weight: text})}
              keyboardType="numeric"
              suffix="kg(s)"
              required
            />
          </View>
          <View style={styles.halfInput}>
            <CustomInput
              label="Height"
              value={formData.height}
              onChangeText={(text) => setFormData({...formData, height: text})}
              keyboardType="numeric"
              suffix="cm(s)"
              required
            />
          </View>
        </View>
      </View>

      <TouchableOpacity style={styles.saveButton}>
        <Text style={styles.saveButtonText}>Save Changes</Text>
      </TouchableOpacity>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  backButton: {
    marginRight: 16,
  },
  title: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#333',
  },
  profileImageSection: {
    alignItems: 'center',
    padding: 20,
    position: 'relative',
  },
  avatar: {
    width: 100,
    height: 100,
    borderRadius: 50,
    backgroundColor: '#f0f0f0',
  },
  cameraButton: {
    position: 'absolute',
    bottom: 20,
    right: '40%',
    backgroundColor: '#074799',
    padding: 8,
    borderRadius: 20,
  },
  form: {
    padding: 16,
  },
  row: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginHorizontal: -8,
  },
  halfInput: {
    flex: 1,
    marginHorizontal: 8,
  },
  saveButton: {
    backgroundColor: '#074799',
    margin: 16,
    padding: 16,
    borderRadius: 8,
    alignItems: 'center',
  },
  saveButtonText: {
    color: '#fff',
    fontSize: 16,
    fontWeight: '600',
  },
}); 