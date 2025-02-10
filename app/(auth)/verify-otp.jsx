import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar, TouchableOpacity } from 'react-native';
import { useRouter } from 'expo-router';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import OTPInput from '../components/OTPInput';
import { useToast } from '../context/ToastContext';

export default function VerifyOTP() {
  const router = useRouter();
  const [code, setCode] = useState('');
  const [error, setError] = useState('');
  const { showToast } = useToast();

  const verifyOTP = () => {
    if (code.length !== 4) {
      showToast('Please enter complete OTP', 'error');
      return;
    }

    if (code === '1234') {
      showToast('OTP verified successfully', 'success');
      router.push('/(auth)/reset-password');
    } else {
      showToast('Invalid OTP. Please try again.', 'error');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <BackButton />
      
      <View style={styles.content}>
        <Text style={styles.title}>Verify OTP</Text>
        <Text style={styles.subtitle}>Please enter the verification code sent to your phone</Text>

        <View style={styles.otpContainer}>
          <OTPInput 
            code={code}
            setCode={(value) => {
              setCode(value);
              if (error) setError('');
            }}
            length={4}
            error={error}
          />
          {error ? <Text style={styles.errorText}>{error}</Text> : null}
        </View>

        <CustomButton 
          title="Verify"
          onPress={verifyOTP}
          disabled={code.length !== 4}
          style={{ marginTop: 30 }}
        />

        <TouchableOpacity 
          style={styles.resendContainer}
          onPress={() => {
            // Handle resend logic
            alert('OTP resent!');
          }}
        >
          <Text style={styles.resendText}>Didn't receive code? </Text>
          <Text style={styles.resendLink}>Resend</Text>
        </TouchableOpacity>
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
    marginBottom: 12,
    color: '#333',
  },
  subtitle: {
    textAlign: 'center',
    color: '#666',
    fontSize: 14,
    lineHeight: 20,
    marginBottom: 40,
  },
  otpContainer: {
    alignItems: 'center',
    marginVertical: 20,
  },
  errorText: {
    color: '#ff3b30',
    fontSize: 14,
    marginTop: 8,
  },
  resendContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    marginTop: 20,
  },
  resendText: {
    color: '#666',
    fontSize: 14,
  },
  resendLink: {
    color: '#6178BC',
    fontSize: 14,
    fontWeight: '600',
  },
}); 