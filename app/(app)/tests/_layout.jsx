import { Stack } from 'expo-router';

export default function TestsLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="12l-ecg/index" />
      <Stack.Screen name="12l-ecg/placement" />
      <Stack.Screen name="12l-ecg/user-details" />
      <Stack.Screen name="12l-ecg/v1/index" />
      <Stack.Screen name="12l-ecg/v2" />
      <Stack.Screen name="12l-ecg/v3" />
      <Stack.Screen name="12l-ecg/ii" />
      <Stack.Screen name="12l-ecg/l" />
      <Stack.Screen name="12l-ecg/member-report" />
      <Stack.Screen name="heart-risk" />
      <Stack.Screen name="hrv" />
      <Stack.Screen name="live-monitor" />
      <Stack.Screen name="lead2-ecg" />
      <Stack.Screen name="hyperkalemia" />
    </Stack>
  );
}