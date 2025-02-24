import { Stack } from "expo-router";

export default function MembersLayout() {
  return (
    <Stack
      screenOptions={{
        headerShown: false,
      }}
    >
      <Stack.Screen name="index" />
      <Stack.Screen name="addmembers/index" />
      <Stack.Screen name="editmembers/index" />
    </Stack>
  );
}
