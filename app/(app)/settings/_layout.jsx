import { Stack } from 'expo-router';
import { View, StyleSheet } from 'react-native';

export default function SettingsLayout() {
  return (
    <View style={styles.container}>
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
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingBottom: 60, // Adjust this value based on the height of your BottomNav
  },
});