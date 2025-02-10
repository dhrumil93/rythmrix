import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="profile" />
      <Stack.Screen name="plan" />
      <Stack.Screen name="members" />
      <Stack.Screen name="language" />
      <Stack.Screen name="subscription" />
      <Stack.Screen name="support" />
      <Stack.Screen name="ui-mode" />
      <Stack.Screen name="ecg-settings" />
      <Stack.Screen name="privacy" />
      <Stack.Screen name="terms" />
    </Stack>
  );
} 