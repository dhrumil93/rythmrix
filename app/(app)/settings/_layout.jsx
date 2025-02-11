import { Stack } from 'expo-router';

export default function SettingsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="profile/index" />
      <Stack.Screen name="plan/index" />
      <Stack.Screen name="members/index" />
      <Stack.Screen name="language/index" />
      <Stack.Screen name="subscription/index" />
      <Stack.Screen name="support/index" />
      <Stack.Screen name="ui-mode/index" />
      <Stack.Screen name="ecg-settings/index" />
      <Stack.Screen name="privacy/index" />
      <Stack.Screen name="terms/index" />
    </Stack>
  );
} 