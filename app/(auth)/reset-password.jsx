import React, { useState } from 'react';
import { View, Text, StyleSheet, SafeAreaView, StatusBar } from 'react-native';
import { useRouter } from 'expo-router';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import BackButton from '../components/BackButton';
import { useToast } from '../context/ToastContext';

export default function ResetPassword() {
  const router = useRouter();
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState('');
  const { showToast } = useToast();

  const validatePassword = () => {
    if (password.length < 8) {
      setError('Password must be at least 8 characters long');
      return false;
    }
    if (password !== confirmPassword) {
      setError('Passwords do not match');
      return false;
    }
    setError('');
    return true;
  };

  const handleReset = () => {
    if (validatePassword()) {
      showToast('Password reset successfully!', 'success');
      router.push('/(auth)');
    }
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      <BackButton />
      
      <View style={styles.content}>
        <Text style={styles.title}>Reset Password</Text>
        <Text style={styles.subtitle}>Create your new password</Text>

        <View style={styles.inputContainer}>
          <CustomInput 
            label="New Password"
            icon="lock"
            placeholder="Enter new password"
            value={password}
            onChangeText={(text) => {
              setPassword(text);
              if (error) setError('');
            }}
            isPassword
            showPassword={showPassword}
            togglePassword={() => setShowPassword(!showPassword)}
            error={error}
          />
          
          <CustomInput 
            label="Confirm Password"
            icon="lock"
            placeholder="Confirm new password"
            value={confirmPassword}
            onChangeText={(text) => {
              setConfirmPassword(text);
              if (error) setError('');
            }}
            isPassword
            showPassword={showConfirmPassword}
            togglePassword={() => setShowConfirmPassword(!showConfirmPassword)}
            error={error}
          />

          <CustomButton 
            title="Reset Password"
            onPress={handleReset}
            disabled={!password || !confirmPassword}
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
  inputContainer: {
    width: '100%',
  },
}); 