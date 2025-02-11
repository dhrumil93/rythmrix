import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect directly to login page
  return <Redirect href="/(auth)/index" />;
} 