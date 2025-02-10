import { Stack } from 'expo-router';

export default function TestsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="12l-ecg" />
      <Stack.Screen name="heart-risk" />
      <Stack.Screen name="hrv" />
      <Stack.Screen name="live-monitor" />
      <Stack.Screen name="lead2-ecg" />
      <Stack.Screen name="hyperkalemia" />
      <Stack.Screen name="reports" />
    </Stack>
  );
} 