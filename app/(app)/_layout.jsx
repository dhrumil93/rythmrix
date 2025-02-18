import { Stack } from "expo-router";
import { View, StyleSheet } from "react-native";
import BottomNav from "../components/shared/BottomNav"; // Adjust path if necessary

export default function AppLayout() {
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
      <BottomNav />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
