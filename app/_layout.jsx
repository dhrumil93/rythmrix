import { Stack } from 'expo-router';
import { ToastProvider } from './context/ToastContext';

export default function RootLayout() {
  return (
    <ToastProvider>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="(auth)" options={{ headerShown: false }} />
        <Stack.Screen name="(app)" options={{ headerShown: false }} />
      </Stack>
    </ToastProvider>
  );
} 