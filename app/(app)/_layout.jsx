import { Stack } from 'expo-router';

export default function AppLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="home" />
      <Stack.Screen name="reports" />
      <Stack.Screen name="articles" />
      <Stack.Screen name="settings" />
      <Stack.Screen name="tests" />
    </Stack>
  );
} 