import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  SafeAreaView,
  StatusBar,
  TouchableOpacity,
} from "react-native";
import SearchBar from "../../components/shared/SearchBar";
import ReportBanner from "./components/ReportBanner";
import ReportsList from "./components/ReportsList";
import FilterModal from "./components/FilterModal";
import { MaterialIcons } from "@expo/vector-icons";

export default function ReportsScreen() {
  const [isFilterModalVisible, setFilterModalVisible] = useState(false);
  const [selectedFilter, setSelectedFilter] = useState("All");

  const handleFilterSelect = (filter) => {
    setSelectedFilter(filter);
    // Here you can implement the actual filtering logic
    console.log("Selected filter:", filter);
  };

  return (
    <SafeAreaView style={styles.container}>
      <StatusBar
        translucent
        backgroundColor="transparent"
        barStyle="dark-content"
      />

      <View style={styles.header}>
        <Text style={styles.title}>My Reports</Text>
      </View>

      <View style={styles.searchContainer}>
        <View style={styles.searchBarWrapper}>
          <SearchBar
            placeholder="Search report by users etc"
            containerStyle={styles.searchBarContainer}
            inputContainerStyle={styles.inputContainer}
            searchIcon={{ size: 22, color: "#666" }}
          />
        </View>

        <TouchableOpacity
          style={styles.filterButton}
          onPress={() => setFilterModalVisible(true)}
        >
          <MaterialIcons name="filter-list" size={28} color="white" />
        </TouchableOpacity>
      </View>

      <View style={styles.content}>
        <Text style={styles.sectionTitle}>
          My Reports (3) {selectedFilter !== "All" && `• ${selectedFilter}`}
        </Text>
      </View>

      <ReportBanner />
      <ReportsList />

      <FilterModal
        isVisible={isFilterModalVisible}
        onClose={() => setFilterModalVisible(false)}
        onSelectFilter={handleFilterSelect}
        selectedFilter={selectedFilter}
      />
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
  searchContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 12,
    backgroundColor: '#fff',
  },
  searchBarWrapper: {
    flex: 1,
    backgroundColor: '#f5f5f5',
    borderRadius: 10,
    marginRight: 12,
  },
  searchBarContainer: {
    backgroundColor: 'transparent',
    borderTopWidth: 0,
    borderBottomWidth: 0,
    paddingHorizontal: 0,
  },
  inputContainer: {
    backgroundColor: 'transparent',
    height: 40,
  },
  searchInput: {
    fontSize: 16,
  },
  filterButton: {
    width: 40,
    height: 40,
    backgroundColor: '#074799',
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
  },
  content: {
    paddingHorizontal: 24,
  },
  sectionTitle: {
    fontSize: 20,
    fontWeight: "600",
    marginBottom: 16,
    color: "#333",
  },
});
