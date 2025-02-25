import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  ScrollView,
} from "react-native";
import Modal from "react-native-modal";
import { MaterialIcons } from "@expo/vector-icons";

const ECGTypes = ["12 lead", "7 Lead", "Lead II", "Hyperkalemia", "HRV"];

const DateFilters = [
  "Recents",
  "Last Week",
  "Last Month",
  "Last 6 Months",
  "Last Year",
];

export default function FilterModal({
  isVisible,
  onClose,
  onSelectFilter,
  selectedFilters = [],
}) {
  const [selectedECGTypes, setSelectedECGTypes] = useState([]);
  const [selectedDate, setSelectedDate] = useState("");

  const handleECGTypeSelect = (type) => {
    if (selectedECGTypes.includes(type)) {
      setSelectedECGTypes(selectedECGTypes.filter((t) => t !== type));
    } else {
      setSelectedECGTypes([...selectedECGTypes, type]);
    }
  };

  const handleDateSelect = (date) => {
    setSelectedDate(date === selectedDate ? "" : date);
  };

  const handleApplyFilter = () => {
    onSelectFilter({ ecgTypes: selectedECGTypes, date: selectedDate });
    onClose();
  };

  return (
    <Modal
      isVisible={isVisible}
      onBackdropPress={onClose}
      onSwipeComplete={onClose}
      swipeDirection="down"
      style={styles.modal}
    >
      <View style={styles.modalContent}>
        <View style={styles.modalHeader}>
          <TouchableOpacity onPress={onClose}>
            <MaterialIcons name="close" size={24} color="#333" />
          </TouchableOpacity>
          <Text style={styles.modalTitle}>Filter</Text>
          <TouchableOpacity
            onPress={() => {
              setSelectedECGTypes([]);
              setSelectedDate("");
            }}
          >
            <Text style={styles.resetText}>Reset</Text>
          </TouchableOpacity>
        </View>

        <ScrollView
          showsVerticalScrollIndicator={false}
          keyboardShouldPersistTaps="handled"
          keyboardDismissMode="on-drag"
          contentContainerStyle={{ flexGrow: 1 }}
          nestedScrollEnabled={true} // 🔹 Enables nested scrolling
        >
          <Text style={styles.sectionTitle}>Filter Reports</Text>

          {/* ECG Type Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionSubtitle}>By ECG Type</Text>
            {ECGTypes.map((type, index) => (
              <TouchableOpacity
                key={index}
                style={styles.checkboxRow}
                onPress={() => handleECGTypeSelect(type)}
              >
                <View
                  style={[
                    styles.checkbox,
                    selectedECGTypes.includes(type) && styles.checkboxSelected,
                  ]}
                >
                  {selectedECGTypes.includes(type) && (
                    <MaterialIcons name="check" size={16} color="#074799" />
                  )}
                </View>
                <Text style={styles.checkboxLabel}>{type}</Text>
              </TouchableOpacity>
            ))}
          </View>

          {/* Date Filter */}
          <View style={styles.section}>
            <Text style={styles.sectionSubtitle}>By Date</Text>
            {DateFilters.map((date, index) => (
              <TouchableOpacity
                key={index}
                style={styles.radioRow}
                onPress={() => handleDateSelect(date)}
              >
                <View
                  style={[
                    styles.radio,
                    selectedDate === date && styles.radioSelected,
                  ]}
                >
                  {selectedDate === date && <View style={styles.radioInner} />}
                </View>
                <Text style={styles.radioLabel}>{date}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </ScrollView>

        <TouchableOpacity
          style={styles.applyButton}
          onPress={handleApplyFilter}
        >
          <Text style={styles.applyButtonText}>Apply filter</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}

const styles = StyleSheet.create({
  modal: {
    margin: 0,
    justifyContent: "flex-end",
  },
  modalContent: {
    backgroundColor: "#f5f5f5",
    borderTopLeftRadius: 20,
    borderTopRightRadius: 20,
    paddingTop: 20,
    height: "80%",
  },
  modalHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    paddingHorizontal: 20,
    marginBottom: 20,
  },
  modalTitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
  },
  resetText: {
    color: "#074799",
    fontSize: 16,
  },
  sectionTitle: {
    fontSize: 24,
    fontWeight: "bold",
    color: "#333",
    marginBottom: 20,
    paddingHorizontal: 20,
  },
  section: {
    backgroundColor: "#fff",
    padding: 20,
    marginBottom: 20,
  },
  sectionSubtitle: {
    fontSize: 18,
    fontWeight: "600",
    color: "#333",
    marginBottom: 16,
  },
  checkboxRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  checkbox: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 4,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  checkboxSelected: {
    borderColor: "#074799",
    backgroundColor: "#fff",
  },
  checkboxLabel: {
    fontSize: 16,
    color: "#333",
  },
  radioRow: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 16,
  },
  radio: {
    width: 24,
    height: 24,
    borderWidth: 2,
    borderColor: "#ccc",
    borderRadius: 12,
    marginRight: 12,
    justifyContent: "center",
    alignItems: "center",
  },
  radioSelected: {
    borderColor: "#074799",
  },
  radioInner: {
    width: 12,
    height: 12,
    borderRadius: 6,
    backgroundColor: "#074799",
  },
  radioLabel: {
    fontSize: 16,
    color: "#333",
  },
  applyButton: {
    backgroundColor: "#074799",
    margin: 20,
    padding: 16,
    borderRadius: 12,
    alignItems: "center",
  },
  applyButtonText: {
    color: "#fff",
    fontSize: 16,
    fontWeight: "600",
  },
});
