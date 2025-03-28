import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  PanResponder,
} from "react-native";
import SearchBar from "../../../components/shared/SearchBar";
import TabSelector from "./components/TabSelector";
import ArticlesList from "./components/ArticlesList";
import BottomNav from "../../../components/shared/BottomNav";

export default function ArticlesScreen() {
  const [activeTab, setActiveTab] = useState("blogs");

  // Handle Swipe Gestures
  const panResponder = PanResponder.create({
    onMoveShouldSetPanResponder: (_, gestureState) =>
      Math.abs(gestureState.dx) > 20, // Detect horizontal swipe
    onPanResponderRelease: (_, gestureState) => {
      if (gestureState.dx < -50 && activeTab === "blogs") {
        // Swipe left -> Go to "Tutorials"
        setActiveTab("tutorials");
      } else if (gestureState.dx > 50 && activeTab === "tutorials") {
        // Swipe right -> Go to "Blogs"
        setActiveTab("blogs");
      }
    },
  });

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar translucent backgroundColor="transparent" barStyle="dark-content" />

      <View style={styles.header}>
        <Text style={styles.title}>Articles</Text>
      </View>

      <SearchBar placeholder="Search for blogs and tutorials" />

      <TabSelector
        tabs={[
          { id: "blogs", label: "Blogs" },
          { id: "tutorials", label: "Tutorials" },
        ]}
        activeTab={activeTab}
        onTabChange={setActiveTab}
      />

      {/* Enable Gesture-based Swiping */}
      <View {...panResponder.panHandlers} style={styles.gestureArea}>
        <ArticlesList type={activeTab} />
      </View>

      <BottomNav />
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
    paddingTop: StatusBar.currentHeight || 40,
  },
  header: {
    paddingHorizontal: 24,
    paddingVertical: 16,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    color: "#333",
  },
  gestureArea: {
    flex: 1, // Make gesture area cover the whole articles list
  },
});
