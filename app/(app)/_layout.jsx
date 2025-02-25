import { Slot, usePathname } from "expo-router";
import { View, StyleSheet } from "react-native";
import BottomNav from "../components/shared/BottomNav"; // Adjust path if necessary

export default function AppLayout() {
  const pathname = usePathname();

  // Show bottom nav only on main pages, not on settings subpages
  const showBottomNav = ["/home", "/reports", "/articles", "/settings"].includes(pathname);

  return (
    <View style={styles.container}>
      <View style={styles.content}>
        <Slot /> 
      </View>
      {showBottomNav && <BottomNav />}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  content: {
    flex: 1, // Ensures content area takes up all space above BottomNav
  },
});
