import { Stack, usePathname } from "expo-router";
import { View, StyleSheet, Text } from "react-native";
import BottomNav from "../../components/shared/BottomNav"; // Ensure correct path

export default function SettingsLayout() {
  const pathname = usePathname();
  console.log("Current Pathname:", pathname); // Debugging

  // Show BottomNav only on main settings page
  const showBottomNav = pathname === "/settings" || pathname === "/(app)/settings";

  return (
    <View style={styles.container}>
      <Stack screenOptions={{ headerShown: false }}>
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
      {showBottomNav && <BottomNav />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
