import { Redirect } from 'expo-router';

export default function Index() {
  // Redirect to the app group
  return <Redirect href="/(app)" />;
} 