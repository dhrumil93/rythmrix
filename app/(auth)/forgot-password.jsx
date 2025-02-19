import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import { useToast } from '../context/ToastContext';

export default function ForgotPassword() {
  const router = useRouter();
  const [value, setValue] = useState('');
  const [error, setError] = useState('');
  const { showToast } = useToast();

  const validateInput = () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\d{10}$/;

    if (!value.trim()) {
      setError('This field is required');
      return false;
    }
    
    if (!emailRegex.test(value) && !phoneRegex.test(value)) {
      setError('Enter a valid email or 10-digit phone number');
      return false;
    }

    setError('');
    return true;
  };

  const handleSubmit = () => {
    if (validateInput()) {
      showToast('OTP sent to your email/phone', 'success');
      router.push('/(auth)/verify-otp');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <BackButton />
      
      <View style={styles.content}>
        <Text style={styles.title}>Forgot Password</Text>
        
        <View style={styles.inputContainer}>
          <CustomInput 
            label="Number or Email"
            icon="person"
            placeholder="Enter your email or number"
            value={value}
            onChangeText={(text) => {
              let cleanedText = text.replace(/\s/g, ''); // Remove spaces

              if (/^\d/.test(cleanedText)) {
                // If first character is a digit, restrict to 10 numbers
                cleanedText = cleanedText.replace(/\D/g, '').slice(0, 10);
              }

              setValue(cleanedText);
              if (error) setError('');
            }}
            error={error}
            keyboardType={/^\d/.test(value) ? 'numeric' : 'email-address'}
          />
          
          <Text style={styles.description}>
            We will send you a message to set or reset your new password
          </Text>

          <CustomButton 
            title="Submit"
            onPress={handleSubmit}
            disabled={!value.trim()}
            style={{ marginTop: 20 }}
          />
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 40,
  },
  content: {
    flex: 1,
    paddingHorizontal: 24,
    paddingTop: 50,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 40,
    color: '#333',
  },
  inputContainer: {
    width: '100%',
  },
  description: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    marginTop: 16,
  },
});

