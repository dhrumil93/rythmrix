import React, { useState } from 'react';
import { View, Text, TouchableOpacity, StyleSheet, ScrollView, SafeAreaView, StatusBar, Animated } from 'react-native';
import CustomInput from '../components/CustomInput';
import CustomButton from '../components/CustomButton';
import SocialButton from '../components/SocialButton';
import { useRouter } from 'expo-router';
import { useToast } from '../context/ToastContext';
import { MaterialIcons } from '@expo/vector-icons';

export default function AuthScreen() {
  const [isLogin, setIsLogin] = useState(true);
  
  // Login form states
  const [loginData, setLoginData] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [loginErrors, setLoginErrors] = useState({
    emailOrPhone: '',
    password: '',
  });
  const [showLoginPassword, setShowLoginPassword] = useState(false);

  // Signup form states
  const [signupData, setSignupData] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [signupErrors, setSignupErrors] = useState({
    name: '',
    phone: '',
    email: '',
    password: '',
    confirmPassword: '',
  });
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirmPassword, setShowSignupConfirmPassword] = useState(false);

  // Animation states
  const slideAnim = useState(new Animated.Value(0))[0];
  const opacityAnim = useState(new Animated.Value(1))[0];

  const router = useRouter();
  const { showToast } = useToast();

  const [isRememberMe, setIsRememberMe] = useState(false);

  const validateLoginForm = () => {
    let isValid = true;
    const newErrors = { ...loginErrors };
    
    // Email regex
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    // Phone regex (exactly 10 digits)
    const phoneRegex = /^\d{10}$/;

    if (!loginData.emailOrPhone.trim()) {
      newErrors.emailOrPhone = 'This field is required';
      isValid = false;
    } else if (!emailRegex.test(loginData.emailOrPhone) && !phoneRegex.test(loginData.emailOrPhone)) {
      newErrors.emailOrPhone = 'Please enter a valid email or 10-digit phone number';
      isValid = false;
    }

    if (!loginData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    setLoginErrors(newErrors);
    return isValid;
  };

  const validateSignupForm = () => {
    let isValid = true;
    const newErrors = { ...signupErrors };
    const phoneRegex = /^\d{10}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!signupData.name.trim()) {
      newErrors.name = 'Name is required';
      isValid = false;
    }

    if (!signupData.phone.trim()) {
      newErrors.phone = 'Phone is required';
      isValid = false;
    } else if (!phoneRegex.test(signupData.phone)) {
      newErrors.phone = 'Please enter a valid 10-digit phone number';
      isValid = false;
    }

    if (!signupData.email.trim()) {
      newErrors.email = 'Email is required';
      isValid = false;
    } else if (!emailRegex.test(signupData.email)) {
      newErrors.email = 'Please enter a valid email address';
      isValid = false;
    }

    if (!signupData.password) {
      newErrors.password = 'Password is required';
      isValid = false;
    }

    if (!signupData.confirmPassword) {
      newErrors.confirmPassword = 'Please confirm password';
      isValid = false;
    } else if (signupData.password !== signupData.confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match';
      isValid = false;
    }

    setSignupErrors(newErrors);
    return isValid;
  };

  const handleLogin = () => {
    if (validateLoginForm()) {
      showToast('Successfully logged in!', 'success');
      router.replace('/(app)/home');
    }
  };

  const handleSignup = () => {
    if (validateSignupForm()) {
      // Handle signup logic
      showToast('Account created successfully!', 'success');
    }
  };

  const toggleAuth = (isLoginView) => {
    // Fade out current content
    Animated.timing(opacityAnim, {
      toValue: 0,
      duration: 150, // Slightly faster fade out
      useNativeDriver: true,
    }).start(() => {
      setIsLogin(isLoginView);
      // Reset position before fading in
      slideAnim.setValue(isLoginView ? 0 : 1);
      // Fade in new content
      Animated.timing(opacityAnim, {
        toValue: 1,
        duration: 200,
        useNativeDriver: true,
      }).start();
    });
  };

  const renderLoginForm = () => (
    <View style={styles.inputContainer}>
      <CustomInput 
        label="Number or Email"
        icon="person"
        placeholder="Enter your Email or Number"
        value={loginData.emailOrPhone}
        onChangeText={(text) => {
          // Remove spaces from input
          const cleanText = text.replace(/\s/g, '');
          setLoginData({ ...loginData, emailOrPhone: cleanText });
          if (loginErrors.emailOrPhone) {
            setLoginErrors({ ...loginErrors, emailOrPhone: '' });
          }
        }}
        error={loginErrors.emailOrPhone}
      />
      <CustomInput 
        label="Password"
        icon="lock"
        placeholder="Enter password"
        isPassword
        showPassword={showLoginPassword}
        togglePassword={() => setShowLoginPassword(!showLoginPassword)}
        value={loginData.password}
        onChangeText={(text) => {
          setLoginData({ ...loginData, password: text });
          if (loginErrors.password) {
            setLoginErrors({ ...loginErrors, password: '' });
          }
        }}
        error={loginErrors.password}
      />
      
      <View style={styles.formFooter}>
        <TouchableOpacity 
          style={styles.rememberMe}
          onPress={() => setIsRememberMe(!isRememberMe)}
        >
          <View style={[
            styles.checkbox,
            isRememberMe && styles.checkboxChecked
          ]}>
            {isRememberMe && (
              <MaterialIcons name="check" size={16} color="#fff" />
            )}
          </View>
          <Text style={styles.rememberText}>Remember me</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => router.push('/(auth)/forgot-password')}>
          <Text style={styles.forgotPassword}>Forget password?</Text>
        </TouchableOpacity>
      </View>
    </View>
  );

  const renderSignupForm = () => (
    <View style={styles.inputContainer}>
      <CustomInput 
        label="Name"
        icon="person"
        placeholder="Enter your name"
        value={signupData.name}
        onChangeText={(text) => {
          setSignupData({ ...signupData, name: text });
          if (signupErrors.name) {
            setSignupErrors({ ...signupErrors, name: '' });
          }
        }}
        error={signupErrors.name}
      />
      <CustomInput 
        label="Number"
        icon="phone"
        placeholder="Enter your number"
        keyboardType="phone-pad"
        value={signupData.phone}
        onChangeText={(text) => {
          setSignupData({ ...signupData, phone: text });
          if (signupErrors.phone) {
            setSignupErrors({ ...signupErrors, phone: '' });
          }
        }}
        error={signupErrors.phone}
      />
      <CustomInput 
        label="Email"
        icon="email"
        placeholder="Enter your email"
        keyboardType="email-address"
        value={signupData.email}
        onChangeText={(text) => {
          setSignupData({ ...signupData, email: text });
          if (signupErrors.email) {
            setSignupErrors({ ...signupErrors, email: '' });
          }
        }}
        error={signupErrors.email}
      />
      <CustomInput 
        label="Password"
        icon="lock"
        placeholder="Enter password"
        isPassword
        showPassword={showSignupPassword}
        togglePassword={() => setShowSignupPassword(!showSignupPassword)}
        value={signupData.password}
        onChangeText={(text) => {
          setSignupData({ ...signupData, password: text });
          if (signupErrors.password) {
            setSignupErrors({ ...signupErrors, password: '' });
          }
        }}
        error={signupErrors.password}
      />
      <CustomInput 
        label="Confirm Password"
        icon="lock"
        placeholder="Confirm password"
        isPassword
        showPassword={showSignupConfirmPassword}
        togglePassword={() => setShowSignupConfirmPassword(!showSignupConfirmPassword)}
        value={signupData.confirmPassword}
        onChangeText={(text) => {
          setSignupData({ ...signupData, confirmPassword: text });
          if (signupErrors.confirmPassword) {
            setSignupErrors({ ...signupErrors, confirmPassword: '' });
          }
        }}
        error={signupErrors.confirmPassword}
      />
    </View>
  );

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />
      
      {/* Title and Tabs - Fixed Position */}
      <View style={styles.titleContainer}>
        <Text style={styles.title}>
          {isLogin ? 'Welcome Back' : 'Get Started Now'}
        </Text>
        <Text style={styles.subtitle}>
          {isLogin 
            ? 'Login to access your account' 
            : 'Create an account to explore about our app'
          }
        </Text>

        <View style={styles.tabContainer}>
          <TouchableOpacity 
            style={[styles.tab, isLogin && styles.activeTab]}
            onPress={() => toggleAuth(true)}
          >
            <Text style={[styles.tabText, isLogin && styles.activeTabText]}>Log In</Text>
          </TouchableOpacity>
          <TouchableOpacity 
            style={[styles.tab, !isLogin && styles.activeTab]}
            onPress={() => toggleAuth(false)}
          >
            <Text style={[styles.tabText, !isLogin && styles.activeTabText]}>Sign Up</Text>
          </TouchableOpacity>
        </View>
      </View>

      {/* Scrollable Content - Only This Part Animates */}
      <ScrollView 
        showsVerticalScrollIndicator={false} 
        contentContainerStyle={styles.scrollContent}
      >
        <Animated.View style={[styles.formContainer, { opacity: opacityAnim }]}>
          {isLogin ? renderLoginForm() : renderSignupForm()}

          <CustomButton 
            title={isLogin ? 'Log In' : 'Sign Up'}
            onPress={isLogin ? handleLogin : handleSignup}
            disabled={isLogin 
              ? !loginData.emailOrPhone || !loginData.password
              : !signupData.name || !signupData.phone || !signupData.email || 
                !signupData.password || !signupData.confirmPassword
            }
          />

          <Text style={styles.switchPageText}>
            {isLogin ? "Don't have an account? " : "Already have an account? "}
            <Text 
              style={styles.switchPageLink}
              onPress={() => toggleAuth(!isLogin)}
            >
              {isLogin ? 'Sign Up' : 'Login'}
            </Text>
          </Text>

          {isLogin && (
            <>
              <View style={styles.dividerContainer}>
                <View style={styles.dividerLine} />
                <Text style={styles.dividerText}>OR Continue with</Text>
                <View style={styles.dividerLine} />
              </View>

              <View style={styles.socialContainer}>
                <SocialButton 
                  platform="google"
                  color="#DB4437"
                  onPress={() => {}}
                />
                <SocialButton 
                  platform="facebook"
                  color="#4267B2"
                  onPress={() => {}}
                />
              </View>
            </>
          )}
        </Animated.View>
      </ScrollView>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    paddingTop: StatusBar.currentHeight || 40,
  },
  titleContainer: {
    paddingHorizontal: 24,
    paddingTop: 20,
  },
  title: {
    fontSize: 28,
    fontWeight: 'bold',
    textAlign: 'center',
    marginBottom: 12,
    color: '#333',
  },
  subtitle: {
    fontSize: 14,
    textAlign: 'center',
    color: '#666',
    lineHeight: 16,
    marginBottom: 20,
  },
  tabContainer: {
    flexDirection: 'row',
    backgroundColor: '#f5f5f5',
    borderRadius: 30,
    padding: 5,
    marginBottom: 20,
  },
  tab: {
    flex: 1,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 25,
  },
  activeTab: {
    backgroundColor: '#074799',
    shadowColor: '#074799',
    shadowOffset: {
      width: 0,
      height: 4,
    },
    shadowOpacity: 0.2,
    shadowRadius: 8,
    elevation: 4,
  },
  tabText: {
    color: '#666',
    fontWeight: '500',
    fontSize: 15,
  },
  activeTabText: {
    color: '#fff',
    fontWeight: '600',
  },
  scrollContent: {
    paddingHorizontal: 24,
  },
  formContainer: {
    width: '100%',
    alignItems: 'center',
  },
  inputContainer: {
    width: '100%',
  },
  formFooter: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 8,
  },
  rememberMe: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1,
    borderColor: '#074799',
    borderRadius: 4,
    marginRight: 8,
    alignItems: 'center',
    justifyContent: 'center',
  },
  checkboxChecked: {
    backgroundColor: '#6178BC',
    borderColor: '#6178BC',
  },
  rememberText: {
    color: '#666',
  },
  forgotPassword: {
    color: '#ff3b30',
  },
  switchPageText: {
    width: '100%',
    textAlign: 'center',
    color: '#666',
    marginBottom: 12,
    fontSize: 15,
  },
  switchPageLink: {
    color: '#6178BC',
    fontWeight: '600',
  },
  dividerContainer: {
    width: '100%',
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 12,
  },
  dividerLine: {
    flex: 1,
    height: 1,
    backgroundColor: '#ddd',
  },
  dividerText: {
    marginHorizontal: 16,
    color: '#666',
    fontSize: 14,
  },
  socialContainer: {
    width: '100%',
    flexDirection: 'row',
    justifyContent: 'space-between',
    gap: 16,
  },
}); 