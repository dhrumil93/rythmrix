import { Stack } from 'expo-router';
import { ToastProvider } from './context/ToastContext';
import { UserProvider } from './context/UserContext';


export default function RootLayout() {
  return (
    <UserProvider>
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
    </UserProvider>
  );
} 