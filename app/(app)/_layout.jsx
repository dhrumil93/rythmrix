import { Stack, usePathname } from "expo-router";
import { View, StyleSheet } from "react-native";
import BottomNav from "../components/shared/BottomNav"; // Adjust path if necessary

export default function AppLayout() {
  const pathname = usePathname();

  // Define the routes where the BottomNav should be displayed
  const showBottomNav = [
    "/(app)/home",
    "/(app)/reports",
    "/(app)/articles",
    "/(app)/settings",
  ].some(route => pathname.startsWith(route));

  return (
    <View style={styles.container}>
      <Stack
        screenOptions={{
          headerShown: false,
        }}
      >
        <Stack.Screen name="index" />
        <Stack.Screen name="home" />
        <Stack.Screen name="reports" />
        <Stack.Screen name="articles" />
        <Stack.Screen name="settings" />
        <Stack.Screen name="tests" />
      </Stack>
      {showBottomNav && <BottomNav />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});